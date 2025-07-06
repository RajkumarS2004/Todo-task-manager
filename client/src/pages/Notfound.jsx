import React from 'react';
import { Link } from 'react-router-dom';

const Notfound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-dark px-4 py-6 sm:py-8">
      {/* Bokeh Background Effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/3 w-48 h-48 sm:w-96 sm:h-96 rounded-full bg-[#00eaff]/10 blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-1/4 w-36 h-36 sm:w-72 sm:h-72 rounded-full bg-[#a259ff]/10 blur-2xl animate-pulse delay-1000" />
        <div className="absolute top-10 right-10 w-24 h-24 sm:w-40 sm:h-40 rounded-full bg-[#f1c27d]/15 blur-2xl animate-pulse delay-2000" />
        <div className="absolute top-1/2 left-1/4 w-36 h-36 sm:w-64 sm:h-64 rounded-full bg-[#00eaff]/8 blur-3xl animate-pulse delay-1500" />
      </div>

      <div className="relative z-10 max-w-xs sm:max-w-sm lg:max-w-md w-full p-4 sm:p-6 lg:p-10 rounded-xl sm:rounded-2xl lg:rounded-3xl card glass-dark border border-[#00eaff]/30 text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-3 sm:mb-4 text-gradient-cyan drop-shadow-lg">
          404
        </h1>
        <p className="text-base sm:text-lg lg:text-xl text-[#b0b8c1] mb-4 sm:mb-6 lg:mb-8 font-medium px-2">
          Sorry, the page you are looking for does not exist.
        </p>
        <Link
          to="/"
          className="btn-primary px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3 text-sm sm:text-base lg:text-lg font-semibold touch-manipulation"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default Notfound;
