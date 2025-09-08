import React from 'react';
import { useSessions, useBookSession } from '../../hooks/useSessions';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';

const SessionList: React.FC = () => {
  const { data: sessions, isLoading, error } = useSessions();
  const bookSession = useBookSession();
  const { isAdmin, user } = useAuth(); // ✅ keep user for enroll check, no TS warning now

  const handleBookSession = (sessionId: string) => {
    bookSession.mutate(sessionId);
  };

  if (isLoading) return <div className="text-center">Loading sessions...</div>;
  if (error) return <div className="text-red-500">Error loading sessions</div>;

  return (
    <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {/* Admin Section */}
      {isAdmin && (
        <div className="bg-white rounded-lg shadow-md p-6 flex flex-col justify-center items-center">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
            Admin Actions
          </h3>
          <Link
            to="/admin"
            className="bg-[#6b8dd6] text-white py-2 px-4 rounded-md hover:bg-[#5a78c0] focus:outline-none focus:ring-2 focus:ring-[#6b8dd6] w-full text-center transition"
          >
            Manage Sessions & Classes
          </Link>
        </div>
      )}

      {/* Session Cards */}
      {sessions?.map((session) => {
        // ✅ Check if current user is already enrolled
        const alreadyEnrolled = session.bookings?.some(
          (b: any) => b.userId === user?.id
        );

        return (
          <div
            key={session.id}
            className="bg-white rounded-lg shadow-md p-6 flex flex-col justify-between"
          >
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center sm:text-left">
                {session.class.name}
              </h3>
              <p className="text-gray-600 mb-2">{session.class.description}</p>
              <p className="text-gray-700 mb-2">
                Date: {new Date(session.date).toLocaleString()}
              </p>
              <p className="text-gray-700 mb-4">
                Capacity: {session._count.bookings} / {session.capacity}
              </p>
            </div>

            <button
              onClick={() => handleBookSession(session.id)}
              disabled={
                session._count.bookings >= session.capacity ||
                bookSession.isPending ||
                isAdmin ||
                alreadyEnrolled
              }
              className="w-full bg-[#6b8dd6] text-white py-2 px-4 rounded-md hover:bg-[#5a78c0] focus:outline-none focus:ring-2 focus:ring-[#6b8dd6] disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              {session._count.bookings >= session.capacity
                ? 'Fully Booked'
                : alreadyEnrolled
                ? 'Enrolled'
                : bookSession.isPending
                ? 'Enrolling...'
                : isAdmin
                ? 'Admin View'
                : 'Enroll Session'}
            </button>
          </div>
        );
      })}

      {/* Empty State */}
      {sessions?.length === 0 && (
        <div className="col-span-full text-center text-gray-500">
          No sessions available. Check back later!
        </div>
      )}
    </div>
  );
};

export default SessionList;
