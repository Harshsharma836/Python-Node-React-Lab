import React from 'react';

const Home = ({ token }) => {
  const userRole = token ? JSON.parse(atob(token.split('.')[1])).role : '';

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-1/3">
        <h1 className="text-2xl font-bold">Home Page</h1>
        {userRole === 'user' && <p>Welcome, User!</p>}
        {userRole === 'admin' && <p>Welcome, Admin!</p>}
      </div>
    </div>
  );
};

export default Home;
