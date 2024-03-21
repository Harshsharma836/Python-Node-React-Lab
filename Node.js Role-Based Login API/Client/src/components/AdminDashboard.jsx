import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = ({ token }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3001/admin/dashboard', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        if (error.response && error.response.data && error.response.data.message === 'Unauthorized') {
          setError('Unauthorized');
        } else {
          setError('Failed to fetch users');
        }
        setLoading(false);
      }
    };

    fetchUsers();
  }, [token]);

  if (error === 'Unauthorized') {
    return <div className="flex justify-center items-center h-screen">Unauthorized</div>;
  }

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen">Failed to fetch users</div>;
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-1/3">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <h3> Fetching All Users</h3>
        <ul>
          {users.map((user) => (
            <li key={user.email}>
              <p>Username: {user.username}</p>
              <p>Email: {user.email}</p>
              <p>Role: {user.role}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;
