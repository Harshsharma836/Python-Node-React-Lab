import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserProfile = ({ token }) => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('https://node-role-based-server.onrender.com/user/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProfile(response.data);
      } catch (error) {
        console.error('Failed to fetch user profile', error);
        alert('Failed to fetch user profile');
      }
    };

    fetchProfile();
  }, [token]);

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-1/3">
        <h1 className="text-2xl font-bold">User Profile</h1>
        <p>Username: {profile.username}</p>
        <p>Email: {profile.email}</p>
        <p>Role: {profile.role}</p>
      </div>
    </div>
  );
};

export default UserProfile;
