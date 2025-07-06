import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useSocket } from '../hooks/useSocket';

// Dark mode toggle component
function DarkModeToggle() {
  return (
    <button
      className="p-1 rounded-md glass-dark hover:bg-[#00eaff]/10 transition-all duration-200 group"
      aria-label="Dark mode"
    >
      <svg className="w-3 h-3 text-[#f1c27d] group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
      </svg>
    </button>
  );
}

const DashboardNavbar = ({ navigation, onNavigate, onClose, currentPath }) => {
  const { user, logout } = useAuth();
  const { isConnected } = useSocket();
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (href) => {
    const path = currentPath || location.pathname;
    return path === href || 
           (href !== '/dashboard' && path.startsWith(href));
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/signin');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleNavigation = (href) => {
    if (onNavigate) {
      onNavigate(href);
    } else {
      navigate(href);
    }
    if (onClose) {
      onClose();
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#232526]/95 backdrop-blur-xl border-r border-[#00eaff]/20 shadow-xl">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-3 border-b border-[#00eaff]/20">
          <div className="flex items-center space-x-2">
            <div className="h-6 w-6 bg-gradient-cyan rounded-md flex items-center justify-center shadow-cyan border border-[#00eaff]">
              <svg className="h-4 w-4 text-white drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
            </div>
            <div>
              <h1 className="text-base font-bold text-gradient-cyan">TaskFlow</h1>
              <p className="text-xs text-[#b0b8c1]">Pro</p>
            </div>
          </div>
          <DarkModeToggle />
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-2 py-3 space-y-1">
          {navigation.map((item) => (
            <button
              key={item.name}
              onClick={() => handleNavigation(item.href)}
              className={`group relative flex items-center w-full px-2 py-2 text-xs font-medium rounded-md transition-all duration-300 ${
                isActive(item.href)
                  ? 'bg-gradient-to-r from-[#00eaff]/20 to-[#a259ff]/20 text-[#00eaff] border border-[#00eaff]/30 shadow-cyan'
                  : 'text-[#b0b8c1] hover:text-[#00eaff] hover:bg-[#00eaff]/10 hover:shadow-md'
              }`}
            >
              <svg
                className={`mr-2 h-3 w-3 transition-colors duration-200 ${
                  isActive(item.href)
                    ? 'text-[#00eaff]'
                    : 'text-[#b0b8c1] group-hover:text-[#00eaff]'
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
              </svg>
              {item.name}
              {isActive(item.href) && (
                <div className="absolute right-1 h-1 w-1 bg-[#00eaff] rounded-full"></div>
              )}
            </button>
          ))}
        </nav>

        {/* User Section */}
        <div className="p-2 border-t border-[#00eaff]/20">
          <div className="flex items-center space-x-2 mb-2">
            <div className="h-6 w-6 bg-gradient-cyan rounded-full flex items-center justify-center shadow-cyan border border-[#00eaff]">
              <span className="text-white font-semibold text-xs">
                {user?.name?.charAt(0)?.toUpperCase() || 'U'}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-[#00eaff] truncate">
                {user?.name || 'User'}
              </p>
              <p className="text-xs text-[#b0b8c1] truncate">
                {user?.email || 'user@example.com'}
              </p>
            </div>
          </div>

          {/* Connection Status */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <div className={`w-1 h-1 rounded-full mr-1.5 ${isConnected ? 'bg-[#43e97b] animate-pulse' : 'bg-[#ff5858]'}`}></div>
              <span className="text-xs text-[#b0b8c1]">
                {isConnected ? 'Online' : 'Offline'}
              </span>
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-2 py-1.5 text-xs rounded-md text-[#ff5858] hover:text-[#ff5858] hover:bg-[#ff5858]/10 transition-colors duration-200"
          >
            <svg className="mr-2 h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardNavbar; 