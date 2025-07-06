import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const TopNavBar = ({ navLinks }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const userMenuRef = useRef(null);

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <header className="sticky top-0 w-full z-50 bg-[#0a0a0a]/95 backdrop-blur-md border-b border-[#00eaff]/20 shadow-lg">
      <div className="flex items-center justify-between h-14 sm:h-16 px-4 max-w-7xl mx-auto">
        {/* Left: Logo */}
        <Link
          to="/dashboard"
          className="flex items-center space-x-3 group"
          aria-label="Go to dashboard"
        >
          <div className="h-9 w-9 sm:h-10 sm:w-10 bg-gradient-to-br from-[#00eaff] to-[#a259ff] rounded-xl flex items-center justify-center border border-[#00eaff] shadow-lg group-hover:scale-105 transition-transform duration-200">
            <svg
              className="h-5 w-5 text-white drop-shadow-lg"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
              />
            </svg>
          </div>
          <div className="hidden sm:block">
            <span className="text-xl font-bold bg-gradient-to-r from-[#00eaff] to-[#f1c27d] bg-clip-text text-transparent">
              TaskFlow
            </span>
            <div className="text-xs text-[#b0b8c1] font-medium">Productivity Hub</div>
          </div>
        </Link>

        {/* Center: Navigation - Desktop */}
        <nav
          className="hidden md:flex flex-1 justify-center items-center space-x-1"
          role="navigation"
          aria-label="Main navigation"
        >
          {navLinks.map((link) => {
            const isActive =
              location.pathname === link.href ||
              (link.href !== '/dashboard' &&
                location.pathname.startsWith(link.href));

            return (
              <Link
                key={link.name}
                to={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 group touch-manipulation relative ${
                  isActive
                    ? 'bg-gradient-to-r from-[#00eaff]/20 to-[#a259ff]/20 text-[#00eaff] border border-[#00eaff]/30 shadow-cyan'
                    : 'text-[#b0b8c1] hover:text-[#00eaff] hover:bg-[#00eaff]/10'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                {link.name}
                {isActive && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-[#00eaff] rounded-full"></div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right: User Section */}
        <div className="flex items-center space-x-3">
          {/* Live Status Indicator */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-[#43e97b]/10 border border-[#43e97b]/20 rounded-lg">
            <div className="h-2 w-2 bg-[#43e97b] rounded-full animate-pulse"></div>
            <span className="text-xs text-[#43e97b] font-medium">Live</span>
          </div>

          {/* Notifications */}
          <button
            className="relative p-2 text-[#b0b8c1] hover:text-[#00eaff] hover:bg-[#00eaff]/10 rounded-lg transition-all duration-200"
            aria-label="Notifications"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM10.5 3.75a6 6 0 00-6 6v3.75a6 6 0 01-6 6h12a6 6 0 01-6-6V9.75a6 6 0 00-6-6z" />
            </svg>
            <span className="absolute top-1 right-1 h-2 w-2 bg-[#ff6b6b] rounded-full"></span>
          </button>

          {/* User Avatar & Menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-2 p-1 rounded-lg hover:bg-[#00eaff]/10 transition-all duration-200"
              aria-label="User menu"
            >
              <div className="h-9 w-9 sm:h-10 sm:w-10 bg-gradient-to-br from-[#00eaff] to-[#f1c27d] rounded-full flex items-center justify-center text-[#0a0a0a] font-bold text-sm border border-[#00eaff] shadow-lg">
                {user?.name?.charAt(0)?.toUpperCase() || 'U'}
              </div>
              <svg className="h-4 w-4 text-[#b0b8c1]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* User Dropdown Menu */}
            {showUserMenu && (
              <div ref={userMenuRef} className="absolute right-0 mt-2 w-48 bg-[#1a1a1a]/95 backdrop-blur-md border border-[#00eaff]/20 rounded-xl shadow-xl py-2 z-50">
                <div className="px-4 py-2 border-b border-[#00eaff]/10">
                  <div className="text-sm font-medium text-[#00eaff]">{user?.name}</div>
                  <div className="text-xs text-[#b0b8c1]">{user?.email}</div>
                </div>
                <Link
                  to="/dashboard/profile"
                  className="block px-4 py-2 text-sm text-[#b0b8c1] hover:text-[#00eaff] hover:bg-[#00eaff]/10 transition-all duration-200"
                  onClick={() => setShowUserMenu(false)}
                >
                  Profile Settings
                </Link>
                <Link
                  to="/dashboard/settings"
                  className="block px-4 py-2 text-sm text-[#b0b8c1] hover:text-[#00eaff] hover:bg-[#00eaff]/10 transition-all duration-200"
                  onClick={() => setShowUserMenu(false)}
                >
                  App Settings
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-[#ff6b6b] hover:text-white hover:bg-[#ff6b6b]/10 transition-all duration-200"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="md:hidden p-2 text-[#b0b8c1] hover:text-[#00eaff] hover:bg-[#00eaff]/10 rounded-lg transition-all duration-200"
            aria-label="Mobile menu"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {showMobileMenu && (
        <div className="md:hidden bg-[#1a1a1a]/95 backdrop-blur-md border-t border-[#00eaff]/20">
          <nav className="px-4 py-2 space-y-1">
            {navLinks.map((link) => {
              const isActive =
                location.pathname === link.href ||
                (link.href !== '/dashboard' &&
                  location.pathname.startsWith(link.href));

              return (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-[#00eaff]/20 to-[#a259ff]/20 text-[#00eaff] border border-[#00eaff]/30'
                      : 'text-[#b0b8c1] hover:text-[#00eaff] hover:bg-[#00eaff]/10'
                  }`}
                  onClick={() => setShowMobileMenu(false)}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
};

export default TopNavBar;
