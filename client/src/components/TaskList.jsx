import { useState } from 'react';
import TaskItem from './TaskItem';
import ShareTaskModal from './ShareTaskModal';

const TaskList = ({ tasks, loading, onEdit, onDelete, onShare, pagination, onPageChange }) => {
  const [shareModal, setShareModal] = useState({ show: false, taskId: null });

  const handleShare = (taskId) => {
    setShareModal({ show: true, taskId });
  };

  const handleShareSubmit = async (email) => {
    try {
      await onShare(shareModal.taskId, email);
      setShareModal({ show: false, taskId: null });
    } catch {
      // error handled in parent
    }
  };

  if (loading) {
    return (
      <div className="p-4 sm:p-6 rounded-2xl bg-[#0a0a0a] text-center border border-[#00eaff]/20 shadow">
        <div className="inline-flex items-center space-x-3">
          <div className="animate-spin h-6 w-6 sm:h-8 sm:w-8 border-[3px] border-[#00eaff] border-t-transparent rounded-full" />
          <span className="text-sm sm:text-base font-semibold text-[#b0b8c1] tracking-wide">
            Loading tasks...
          </span>
        </div>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="p-4 sm:p-6 rounded-2xl bg-[#0a0a0a] text-center border border-[#00eaff]/20 shadow">
        <div className="flex flex-col items-center space-y-4">
          <div className="h-14 w-14 sm:h-16 sm:w-16 bg-gradient-to-br from-[#00eaff] to-[#a259ff] rounded-2xl flex items-center justify-center border border-[#00eaff] shadow-cyan">
            <svg className="w-7 h-7 text-white drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-bold bg-gradient-to-r from-[#00eaff] to-[#f1c27d] text-transparent bg-clip-text mb-1">
              No tasks yet
            </h3>
            <p className="text-sm text-[#b0b8c1] px-2">
              Start by creating a new task to manage your workflow and boost your productivity.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Task Items */}
      <div className="rounded-2xl bg-[#0a0a0a] overflow-hidden border border-[#00eaff]/20 shadow">
        <div className="divide-y divide-[#00eaff]/15">
          {tasks.map((task) => (
            <TaskItem
              key={task._id}
              task={task}
              onEdit={onEdit}
              onDelete={onDelete}
              onShare={handleShare}
            />
          ))}
        </div>
      </div>

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <div className="p-4 rounded-2xl bg-[#0a0a0a] border border-[#00eaff]/20 shadow">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="text-sm text-[#b0b8c1] text-center sm:text-left">
              Page {pagination.currentPage} of {pagination.totalPages} • {pagination.totalTasks} total tasks
            </div>
            <div className="flex gap-2 justify-center sm:justify-end">
              <button
                onClick={() => onPageChange(pagination.currentPage - 1)}
                disabled={!pagination.hasPrev}
                className={`px-3 py-1.5 rounded-xl font-semibold flex items-center gap-1 text-sm transition-all ${
                  pagination.hasPrev
                    ? 'bg-gradient-to-r from-[#00eaff] to-[#a259ff] text-[#0a0a0a] hover:brightness-110'
                    : 'bg-[#1a1a1a] text-[#6b7280] cursor-not-allowed border border-[#333]'
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span className="hidden sm:inline">Previous</span>
              </button>
              <button
                onClick={() => onPageChange(pagination.currentPage + 1)}
                disabled={!pagination.hasNext}
                className={`px-3 py-1.5 rounded-xl font-semibold flex items-center gap-1 text-sm transition-all ${
                  pagination.hasNext
                    ? 'bg-gradient-to-r from-[#00eaff] to-[#a259ff] text-[#0a0a0a] hover:brightness-110'
                    : 'bg-[#1a1a1a] text-[#6b7280] cursor-not-allowed border border-[#333]'
                }`}
              >
                <span className="hidden sm:inline">Next</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Share Modal */}
      {shareModal.show && (
        <ShareTaskModal
          onSubmit={handleShareSubmit}
          onCancel={() => setShareModal({ show: false, taskId: null })}
        />
      )}
    </div>
  );
};

export default TaskList;
