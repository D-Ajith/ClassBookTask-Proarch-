import React, { useState } from 'react';
import ClassManagement from '../components/admin/ClassManagement';
import SessionManagement from '../components/admin/SessionManagement';
import AuditLogs from '../components/admin/AuditLogs';

const Admin: React.FC = () => {
  const [activeTab, setActiveTab] = useState('classes');

  const activeStyle =
    'bg-[#6b8dd6] text-white shadow-md transition duration-300 ease-in-out';
  const inactiveStyle =
    'bg-white text-gray-700 hover:bg-gray-100 transition duration-300 ease-in-out';

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 md:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 text-center md:text-left">
          Admin Dashboard
        </h1>

        {/* Tabs */}
        <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0 mb-6">
          <button
            onClick={() => setActiveTab('classes')}
            className={`px-4 py-2 rounded-lg font-medium ${
              activeTab === 'classes' ? activeStyle : inactiveStyle
            }`}
          >
            Manage Classes
          </button>
          <button
            onClick={() => setActiveTab('sessions')}
            className={`px-4 py-2 rounded-lg font-medium ${
              activeTab === 'sessions' ? activeStyle : inactiveStyle
            }`}
          >
            Manage Sessions
          </button>
          <button
            onClick={() => setActiveTab('audit')}
            className={`px-4 py-2 rounded-lg font-medium ${
              activeTab === 'audit' ? activeStyle : inactiveStyle
            }`}
          >
            Audit Logs
          </button>
        </div>

        {/* Content */}
        <div className="bg-white shadow rounded-lg p-4 sm:p-6">
          {activeTab === 'classes' && <ClassManagement />}
          {activeTab === 'sessions' && <SessionManagement />}
          {activeTab === 'audit' && <AuditLogs />}
        </div>
      </div>
    </div>
  );
};

export default Admin;
