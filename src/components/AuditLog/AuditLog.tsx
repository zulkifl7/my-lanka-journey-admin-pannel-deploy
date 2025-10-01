import React, { useState } from 'react';
import { Search, ListFilter as Filter, Calendar, User, Activity, FileText } from 'lucide-react';
import { AuditLog } from '../../types';

const AuditLogComponent: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAction, setFilterAction] = useState<string>('all');
  const [filterUser, setFilterUser] = useState<string>('all');

  const auditLogs: AuditLog[] = [
    {
      id: '1',
      userId: 'admin-1',
      action: 'CREATE',
      resource: 'Activity',
      resourceId: 'activity-123',
      details: 'Created new activity: Sigiriya Rock Fortress Tour',
      timestamp: new Date('2024-01-15T10:30:00Z'),
    },
    {
      id: '2',
      userId: 'editor-1',
      action: 'UPDATE',
      resource: 'Country',
      resourceId: 'country-1',
      details: 'Updated country information for Sri Lanka',
      timestamp: new Date('2024-01-15T09:45:00Z'),
    },
    {
      id: '3',
      userId: 'admin-1',
      action: 'DELETE',
      resource: 'User',
      resourceId: 'user-456',
      details: 'Deleted inactive user account: test@example.com',
      timestamp: new Date('2024-01-15T08:20:00Z'),
    },
    {
      id: '4',
      userId: 'editor-2',
      action: 'UPDATE',
      resource: 'Activity',
      resourceId: 'activity-789',
      details: 'Updated pricing for Tea Plantation Experience',
      timestamp: new Date('2024-01-14T16:15:00Z'),
    },
    {
      id: '5',
      userId: 'admin-1',
      action: 'CREATE',
      resource: 'Location',
      resourceId: 'location-101',
      details: 'Added new location: Ella Nine Arch Bridge',
      timestamp: new Date('2024-01-14T14:30:00Z'),
    },
  ];

  const users = [
    { id: 'admin-1', name: 'Admin User', email: 'admin@mylanka.com' },
    { id: 'editor-1', name: 'John Editor', email: 'john@mylanka.com' },
    { id: 'editor-2', name: 'Jane Editor', email: 'jane@mylanka.com' },
  ];

  const getActionBadge = (action: string) => {
    const colors = {
      CREATE: 'bg-green-100 text-green-800',
      UPDATE: 'bg-blue-100 text-blue-800',
      DELETE: 'bg-red-100 text-red-800',
      VIEW: 'bg-gray-100 text-gray-800',
    };
    return colors[action as keyof typeof colors] || colors.VIEW;
  };

  const getResourceIcon = (resource: string) => {
    const icons = {
      User: User,
      Activity: Activity,
      Country: FileText,
      Location: FileText,
      Category: FileText,
    };
    const Icon = icons[resource as keyof typeof icons] || FileText;
    return <Icon className="w-4 h-4" />;
  };

  const getUserName = (userId: string) => {
    const user = users.find(u => u.id === userId);
    return user ? user.name : userId;
  };

  const filteredLogs = auditLogs.filter(log => {
    const matchesSearch = log.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.resource.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAction = filterAction === 'all' || log.action === filterAction;
    const matchesUser = filterUser === 'all' || log.userId === filterUser;
    return matchesSearch && matchesAction && matchesUser;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#2D2D2D]">Audit Log</h1>
        <p className="text-[#9CA3AF]">Track all system activities and changes</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#9CA3AF] w-4 h-4" />
            <input
              type="text"
              placeholder="Search activities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4E6AF3] focus:border-transparent"
            />
          </div>
          <div className="flex gap-3">
            <select
              value={filterAction}
              onChange={(e) => setFilterAction(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4E6AF3] focus:border-transparent"
            >
              <option value="all">All Actions</option>
              <option value="CREATE">Create</option>
              <option value="UPDATE">Update</option>
              <option value="DELETE">Delete</option>
              <option value="VIEW">View</option>
            </select>
            <select
              value={filterUser}
              onChange={(e) => setFilterUser(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4E6AF3] focus:border-transparent"
            >
              <option value="all">All Users</option>
              {users.map(user => (
                <option key={user.id} value={user.id}>{user.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left text-sm font-medium text-[#9CA3AF] px-6 py-4">Timestamp</th>
                <th className="text-left text-sm font-medium text-[#9CA3AF] px-6 py-4">User</th>
                <th className="text-left text-sm font-medium text-[#9CA3AF] px-6 py-4">Action</th>
                <th className="text-left text-sm font-medium text-[#9CA3AF] px-6 py-4">Resource</th>
                <th className="text-left text-sm font-medium text-[#9CA3AF] px-6 py-4">Details</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map((log) => (
                <tr key={log.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-[#9CA3AF]" />
                      <div>
                        <p className="text-sm font-medium text-[#2D2D2D]">
                          {log.timestamp.toLocaleDateString()}
                        </p>
                        <p className="text-xs text-[#9CA3AF]">
                          {log.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-[#4E6AF3] rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-sm font-medium text-[#2D2D2D]">
                        {getUserName(log.userId)}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getActionBadge(log.action)}`}>
                      {log.action}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      {getResourceIcon(log.resource)}
                      <span className="text-sm text-[#2D2D2D]">{log.resource}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-[#6B7280] max-w-md">
                      {log.details}
                    </p>
                    <p className="text-xs text-[#9CA3AF] mt-1">
                      ID: {log.resourceId}
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredLogs.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-12 h-12 text-[#9CA3AF] mx-auto mb-4" />
            <h3 className="text-lg font-medium text-[#2D2D2D] mb-2">No audit logs found</h3>
            <p className="text-[#9CA3AF]">Try adjusting your search or filter criteria.</p>
          </div>
        )}

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <div className="text-sm text-[#6B7280]">
            Showing {filteredLogs.length} of {auditLogs.length} entries
          </div>
          <div className="flex space-x-2">
            <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">
              Previous
            </button>
            <button className="px-3 py-1 text-sm bg-[#4E6AF3] text-white rounded">
              1
            </button>
            <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">
              2
            </button>
            <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuditLogComponent;