import React from 'react';
import Navbar from './Navbar';

const Layout = ({ children }) => {
  const isDemoMode = import.meta.env.VITE_DEMO_MODE === 'true';
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      {isDemoMode && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900 dark:to-indigo-900 border-b border-blue-200 dark:border-blue-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <div className="flex items-center justify-center space-x-2">
              <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-sm text-blue-900 dark:text-blue-100">
                <strong className="font-semibold">Demo Mode</strong> - Data disimpan di localStorage browser. 
                <span className="hidden sm:inline"> Gunakan username: <code className="px-1 py-0.5 bg-blue-100 dark:bg-blue-800 rounded">admin</code> & password: <code className="px-1 py-0.5 bg-blue-100 dark:bg-blue-800 rounded">pastibisa</code></span>
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