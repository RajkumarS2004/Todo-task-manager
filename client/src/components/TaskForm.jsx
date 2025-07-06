import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const TaskForm = ({ task, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    status: 'pending',
    dueDate: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || '',
        description: task.description || '',
        priority: task.priority || 'medium',
        status: task.status || 'pending',
        dueDate: task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : ''
      });
    }
  }, [task]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      toast.error('Task title is required');
      return;
    }

    setLoading(true);

    try {
      if (task) {
        await onSubmit(task._id, formData);
      } else {
        await onSubmit(formData);
      }
    } catch (error) {
      console.error('Task form error:', error);
      toast.error('Failed to save task');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card p-8 rounded-3xl glass-dark border border-[#00eaff]/30 max-w-2xl w-full mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 bg-gradient-cyan rounded-2xl flex items-center justify-center shadow-cyan border border-[#00eaff]">
            <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={task ? "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" : "M12 6v6m0 0v6m0-6h6m-6 0H6"} />
            </svg>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gradient-cyan">
              {task ? 'Edit Task' : 'Create New Task'}
            </h2>
            <p className="text-[#b0b8c1]">
              {task ? 'Update your task details' : 'Add a new task to your workflow'}
            </p>
          </div>
        </div>
        
        <button
          onClick={onCancel}
          className="p-2 rounded-xl glass-dark border border-[#00eaff]/20 text-[#00eaff] hover:bg-[#00eaff]/10 transition-all duration-200"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-[#00eaff] mb-2">
            Task Title *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="input-modern"
            placeholder="Enter task title"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-[#00eaff] mb-2">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="input-modern resize-none"
            placeholder="Enter task description"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="priority" className="block text-sm font-medium text-[#00eaff] mb-2">
              Priority
            </label>
            <select
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="input-modern"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div>
            <label htmlFor="status" className="block text-sm font-medium text-[#00eaff] mb-2">
              Status
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="input-modern"
            >
              <option value="pending">Pending</option>
              <option value="in progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="dueDate" className="block text-sm font-medium text-[#00eaff] mb-2">
            Due Date
          </label>
          <input
            type="date"
            id="dueDate"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            className="input-modern"
          />
        </div>

        {/* Priority Indicator */}
        <div className="flex items-center gap-4 p-4 rounded-2xl glass-dark border border-[#00eaff]/20">
          <div className={`h-4 w-4 rounded-full ${
            formData.priority === 'high' ? 'bg-red-500' :
            formData.priority === 'medium' ? 'bg-yellow-500' :
            'bg-green-500'
          }`} />
          <div>
            <p className="text-sm font-medium text-[#00eaff] capitalize">
              {formData.priority} Priority
            </p>
            <p className="text-xs text-[#b0b8c1]">
              {formData.priority === 'high' ? 'Urgent - needs immediate attention' :
               formData.priority === 'medium' ? 'Important - should be done soon' :
               'Normal - can be done when convenient'}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-4 pt-6">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 rounded-2xl glass-dark border border-[#00eaff]/20 text-[#00eaff] hover:bg-[#00eaff]/10 transition-all duration-200 font-medium"
          >
            Cancel
          </button>
          
          <button
            type="submit"
            disabled={loading}
            className="btn-primary px-8 py-3 font-semibold flex items-center gap-3"
          >
            {loading ? (
              <>
                <div className="spinner h-4 w-4"></div>
                {task ? 'Updating...' : 'Creating...'}
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {task ? 'Update Task' : 'Create Task'}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm; 