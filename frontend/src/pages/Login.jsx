import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { authAPI } from '../services/api';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const isDemoMode = import.meta.env.VITE_DEMO_MODE === 'true';

  if (user) {
    return <Navigate to="/employees" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await authAPI.login({ username, password });
      
      if (response.data.status === 'success') {
        login(response.data.data.token, response.data.data.admin);
        navigate('/employees');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login gagal. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-md w-full space-y-6">
        {isDemoMode && (
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 border border-blue-200 dark:border-blue-700 rounded-xl p-4 shadow-sm">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-blue-900 dark:text-blue-100 mb-1">
                  Demo Mode Aktif
                </h3>
                <p className="text-sm text-blue-800 dark:text-blue-200 mb-2">
                  Aplikasi berjalan dengan data dummy yang disimpan di localStorage browser.
                </p>
                <p className="text-xs text-blue-700 dark:text-blue-300">
                  Semua fitur CRUD berfungsi normal dan data akan tersimpan selama localStorage tidak dihapus.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="card">
          <div className="card-body">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Login</h2>
              <p className="text-sm text-slate-600 dark:text-gray-400 mt-1">Aksamedia Technical Test</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="form-group">
                <label htmlFor="username" className="form-label">Username</label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  className="input"
                  placeholder="Masukkan username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="input"
                  placeholder="Masukkan password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {error && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-red-600 dark:text-red-400 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-sm text-red-800 dark:text-red-200">{error}</p>
                  </div>
                </div>
              )}

              <button type="submit" disabled={loading} className="btn-primary w-full h-11 rounded-lg">
                {loading ? 'Memproses...' : 'Masuk'}
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-slate-200 dark:border-gray-600">
              <div className="bg-slate-50 dark:bg-gray-700/50 rounded-lg p-4 border border-slate-200 dark:border-gray-600">
                <p className="text-sm font-semibold text-slate-900 dark:text-white mb-3">Kredensial Default:</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600 dark:text-gray-400">Username:</span>
                    <code className="px-3 py-1.5 bg-white dark:bg-gray-600 rounded font-mono text-blue-600 dark:text-blue-400 border border-slate-200 dark:border-gray-500">admin</code>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600 dark:text-gray-400">Password:</span>
                    <code className="px-3 py-1.5 bg-white dark:bg-gray-600 rounded font-mono text-blue-600 dark:text-blue-400 border border-slate-200 dark:border-gray-500">pastibisa</code>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <p className="text-center text-sm text-slate-500 dark:text-gray-400">
          © 2026 Aksamedia Technical Test
        </p>
      </div>
    </div>
  );
};

export default Login;