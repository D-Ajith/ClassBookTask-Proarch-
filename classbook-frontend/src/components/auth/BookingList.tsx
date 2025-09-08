import React from 'react';
import { useUserBookings, useCancelBooking } from '../../hooks/useSessions';
import type { Booking } from '../../types';

const BookingList: React.FC = () => {
  const { data: bookings, isLoading, error } = useUserBookings();
  const cancelBooking = useCancelBooking();

  const handleCancelBooking = (bookingId: string) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      cancelBooking.mutate(bookingId);
    }
  };

  if (isLoading) return <div className="text-center">Loading bookings...</div>;
  if (error) return <div className="text-red-500">Error loading bookings</div>;

  return (
    <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {bookings?.map((booking: Booking) => (
        <div
          key={booking.id}
          className="bg-white rounded-lg shadow-md p-6 flex flex-col justify-between"
        >
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center sm:text-left">
              {booking.session.class.name}
            </h3>
            <p className="text-gray-600 mb-2">{booking.session.class.description}</p>
            <p className="text-gray-700 mb-4">
              Date: {new Date(booking.session.date).toLocaleString()}
            </p>
          </div>

          <button
            onClick={() => handleCancelBooking(booking.id)}
            disabled={cancelBooking.isPending}
            className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            {cancelBooking.isPending ? 'Cancelling...' : 'Cancel Booking'}
          </button>
        </div>
      ))}

      {bookings?.length === 0 && (
        <div className="col-span-full p-6 text-center text-gray-500">
          You haven't booked any sessions yet.
        </div>
      )}
    </div>
  );
};

export default BookingList;
