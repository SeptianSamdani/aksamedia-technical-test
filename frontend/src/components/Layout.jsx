import React from 'react';
import Navbar from './Navbar';

const Layout = ({ children }) => {
  const isDemoMode = import.meta.env.VITE_DEMO_MODE === 'true';
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 bg-pattern">
      <Navbar />
      
      {isDemoMode && (
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 border-b border-blue-800 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <div className="flex items-center justify-center space-x-2 text-white">
              <svg className="w-5 h-5 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-sm font-medium">
                <strong className="font-bold">Demo Mode</strong> - Data disimpan di localStorage browser. 
                <span className="hidden sm:inline ml-1">
                  Username: <code className="px-2 py-0.5 bg-blue-500 rounded font-mono">admin</code> & 
                  Password: <code className="px-2 py-0.5 bg-blue-500 rounded font-mono ml-1">pastibisa</code>
                </span>
              </p>
            </div>
          </div>
        </div>
      )}
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
};

export default Layout;