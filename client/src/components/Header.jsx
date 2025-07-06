import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useSocket } from '../hooks/useSocket';

// Dark mode toggle component
function DarkModeToggle() {
  const [isDark, setIsDark] = useState(() =>
    window.matchMedia('(prefers-color-scheme: dark)').matches || document.documentElement.classList.contains('dark')
  );

  const toggleDarkMode = () => {
    setIsDark(!isDark);
    if (!isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <button
      onClick={toggleDarkMode}
      className="p-2 rounded-xl glass-dark hover:bg-[#00eaff]/10 transition-all duration-200 group"
      aria-label="Toggle dark mode"
    >
      {isDark ? (
        <svg className="w-5 h-5 text-[#f1c27d] group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ) : (
        <svg className="w-5 h-5 text-[#b0b8c1] group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      )}
    </button>
  );
}

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { isConnected } = useSocket();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/signin');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const navLinks = [
    { name: 'Home', href: '/', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { name: 'About', href: '/about', icon: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
  ];

  return (
    <header className="w-full z-50 bg-[#232526]/95 backdrop-blur-xl border-b border-[#00eaff]/20 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="h-10 w-10 bg-gradient-cyan rounded-xl flex items-center justify-center shadow-cyan border border-[#00eaff] group-hover:scale-105 transition-transform duration-200">
              <svg className="h-6 w-6 text-white drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
            </div>
            <span className="text-xl font-bold text-gradient-cyan">
              TaskFlow
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.href;
              return (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 group ${
                    isActive
                      ? 'bg-gradient-to-r from-[#00eaff]/20 to-[#a259ff]/20 text-[#00eaff] border border-[#00eaff]/30 shadow-cyan'
                      : 'text-[#b0b8c1] hover:text-[#00eaff] hover:bg-[#00eaff]/10'
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={link.icon} />
                  </svg>
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right side - Connection status, Dark mode, User menu */}
          <div className="flex items-center space-x-3">
            {/* Connection Status */}
            <div className="flex items-center space-x-2 px-3 py-1.5 rounded-lg glass-dark border border-[#00eaff]/20">
              <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-[#43e97b] animate-pulse' : 'bg-[#ff5858]'}`}></div>
              <span className="text-xs text-[#b0b8c1] hidden sm:block">
                {isConnected ? 'Connected' : 'Disconnected'}
              </span>
            </div>

            {/* Dark Mode Toggle */}
            <DarkModeToggle />

            {/* User Menu */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 p-2 rounded-lg glass-dark hover:bg-[#00eaff]/10 transition-all duration-200 group"
                >
                  <div className="h-8 w-8 bg-gradient-cyan rounded-lg flex items-center justify-center text-white font-semibold text-sm group-hover:scale-105 transition-transform border border-[#00eaff]">
                    {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                  </div>
                  <div className="hidden sm:block text-left">
                    <p className="text-sm font-medium text-[#00eaff]">{user?.name || 'User'}</p>
                    <p className="text-xs text-[#b0b8c1]">{user?.email}</p>
                  </div>
                  <svg className="w-4 h-4 text-[#b0b8c1] group-hover:text-[#00eaff] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 card border border-[#00eaff]/30 rounded-xl shadow-cyan py-2 z-50">
                    <div className="px-4 py-2 border-b border-[#00eaff]/20">
                      <p className="text-sm font-medium text-[#00eaff]">{user?.name}</p>
                      <p className="text-xs text-[#b0b8c1]">{user?.email}</p>
                    </div>
                    
                    <Link
                      to="/dashboard"
                      className="flex items-center space-x-2 px-4 py-2 text-sm text-[#b0b8c1] hover:text-[#00eaff] hover:bg-[#00eaff]/10 transition-colors"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                      </svg>
                      <span>Dashboard</span>
                    </Link>
                    
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-2 px-4 py-2 text-sm text-[#ff5858] hover:text-[#ff5858] hover:bg-[#ff5858]/10 transition-colors w-full text-left"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/signin"
                  className="btn-secondary px-4 py-2 text-sm font-medium touch-manipulation"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="btn-primary px-4 py-2 text-sm font-medium touch-manipulation"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg glass-dark hover:bg-[#00eaff]/10 transition-all duration-200"
            >
              <svg className="w-6 h-6 text-[#b0b8c1]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`md:hidden border-t border-[#00eaff]/20 transition-all duration-300 ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-4 py-3 space-y-2">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.href;
            return (
              <Link
                key={link.name}
                to={link.href}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'text-[#00eaff] bg-[#00eaff]/10 border border-[#00eaff]/30'
                    : 'text-[#b0b8c1] hover:text-[#00eaff] hover:bg-[#00eaff]/10'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={link.icon} />
                </svg>
                <span className="font-medium">{link.name}</span>
              </Link>
            );
          })}
          
          {!user && (
            <div className="pt-4 border-t border-[#00eaff]/20 space-y-2">
              <Link
                to="/signin"
                className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-[#b0b8c1] hover:text-[#00eaff] hover:bg-[#00eaff]/10 rounded-lg transition-all duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium bg-gradient-cyan text-white rounded-lg hover:scale-105 transition-all duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header; 