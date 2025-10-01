import React, { useState } from 'react';
import { Save, Globe, Mail, Bell, Shield, Database, Upload } from 'lucide-react';

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('general');

  const tabs = [
    { id: 'general', label: 'General', icon: Globe },
    { id: 'email', label: 'Email', icon: Mail },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'database', label: 'Database', icon: Database },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#2D2D2D]">Settings</h1>
        <p className="text-[#9CA3AF]">Manage your application settings and configuration</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <div className="lg:w-64">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <nav className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                      activeTab === tab.id
                        ? 'bg-[#4E6AF3] text-white'
                        : 'text-[#6B7280] hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            {activeTab === 'general' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-[#2D2D2D] mb-4">General Settings</h3>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-[#2D2D2D] mb-2">
                      Site Name
                    </label>
                    <input
                      type="text"
                      defaultValue="My Lanka Journey"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4E6AF3] focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#2D2D2D] mb-2">
                      Site URL
                    </label>
                    <input
                      type="text"
                      defaultValue="https://mylankajourney.com"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4E6AF3] focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#2D2D2D] mb-2">
                    Site Description
                  </label>
                  <textarea
                    rows={3}
                    defaultValue="Discover the beauty of Sri Lanka with our curated tours and experiences."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4E6AF3] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#2D2D2D] mb-2">
                    Site Logo
                  </label>
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-[#4E6AF3] rounded-lg flex items-center justify-center">
                      <Globe className="w-8 h-8 text-white" />
                    </div>
                    <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
                      <Upload className="w-4 h-4" />
                      <span>Upload Logo</span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-[#2D2D2D] mb-2">
                      Default Currency
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4E6AF3] focus:border-transparent">
                      <option value="USD">USD - US Dollar</option>
                      <option value="LKR">LKR - Sri Lankan Rupee</option>
                      <option value="EUR">EUR - Euro</option>
                      <option value="GBP">GBP - British Pound</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#2D2D2D] mb-2">
                      Default Timezone
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4E6AF3] focus:border-transparent">
                      <option value="Asia/Colombo">Asia/Colombo</option>
                      <option value="UTC">UTC</option>
                      <option value="America/New_York">America/New_York</option>
                      <option value="Europe/London">Europe/London</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'email' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-[#2D2D2D] mb-4">Email Settings</h3>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-[#2D2D2D] mb-2">
                      From Email
                    </label>
                    <input
                      type="email"
                      defaultValue="noreply@mylankajourney.com"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4E6AF3] focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#2D2D2D] mb-2">
                      From Name
                    </label>
                    <input
                      type="text"
                      defaultValue="My Lanka Journey"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4E6AF3] focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#2D2D2D] mb-2">
                    SMTP Settings
                  </label>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="SMTP Host"
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4E6AF3] focus:border-transparent"
                    />
                    <input
                      type="text"
                      placeholder="SMTP Port"
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4E6AF3] focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-[#2D2D2D] mb-2">Email Templates</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-[#6B7280]">Welcome Email</span>
                      <button className="text-[#4E6AF3] hover:text-[#3C56C6] text-sm font-medium">
                        Edit Template
                      </button>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-[#6B7280]">Booking Confirmation</span>
                      <button className="text-[#4E6AF3] hover:text-[#3C56C6] text-sm font-medium">
                        Edit Template
                      </button>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-[#6B7280]">Password Reset</span>
                      <button className="text-[#4E6AF3] hover:text-[#3C56C6] text-sm font-medium">
                        Edit Template
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-[#2D2D2D] mb-4">Notification Settings</h3>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b border-gray-200">
                    <div>
                      <h4 className="font-medium text-[#2D2D2D]">New Bookings</h4>
                      <p className="text-sm text-[#6B7280]">Get notified when users make new bookings</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between py-3 border-b border-gray-200">
                    <div>
                      <h4 className="font-medium text-[#2D2D2D]">User Registrations</h4>
                      <p className="text-sm text-[#6B7280]">Get notified when new users register</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between py-3 border-b border-gray-200">
                    <div>
                      <h4 className="font-medium text-[#2D2D2D]">System Alerts</h4>
                      <p className="text-sm text-[#6B7280]">Get notified about system issues and updates</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-[#2D2D2D] mb-4">Security Settings</h3>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <h4 className="font-medium text-yellow-800 mb-2">Two-Factor Authentication</h4>
                    <p className="text-sm text-yellow-700 mb-3">
                      Enhance your account security by enabling two-factor authentication.
                    </p>
                    <button className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                      Enable 2FA
                    </button>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-[#2D2D2D] mb-2">
                        Session Timeout (minutes)
                      </label>
                      <input
                        type="number"
                        defaultValue="60"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4E6AF3] focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#2D2D2D] mb-2">
                        Max Login Attempts
                      </label>
                      <input
                        type="number"
                        defaultValue="5"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4E6AF3] focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        defaultChecked
                        className="rounded border-gray-300 text-[#4E6AF3] focus:ring-[#4E6AF3]"
                      />
                      <span className="text-sm text-[#2D2D2D]">
                        Require password change every 90 days
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'database' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-[#2D2D2D] mb-4">Database Settings</h3>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h4 className="font-medium text-blue-800 mb-2">Backup Status</h4>
                    <p className="text-sm text-blue-700 mb-3">
                      Last backup: January 15, 2024 at 2:30 AM
                    </p>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                      Create Backup
                    </button>
                  </div>

                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <h4 className="font-medium text-green-800 mb-2">Database Health</h4>
                    <p className="text-sm text-green-700 mb-3">
                      All systems operational. Performance: Good
                    </p>
                    <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                      Run Diagnostics
                    </button>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-[#2D2D2D] mb-2">Automatic Backups</h4>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        defaultChecked
                        className="rounded border-gray-300 text-[#4E6AF3] focus:ring-[#4E6AF3]"
                      />
                      <span className="text-sm text-[#2D2D2D]">Enable daily backups</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        defaultChecked
                        className="rounded border-gray-300 text-[#4E6AF3] focus:ring-[#4E6AF3]"
                      />
                      <span className="text-sm text-[#2D2D2D]">Keep backups for 30 days</span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-end pt-6 border-t border-gray-200">
              <button className="bg-[#4E6AF3] hover:bg-[#3C56C6] text-white px-6 py-2 rounded-lg flex items-center space-x-2 transition-colors">
                <Save className="w-4 h-4" />
                <span>Save Changes</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;