import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../utils/api';

interface AuditLog {
  id: string;
  action: string;
  userId: string;
  user: {
    email: string;
  };
  sessionId?: string;
  session?: {
    class: {
      name: string;
    };
  };
  details?: string;
  createdAt: string;
}

const AuditLogs: React.FC = () => {
  const { data: auditLogs, isLoading, error } = useQuery({
    queryKey: ['audit-logs'],
    queryFn: () => api.get<AuditLog[]>('/admin/audit-logs').then(res => res.data)
  });

  if (isLoading) return <div className="text-center">Loading audit logs...</div>;
  if (error) return <div className="text-red-500">Error loading audit logs</div>;

  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
      <h2 className="text-lg sm:text-xl font-semibold mb-4 text-center sm:text-left">
        Audit Logs
      </h2>

      {/* Table view for medium+ screens */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Action</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">User</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Session</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Details</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {auditLogs?.map((log: AuditLog) => (
              <tr key={log.id} className="border-b">
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded text-sm ${
                      log.action === 'BOOK'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {log.action}
                  </span>
                </td>
                <td className="px-4 py-2">{log.user.email}</td>
                <td className="px-4 py-2">{log.session?.class.name || 'N/A'}</td>
                <td className="px-4 py-2">{log.details || 'N/A'}</td>
                <td className="px-4 py-2">{new Date(log.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Card view for mobile */}
      <div className="space-y-4 md:hidden">
        {auditLogs?.map((log: AuditLog) => (
          <div key={log.id} className="border rounded-md p-4 shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <span
                className={`px-2 py-1 rounded text-sm ${
                  log.action === 'BOOK'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {log.action}
              </span>
              <span className="text-xs text-gray-500">
                {new Date(log.createdAt).toLocaleString()}
              </span>
            </div>
            <p className="text-sm">
              <span className="font-medium">User:</span> {log.user.email}
            </p>
            <p className="text-sm">
              <span className="font-medium">Session:</span> {log.session?.class.name || 'N/A'}
            </p>
            <p className="text-sm">
              <span className="font-medium">Details:</span> {log.details || 'N/A'}
            </p>
          </div>
        ))}
      </div>

      {auditLogs?.length === 0 && (
        <p className="text-gray-500 text-center py-4">No audit logs found.</p>
      )}
    </div>
  );
};

export default AuditLogs;
