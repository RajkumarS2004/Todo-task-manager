import { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import TaskService from '../services/TaskService';
import { useSocket } from './useSocket';
import { SOCKET_EVENTS } from '../utils/constants';

export const useTasks = (filters = {}) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState(null);
  const { socket } = useSocket();

  // Fetch tasks
  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await TaskService.getTasks(filters);
      setTasks(response.tasks || response);
    } catch (err) {
      setError(err.message || 'Failed to fetch tasks');
      toast.error('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  // Fetch task statistics
  const fetchStats = useCallback(async () => {
    try {
      const response = await TaskService.getTaskStats();
      setStats(response);
    } catch (err) {
      console.error('Failed to fetch task stats:', err);
    }
  }, []);

  // Create task
  const createTask = useCallback(async (taskData) => {
    try {
      const newTask = await TaskService.createTask(taskData);
      setTasks(prev => [newTask, ...prev]);
      toast.success('Task created successfully');
      return newTask;
    } catch (err) {
      toast.error(err.message || 'Failed to create task');
      throw err;
    }
  }, []);

  // Update task
  const updateTask = useCallback(async (id, taskData) => {
    try {
      const updatedTask = await TaskService.updateTask(id, taskData);
      setTasks(prev => prev.map(task => 
        task._id === id ? updatedTask : task
      ));
      toast.success('Task updated successfully');
      return updatedTask;
    } catch (err) {
      toast.error(err.message || 'Failed to update task');
      throw err;
    }
  }, []);

  // Delete task
  const deleteTask = useCallback(async (id) => {
    try {
      await TaskService.deleteTask(id);
      setTasks(prev => prev.filter(task => task._id !== id));
      toast.success('Task deleted successfully');
    } catch (err) {
      toast.error(err.message || 'Failed to delete task');
      throw err;
    }
  }, []);

  // Share task
  const shareTask = useCallback(async (id, userEmail) => {
    try {
      await TaskService.shareTask(id, userEmail);
      toast.success('Task shared successfully');
    } catch (err) {
      toast.error(err.message || 'Failed to share task');
      throw err;
    }
  }, []);

  // Bulk operations
  const bulkUpdateTasks = useCallback(async (taskIds, updates) => {
    try {
      await TaskService.bulkUpdateTasks(taskIds, updates);
      setTasks(prev => prev.map(task => 
        taskIds.includes(task._id) ? { ...task, ...updates } : task
      ));
      toast.success('Tasks updated successfully');
    } catch (err) {
      toast.error(err.message || 'Failed to update tasks');
      throw err;
    }
  }, []);

  const bulkDeleteTasks = useCallback(async (taskIds) => {
    try {
      await TaskService.bulkDeleteTasks(taskIds);
      setTasks(prev => prev.filter(task => !taskIds.includes(task._id)));
      toast.success('Tasks deleted successfully');
    } catch (err) {
      toast.error(err.message || 'Failed to delete tasks');
      throw err;
    }
  }, []);

  // Search tasks
  const searchTasks = useCallback(async (query) => {
    try {
      setLoading(true);
      const response = await TaskService.searchTasks(query);
      setTasks(response.tasks || response);
    } catch (err) {
      setError(err.message || 'Failed to search tasks');
      toast.error('Failed to search tasks');
    } finally {
      setLoading(false);
    }
  }, []);

  // Get tasks by date range
  const getTasksByDateRange = useCallback(async (startDate, endDate) => {
    try {
      setLoading(true);
      const response = await TaskService.getTasksByDateRange(startDate, endDate);
      setTasks(response.tasks || response);
    } catch (err) {
      setError(err.message || 'Failed to fetch tasks');
      toast.error('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  }, []);

  // Export tasks
  const exportTasks = useCallback(async (format = 'json') => {
    try {
      const blob = await TaskService.exportTasks(format);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `tasks.${format}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      toast.success('Tasks exported successfully');
    } catch (err) {
      toast.error(err.message || 'Failed to export tasks');
      throw err;
    }
  }, []);

  // Import tasks
  const importTasks = useCallback(async (file) => {
    try {
      const response = await TaskService.importTasks(file);
      setTasks(prev => [...response.tasks, ...prev]);
      toast.success('Tasks imported successfully');
      return response;
    } catch (err) {
      toast.error(err.message || 'Failed to import tasks');
      throw err;
    }
  }, []);

  // Socket event handlers
  useEffect(() => {
    if (!socket) return;

    const handleTaskCreated = (newTask) => {
      setTasks(prev => [newTask, ...prev]);
      toast.info('New task created');
    };

    const handleTaskUpdated = (updatedTask) => {
      setTasks(prev => prev.map(task => 
        task._id === updatedTask._id ? updatedTask : task
      ));
      toast.info('Task updated');
    };

    const handleTaskDeleted = (taskId) => {
      setTasks(prev => prev.filter(task => task._id !== taskId));
      toast.info('Task deleted');
    };

    const handleTaskShared = (data) => {
      toast.info(`Task shared with ${data.email}`);
    };

    // Listen for socket events
    socket.on(SOCKET_EVENTS.TASK_CREATED, handleTaskCreated);
    socket.on(SOCKET_EVENTS.TASK_UPDATED, handleTaskUpdated);
    socket.on(SOCKET_EVENTS.TASK_DELETED, handleTaskDeleted);
    socket.on(SOCKET_EVENTS.TASK_SHARED, handleTaskShared);

    // Cleanup
    return () => {
      socket.off(SOCKET_EVENTS.TASK_CREATED, handleTaskCreated);
      socket.off(SOCKET_EVENTS.TASK_UPDATED, handleTaskUpdated);
      socket.off(SOCKET_EVENTS.TASK_DELETED, handleTaskDeleted);
      socket.off(SOCKET_EVENTS.TASK_SHARED, handleTaskShared);
    };
  }, [socket]);

  // Initial fetch
  useEffect(() => {
    fetchTasks();
    fetchStats();
  }, [fetchTasks, fetchStats]);

  return {
    tasks,
    loading,
    error,
    stats,
    createTask,
    updateTask,
    deleteTask,
    shareTask,
    bulkUpdateTasks,
    bulkDeleteTasks,
    searchTasks,
    getTasksByDateRange,
    exportTasks,
    importTasks,
    refetch: fetchTasks,
  };
}; 