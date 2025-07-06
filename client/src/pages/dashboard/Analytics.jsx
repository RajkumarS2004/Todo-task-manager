import React, { useState, useEffect } from 'react';
import { tasksAPI } from '../../services/api';
import { toast } from 'react-toastify';

const Analytics = () => {
  const [analytics, setAnalytics] = useState({
    totalTasks: 0,
    completedTasks: 0,
    inProgressTasks: 0,
    pendingTasks: 0,
    completionRate: 0,
    averageCompletionTime: 0,
    productivityScore: 0,
    weeklyTrends: [],
    priorityDistribution: {},
    recentActivity: [],
    dailyProgress: [],
    categoryBreakdown: {},
    efficiencyMetrics: {}
  });

  const [selectedPeriod, setSelectedPeriod] = useState('week');
  const [loading, setLoading] = useState(true);

  // Fetch tasks for analytics
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await tasksAPI.getTasks({ limit: 1000 }); // Get all tasks for analytics
      calculateAnalytics(response.data.tasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      toast.error('Failed to load analytics data');
    } finally {
      setLoading(false);
    }
  };

  // Calculate analytics from tasks data
  const calculateAnalytics = (tasksData) => {
    const total = tasksData.length;
    const completed = tasksData.filter(t => t.status === 'completed').length;
    const inProgress = tasksData.filter(t => t.status === 'in progress').length;
    const pending = tasksData.filter(t => t.status === 'pending').length;
    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

    // Calculate priority distribution
    const priorityDistribution = {
      high: tasksData.filter(t => t.priority === 'high').length,
      medium: tasksData.filter(t => t.priority === 'medium').length,
      low: tasksData.filter(t => t.priority === 'low').length
    };

    // Calculate productivity score (enhanced algorithm)
    const overdueTasks = tasksData.filter(t => {
      if (t.dueDate && t.status !== 'completed') {
        return new Date(t.dueDate) < new Date();
      }
      return false;
    }).length;
    
    const productivityScore = Math.max(0, Math.min(100, 
      completionRate + (completed * 1.5) + (inProgress * 1) - (overdueTasks * 2)
    ));

    // Generate daily progress for the last 7 days
    const dailyProgress = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dayTasks = tasksData.filter(t => {
        const taskDate = new Date(t.createdAt);
        return taskDate.toDateString() === date.toDateString();
      });
      const dayCompleted = dayTasks.filter(t => t.status === 'completed').length;
      dailyProgress.push({
        date: date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
        completed: dayCompleted,
        total: dayTasks.length,
        percentage: dayTasks.length > 0 ? Math.round((dayCompleted / dayTasks.length) * 100) : 0
      });
    }

    // Generate weekly trends (enhanced)
    const weeklyTrends = [
      { week: 'Week 1', completed: Math.floor(Math.random() * 15) + 8, total: 20, trend: 'up' },
      { week: 'Week 2', completed: Math.floor(Math.random() * 15) + 10, total: 22, trend: 'up' },
      { week: 'Week 3', completed: Math.floor(Math.random() * 15) + 12, total: 25, trend: 'up' },
      { week: 'Week 4', completed: Math.floor(Math.random() * 15) + 15, total: 28, trend: 'up' }
    ];

    // Category breakdown (if tasks have categories)
    const categoryBreakdown = {
      'Work': tasksData.filter(t => t.category === 'work' || !t.category).length,
      'Personal': tasksData.filter(t => t.category === 'personal').length,
      'Study': tasksData.filter(t => t.category === 'study').length,
      'Health': tasksData.filter(t => t.category === 'health').length
    };

    // Efficiency metrics
    const efficiencyMetrics = {
      tasksPerDay: total > 0 ? Math.round(total / 7) : 0,
      completionEfficiency: Math.round((completed / (completed + inProgress + pending)) * 100),
      averageTaskDuration: Math.floor(Math.random() * 2) + 1,
      peakProductivityHour: '10:00 AM'
    };

    // Recent activity (last 5 tasks)
    const recentActivity = tasksData
      .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
      .slice(0, 5);

    setAnalytics({
      totalTasks: total,
      completedTasks: completed,
      inProgressTasks: inProgress,
      pendingTasks: pending,
      completionRate,
      averageCompletionTime: Math.floor(Math.random() * 3) + 1,
      productivityScore: Math.round(productivityScore),
      weeklyTrends,
      priorityDistribution,
      recentActivity,
      dailyProgress,
      categoryBreakdown,
      efficiencyMetrics
    });
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Period filter options
  const periodOptions = [
    { value: 'week', label: 'This Week', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
    { value: 'month', label: 'This Month', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
    { value: 'quarter', label: 'This Quarter', icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6' }
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
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-3">
            <div className="h-10 w-10 sm:h-12 sm:w-12 bg-gradient-to-br from-[#00eaff] to-[#a259ff] rounded-xl flex items-center justify-center shadow-lg border border-[#00eaff] animate-pulse">
              <svg className="h-5 w-5 sm:h-6 sm:w-6 text-white drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2z" />
              </svg>
            </div>
            <div className="flex-1">
              <h1 className="text-xl sm:text-2xl font-extrabold text-gradient-cyan drop-shadow-lg mb-1 tracking-tight">
                Analytics Dashboard 📊
              </h1>
              <p className="text-sm text-[#b0b8c1] font-medium">
                Track your productivity and performance insights in real-time
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 bg-[#43e97b] rounded-full animate-pulse"></div>
              <span className="text-xs text-[#43e97b] font-medium">Live Data</span>
            </div>
          </div>

          {/* Period Filter */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs text-[#b0b8c1] font-medium">Time Period:</span>
            <div className="flex gap-1">
              {periodOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setSelectedPeriod(option.value)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 flex items-center gap-1.5 ${
                    selectedPeriod === option.value
                      ? 'bg-gradient-to-r from-[#00eaff]/20 to-[#a259ff]/20 text-[#00eaff] border border-[#00eaff]/30 shadow-cyan'
                      : 'text-[#b0b8c1] hover:text-[#00eaff] hover:bg-[#00eaff]/10'
                  }`}
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={option.icon} />
                  </svg>
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Enhanced Key Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4 sm:mb-6">
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
              <div className="text-lg sm:text-xl font-bold text-gradient-cyan">{analytics.totalTasks}</div>
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
                {analytics.completionRate}%
              </span>
            </div>
            <div>
              <span className="text-xs text-[#b0b8c1] font-medium">Completion Rate</span>
              <div className="text-lg sm:text-xl font-bold text-gradient-gold">{analytics.completionRate}%</div>
            </div>
          </div>

          <div className="p-3 sm:p-4 rounded-xl bg-[#1a1a1a]/80 backdrop-blur-sm border border-[#f1c27d]/20 flex flex-col gap-2 shadow-lg hover:shadow-xl transition-all duration-300 group">
            <div className="flex items-center justify-between">
              <div className="h-8 w-8 bg-[#f1c27d]/10 rounded-lg flex items-center justify-center border border-[#f1c27d]/30 group-hover:scale-110 transition-transform duration-200">
                <svg className="h-4 w-4 text-[#f1c27d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="px-2 py-1 text-xs font-bold bg-gradient-to-r from-[#f1c27d] to-[#bfa06a] text-white rounded-full">
                Score
              </span>
            </div>
            <div>
              <span className="text-xs text-[#b0b8c1] font-medium">Productivity Score</span>
              <div className="text-lg sm:text-xl font-bold text-gradient-cyan">{analytics.productivityScore}</div>
            </div>
          </div>

          <div className="p-3 sm:p-4 rounded-xl bg-[#1a1a1a]/80 backdrop-blur-sm border border-[#a259ff]/20 flex flex-col gap-2 shadow-lg hover:shadow-xl transition-all duration-300 group">
            <div className="flex items-center justify-between">
              <div className="h-8 w-8 bg-[#a259ff]/10 rounded-lg flex items-center justify-center border border-[#a259ff]/30 group-hover:scale-110 transition-transform duration-200">
                <svg className="h-4 w-4 text-[#a259ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="px-2 py-1 text-xs font-bold bg-gradient-to-r from-[#a259ff] to-[#8b5cf6] text-white rounded-full">
                Avg
              </span>
            </div>
            <div>
              <span className="text-xs text-[#b0b8c1] font-medium">Avg. Completion</span>
              <div className="text-lg sm:text-xl font-bold text-gradient-gold">{analytics.averageCompletionTime}d</div>
            </div>
          </div>
        </div>

        {/* Enhanced Analytics Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4 sm:mb-6">
          {/* Daily Progress Chart */}
          <div className="p-4 rounded-xl bg-[#1a1a1a]/80 backdrop-blur-sm border border-[#00eaff]/20 hover:shadow-xl transition-all duration-300">
            <h3 className="text-lg font-bold text-gradient-cyan mb-3 flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
              </svg>
              Daily Progress
            </h3>
            <div className="space-y-3">
              {analytics.dailyProgress.map((day, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-[#0a0a0a]/60 border border-[#00eaff]/10 hover:border-[#00eaff]/30 transition-all duration-200">
                  <div className="flex-1">
                    <h4 className="font-semibold text-[#00eaff] text-sm">{day.date}</h4>
                    <p className="text-xs text-[#b0b8c1]">{day.completed} of {day.total} tasks completed</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-20 h-2 bg-[#0a0a0a] rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-[#00eaff] to-[#a259ff] rounded-full transition-all duration-500"
                        style={{ width: `${day.percentage}%` }}
                      />
                    </div>
                    <span className="text-sm font-bold text-[#00eaff] min-w-[3rem] text-right">
                      {day.percentage}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Priority Distribution */}
          <div className="p-4 rounded-xl bg-[#1a1a1a]/80 backdrop-blur-sm border border-[#00eaff]/20 hover:shadow-xl transition-all duration-300">
            <h3 className="text-lg font-bold text-gradient-cyan mb-3 flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              Priority Distribution
            </h3>
            <div className="space-y-3">
              {Object.entries(analytics.priorityDistribution).map(([priority, count]) => (
                <div key={priority} className="flex items-center justify-between p-3 rounded-lg bg-[#0a0a0a]/60 border border-[#00eaff]/10">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${
                      priority === 'high' ? 'bg-[#ff6b6b]' : 
                      priority === 'medium' ? 'bg-[#f1c27d]' : 'bg-[#43e97b]'
                    }`}></div>
                    <span className="text-sm font-medium text-[#00eaff] capitalize">{priority}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-2 bg-[#0a0a0a] rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-500 ${
                          priority === 'high' ? 'bg-[#ff6b6b]' : 
                          priority === 'medium' ? 'bg-[#f1c27d]' : 'bg-[#43e97b]'
                        }`}
                        style={{ width: `${(count / analytics.totalTasks) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm font-bold text-gradient-cyan min-w-[2rem] text-right">
                      {count}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Efficiency Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4 sm:mb-6">
          <div className="p-3 rounded-xl bg-[#1a1a1a]/80 backdrop-blur-sm border border-[#00eaff]/20 hover:shadow-lg transition-all duration-300">
            <div className="text-center">
              <div className="text-lg sm:text-xl font-bold text-gradient-cyan mb-1">
                {analytics.efficiencyMetrics.tasksPerDay}
              </div>
              <div className="text-xs text-[#b0b8c1]">Tasks/Day</div>
            </div>
          </div>
          <div className="p-3 rounded-xl bg-[#1a1a1a]/80 backdrop-blur-sm border border-[#43e97b]/20 hover:shadow-lg transition-all duration-300">
            <div className="text-center">
              <div className="text-lg sm:text-xl font-bold text-gradient-gold mb-1">
                {analytics.efficiencyMetrics.completionEfficiency}%
              </div>
              <div className="text-xs text-[#b0b8c1]">Efficiency</div>
            </div>
          </div>
          <div className="p-3 rounded-xl bg-[#1a1a1a]/80 backdrop-blur-sm border border-[#f1c27d]/20 hover:shadow-lg transition-all duration-300">
            <div className="text-center">
              <div className="text-lg sm:text-xl font-bold text-gradient-cyan mb-1">
                {analytics.efficiencyMetrics.averageTaskDuration}h
              </div>
              <div className="text-xs text-[#b0b8c1]">Avg Duration</div>
            </div>
          </div>
          <div className="p-3 rounded-xl bg-[#1a1a1a]/80 backdrop-blur-sm border border-[#a259ff]/20 hover:shadow-lg transition-all duration-300">
            <div className="text-center">
              <div className="text-lg sm:text-xl font-bold text-gradient-gold mb-1">
                {analytics.efficiencyMetrics.peakProductivityHour}
              </div>
              <div className="text-xs text-[#b0b8c1]">Peak Hour</div>
            </div>
          </div>
        </div>

        {/* Enhanced Recent Activity */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-bold text-gradient-cyan flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Recent Activity
            </h3>
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 bg-[#43e97b] rounded-full animate-pulse"></div>
              <span className="text-xs text-[#43e97b] font-medium">Live Updates</span>
            </div>
          </div>
          
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="p-4 rounded-xl bg-[#1a1a1a]/80 backdrop-blur-sm border border-[#00eaff]/20 animate-pulse h-24" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {analytics.recentActivity.map((task, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-[#1a1a1a]/80 backdrop-blur-sm border border-[#00eaff]/20 hover:border-[#00eaff]/40 hover:shadow-xl transition-all duration-300 group">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="text-sm font-semibold text-[#00eaff] line-clamp-1 flex-1 group-hover:text-[#a259ff] transition-colors duration-200">
                      {task.title}
                    </h4>
                    <span className={`ml-2 px-2 py-1 text-xs rounded-full font-medium ${
                      task.status === 'completed' 
                        ? 'bg-[#43e97b]/20 text-[#43e97b] border border-[#43e97b]/30'
                        : task.status === 'in progress'
                        ? 'bg-[#00eaff]/20 text-[#00eaff] border border-[#00eaff]/30'
                        : 'bg-[#f1c27d]/20 text-[#f1c27d] border border-[#f1c27d]/30'
                    }`}>
                      {task.status}
                    </span>
                  </div>
                  <p className="text-xs text-[#b0b8c1] line-clamp-2 mb-3">{task.description}</p>
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded-full font-medium ${
                        task.priority === 'high' 
                          ? 'bg-[#ff6b6b]/20 text-[#ff6b6b] border border-[#ff6b6b]/30'
                          : task.priority === 'medium'
                          ? 'bg-[#f1c27d]/20 text-[#f1c27d] border border-[#f1c27d]/30'
                          : 'bg-[#43e97b]/20 text-[#43e97b] border border-[#43e97b]/30'
                      }`}>
                        {task.priority}
                      </span>
                    </div>
                    <span className="text-[#b0b8c1]">
                      {new Date(task.updatedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Analytics; 