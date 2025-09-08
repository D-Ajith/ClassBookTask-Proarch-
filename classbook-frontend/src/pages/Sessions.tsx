import React from 'react';
import SessionList from '../components/auth/SessionList';

const Sessions: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Available Sessions</h1>
        <SessionList />
      </div>
    </div>
  );
};

export default Sessions;