import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { tasksAPI } from '../../services/api';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

// Fantasy particle background (CSS only)
const FantasyBackground = () => (
  <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
    {/* Nebula gradient */}
    <div className="absolute inset-0 bg-gradient-to-br from-[#1a0036] via-[#2e0a4a] to-[#0a0a0a] opacity-90 animate-fade-in" />
    {/* Magical sparkles */}
    {[...Array(30)].map((_, i) => (
      <div
        key={i}
        className={`absolute rounded-full bg-gradient-to-br from-[#a259ff] via-[#00eaff] to-[#f1c27d] opacity-60 animate-fantasy-sparkle`}
        style={{
          width: `${Math.random() * 8 + 4}px`,
          height: `${Math.random() * 8 + 4}px`,
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 5}s`,
        }}
      />
    ))}
    {/* Floating orbs */}
    {[...Array(5)].map((_, i) => (
      <div
        key={i}
        className="absolute rounded-full bg-gradient-to-br from-[#00eaff]/30 to-[#a259ff]/30 blur-2xl animate-fantasy-orb"
        style={{
          width: `${Math.random() * 120 + 80}px`,
          height: `${Math.random() * 120 + 80}px`,
          top: `${Math.random() * 80}%`,
          left: `${Math.random() * 80}%`,
          animationDelay: `${Math.random() * 8}s`,
        }}
      />
    ))}
  </div>
);

const Dashboard = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [recentTasks, setRecentTasks] = useState([]);
  const [productivityScore, setProductivityScore] = useState(0);
  const [streakDays, setStreakDays] = useState(0);

  // Fetch tasks for dashboard overview
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await tasksAPI.getTasks({ limit: 10, sortBy: 'createdAt', order: 'desc' });
      setTasks(response.data.tasks);
      setRecentTasks(response.data.tasks.slice(0, 5)); // Show only 5 most recent
      
      // Calculate productivity metrics
      calculateProductivityMetrics(response.data.tasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const calculateProductivityMetrics = (taskList) => {
    const total = taskList.length;
    const completed = taskList.filter(t => t.status === 'completed').length;
    const inProgress = taskList.filter(t => t.status === 'in progress').length;
    const overdue = taskList.filter(t => {
      if (t.dueDate && t.status !== 'completed') {
        return new Date(t.dueDate) < new Date();
      }
      return false;
    }).length;

    // Calculate productivity score (0-100)
    const score = total > 0 ? Math.round(((completed * 2) + inProgress - overdue) / (total * 2) * 100) : 0;
    setProductivityScore(Math.max(0, Math.min(100, score)));

    // Calculate streak (simplified - in real app would track daily completion)
    const todayCompleted = taskList.filter(t => 
      t.status === 'completed' && 
      new Date(t.updatedAt).toDateString() === new Date().toDateString()
    ).length;
    setStreakDays(todayCompleted > 0 ? 1 : 0); // Simplified streak calculation
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Calculate dashboard stats
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.status === 'completed').length;
  const overdueTasks = tasks.filter(t => {
    if (t.dueDate && t.status !== 'completed') {
      return new Date(t.dueDate) < new Date();
    }
    return false;
  }).length;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Enhanced quick action cards with modern design
  const quickActions = [
    {
      title: 'Create Task',
      description: 'Add new task',
      icon: 'M12 6v6m0 0v6m0-6h6m-6 0H6',
      href: '/dashboard/tasks',
      gradient: 'from-[#00eaff] to-[#a259ff]',
      bgGradient: 'from-[#1a1a1a] to-[#1a1a1a]',
      borderColor: 'border-[#00eaff]',
      hoverGradient: 'hover:from-[#00eaff]/20 hover:to-[#a259ff]/20',
      badge: 'New'
    },
    {
      title: 'View Tasks',
      description: 'Manage tasks',
      icon: 'M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01',
      href: '/dashboard/tasks',
      gradient: 'from-[#f1c27d] to-[#bfa06a]',
      bgGradient: 'from-[#1a1a1a] to-[#1a1a1a]',
      borderColor: 'border-[#f1c27d]',
      hoverGradient: 'hover:from-[#f1c27d]/20 hover:to-[#bfa06a]/20',
      count: totalTasks
    },
    {
      title: 'Analytics',
      description: 'View insights',
      icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
      href: '/dashboard/analytics',
      gradient: 'from-[#00eaff] to-[#a259ff]',
      bgGradient: 'from-[#1a1a1a] to-[#1a1a1a]',
      borderColor: 'border-[#00eaff]',
      hoverGradient: 'hover:from-[#00eaff]/20 hover:to-[#a259ff]/20'
    },
    {
      title: 'Share Tasks',
      description: 'Collaborate',
      icon: 'M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z',
      href: '/dashboard/tasks',
      gradient: 'from-[#f1c27d] to-[#bfa06a]',
      bgGradient: 'from-[#1a1a1a] to-[#1a1a1a]',
      borderColor: 'border-[#f1c27d]',
      hoverGradient: 'hover:from-[#f1c27d]/20 hover:to-[#bfa06a]/20',
      badge: 'Live'
    }
  ];

  // Productivity insights
  const productivityInsights = [
    {
      title: 'Productivity Score',
      value: `${productivityScore}%`,
      icon: 'M13 10V3L4 14h7v7l9-11h-7z',
      color: 'text-[#00eaff]',
      bgColor: 'bg-[#00eaff]/10',
      borderColor: 'border-[#00eaff]/30'
    },
    {
      title: 'Completion Rate',
      value: `${completionRate}%`,
      icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
      color: 'text-[#43e97b]',
      bgColor: 'bg-[#43e97b]/10',
      borderColor: 'border-[#43e97b]/30'
    },
    {
      title: 'Streak Days',
      value: `${streakDays} days`,
      icon: 'M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z',
      color: 'text-[#f1c27d]',
      bgColor: 'bg-[#f1c27d]/10',
      borderColor: 'border-[#f1c27d]/30'
    },
    {
      title: 'Overdue Tasks',
      value: overdueTasks,
      icon: 'M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
      color: 'text-[#ff6b6b]',
      bgColor: 'bg-[#ff6b6b]/10',
      borderColor: 'border-[#ff6b6b]/30'
    }
  ];

  // Fantasy icons for quick actions
  const fantasyIcons = [
    // Crystal
    <svg className="h-6 w-6 text-[#00eaff] drop-shadow-fantasy" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2l4 7-4 13-4-13z" /></svg>,
    // Scroll
    <svg className="h-6 w-6 text-[#f1c27d] drop-shadow-fantasy" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 4h13v2a2 2 0 01-2 2H8V4zm0 0v16a2 2 0 002 2h8a2 2 0 002-2V6" /></svg>,
    // Orb
    <svg className="h-6 w-6 text-[#a259ff] drop-shadow-fantasy" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8" strokeWidth={2} /><circle cx="12" cy="12" r="4" strokeWidth={2} /></svg>,
    // Magic share
    <svg className="h-6 w-6 text-[#ff6b6b] drop-shadow-fantasy" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12h.01M12 15h.01M9 12h.01M12 9h.01M12 12h.01" /><circle cx="12" cy="12" r="10" strokeWidth={2} /></svg>,
  ];

  return (
    <div className="min-h-screen relative overflow-hidden fantasy-bg">
      <FantasyBackground />
      <div className="relative z-10 max-w-6xl mx-auto px-3 sm:px-4 py-3 sm:py-4">
        {/* Fantasy Welcome Header */}
        <div className="mb-6 animate-fantasy-fadein">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-3">
            <div className="h-12 w-12 bg-gradient-to-br from-[#a259ff] via-[#00eaff] to-[#f1c27d] rounded-2xl flex items-center justify-center shadow-fantasy border-2 border-[#a259ff] animate-fantasy-glow">
              <svg className="h-7 w-7 text-white drop-shadow-fantasy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <div className="flex-1">
              <h1 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-[#a259ff] via-[#00eaff] to-[#f1c27d] bg-clip-text text-transparent drop-shadow-fantasy mb-1 tracking-tight fantasy-font">
                Welcome, <span className="capitalize fantasy-glow-text">{user?.name}</span>! ✨
              </h1>
              <p className="text-base text-[#e0e0e0] font-medium fantasy-glow-text">
                {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 bg-[#43e97b] rounded-full animate-pulse"></div>
              <span className="text-xs text-[#43e97b] font-medium">Live</span>
            </div>
          </div>
        </div>

        {/* Fantasy Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 mb-8">
          {productivityInsights.map((insight, index) => (
            <div key={index} className={`p-5 rounded-2xl glass-fantasy border-2 ${insight.borderColor} shadow-fantasy-card hover:shadow-fantasy-card-glow transition-all duration-500 group animate-fantasy-popin`}> 
              <div className="flex items-center justify-between mb-2">
                <div className={`h-10 w-10 ${insight.bgColor} rounded-xl flex items-center justify-center border-2 ${insight.borderColor} group-hover:scale-110 transition-transform duration-200 fantasy-glow-bg`}>
                  <svg className={`h-6 w-6 ${insight.color} drop-shadow-fantasy`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={insight.icon} />
                  </svg>
                </div>
              </div>
              <span className="text-xs text-[#e0e0e0] font-semibold fantasy-glow-text">{insight.title}</span>
              <div className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-[#a259ff] via-[#00eaff] to-[#f1c27d] bg-clip-text text-transparent fantasy-glow-text fantasy-font">{insight.value}</div>
            </div>
          ))}
        </div>

        {/* Fantasy Quick Actions */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-[#a259ff] via-[#00eaff] to-[#f1c27d] bg-clip-text text-transparent fantasy-font">Quick Actions</h2>
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 bg-[#00eaff] rounded-full animate-pulse"></div>
              <span className="text-xs text-[#00eaff] font-medium">Real-time</span>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
            {quickActions.map((action, index) => (
              <Link
                key={index}
                to={action.href}
                className={`group p-5 rounded-2xl glass-fantasy border-2 ${action.borderColor} shadow-fantasy-card hover:shadow-fantasy-card-glow transition-all duration-500 flex flex-col items-center text-center gap-2 relative overflow-hidden animate-fantasy-popin`}
                aria-label={action.title}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#a259ff]/10 via-[#00eaff]/10 to-[#f1c27d]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                <div className="relative z-10 flex flex-col items-center">
                  <div className="mb-2">{fantasyIcons[index]}</div>
                  <h3 className="text-lg font-bold bg-gradient-to-r from-[#a259ff] via-[#00eaff] to-[#f1c27d] bg-clip-text text-transparent fantasy-font">{action.title}</h3>
                  <p className="text-xs text-[#e0e0e0] mb-1 fantasy-glow-text">{action.description}</p>
                  {action.count !== undefined && (
                    <span className="text-xs font-bold text-[#00eaff] bg-[#00eaff]/10 px-2 py-1 rounded-full border border-[#00eaff]/20">{action.count} tasks</span>
                  )}
                  {action.badge && (
                    <span className="px-2 py-0.5 text-xs font-bold bg-gradient-to-r from-[#ff6b6b] to-[#ff8e8e] text-white rounded-full shadow-fantasy-badge animate-fantasy-badge">{action.badge}</span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Fantasy Recent Tasks */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-[#a259ff] via-[#00eaff] to-[#f1c27d] bg-clip-text text-transparent fantasy-font">Recent Tasks</h2>
              <div className="h-1.5 w-1.5 bg-[#43e97b] rounded-full animate-pulse"></div>
            </div>
            <Link to="/dashboard/tasks" className="text-base text-[#00eaff] hover:text-[#a259ff] font-medium fantasy-glow-text flex items-center gap-1 group" aria-label="View all tasks">
              View All
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="p-6 rounded-2xl glass-fantasy border-2 border-[#a259ff]/30 animate-pulse h-24" />
              ))}
            </div>
          ) : recentTasks.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {recentTasks.map((task) => (
                <div key={task._id} className="p-6 rounded-2xl glass-fantasy border-2 border-[#a259ff]/30 hover:border-[#00eaff]/40 hover:shadow-fantasy-card-glow transition-all duration-500 group animate-fantasy-popin">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-semibold text-[#a259ff] line-clamp-1 flex-1 group-hover:text-[#00eaff] transition-colors duration-200 fantasy-font">
                      {task.title}
                    </h3>
                    <span className={`ml-2 px-2 py-1 text-xs rounded-full font-medium fantasy-glow-text ${
                      task.status === 'completed' 
                        ? 'bg-[#43e97b]/20 text-[#43e97b] border border-[#43e97b]/30'
                        : task.status === 'in progress'
                        ? 'bg-[#00eaff]/20 text-[#00eaff] border border-[#00eaff]/30'
                        : 'bg-[#f1c27d]/20 text-[#f1c27d] border border-[#f1c27d]/30'
                    }`}>
                      {task.status}
                    </span>
                  </div>
                  <p className="text-xs text-[#e0e0e0] line-clamp-2 mb-3 fantasy-glow-text">{task.description}</p>
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded-full font-medium fantasy-glow-text ${
                        task.priority === 'high' 
                          ? 'bg-[#ff6b6b]/20 text-[#ff6b6b] border border-[#ff6b6b]/30'
                          : task.priority === 'medium'
                          ? 'bg-[#f1c27d]/20 text-[#f1c27d] border border-[#f1c27d]/30'
                          : 'bg-[#43e97b]/20 text-[#43e97b] border border-[#43e97b]/30'
                      }`}>
                        {task.priority}
                      </span>
                    </div>
                    <span className="text-[#e0e0e0] fantasy-glow-text">
                      {new Date(task.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="h-20 w-20 bg-gradient-to-br from-[#a259ff]/20 via-[#00eaff]/20 to-[#f1c27d]/20 rounded-3xl flex items-center justify-center mx-auto mb-6 border-2 border-[#a259ff] animate-fantasy-glow">
                <svg className="h-10 w-10 text-[#a259ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold bg-gradient-to-r from-[#a259ff] via-[#00eaff] to-[#f1c27d] bg-clip-text text-transparent mb-2 fantasy-font">No tasks yet</h3>
              <p className="text-base text-[#e0e0e0] mb-4 max-w-md mx-auto fantasy-glow-text">
                Start by creating your first task to boost productivity and track your progress!
              </p>
              <Link to="/dashboard/tasks" className="btn-primary inline-flex items-center px-6 py-3 text-base font-bold fantasy-font" aria-label="Create first task">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Create First Task
              </Link>
            </div>
          )}
        </div>
      </div>
      {/* Fantasy custom styles */}
      <style>{`
        .fantasy-bg { background: radial-gradient(ellipse at 60% 40%, #2e0a4a 0%, #0a0a0a 100%); }
        .fantasy-font { font-family: 'Cinzel', 'Merriweather', serif; letter-spacing: 0.01em; }
        .fantasy-glow-text { text-shadow: 0 0 8px #a259ff44, 0 0 2px #00eaff44; }
        .fantasy-glow-bg { box-shadow: 0 0 24px 4px #a259ff33, 0 0 8px 2px #00eaff33; }
        .glass-fantasy { background: rgba(30, 20, 60, 0.7); backdrop-filter: blur(12px); border-radius: 1.5rem; }
        .shadow-fantasy-card { box-shadow: 0 4px 32px 0 #a259ff22, 0 1.5px 8px 0 #00eaff22; }
        .shadow-fantasy-card-glow { box-shadow: 0 0 32px 8px #a259ff66, 0 2px 12px 0 #00eaff44; }
        .drop-shadow-fantasy { filter: drop-shadow(0 0 8px #a259ff88); }
        .animate-fantasy-glow { animation: fantasy-glow 2.5s infinite alternate; }
        .animate-fantasy-popin { animation: fantasy-popin 0.7s cubic-bezier(.68,-0.55,.27,1.55) both; }
        .animate-fantasy-fadein { animation: fantasy-fadein 1.2s ease both; }
        .animate-fantasy-badge { animation: fantasy-badge 1.5s infinite alternate; }
        .animate-fantasy-sparkle { animation: fantasy-sparkle 4s linear infinite; }
        .animate-fantasy-orb { animation: fantasy-orb 12s linear infinite alternate; }
        @keyframes fantasy-glow { 0% { box-shadow: 0 0 16px #a259ff44, 0 0 8px #00eaff44; } 100% { box-shadow: 0 0 32px #a259ff99, 0 0 16px #00eaff99; } }
        @keyframes fantasy-popin { 0% { opacity: 0; transform: scale(0.8) translateY(30px); } 100% { opacity: 1; transform: scale(1) translateY(0); } }
        @keyframes fantasy-fadein { 0% { opacity: 0; } 100% { opacity: 1; } }
        @keyframes fantasy-badge { 0% { filter: brightness(1); } 100% { filter: brightness(1.3) drop-shadow(0 0 8px #ff8e8e); } }
        @keyframes fantasy-sparkle { 0% { opacity: 0.7; transform: scale(1) translateY(0); } 50% { opacity: 1; transform: scale(1.3) translateY(-10px); } 100% { opacity: 0.7; transform: scale(1) translateY(0); } }
        @keyframes fantasy-orb { 0% { transform: translateY(0) scale(1); } 100% { transform: translateY(-40px) scale(1.1); } }
      `}</style>
    </div>
  );
};

export default Dashboard; 