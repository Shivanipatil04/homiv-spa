import React, { useState } from 'react';

export const AdminLogin = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      localStorage.setItem('adminToken', data.token);
      localStorage.setItem('adminUser', JSON.stringify({ username: data.username }));
      onLoginSuccess(data.token);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#2D1217] flex items-center justify-center p-4">
      <div className="bg-white max-w-md w-full rounded-2xl p-8 shadow-2xl border border-[#C9A24B]/30">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-[#7A1428] text-[#D4AF6A] font-serif text-2xl font-bold flex items-center justify-center mx-auto mb-3 shadow-md border border-[#C9A24B]/40">
            H
          </div>
          <h2 className="font-serif text-2xl font-bold text-[#5C0E1E]">HOMIV Spa Admin</h2>
          <p className="text-xs text-gray-500 uppercase tracking-widest mt-1">Management Portal</p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-50 text-red-700 border border-red-200 text-xs font-semibold">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#7A1428] mb-2">
              Username
            </label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="e.g. admin"
              className="w-full bg-white border border-[#7A1428]/40 rounded-lg px-4 py-3 text-sm text-gray-900 font-medium placeholder-gray-400 focus:outline-none focus:border-[#7A1428] focus:ring-2 focus:ring-[#7A1428]/20 transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#7A1428] mb-2">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-white border border-[#7A1428]/40 rounded-lg px-4 py-3 text-sm text-gray-900 font-medium placeholder-gray-400 focus:outline-none focus:border-[#7A1428] focus:ring-2 focus:ring-[#7A1428]/20 transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#7A1428] text-white font-bold text-xs uppercase tracking-widest py-3.5 rounded-lg hover:bg-[#5C0E1E] transition-all shadow-md active:scale-95 disabled:opacity-50"
          >
            {loading ? 'Authenticating...' : 'Sign In To Portal'}
          </button>
        </form>

        <div className="mt-8 text-center border-t border-gray-100 pt-4">
          <a href="/" className="text-xs text-[#7A1428] hover:underline font-semibold">
            ← Return to Website
          </a>
        </div>
      </div>
    </div>
  );
};
