import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const LogoutSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/');
    }, 5000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4 py-6 sm:py-8 relative overflow-hidden">
      {/* Bokeh Background Effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/3 w-48 h-48 sm:w-96 sm:h-96 rounded-full bg-[#00eaff]/5 blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-1/4 w-36 h-36 sm:w-72 sm:h-72 rounded-full bg-[#a259ff]/5 blur-2xl animate-pulse delay-1000" />
        <div className="absolute top-10 right-10 w-24 h-24 sm:w-40 sm:h-40 rounded-full bg-[#f1c27d]/8 blur-2xl animate-pulse delay-2000" />
        <div className="absolute top-1/2 left-1/4 w-36 h-36 sm:w-64 sm:h-64 rounded-full bg-[#00eaff]/3 blur-3xl animate-pulse delay-1500" />
      </div>

      <div className="relative z-10 max-w-xs sm:max-w-sm lg:max-w-md w-full p-4 sm:p-6 lg:p-8 card glass-dark border border-[#00eaff]/30 text-center">
        <div className="mb-4 sm:mb-6 lg:mb-8">
          <div className="h-12 w-12 sm:h-16 sm:w-16 lg:h-20 lg:w-20 bg-gradient-cyan rounded-full flex items-center justify-center shadow-cyan border border-[#00eaff] mx-auto">
            <svg className="h-6 w-6 sm:h-8 sm:w-8 lg:h-10 lg:w-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
        
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-gradient-cyan mb-3 lg:mb-4 tracking-tight">
          Successfully Logged Out
        </h1>
        
        <p className="text-sm sm:text-base lg:text-lg text-[#b0b8c1] mb-4 sm:mb-6 lg:mb-8 px-2">
          You have been successfully logged out of your account. Thank you for using TaskFlow!
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 justify-center">
          <Link 
            to="/signin" 
            className="btn-primary px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3 text-sm sm:text-base lg:text-lg font-semibold touch-manipulation"
            aria-label="Sign in again"
          >
            Sign In Again
          </Link>
          <Link 
            to="/" 
            className="btn-secondary px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3 text-sm sm:text-base lg:text-lg font-semibold touch-manipulation"
            aria-label="Go to home page"
          >
            Go to Home
          </Link>
        </div>
        
        <p className="text-xs lg:text-sm text-[#b0b8c1]/60 mt-3 sm:mt-4 lg:mt-6 px-2">
          You will be automatically redirected to the home page in 5 seconds...
        </p>
        
        <div className="mt-4 sm:mt-6 lg:mt-8 flex items-center justify-center gap-2 lg:gap-3">
          <div className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8 bg-gradient-cyan rounded-lg lg:rounded-xl flex items-center justify-center shadow-cyan border border-[#00eaff]">
            <svg className="h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
          </div>
          <span className="text-sm sm:text-base lg:text-lg font-bold text-gradient-cyan">TaskFlow</span>
        </div>
      </div>
    </div>
  );
};

export default LogoutSuccess; 