import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';

const Home = () => {
  return (
    <Layout>
      <div className="text-center py-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Welcome to Aksamedia
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
          Employee Management System
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          <Link
            to="/employees"
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition"
          >
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
              Employees
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Manage employee data
            </p>
          </Link>
          
          <Link
            to="/divisions"
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition"
          >
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
              Divisions
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              View all divisions
            </p>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default Home;