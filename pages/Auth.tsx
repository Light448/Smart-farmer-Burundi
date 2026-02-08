import React, { useState } from 'react';
import { User, UserRole } from '../types';
import { login, register } from '../services/authService';
import { Leaf, AlertCircle } from 'lucide-react';

interface Props {
  setUser: (user: User) => void;
  lang: 'en' | 'fr';
}

const Auth: React.FC<Props> = ({ setUser, lang }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); // Dummy password
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState<UserRole>(UserRole.FARMER);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isLogin) {
        const user = await login(email);
        if (user) {
          setUser(user);
        } else {
          setError("Invalid email or user not found. (Try 'farmer@sfb.com')");
        }
      } else {
        const user = await register(name, email, role, phone);
        setUser(user);
      }
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-green-700 p-8 text-center">
          <div className="inline-block p-3 bg-white rounded-full mb-4">
            <Leaf className="text-green-700" size={32} />
          </div>
          <h2 className="text-2xl font-bold text-white">
            {isLogin ? "Welcome Back" : "Join Smart Farmer"}
          </h2>
          <p className="text-green-100 mt-2">
            {isLogin ? "Log in to manage your farm" : "Create an account to get started"}
          </p>
        </div>

        <div className="p-8">
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg flex items-center gap-2 text-sm">
              <AlertCircle size={16} />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Full Name</label>
                  <input
                    type="text"
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div>
                   <label className="block text-sm font-medium text-gray-700">Role</label>
                   <select 
                      value={role} 
                      onChange={(e) => setRole(e.target.value as UserRole)}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                   >
                      <option value={UserRole.FARMER}>Farmer (Agriculteur)</option>
                      <option value={UserRole.BUYER}>Buyer (Acheteur)</option>
                   </select>
                </div>
                {role === UserRole.FARMER && (
                    <div>
                    <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                    <input
                        type="tel"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+257..."
                    />
                    </div>
                )}
              </>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700">Email Address</label>
              <input
                type="email"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 px-4 border border-transparent rounded-lg shadow-sm text-white font-medium bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Processing...' : (isLogin ? 'Log In' : 'Sign Up')}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-green-600 hover:text-green-500 font-medium"
            >
              {isLogin ? "Don't have an account? Sign up" : "Already have an account? Log in"}
            </button>
          </div>
          
          <div className="mt-4 text-center text-xs text-gray-500">
             <p>Demo accounts:</p>
             <p>Farmer: farmer@sfb.com | Admin: admin@sfb.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
