import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';

const BasicLayout = () => {
  return (
    <div className="min-h-screen bg-gradient-dark">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export default BasicLayout;
