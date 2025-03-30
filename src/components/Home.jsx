import React from 'react';
import { useAuth } from './auth/auth';

const Home = () => {
  const { currentUser } = useAuth();

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-2xl font-bold">
        {currentUser 
          ? `Hello, ${currentUser.displayName || currentUser.email}, you are now logged in.` 
          : 'Welcome to UChicago Hub'}
      </div>
    </div>
  );
};

export default Home;