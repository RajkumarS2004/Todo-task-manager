import api from './api';

class TaskService {
  // Get all tasks for the current user
  async getTasks(filters = {}) {
    try {
      const params = new URLSearchParams();
      Object.keys(filters).forEach(key => {
        if (filters[key]) {
          params.append(key, filters[key]);
        }
      });
      
      const response = await api.get(`/tasks?${params.toString()}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Get a specific task by ID
  async getTask(id) {
    try {
      const response = await api.get(`/tasks/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Create a new task
  async createTask(taskData) {
    try {
      const response = await api.post('/tasks', taskData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Update an existing task
  async updateTask(id, taskData) {
    try {
      const response = await api.put(`/tasks/${id}`, taskData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Delete a task
  async deleteTask(id) {
    try {
      const response = await api.delete(`/tasks/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Share a task with another user
  async shareTask(id, userEmail) {
    try {
      const response = await api.post(`/tasks/${id}/share`, { email: userEmail });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Get shared tasks
  async getSharedTasks() {
    try {
      const response = await api.get('/tasks/shared');
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Get task statistics
  async getTaskStats() {
    try {
      const response = await api.get('/tasks/stats');
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Bulk update tasks
  async bulkUpdateTasks(taskIds, updates) {
    try {
      const response = await api.put('/tasks/bulk', { taskIds, updates });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Bulk delete tasks
  async bulkDeleteTasks(taskIds) {
    try {
      const response = await api.delete('/tasks/bulk', { data: { taskIds } });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Search tasks
  async searchTasks(query) {
    try {
      const response = await api.get(`/tasks/search?q=${encodeURIComponent(query)}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Get tasks by date range
  async getTasksByDateRange(startDate, endDate) {
    try {
      const response = await api.get(`/tasks/date-range?start=${startDate}&end=${endDate}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Export tasks
  async exportTasks(format = 'json') {
    try {
      const response = await api.get(`/tasks/export?format=${format}`, {
        responseType: 'blob'
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Import tasks
  async importTasks(file) {
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await api.post('/tasks/import', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default new TaskService(); 