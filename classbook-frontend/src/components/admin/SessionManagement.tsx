import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../utils/api';
import type { Class, Session } from '../../types';

const SessionManagement: React.FC = () => {
  const [classId, setClassId] = useState('');
  const [date, setDate] = useState('');
  const [capacity, setCapacity] = useState(10);
  const queryClient = useQueryClient();

  const { data: classes, isLoading: classesLoading } = useQuery({
    queryKey: ['classes'],
    queryFn: () => api.get<Class[]>('/classes').then(res => res.data)
  });

  const { data: sessions, isLoading: sessionsLoading, error } = useQuery({
    queryKey: ['admin-sessions'],
    queryFn: () => api.get<Session[]>('/sessions').then(res => res.data)
  });

  const createSession = useMutation({
    mutationFn: (newSession: { classId: string; date: string; capacity: number }) =>
      api.post<Session>('/sessions', newSession).then(res => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-sessions'] });
      setClassId('');
      setDate('');
      setCapacity(10);
    },
    onError: (error: any) => {
      console.error('Error creating session:', error);
      alert(error.response?.data?.error || 'Failed to create session');
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let formattedDate = date;
    if (date) {
      formattedDate = new Date(date).toISOString();
    }

    createSession.mutate({ classId, date: formattedDate, capacity });
  };

  if (classesLoading || sessionsLoading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-red-500">Error loading sessions</div>;

  return (
    <div className="space-y-6">
      {/* Create Session Form */}
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
        <h2 className="text-lg sm:text-xl font-semibold mb-4 text-center sm:text-left">
          Create New Session
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Class</label>
            <select
              value={classId}
              onChange={(e) => setClassId(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6b8dd6]"
              required
            >
              <option value="">Select a class</option>
              {classes?.map((classItem) => (
                <option key={classItem.id} value={classItem.id}>
                  {classItem.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Date & Time</label>
            <input
              type="datetime-local"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6b8dd6]"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Capacity</label>
            <input
              type="number"
              value={capacity}
              onChange={(e) => setCapacity(Number(e.target.value))}
              min="1"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6b8dd6]"
              required
            />
          </div>
          <button
            type="submit"
            disabled={createSession.isPending}
            className="w-full sm:w-auto bg-[#6b8dd6] text-white py-2 px-4 rounded-md hover:bg-[#5a7ac0] transition disabled:opacity-50"
          >
            {createSession.isPending ? 'Creating...' : 'Create Session'}
          </button>

          {createSession.isError && (
            <div className="text-red-500 text-sm mt-2">
              Error: {createSession.error?.message}
            </div>
          )}
        </form>
      </div>

      {/* Sessions List */}
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
        <h2 className="text-lg sm:text-xl font-semibold mb-4 text-center sm:text-left">
          All Sessions
        </h2>
        <div className="space-y-4">
          {sessions?.map((session: Session) => (
            <div
              key={session.id}
              className="border-b pb-4 last:border-b-0 flex flex-col sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <h3 className="text-base sm:text-lg font-medium text-gray-800">
                  {session.class.name}
                </h3>
                <p className="text-gray-600 text-sm sm:text-base">
                  Date: {new Date(session.date).toLocaleString()}
                </p>
                <p className="text-gray-600 text-sm sm:text-base">
                  Capacity: {session._count.bookings} / {session.capacity}
                </p>
                <p className="text-xs text-gray-500">
                  Created: {new Date(session.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
          {sessions?.length === 0 && (
            <p className="text-gray-500 text-center">No sessions created yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SessionManagement;
