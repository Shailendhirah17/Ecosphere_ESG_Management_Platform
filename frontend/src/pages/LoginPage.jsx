import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { AlertCircle, Loader, Copy, Check } from 'lucide-react';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, loading, error: authError } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [copiedDemo, setCopiedDemo] = useState(null);

  const demoUsers = [
    { email: 'admin@ecosphere.com', password: 'demo123', role: 'Super Admin' },
    { email: 'manager@ecosphere.com', password: 'demo123', role: 'Department Head' },
    { email: 'employee@ecosphere.com', password: 'demo123', role: 'Employee' },
    { email: 'auditor@ecosphere.com', password: 'demo123', role: 'Auditor' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(authError || 'Login failed. Please try again.');
    }
  };

  const useDemoLogin = (demoEmail, demoPassword) => {
    setEmail(demoEmail);
    setPassword(demoPassword);
  };

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedDemo(id);
    setTimeout(() => setCopiedDemo(null), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="bg-white rounded-lg shadow-xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-green-600 mb-2">EcoSphere</h1>
            <p className="text-gray-600">ESG Management Platform</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Login Form */}
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Login</h2>

              {(error || authError) && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                  <AlertCircle className="text-red-600 mt-1 flex-shrink-0" size={20} />
                  <p className="text-red-700">{error || authError}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="you@example.com"
                    disabled={loading}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="••••••••"
                    disabled={loading}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-green-600 text-white py-2 rounded-lg font-medium hover:bg-green-700 transition-colors disabled:bg-gray-400 flex items-center justify-center gap-2"
                >
                  {loading && <Loader size={18} className="animate-spin" />}
                  {loading ? 'Logging in...' : 'Login'}
                </button>
              </form>

              <p className="text-center text-sm text-gray-600 mt-6">
                Don't have an account?{' '}
                <Link to="/register" className="text-green-600 hover:text-green-700 font-medium">
                  Register
                </Link>
              </p>
            </div>

            {/* Demo Logins */}
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Demo Accounts</h2>
              <p className="text-sm text-gray-600 mb-4">Click to use demo credentials:</p>
              
              <div className="space-y-3">
                {demoUsers.map((demo, idx) => (
                  <div key={idx} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <p className="text-xs font-semibold text-gray-500 uppercase mb-1">
                          {demo.role}
                        </p>
                        <p className="text-sm font-medium text-gray-800 mb-1">{demo.email}</p>
                        <p className="text-xs text-gray-600">Password: {demo.password}</p>
                      </div>
                      <button
                        onClick={() => useDemoLogin(demo.email, demo.password)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded text-xs font-medium transition-colors whitespace-nowrap"
                      >
                        Use Demo
                      </button>
                    </div>
                    
                    <div className="mt-3 flex gap-2 pt-3 border-t border-gray-200">
                      <button
                        onClick={() => copyToClipboard(demo.email, `email-${idx}`)}
                        className="flex-1 flex items-center justify-center gap-1 text-xs text-gray-600 hover:text-gray-800 transition-colors"
                        title="Copy email"
                      >
                        {copiedDemo === `email-${idx}` ? (
                          <>
                            <Check size={14} className="text-green-600" />
                            <span>Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy size={14} />
                            <span>Email</span>
                          </>
                        )}
                      </button>
                      <button
                        onClick={() => copyToClipboard(demo.password, `pass-${idx}`)}
                        className="flex-1 flex items-center justify-center gap-1 text-xs text-gray-600 hover:text-gray-800 transition-colors"
                        title="Copy password"
                      >
                        {copiedDemo === `pass-${idx}` ? (
                          <>
                            <Check size={14} className="text-green-600" />
                            <span>Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy size={14} />
                            <span>Password</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-xs text-blue-800">
                  <strong>💡 Tip:</strong> Click "Use Demo" to auto-fill credentials, or copy them manually to test with external tools.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
