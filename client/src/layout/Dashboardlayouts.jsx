import React from 'react';
import { Outlet } from 'react-router-dom';
import TopNavBar from '../components/TopNavBar';

const navLinks = [
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'Tasks', href: '/dashboard/tasks' },
  { name: 'Analytics', href: '/dashboard/analytics' },
  { name: 'Profile', href: '/dashboard/profile' },
  { name: 'Settings', href: '/dashboard/settings' },
];

const DashboardLayout = () => {

  return (
    <div className="min-h-screen bg-[#0a0a0a] relative overflow-hidden">
      {/* Bokeh Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-48 h-48 sm:w-96 sm:h-96 rounded-full bg-[#00eaff]/3 blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-1/4 w-36 h-36 sm:w-72 sm:h-72 rounded-full bg-[#a259ff]/3 blur-2xl animate-pulse delay-1000" />
        <div className="absolute top-10 right-10 w-24 h-24 sm:w-40 sm:h-40 rounded-full bg-[#f1c27d]/5 blur-2xl animate-pulse delay-2000" />
      </div>

      {/* Top Navigation Bar */}
      <TopNavBar navLinks={navLinks} />
      
      {/* Main content area */}
      <main className="relative z-10 flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
