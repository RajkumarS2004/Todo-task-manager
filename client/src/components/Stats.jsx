import React from 'react';

const Stats = ({ tasks = [] }) => {
  const stats = [
    {
      name: 'Total Tasks',
      value: tasks.length,
      icon: 'M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z',
      color: 'blue',
      gradient: 'from-blue-500 to-indigo-600',
      bgGradient: 'from-blue-100 to-indigo-100',
      darkBgGradient: 'from-blue-900 to-indigo-900',
      textColor: 'text-blue-600',
      darkTextColor: 'dark:text-blue-300'
    },
    {
      name: 'Completed',
      value: tasks.filter(t => t.status === 'completed').length,
      icon: 'M5 13l4 4L19 7',
      color: 'green',
      gradient: 'from-green-500 to-emerald-600',
      bgGradient: 'from-green-100 to-emerald-100',
      darkBgGradient: 'from-green-900 to-emerald-900',
      textColor: 'text-green-600',
      darkTextColor: 'dark:text-green-300'
    },
    {
      name: 'In Progress',
      value: tasks.filter(t => t.status === 'in progress').length,
      icon: 'M12 8v4l3 3',
      color: 'yellow',
      gradient: 'from-yellow-500 to-orange-600',
      bgGradient: 'from-yellow-100 to-orange-100',
      darkBgGradient: 'from-yellow-900 to-orange-900',
      textColor: 'text-yellow-600',
      darkTextColor: 'dark:text-yellow-300'
    },
    {
      name: 'Pending',
      value: tasks.filter(t => t.status === 'pending').length,
      icon: 'M6 18L18 6M6 6l12 12',
      color: 'red',
      gradient: 'from-red-500 to-pink-600',
      bgGradient: 'from-red-100 to-pink-100',
      darkBgGradient: 'from-red-900 to-pink-900',
      textColor: 'text-red-600',
      darkTextColor: 'dark:text-red-300'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div
          key={stat.name}
          className="group relative p-6 rounded-2xl bg-white/80 dark:bg-gray-900/80 shadow-lg backdrop-blur-md border border-white/30 dark:border-gray-800 transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-xl"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          {/* Background decoration */}
          <div className={`absolute inset-0 bg-gradient-to-br ${stat.bgGradient} dark:${stat.darkBgGradient} opacity-5 rounded-2xl`}></div>
          
          <div className="relative flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center mb-2">
                <div className={`h-10 w-10 bg-gradient-to-br ${stat.bgGradient} dark:${stat.darkBgGradient} rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300`}>
                  <svg 
                    className={`h-5 w-5 ${stat.textColor} ${stat.darkTextColor}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={stat.icon} />
                  </svg>
                </div>
              </div>
              
              <div className="space-y-1">
                <p className="text-2xl font-bold text-gray-900 dark:text-white group-hover:scale-105 transition-transform duration-200">
                  {stat.value}
                </p>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  {stat.name}
                </p>
              </div>
            </div>

            {/* Progress indicator for completed tasks */}
            {stat.name === 'Completed' && tasks.length > 0 && (
              <div className="flex flex-col items-end space-y-1">
                <div className="text-xs font-medium text-gray-500 dark:text-gray-400">
                  {Math.round((stat.value / tasks.length) * 100)}%
                </div>
                <div className="w-16 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className={`h-full bg-gradient-to-r ${stat.gradient} rounded-full transition-all duration-500`}
                    style={{ width: `${(stat.value / tasks.length) * 100}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>

          {/* Hover effect overlay */}
          <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`}></div>
        </div>
      ))}
    </div>
  );
};

export default Stats; 