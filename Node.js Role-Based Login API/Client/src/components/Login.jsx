import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const getTokenPayload = (token) => {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const payload = JSON.parse(atob(base64));
  return payload;
};

const Login = ({ setToken }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/user/login', {
        email,
        password,
      });
      setToken(response.data.token);
      localStorage.setItem('token', response.data.token);
      setResponseMessage('Login successful');

      // Extract user role from JWT token
      const payload = getTokenPayload(response.data.token);
      const userRole = payload.role;
      console.log(userRole)
      if (userRole === 'user') {
        navigate('/user/profile');
      } else if (userRole === 'admin') {
        navigate('/admin/dashboard');
      }

    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        const errorMessages = error.response.data.error.join('\n');
        setResponseMessage(`Failed to login user:\n${errorMessages}`);
      } else if (error.response.data.message) {
        const errorMessages = error.response.data.message;
        setResponseMessage(`Failed to login user:\n${errorMessages}`);
      } else {
        console.error('Failed to login user', error);
        setResponseMessage('Failed to login user');
      }
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-200">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full sm:w-1/2 lg:w-1/3">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex items-center justify-between">
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Login
          </button>
        </div>
        {responseMessage && (
          <div className="mt-4 p-2 bg-gray-100 border border-gray-200 rounded">
            <pre>{responseMessage}</pre>
          </div>
        )}
      </form>
      <div className="mt-4 text-center">
        <p>Don't have an account? <Link to="/register" className="text-blue-500">Register</Link></p>
      </div>
    </div>
  );
};

export default Login;
