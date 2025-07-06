import React from 'react';

const TaskItem = ({ task, onEdit, onDelete, onShare }) => {

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return {
          bg: 'bg-[#bfa06a]/20',
          text: 'text-[#bfa06a]',
          border: 'border-[#bfa06a]/30',
          icon: 'M5 13l4 4L19 7'
        };
      case 'in progress':
        return {
          bg: 'bg-[#e2b07a]/20',
          text: 'text-[#e2b07a]',
          border: 'border-[#e2b07a]/30',
          icon: 'M12 8v4l3 3'
        };
      default:
        return {
          bg: 'bg-[#f1c27d]/20',
          text: 'text-[#f1c27d]',
          border: 'border-[#f1c27d]/30',
          icon: 'M12 8v4l3 3'
        };
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return {
          bg: 'bg-red-500/20',
          text: 'text-red-500',
          border: 'border-red-500/30'
        };
      case 'medium':
        return {
          bg: 'bg-yellow-500/20',
          text: 'text-yellow-500',
          border: 'border-yellow-500/30'
        };
      default:
        return {
          bg: 'bg-green-500/20',
          text: 'text-green-500',
          border: 'border-green-500/30'
        };
    }
  };

  const statusColors = getStatusColor(task.status);
  const priorityColors = getPriorityColor(task.priority);

  const formatDate = (dateString) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="p-3 sm:p-4 hover:bg-gradient-to-r from-[#1a1a1a]/60 to-[#2a2a2a]/60 transition-all duration-300 group">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-start gap-2.5 sm:gap-3">
            <div className={`h-7 w-7 sm:h-8 sm:w-8 ${statusColors.bg} rounded-lg sm:rounded-xl flex items-center justify-center border ${statusColors.border} flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300`}>
              <svg className={`h-3.5 w-3.5 sm:h-4 sm:w-4 ${statusColors.text}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={statusColors.icon} />
              </svg>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1.5 sm:gap-0 mb-1.5">
                <h3 className="text-sm sm:text-base font-semibold text-[#f1c27d] truncate group-hover:text-[#e2b07a] transition-colors duration-300">
                  {task.title}
                </h3>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className={`px-1.5 sm:px-2 py-0.5 rounded-full text-xs font-medium border ${priorityColors.bg} ${priorityColors.text} ${priorityColors.border}`}>
                    {task.priority}
                  </span>
                  <span className={`px-1.5 sm:px-2 py-0.5 rounded-full text-xs font-medium border ${statusColors.bg} ${statusColors.text} ${statusColors.border}`}>
                    {task.status}
                  </span>
                </div>
              </div>

              {task.description && (
                <p className="text-xs sm:text-sm text-[#e2e8f0] mb-2 line-clamp-2">
                  {task.description}
                </p>
              )}

              <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-3 text-xs">
                {task.dueDate && (
                  <div className="flex items-center gap-1 text-[#e2e8f0]">
                    <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>Due: {formatDate(task.dueDate)}</span>
                  </div>
                )}
                <div className="flex items-center gap-1 text-[#e2e8f0]">
                  <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Created: {new Date(task.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center sm:justify-end gap-1.5 sm:ml-3">
          <button
            onClick={() => onEdit(task)}
            className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-gradient-to-br from-[#f1c27d]/20 to-[#bfa06a]/20 border border-[#f1c27d]/30 text-[#bfa06a] hover:from-[#f1c27d]/30 hover:to-[#bfa06a]/30 hover:scale-110 transition-all duration-300 shadow-lg touch-manipulation"
            title="Edit task"
            aria-label="Edit task"
          >
            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>

          <button
            onClick={() => onShare(task._id)}
            className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-gradient-to-br from-[#bfa06a]/20 to-[#e2b07a]/20 border border-[#bfa06a]/30 text-[#e2b07a] hover:from-[#bfa06a]/30 hover:to-[#e2b07a]/30 hover:scale-110 transition-all duration-300 shadow-lg touch-manipulation"
            title="Share task"
            aria-label="Share task"
          >
            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
            </svg>
          </button>

          <button
            onClick={() => onDelete(task._id)}
            className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-gradient-to-br from-red-500/20 to-red-600/20 border border-red-500/30 text-red-500 hover:from-red-500/30 hover:to-red-600/30 hover:scale-110 transition-all duration-300 shadow-lg touch-manipulation"
            title="Delete task"
            aria-label="Delete task"
          >
            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem; 