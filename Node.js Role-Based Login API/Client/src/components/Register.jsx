import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(role)
      const response = await axios.post('https://node-role-based-server.onrender.com/user/register', {
        username,
        email,
        password,
        role,
      });
      setResponseMessage(JSON.stringify(response.data));
      alert('User registered successfully');
      navigate('/');
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        const errorMessages = error.response.data.error.join('\n');
        setResponseMessage(`Failed to register user:\n${errorMessages}`);
      }
      else if(error.response.data.message){
        const errorMessages = error.response.data.message;
        setResponseMessage(`Failed to register user:\n${errorMessages}`);
      }
      else {
        console.error('Failed to register user', error);
        setResponseMessage('Failed to register user');
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="w-1/3">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="block w-full p-2 mb-4 border rounded"
        />
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
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="block w-full p-2 mb-4 border rounded"
        >
           <option value="">Select Role</option>
           <option value="user">User</option>
           <option value="admin">Admin</option>
        </select>
        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
          Register
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

export default Register;
