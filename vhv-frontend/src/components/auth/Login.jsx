import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import axios from 'axios';

export const Login = () => {
  const loginApi = "https://vhv-backend-944519399532.us-central1.run.app/api/login";
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(loginApi, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const role = await response.text();

        localStorage.setItem('userProfile', JSON.stringify({ username, role }));

        if (role === 'ADMIN') {
          navigate('/admin'); // Navigate to admin page
        } else {
          navigate('/user'); // Navigate to user page
        }
      } else if (response.status === 401) {
        setError('Invalid credentials. Please try again.');
      } else {
        setError('Unexpected error. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-form">
        <form onSubmit={handleLogin}>
          <h2>Log in</h2>
          {error && <p className="error-message">{error}</p>}
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your Username"
            required
          />
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
          <button type="submit" disabled={loading || !username || !password}>
            {loading ? 'Logging in...' : 'Confirm'}
          </button>
          <div className="signup-admin">
            <p>Or</p>
            <a href="/signup">Sign Up</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
