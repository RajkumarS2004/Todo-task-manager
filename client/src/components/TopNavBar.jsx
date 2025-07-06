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
    <nav className="relative z-50 bg-[#232526]/80 backdrop-blur-xl shadow-cyan border-b border-[#00eaff]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16 lg:h-20">
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center group">
            <div className="flex-shrink-0">
              <div className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 bg-gradient-cyan rounded-lg sm:rounded-xl lg:rounded-2xl flex items-center justify-center shadow-cyan border border-[#00eaff] group-hover:scale-105 transition-transform duration-300">
                <svg className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
            </div>
            <div className="ml-2 sm:ml-3 lg:ml-4">
              <h1 className="text-lg sm:text-xl lg:text-2xl font-extrabold text-gradient-cyan tracking-tight">TaskFlow</h1>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-4 lg:space-x-6 xl:space-x-8">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.href || 
                (link.href !== '/dashboard' && location.pathname.startsWith(link.href));

              return (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`font-medium transition-colors text-sm lg:text-base ${
                    isActive
                      ? 'text-[#00eaff] font-semibold'
                      : 'text-[#b0b8c1] hover:text-[#00eaff]'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Desktop User Section */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Live Status Indicator */}
            <div className="flex items-center gap-2 px-3 py-1.5 bg-[#43e97b]/10 border border-[#43e97b]/20 rounded-lg">
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
                <div className="h-8 w-8 sm:h-9 sm:w-9 bg-gradient-cyan rounded-full flex items-center justify-center text-[#0a0a0a] font-bold text-sm border border-[#00eaff] shadow-cyan">
                  {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                </div>
                <svg className="h-4 w-4 text-[#b0b8c1]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* User Dropdown Menu */}
              {showUserMenu && (
                <div ref={userMenuRef} className="absolute right-0 mt-2 w-48 bg-[#232526]/95 backdrop-blur-xl border border-[#00eaff]/20 rounded-xl shadow-xl py-2 z-50">
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
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
                          <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="h-10 w-10 rounded-xl bg-gradient-cyan flex items-center justify-center shadow-cyan border border-[#00eaff] focus:outline-none focus:ring-2 focus:ring-[#00eaff] hover:scale-110 transition-transform duration-300 touch-manipulation"
                aria-label="Mobile menu"
              >
              <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="md:hidden py-4 border-t border-[#00eaff]/30">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.href || 
                  (link.href !== '/dashboard' && location.pathname.startsWith(link.href));

                return (
                  <Link
                    key={link.name}
                    to={link.href}
                    className={`font-medium transition-colors touch-manipulation py-2 ${
                      isActive
                        ? 'text-[#00eaff] font-semibold'
                        : 'text-[#b0b8c1] hover:text-[#00eaff]'
                    }`}
                    onClick={() => setShowMobileMenu(false)}
                  >
                    {link.name}
                  </Link>
                );
              })}
              
              {/* Mobile User Section */}
              <div className="pt-4 border-t border-[#00eaff]/20">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="h-8 w-8 bg-gradient-cyan rounded-full flex items-center justify-center text-[#0a0a0a] font-bold text-sm border border-[#00eaff] shadow-cyan">
                    {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-[#00eaff]">{user?.name}</div>
                    <div className="text-xs text-[#b0b8c1]">{user?.email}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-2 w-2 bg-[#43e97b] rounded-full animate-pulse"></div>
                  <span className="text-xs text-[#43e97b] font-medium">Live</span>
                </div>
                
                <button
                  onClick={handleLogout}
                  className="w-full text-left py-2 text-sm text-[#ff6b6b] hover:text-white hover:bg-[#ff6b6b]/10 transition-all duration-200"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default TopNavBar;
