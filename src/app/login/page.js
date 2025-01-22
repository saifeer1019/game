'use client';

import { useState, useEffect } from 'react';
import { loginWithEmail, registerWithEmail, getCurrentUser } from '@/lib/auth.js'; // Import login, register, and getCurrentUser
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [user, setUser] = useState(null); // Store user session



  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isRegistering) {
        await registerWithEmail(email, password);
      } else {
        const user = await loginWithEmail(email, password);
        console.log('User logged in:', user); // Check if the login was successful
      }
      router.push('/admin'); // Redirect to the admin page
    } catch (err) {
      setError(isRegistering ? 'Failed to register. Please try again.' : 'Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary_">
      <div className="w-full max-w-sm p-8 bg-secondary_ rounded-lg shadow-lg">
        <h2 className="text-3xl text-light_ mb-6 text-center">{isRegistering ? 'Admin Register' : 'Admin Login'}</h2>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-light_ mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 bg-secondary_ text-light_ border border-muted_ rounded focus:outline-none focus:ring-2 focus:ring-accent_"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-light_ mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 bg-secondary_ text-light_ border border-muted_ rounded focus:outline-none focus:ring-2 focus:ring-accent_"
              required
            />
          </div>

          <button
            type="submit"
            className={`w-full p-3 bg-accent_ text-light_ rounded hover:bg-hover_ transition duration-300 ${
              loading ? 'bg-accent_ cursor-not-allowed' : ''
            }`}
            disabled={loading}
          >
            {loading ? (isRegistering ? 'Registering...' : 'Logging in...') : isRegistering ? 'Register' : 'Login'}
          </button>
        </form>

        <div className="mt-4 text-center">
          <button
            onClick={() => setIsRegistering(!isRegistering)}
            className="text-light_ underline"
          >
            {isRegistering ? 'Already have an account? Login' : 'Don\'t have an account? Register'}
          </button>
        </div>
      </div>
    </div>
  );
}
