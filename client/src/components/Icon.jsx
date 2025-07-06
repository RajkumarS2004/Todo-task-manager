import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

// Theme toggle component
function ThemeToggle({ dark, setDark }) {
  return (
    <button
      className={`ml-2 p-2 rounded-full border-2 shadow-lg transition-all duration-300
        ${dark
          ? 'bg-gradient-to-br from-[#232526]/80 to-[#bfa06a]/60 border-[#bfa06a] hover:scale-110'
          : 'bg-gradient-to-br from-[#fffbe6]/80 to-[#f1c27d]/60 border-[#f1c27d] hover:scale-110'
        }`}
      aria-label="Theme toggle"
      title={dark ? "Switch to Light" : "Switch to Dark"}
      onClick={() => setDark(d => !d)}
    >
      {dark ? (
        <svg className="w-5 h-5 text-[#bfa06a] drop-shadow-glow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" />
        </svg>
      ) : (
        <svg className="w-5 h-5 text-[#f1c27d] drop-shadow-glow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
      )}
    </button>
  );
}

// Navigation links
const navLinks = [
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'Tasks', href: '/dashboard/tasks' },
  { name: 'Analytics', href: '/dashboard/analytics' },
  { name: 'Settings', href: '/dashboard/settings' }
];

const TopNavBar = () => {
  const location = useLocation();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [dark]);

  const handleLogout = async () => {
    await logout();
    setMenuOpen(false);
    navigate('/login');
  };

  return (
    <header className={`
      w-full z-50 fixed top-0 left-0
      bg-gradient-to-br ${dark ? 'from-[#232526] via-[#232526] to-[#bfa06a]/30' : 'from-[#f8fafc] via-[#f1c27d]/40 to-[#e2e8f0]'}
      border-b ${dark ? 'border-[#bfa06a]/40' : 'border-[#f1c27d]/40'}
      shadow-xl
      backdrop-blur-2xl
      bg-opacity-80
      transition-all duration-700
      glass-navbar
      ring-1 ring-inset ${dark ? 'ring-[#bfa06a]/10' : 'ring-[#f1c27d]/10'}
    `}>
      <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between h-20 relative">
        {/* Logo */}
        <Link to="/dashboard" className="flex items-center gap-3">
          <div className={`
            h-12 w-12 bg-gradient-to-br
            ${dark
              ? 'from-[#bfa06a] via-[#232526] to-[#f1c27d]'
              : 'from-[#f1c27d] via-[#e2b07a] to-[#bfa06a]'}
            rounded-3xl flex items-center justify-center shadow-2xl border-2
            ${dark ? 'border-[#bfa06a]/70' : 'border-[#f1c27d]/70'}
            ring-2 ring-white/10
            hover:scale-110 transition-transform duration-300
          `}>
            <svg className="h-7 w-7 text-white drop-shadow-lg" fill="none" stroke={dark ? "#bfa06a" : "#f1c27d"} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
          </div>
          <span className={`
            text-2xl font-extrabold bg-gradient-to-r
            ${dark
              ? 'from-[#bfa06a] via-[#f1c27d] to-[#e2b07a]'
              : 'from-[#bfa06a] via-[#f1c27d] to-[#e2b07a]'}
            bg-clip-text text-transparent drop-shadow-xl tracking-tight
            select-none
          `}>
            TaskFlow
          </span>
        </Link>
        {/* Nav Links */}
        <nav className="flex-1 flex justify-center items-center gap-2 md:gap-6">
          {navLinks.map(link => (
            <Link
              key={link.name}
              to={link.href}
              className={`
                px-6 py-2 rounded-2xl font-semibold text-base
                border-2 border-transparent
                shadow-sm
                hover:border-[#f1c27d]/60 hover:bg-[#f1c27d]/10 hover:text-[#bfa06a]
                ${location.pathname.startsWith(link.href)
                  ? 'bg-[#f1c27d]/30 text-[#bfa06a] border-[#f1c27d] shadow-lg'
                  : dark
                    ? 'text-[#e2e8f0] hover:text-[#f1c27d]'
                    : 'text-[#6b7280]'}
                transition-all duration-300
                backdrop-blur-md
              `}
              style={{ letterSpacing: '0.02em' }}
            >
              {link.name}
            </Link>
          ))}
        </nav>
        {/* User Menu & Theme Toggle */}
        <div className="flex items-center gap-3 relative z-50">
          {/* User avatar and menu */}
          {user && (
            <div className="relative" ref={menuRef}>
              <button
                className={`
                  h-11 w-11 rounded-full bg-gradient-to-br
                  ${dark
                    ? 'from-[#bfa06a] to-[#232526]'
                    : 'from-[#f1c27d] to-[#bfa06a]'}
                  flex items-center justify-center shadow-xl border-2
                  ${dark ? 'border-[#bfa06a]/70' : 'border-[#f1c27d]/70'}
                  focus:outline-none focus:ring-2
                  ${dark ? 'focus:ring-[#bfa06a]' : 'focus:ring-[#f1c27d]'}
                  hover:scale-110 transition-transform duration-300
                `}
                onClick={() => setMenuOpen((open) => !open)}
                aria-label="User menu"
              >
                {user.avatar ? (
                  <img src={user.avatar} alt={user.name} className="h-11 w-11 rounded-full object-cover" />
                ) : (
                  <span className="text-lg font-bold text-white drop-shadow-md">
                    {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </span>
                )}
              </button>
              {menuOpen && (
                <div className={`
                  fixed md:absolute right-4 md:right-0 top-20 md:top-auto mt-0 md:mt-2 w-64
                  bg-white/90 dark:bg-[#232526]/95 border-2
                  ${dark ? 'border-[#bfa06a]/70' : 'border-[#f1c27d]/70'}
                  rounded-3xl shadow-2xl py-2 z-[9999] animate-float
                  backdrop-blur-2xl glass-dropdown
                  ring-2 ring-[#f1c27d]/10 dark:ring-[#bfa06a]/10
                `}>
                  <div className="px-4 py-2 border-b border-[#f1c27d]/30 dark:border-[#bfa06a]/30">
                    <div className="font-semibold text-[#bfa06a] dark:text-[#f1c27d]">{user.name}</div>
                    <div className="text-xs text-[#a3a3a3]">{user.email}</div>
                  </div>
                  <Link
                    to="/dashboard/profile"
                    className="block px-4 py-3 text-sm text-[#6b7280] dark:text-[#e2e8f0] hover:bg-[#f1c27d]/10 hover:text-[#bfa06a] dark:hover:text-[#f1c27d] transition-colors"
                    onClick={() => setMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <Link
                    to="/dashboard/settings"
                    className="block px-4 py-3 text-sm text-[#6b7280] dark:text-[#e2e8f0] hover:bg-[#f1c27d]/10 hover:text-[#bfa06a] dark:hover:text-[#f1c27d] transition-colors"
                    onClick={() => setMenuOpen(false)}
                  >
                    Settings
                  </Link>
                  <button onClick={handleLogout} className="block w-full text-left px-4 py-3 text-sm text-[#c0392b] hover:bg-[#f1c27d]/10 transition-colors" >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
          <ThemeToggle dark={dark} setDark={setDark} />
        </div>
      </div>
    </header>
  );
};

export default TopNavBar; 