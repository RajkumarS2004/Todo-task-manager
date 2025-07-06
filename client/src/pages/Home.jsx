import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Home = () => {
  const { user } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-dark">
      {/* Bokeh Background Effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/3 w-64 h-64 sm:w-96 sm:h-96 rounded-full bg-[#00eaff]/10 blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-1/4 w-48 h-48 sm:w-72 sm:h-72 rounded-full bg-[#a259ff]/10 blur-2xl animate-pulse delay-1000" />
        <div className="absolute top-10 right-10 w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-[#f1c27d]/15 blur-2xl animate-pulse delay-2000" />
        <div className="absolute top-1/2 left-1/4 w-48 h-48 sm:w-64 sm:h-64 rounded-full bg-[#00eaff]/8 blur-3xl animate-pulse delay-1500" />
      </div>

      {/* Navigation Header */}
      <nav className="relative z-10 bg-[#232526]/80 backdrop-blur-xl shadow-cyan border-b border-[#00eaff]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16 lg:h-20">
            {/* Logo */}
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 bg-gradient-cyan rounded-lg sm:rounded-xl lg:rounded-2xl flex items-center justify-center shadow-cyan border border-[#00eaff]">
                  <svg className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                </div>
              </div>
              <div className="ml-2 sm:ml-3 lg:ml-4">
                <h1 className="text-lg sm:text-xl lg:text-2xl font-extrabold text-gradient-cyan tracking-tight">TaskFlow</h1>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-4 lg:space-x-6 xl:space-x-8">
              <Link to="/" className="text-[#00eaff] font-semibold hover:text-[#a259ff] transition-colors text-sm lg:text-base">
                Home
              </Link>
              <Link to="/about" className="text-[#b0b8c1] hover:text-[#00eaff] font-medium transition-colors text-sm lg:text-base">
                About
              </Link>
              {user ? (
                <Link to="/dashboard" className="btn-primary px-3 lg:px-4 xl:px-6 py-2 lg:py-3 text-sm lg:text-base">
                  Dashboard
                </Link>
              ) : (
                <div className="flex space-x-3 lg:space-x-4">
                  <Link to="/signin" className="text-[#b0b8c1] hover:text-[#00eaff] font-medium transition-colors text-sm lg:text-base">
                    Sign In
                  </Link>
                  <Link to="/signup" className="btn-primary px-3 lg:px-4 xl:px-6 py-2 lg:py-3 text-sm lg:text-base">
                    Sign Up
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
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
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-[#00eaff]/30">
              <div className="flex flex-col space-y-4">
                <Link 
                  to="/" 
                  className="text-[#00eaff] font-semibold hover:text-[#a259ff] transition-colors touch-manipulation py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link 
                  to="/about" 
                  className="text-[#b0b8c1] hover:text-[#00eaff] font-medium transition-colors touch-manipulation py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About
                </Link>
                {user ? (
                  <Link 
                    to="/dashboard" 
                    className="btn-primary px-6 py-3 text-base w-full text-center touch-manipulation"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                ) : (
                  <div className="flex flex-col space-y-3">
                    <Link 
                      to="/signin" 
                      className="text-[#b0b8c1] hover:text-[#00eaff] font-medium transition-colors touch-manipulation py-2"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Sign In
                    </Link>
                    <Link 
                      to="/signup" 
                      className="btn-primary px-6 py-3 text-base w-full text-center touch-manipulation"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 glass-dark rounded-b-2xl lg:rounded-b-3xl shadow-dark border-b border-[#00eaff]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-24">
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-extrabold text-[#b0b8c1] mb-4 lg:mb-6 tracking-tight drop-shadow leading-tight">
              Organize Your Life with
              <span className="text-gradient-cyan block sm:inline"> TaskFlow</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-[#b0b8c1] mb-6 sm:mb-8 lg:mb-10 max-w-3xl mx-auto font-light px-2 sm:px-4 leading-relaxed">
              A luxury task management experience for modern professionals. Stay organized, collaborate seamlessly, and elevate your productivity.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 lg:space-x-6 px-4">
              {user ? (
                <Link to="/dashboard" className="btn-primary px-6 sm:px-8 lg:px-10 py-3 lg:py-4 text-base sm:text-lg lg:text-xl font-bold touch-manipulation">
                  Go to Dashboard
                </Link>
              ) : (
                <>
                  <Link to="/signup" className="btn-primary px-6 sm:px-8 lg:px-10 py-3 lg:py-4 text-base sm:text-lg lg:text-xl font-bold touch-manipulation">
                    Get Started Free
                  </Link>
                  <Link to="/signin" className="btn-secondary px-6 sm:px-8 lg:px-10 py-3 lg:py-4 text-base sm:text-lg lg:text-xl font-bold touch-manipulation">
                    Sign In
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Features Preview */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-20">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-gradient-cyan mb-4 tracking-tight">
            Everything You Need to Stay Organized
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-[#b0b8c1] font-light px-2">
            Premium features designed for effortless, elegant task management
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
          <div className="text-center">
            <div className="w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-gradient-cyan rounded-xl lg:rounded-2xl flex items-center justify-center mx-auto mb-4 lg:mb-6 shadow-cyan border border-[#00eaff]">
              <svg className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gradient-cyan mb-2">Easy Task Management</h3>
            <p className="text-sm sm:text-base lg:text-base text-[#b0b8c1] font-light px-2">
              Create, edit, and organize tasks with a beautiful drag-and-drop interface
            </p>
          </div>

          <div className="text-center">
            <div className="w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-gradient-gold rounded-xl lg:rounded-2xl flex items-center justify-center mx-auto mb-4 lg:mb-6 shadow-gold border border-[#f1c27d]">
              <svg className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gradient-gold mb-2">Real-time Collaboration</h3>
            <p className="text-sm sm:text-base lg:text-base text-[#b0b8c1] font-light px-2">
              Share tasks with your team and see updates instantly
            </p>
          </div>

          <div className="text-center sm:col-span-2 lg:col-span-1">
            <div className="w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-gradient-cyan rounded-xl lg:rounded-2xl flex items-center justify-center mx-auto mb-4 lg:mb-6 shadow-cyan border border-[#00eaff]">
              <svg className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gradient-cyan mb-2">Smart Analytics</h3>
            <p className="text-sm sm:text-base lg:text-base text-[#b0b8c1] font-light px-2">
              Track your progress and productivity with elegant insights
            </p>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="relative z-10 bg-gradient-dark py-8 sm:py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-gradient-cyan mb-4 tracking-tight">
              How It Works
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-[#b0b8c1] font-light px-2">
              Get started in minutes with our simple 3-step process
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
            <div className="text-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-gradient-cyan text-white rounded-xl lg:rounded-2xl flex items-center justify-center mx-auto mb-4 lg:mb-6 font-bold text-lg sm:text-xl lg:text-2xl shadow-cyan border border-[#00eaff]">
                1
              </div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gradient-cyan mb-2">Sign Up</h3>
              <p className="text-sm sm:text-base lg:text-base text-[#b0b8c1] font-light px-2">
                Create your account using Google OAuth or email/password
              </p>
            </div>

            <div className="text-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-gradient-gold text-white rounded-xl lg:rounded-2xl flex items-center justify-center mx-auto mb-4 lg:mb-6 font-bold text-lg sm:text-xl lg:text-2xl shadow-gold border border-[#f1c27d]">
                2
              </div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gradient-gold mb-2">Create Tasks</h3>
              <p className="text-sm sm:text-base lg:text-base text-[#b0b8c1] font-light px-2">
                Add your tasks, set priorities, and organize them by categories
              </p>
            </div>

            <div className="text-center sm:col-span-2 lg:col-span-1">
              <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-gradient-cyan text-white rounded-xl lg:rounded-2xl flex items-center justify-center mx-auto mb-4 lg:mb-6 font-bold text-lg sm:text-xl lg:text-2xl shadow-cyan border border-[#00eaff]">
                3
              </div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gradient-cyan mb-2">Stay Organized</h3>
              <p className="text-sm sm:text-base lg:text-base text-[#b0b8c1] font-light px-2">
                Track progress, collaborate, and boost your productivity
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative z-10 bg-gradient-cyan py-8 sm:py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-white mb-4 tracking-tight">
            Ready to Transform Your Productivity?
          </h2>
          <p className="text-base sm:text-lg lg:text-2xl text-white/90 mb-6 sm:mb-8 lg:mb-10 max-w-2xl mx-auto font-light px-2">
            Join thousands of professionals already using TaskFlow to stay organized and get more done.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 lg:space-x-6">
            {user ? (
              <Link to="/dashboard" className="bg-white text-[#00eaff] hover:bg-[#f8f6fc] px-6 sm:px-8 lg:px-10 py-3 lg:py-4 rounded-xl font-bold text-base sm:text-lg lg:text-xl shadow-lg transition-all touch-manipulation">
                Go to Dashboard
              </Link>
            ) : (
              <>
                <Link to="/signup" className="bg-white text-[#00eaff] hover:bg-[#f8f6fc] px-6 sm:px-8 lg:px-10 py-3 lg:py-4 rounded-xl font-bold text-base sm:text-lg lg:text-xl shadow-lg transition-all touch-manipulation">
                  Start Free Trial
                </Link>
                <Link to="/signin" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#00eaff] px-6 sm:px-8 lg:px-10 py-3 lg:py-4 rounded-xl font-bold text-base sm:text-lg lg:text-xl transition-all touch-manipulation">
                  Sign In
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 bg-[#232526]/80 backdrop-blur-xl border-t border-[#00eaff]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4 lg:mb-6">
              <div className="h-6 w-6 sm:h-8 sm:w-8 lg:h-10 lg:w-10 bg-gradient-cyan rounded-lg lg:rounded-xl flex items-center justify-center shadow-cyan border border-[#00eaff]">
                <svg className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
              <span className="ml-2 lg:ml-3 text-base sm:text-lg lg:text-xl font-bold text-gradient-cyan">TaskFlow</span>
            </div>
            <p className="text-[#b0b8c1] mb-4 text-xs sm:text-sm lg:text-base px-2">
              Elevate your productivity with the ultimate task management experience
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-6 text-xs sm:text-sm text-[#b0b8c1]">
              <Link to="/about" className="hover:text-[#00eaff] transition-colors touch-manipulation py-1">About</Link>
              <Link to="/signin" className="hover:text-[#00eaff] transition-colors touch-manipulation py-1">Sign In</Link>
              <Link to="/signup" className="hover:text-[#00eaff] transition-colors touch-manipulation py-1">Sign Up</Link>
            </div>
            <div className="mt-4 lg:mt-6 text-xs text-[#b0b8c1]/60">
              © 2024 TaskFlow. All rights reserved. | RAJKUMAR
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home; 