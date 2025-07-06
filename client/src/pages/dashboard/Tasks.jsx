import React, { useState, useEffect } from 'react';
import { tasksAPI } from '../../services/api';
import { toast } from 'react-toastify';
import TaskList from '../../components/TaskList';
import TaskForm from '../../components/TaskForm';
import TaskFilters from '../../components/TaskFilters';
import ShareTaskModal from '../../components/ShareTaskModal';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showShareModal, setShowShareModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [activeTab, setActiveTab] = useState('list'); // 'list', 'add', 'filters'
  const [filters, setFilters] = useState({
    status: 'all',
    priority: 'all',
    search: '',
    category: 'all',
    dueDate: 'all'
  });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalTasks: 0,
    limit: 10
  });
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'grid'
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');

  // Fetch tasks
  const fetchTasks = async (page = 1) => {
    try {
      setLoading(true);
      const params = {
        page,
        limit: pagination.limit,
        sortBy,
        order: sortOrder,
        ...filters
      };
      const response = await tasksAPI.getTasks(params);
      setTasks(response.data.tasks);
      setPagination(prev => ({
        ...prev,
        currentPage: page,
        totalPages: response.data.totalPages,
        totalTasks: response.data.totalTasks
      }));
    } catch (error) {
      console.error('Error fetching tasks:', error);
      toast.error('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [filters, sortBy, sortOrder]);

  // Create task
  const handleCreateTask = async (taskData) => {
    try {
      const response = await tasksAPI.createTask(taskData);
      setTasks(prev => [response.data.task, ...prev]);
      setActiveTab('list'); // Switch back to list view after creating
      toast.success('Task created successfully! 🎉');
      fetchTasks(); // Refresh to update pagination
    } catch (error) {
      console.error('Error creating task:', error);
      toast.error('Failed to create task');
    }
  };



  // Delete task
  const handleDeleteTask = async (taskId) => {
    try {
      await tasksAPI.deleteTask(taskId);
      setTasks(prev => prev.filter(task => task._id !== taskId));
      toast.success('Task deleted successfully! 🗑️');
      fetchTasks(); // Refresh to update pagination
    } catch (error) {
      console.error('Error deleting task:', error);
      toast.error('Failed to delete task');
    }
  };

  // Share task
  const handleShareTask = (task) => {
    setSelectedTask(task);
    setShowShareModal(true);
  };

  // Handle page change
  const handlePageChange = (page) => {
    fetchTasks(page);
  };

  // Handle filters change
  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    setPagination(prev => ({ ...prev, currentPage: 1 }));
    setActiveTab('list'); // Switch to list view when filters are applied
  };

  // Handle sort change
  const handleSortChange = (newSortBy, newSortOrder) => {
    setSortBy(newSortBy);
    setSortOrder(newSortOrder);
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  };

  // Calculate task statistics
  const taskStats = {
    total: pagination.totalTasks,
    completed: tasks.filter(t => t.status === 'completed').length,
    inProgress: tasks.filter(t => t.status === 'in progress').length,
    pending: tasks.filter(t => t.status === 'pending').length,
    overdue: tasks.filter(t => {
      if (t.dueDate && t.status !== 'completed') {
        return new Date(t.dueDate) < new Date();
      }
      return false;
    }).length
  };

  // Sort options
  const sortOptions = [
    { value: 'createdAt', label: 'Date Created', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
    { value: 'dueDate', label: 'Due Date', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
    { value: 'priority', label: 'Priority', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
    { value: 'title', label: 'Title', icon: 'M4 6h16M4 10h16M4 14h16M4 18h16' }
  ];

  // Tab configuration
  const tabs = [
    {
      id: 'list',
      name: 'Task List',
      icon: 'M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01',
      count: taskStats.total
    },
    {
      id: 'add',
      name: 'Add Task',
      icon: 'M12 6v6m0 0v6m0-6h6m-6 0H6',
      count: null
    },
    {
      id: 'filters',
      name: 'Task Filters',
      icon: 'M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z',
      count: null
    }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] relative overflow-hidden">
      {/* Enhanced Bokeh Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-48 h-48 sm:w-96 sm:h-96 rounded-full bg-[#00eaff]/5 blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-1/4 w-36 h-36 sm:w-72 sm:h-72 rounded-full bg-[#a259ff]/5 blur-2xl animate-pulse delay-1000" />
        <div className="absolute top-10 right-10 w-24 h-24 sm:w-40 sm:h-40 rounded-full bg-[#f1c27d]/8 blur-2xl animate-pulse delay-2000" />
        <div className="absolute top-1/2 left-1/4 w-36 h-36 sm:w-64 sm:h-64 rounded-full bg-[#00eaff]/3 blur-3xl animate-pulse delay-1500" />
        <div className="absolute bottom-1/4 left-1/2 w-32 h-32 sm:w-48 sm:h-48 rounded-full bg-[#a259ff]/4 blur-2xl animate-pulse delay-3000" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-3 sm:px-4 py-3 sm:py-4">
        {/* Enhanced Header */}
        <div className="mb-4 sm:mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-3">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
              <div className="h-10 w-10 sm:h-12 sm:w-12 bg-gradient-to-br from-[#00eaff] to-[#a259ff] rounded-xl flex items-center justify-center shadow-lg border border-[#00eaff] animate-pulse">
                <svg className="h-5 w-5 sm:h-6 sm:w-6 text-white drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
              <div className="flex-1">
                <h1 className="text-xl sm:text-2xl font-extrabold text-gradient-cyan drop-shadow-lg mb-1 tracking-tight">
                  Task Management 📋
                </h1>
                <p className="text-sm text-[#b0b8c1] font-medium">
                  Organize and track your tasks efficiently with real-time updates
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 bg-[#43e97b] rounded-full animate-pulse"></div>
                <span className="text-xs text-[#43e97b] font-medium">Live</span>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-4 sm:mb-6">
          <div className="p-3 sm:p-4 rounded-xl bg-[#1a1a1a]/80 backdrop-blur-sm border border-[#00eaff]/20 flex flex-col gap-2 shadow-lg hover:shadow-xl transition-all duration-300 group">
            <div className="flex items-center justify-between">
              <div className="h-8 w-8 bg-[#00eaff]/10 rounded-lg flex items-center justify-center border border-[#00eaff]/30 group-hover:scale-110 transition-transform duration-200">
                <svg className="h-4 w-4 text-[#00eaff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
              <span className="px-2 py-1 text-xs font-bold bg-gradient-to-r from-[#00eaff] to-[#a259ff] text-white rounded-full">
                Total
              </span>
            </div>
            <div>
              <span className="text-xs text-[#b0b8c1] font-medium">Total Tasks</span>
              <div className="text-lg sm:text-xl font-bold text-gradient-cyan">{taskStats.total}</div>
            </div>
          </div>

          <div className="p-3 sm:p-4 rounded-xl bg-[#1a1a1a]/80 backdrop-blur-sm border border-[#43e97b]/20 flex flex-col gap-2 shadow-lg hover:shadow-xl transition-all duration-300 group">
            <div className="flex items-center justify-between">
              <div className="h-8 w-8 bg-[#43e97b]/10 rounded-lg flex items-center justify-center border border-[#43e97b]/30 group-hover:scale-110 transition-transform duration-200">
                <svg className="h-4 w-4 text-[#43e97b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="px-2 py-1 text-xs font-bold bg-gradient-to-r from-[#43e97b] to-[#38d9a9] text-white rounded-full">
                Done
              </span>
            </div>
            <div>
              <span className="text-xs text-[#b0b8c1] font-medium">Completed</span>
              <div className="text-lg sm:text-xl font-bold text-gradient-gold">{taskStats.completed}</div>
            </div>
          </div>

          <div className="p-3 sm:p-4 rounded-xl bg-[#1a1a1a]/80 backdrop-blur-sm border border-[#00eaff]/20 flex flex-col gap-2 shadow-lg hover:shadow-xl transition-all duration-300 group">
            <div className="flex items-center justify-between">
              <div className="h-8 w-8 bg-[#00eaff]/10 rounded-lg flex items-center justify-center border border-[#00eaff]/30 group-hover:scale-110 transition-transform duration-200">
                <svg className="h-4 w-4 text-[#00eaff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="px-2 py-1 text-xs font-bold bg-gradient-to-r from-[#00eaff] to-[#a259ff] text-white rounded-full">
                Active
              </span>
            </div>
            <div>
              <span className="text-xs text-[#b0b8c1] font-medium">In Progress</span>
              <div className="text-lg sm:text-xl font-bold text-gradient-cyan">{taskStats.inProgress}</div>
            </div>
          </div>

          <div className="p-3 sm:p-4 rounded-xl bg-[#1a1a1a]/80 backdrop-blur-sm border border-[#f1c27d]/20 flex flex-col gap-2 shadow-lg hover:shadow-xl transition-all duration-300 group">
            <div className="flex items-center justify-between">
              <div className="h-8 w-8 bg-[#f1c27d]/10 rounded-lg flex items-center justify-center border border-[#f1c27d]/30 group-hover:scale-110 transition-transform duration-200">
                <svg className="h-4 w-4 text-[#f1c27d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="px-2 py-1 text-xs font-bold bg-gradient-to-r from-[#f1c27d] to-[#bfa06a] text-white rounded-full">
                Wait
              </span>
            </div>
            <div>
              <span className="text-xs text-[#b0b8c1] font-medium">Pending</span>
              <div className="text-lg sm:text-xl font-bold text-gradient-gold">{taskStats.pending}</div>
            </div>
          </div>

          <div className="p-3 sm:p-4 rounded-xl bg-[#1a1a1a]/80 backdrop-blur-sm border border-[#ff6b6b]/20 flex flex-col gap-2 shadow-lg hover:shadow-xl transition-all duration-300 group">
            <div className="flex items-center justify-between">
              <div className="h-8 w-8 bg-[#ff6b6b]/10 rounded-lg flex items-center justify-center border border-[#ff6b6b]/30 group-hover:scale-110 transition-transform duration-200">
                <svg className="h-4 w-4 text-[#ff6b6b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="px-2 py-1 text-xs font-bold bg-gradient-to-r from-[#ff6b6b] to-[#ff8e8e] text-white rounded-full">
                Late
              </span>
            </div>
            <div>
              <span className="text-xs text-[#b0b8c1] font-medium">Overdue</span>
              <div className="text-lg sm:text-xl font-bold text-gradient-cyan">{taskStats.overdue}</div>
            </div>
          </div>
        </div>

        {/* Enhanced Controls */}
        <div className="mb-4 sm:mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            {/* Filters */}
            <div className="flex-1">
              <TaskFilters filters={filters} onChange={handleFiltersChange} />
            </div>

            {/* View and Sort Controls */}
            <div className="flex items-center gap-2">
              {/* View Mode Toggle */}
              <div className="flex items-center bg-[#1a1a1a]/80 backdrop-blur-sm border border-[#00eaff]/20 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200 ${
                    viewMode === 'list'
                      ? 'bg-gradient-to-r from-[#00eaff]/20 to-[#a259ff]/20 text-[#00eaff] border border-[#00eaff]/30'
                      : 'text-[#b0b8c1] hover:text-[#00eaff] hover:bg-[#00eaff]/10'
                  }`}
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                  </svg>
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200 ${
                    viewMode === 'grid'
                      ? 'bg-gradient-to-r from-[#00eaff]/20 to-[#a259ff]/20 text-[#00eaff] border border-[#00eaff]/30'
                      : 'text-[#b0b8c1] hover:text-[#00eaff] hover:bg-[#00eaff]/10'
                  }`}
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
              </div>

              {/* Sort Dropdown */}
              <div className="relative">
                <select
                  value={`${sortBy}-${sortOrder}`}
                  onChange={(e) => {
                    const [newSortBy, newSortOrder] = e.target.value.split('-');
                    handleSortChange(newSortBy, newSortOrder);
                  }}
                  className="px-3 py-1.5 bg-[#1a1a1a]/80 backdrop-blur-sm border border-[#00eaff]/20 rounded-lg text-xs font-medium text-[#00eaff] focus:outline-none focus:border-[#00eaff]/40 transition-all duration-200"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={`${option.value}-${sortOrder}`}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort Order Toggle */}
              <button
                onClick={() => handleSortChange(sortBy, sortOrder === 'asc' ? 'desc' : 'asc')}
                className="p-1.5 bg-[#1a1a1a]/80 backdrop-blur-sm border border-[#00eaff]/20 rounded-lg text-[#00eaff] hover:bg-[#00eaff]/10 transition-all duration-200"
              >
                <svg className={`w-3 h-3 transition-transform duration-200 ${sortOrder === 'desc' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mb-4 sm:mb-6">
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group touch-manipulation ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-[#00eaff]/20 to-[#a259ff]/20 text-[#00eaff] border border-[#00eaff]/30 shadow-cyan'
                    : 'text-[#b0b8c1] hover:text-[#00eaff] hover:bg-[#00eaff]/10 border border-transparent'
                }`}
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={tab.icon} />
                </svg>
                <span>{tab.name}</span>
                {tab.count !== null && (
                  <span className={`px-2 py-0.5 text-xs rounded-full font-medium ${
                    activeTab === tab.id
                      ? 'bg-[#00eaff]/20 text-[#00eaff]'
                      : 'bg-[#b0b8c1]/10 text-[#b0b8c1]'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="space-y-4 sm:space-y-6">
          {/* Task List Tab */}
          {activeTab === 'list' && (
            <div className="space-y-4 sm:space-y-6">
              {/* Task List Component */}
              <TaskList
                tasks={tasks}
                loading={loading}
                onEdit={() => {}} // Placeholder for edit functionality
                onDelete={handleDeleteTask}
                onShare={handleShareTask}
                pagination={pagination}
                onPageChange={handlePageChange}
              />
            </div>
          )}

          {/* Add Task Tab */}
          {activeTab === 'add' && (
            <div className="space-y-4 sm:space-y-6">
              <div className="p-4 sm:p-6 rounded-lg bg-[#1a1a1a]/80 backdrop-blur-sm border border-[#00eaff]/20">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-8 w-8 bg-gradient-cyan rounded-lg flex items-center justify-center">
                    <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                  <h2 className="text-lg font-bold text-gradient-cyan">Create New Task</h2>
                </div>
                <TaskForm
                  onSubmit={handleCreateTask}
                  onCancel={() => setActiveTab('list')}
                  editingTask={null}
                />
              </div>
            </div>
          )}

          {/* Task Filters Tab */}
          {activeTab === 'filters' && (
            <div className="space-y-4 sm:space-y-6">
              <div className="p-4 sm:p-6 rounded-lg bg-[#1a1a1a]/80 backdrop-blur-sm border border-[#00eaff]/20">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-8 w-8 bg-gradient-cyan rounded-lg flex items-center justify-center">
                    <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                    </svg>
                  </div>
                  <h2 className="text-lg font-bold text-gradient-cyan">Task Filters</h2>
                </div>
                <TaskFilters
                  filters={filters}
                  onFiltersChange={handleFiltersChange}
                  onClearFilters={() => {
                    setFilters({
                      status: 'all',
                      priority: 'all',
                      search: '',
                      category: 'all',
                      dueDate: 'all'
                    });
                    setActiveTab('list');
                  }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Share Task Modal */}
        <ShareTaskModal
          isOpen={showShareModal}
          onClose={() => setShowShareModal(false)}
          task={selectedTask}
        />
      </div>
    </div>
  );
};

export default Tasks; 