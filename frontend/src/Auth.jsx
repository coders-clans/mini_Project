import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

const Auth = () => {
  const [formData, setFormData] = useState({
    name: '',
    password: ''
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error when user starts typing
    if (error) setError(null);
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5001/user/signUp', {
        name: formData.name,
        password: formData.password,
      });

      if (response.data) {
        // You might want to show a success message before redirecting
        navigate('/login');
      }
    } catch (error) {
      console.error('Error:', error);
      if (error.response?.data?.error) {
        setError(error.response.data.error);
      } else {
        setError('An error occurred. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
<div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
  <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
    <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Sign Up</h2>
    <form className="space-y-4" onSubmit={handleSignup}>
      <input
        type="text"
        name="name"
        placeholder="Username"
        value={formData.name}
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        disabled={loading}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        disabled={loading}
      />
      {error && <div className="text-red-500 text-sm">{error}</div>}
      <button
        type="submit"
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={loading}
      >
        {loading ? 'Signing up...' : 'Sign Up'}
      </button>
    </form>
    <p className="text-center text-gray-600 mt-6">Already have an account?</p>
    <button
      className="w-full mt-2 text-blue-500 hover:text-blue-700 font-medium transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      onClick={handleLogin}
      disabled={loading}
    >
      Login Here
    </button>
  </div>
</div>
  );
};

export default Auth;