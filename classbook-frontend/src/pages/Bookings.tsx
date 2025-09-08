import React from 'react';
import BookingList from '../components/auth/BookingList';

const Bookings: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">My Bookings</h1>
        <BookingList />
      </div>
    </div>
  );
};

export default Bookings;