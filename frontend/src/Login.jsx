import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./Login.css"; 

const Login = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const handleSignUp = () => {
        navigate('/');
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            const response = await axios.post(
                'http://localhost:5001/user/login',
                { name, password },
            );
    
            if (response.data.message==="Login successful") {
                console.log(response)
                localStorage.setItem('userId',response.data.userId);
                    navigate('/home');                
            } else {
                setError(response.data.message);
            }
        } catch (error) {
            setError(error.response?.data?.message || "An error occurred. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
        {!isLoading && (
          <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login</h2>
            <form className="space-y-4" onSubmit={handleLogin}>
              <input
                type="text"
                placeholder="Username"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {error && <div className="text-red-500 text-sm">{error}</div>}
              <button 
                type="submit" 
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition-colors duration-300"
              >
                Login
              </button>
            </form>
            <p className="text-center text-gray-600 mt-6">Don't have an account?</p>
            <button 
              type="button" 
              onClick={handleSignUp} 
              className="w-full mt-2 text-blue-500 hover:text-blue-700 font-medium transition-colors duration-300"
            >
              Sign Up
            </button>
          </div>
        )}
      </div>
    );
};

export default Login;
