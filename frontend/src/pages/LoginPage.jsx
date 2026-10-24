import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { API_BASE } from '../utils/apiConfig';
import { Shield, Lock, User, ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const { isDark } = useTheme();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch(`${API_BASE}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Invalid credentials');
      }

      localStorage.setItem('admin-token', data.token);
      localStorage.setItem('admin-user', JSON.stringify(data.user));
      navigate('/admin');
    } catch (err) {
      setErrorMsg(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
      <div
        className={`w-full max-w-md p-8 sm:p-10 rounded-3xl border shadow-2xl relative ${
          isDark
            ? 'glass-dark border-saffron-500/20'
            : 'glass-light bg-white border-saffron-300/60'
        }`}
      >
        <div className="text-center space-y-2 mb-8">
          <div className="w-14 h-14 rounded-2xl gradient-saffron-gold flex items-center justify-center text-white mx-auto shadow-lg shadow-saffron-500/30">
            <Shield size={28} />
          </div>
          <h2 className="font-cinzel text-2xl font-bold tracking-wider pt-2">
            Admin Sanctuary
          </h2>
          <p className="font-outfit text-xs text-stone-500">
            Access portal for managing devotional bhajans & videos
          </p>
        </div>

        {errorMsg && (
          <div className="mb-5 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-500 text-xs font-outfit text-center">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1.5">
            <label className="font-cinzel text-xs font-bold text-stone-700 dark:text-stone-300">
              Username
            </label>
            <div className="relative">
              <User
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400"
              />
              <input
                type="text"
                required
                placeholder="admin"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-xs font-outfit border transition-all focus:outline-none focus:border-saffron-500 ${
                  isDark
                    ? 'bg-stone-900/80 border-saffron-500/20 text-stone-100 placeholder:text-stone-500'
                    : 'bg-white border-saffron-200 text-stone-900 placeholder:text-stone-400'
                }`}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="font-cinzel text-xs font-bold text-stone-700 dark:text-stone-300">
              Password
            </label>
            <div className="relative">
              <Lock
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400"
              />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-xs font-outfit border transition-all focus:outline-none focus:border-saffron-500 ${
                  isDark
                    ? 'bg-stone-900/80 border-saffron-500/20 text-stone-100 placeholder:text-stone-500'
                    : 'bg-white border-saffron-200 text-stone-900 placeholder:text-stone-400'
                }`}
              />
            </div>
          </div>

          {/* Hint credentials */}
          <div className="p-2.5 rounded-lg bg-saffron-500/10 border border-saffron-500/20 text-[11px] font-outfit text-saffron-600 dark:text-saffron-400">
            <strong>Demo Credentials:</strong> Username: <code className="bg-white/20 px-1 py-0.5 rounded">admin</code> | Password: <code className="bg-white/20 px-1 py-0.5 rounded">vedant@2026</code>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl font-cinzel text-xs font-bold tracking-widest text-white gradient-saffron-gold shadow-lg shadow-saffron-500/20 hover:brightness-105 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-4"
          >
            <span>{loading ? 'AUTHENTICATING...' : 'ENTER SANCTUARY'}</span>
            <ArrowRight size={15} />
          </button>
        </form>
      </div>
    </div>
  );
}
