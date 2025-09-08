import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../utils/api';
import type { Class } from '../../types';

const ClassManagement: React.FC = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const queryClient = useQueryClient();

  const { data: classes, isLoading, error } = useQuery({
    queryKey: ['admin-classes'],
    queryFn: () => api.get<Class[]>('/classes').then(res => res.data)
  });

  const createClass = useMutation({
    mutationFn: (newClass: { name: string; description: string }) =>
      api.post<Class>('/classes', newClass).then(res => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-classes'] });
      setName('');
      setDescription('');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createClass.mutate({ name, description });
  };

  if (isLoading) return <div className="text-center">Loading classes...</div>;
  if (error) return <div className="text-red-500">Error loading classes</div>;

  return (
    <div className="space-y-6">
      {/* Create Class Form */}
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
        <h2 className="text-lg sm:text-xl font-semibold mb-4 text-center sm:text-left">
          Create New Class
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Class Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6b8dd6]"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6b8dd6]"
              rows={3}
              required
            />
          </div>
          <button
            type="submit"
            disabled={createClass.isPending}
            className="w-full sm:w-auto bg-[#6b8dd6] text-white py-2 px-4 rounded-md hover:bg-[#5a7ac0] transition disabled:opacity-50"
          >
            {createClass.isPending ? 'Creating...' : 'Create Class'}
          </button>
        </form>
      </div>

      {/* Classes List */}
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
        <h2 className="text-lg sm:text-xl font-semibold mb-4 text-center sm:text-left">
          All Classes
        </h2>
        <div className="space-y-4">
          {classes?.map((classItem) => (
            <div
              key={classItem.id}
              className="border-b pb-4 last:border-b-0 flex flex-col sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <h3 className="text-base sm:text-lg font-medium text-gray-800">
                  {classItem.name}
                </h3>
                <p className="text-gray-600 text-sm sm:text-base">{classItem.description}</p>
                <p className="text-xs text-gray-500">
                  Created: {new Date(classItem.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
          {classes?.length === 0 && (
            <p className="text-gray-500 text-center">No classes created yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClassManagement;
