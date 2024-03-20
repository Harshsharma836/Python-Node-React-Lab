import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ setToken }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

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
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="w-1/3">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="block w-full p-2 mb-4 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="block w-full p-2 mb-4 border rounded"
        />
        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
          Login
        </button>
        {responseMessage && (
          <div className="mt-4 p-2 bg-gray-100 border border-gray-200 rounded">
            <pre>{responseMessage}</pre>
          </div>
        )}
      </form>
    </div>
  );
};

export default Login;
