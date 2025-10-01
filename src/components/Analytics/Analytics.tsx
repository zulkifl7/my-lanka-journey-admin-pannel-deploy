import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Users, MapPin, DollarSign, Activity } from 'lucide-react';
import MetricCard from '../Dashboard/MetricCard';

const Analytics: React.FC = () => {
  const userAnalytics = [
    { month: 'Jan', registrations: 45, active: 320 },
    { month: 'Feb', registrations: 52, active: 340 },
    { month: 'Mar', registrations: 48, active: 380 },
    { month: 'Apr', registrations: 61, active: 420 },
    { month: 'May', registrations: 55, active: 460 },
    { month: 'Jun', registrations: 67, active: 500 },
  ];

  const locationAnalytics = [
    { location: 'Colombo', bookings: 45, color: '#4E6AF3' },
    { location: 'Kandy', bookings: 38, color: '#22C55E' },
    { location: 'Galle', bookings: 32, color: '#F59E0B' },
    { location: 'Ella', bookings: 28, color: '#EF4444' },
    { location: 'Sigiriya', bookings: 25, color: '#8B5CF6' },
  ];

  const revenueByActivity = [
    { month: 'Jan', historical: 12000, nature: 8000, adventure: 6000 },
    { month: 'Feb', historical: 11000, nature: 9000, adventure: 7000 },
    { month: 'Mar', historical: 15000, nature: 10000, adventure: 8000 },
    { month: 'Apr', historical: 14000, nature: 11000, adventure: 9000 },
    { month: 'May', historical: 16000, nature: 12000, adventure: 10000 },
    { month: 'Jun', historical: 18000, nature: 13000, adventure: 11000 },
  ];

  const topDestinations = [
    { name: 'Sigiriya Rock', bookings: 156, revenue: 23400 },
    { name: 'Temple of Tooth', bookings: 142, revenue: 21300 },
    { name: 'Galle Fort', bookings: 128, revenue: 19200 },
    { name: 'Nine Arch Bridge', bookings: 115, revenue: 17250 },
    { name: 'Yala National Park', bookings: 98, revenue: 14700 },
  ];

  const metrics = [
    { title: 'Total Users', value: '2,847', change: 12.5, icon: Users, color: '#4E6AF3' },
    { title: 'Popular Locations', value: '28', change: 8.2, icon: MapPin, color: '#22C55E' },
    { title: 'Monthly Revenue', value: '$58,240', change: 15.3, icon: DollarSign, color: '#F59E0B' },
    { title: 'Active Activities', value: '156', change: 6.8, icon: Activity, color: '#8B5CF6' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#2D2D2D]">Analytics & Reporting</h1>
        <p className="text-[#9CA3AF]">Insights into user behavior and business performance</p>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric) => (
          <MetricCard key={metric.title} {...metric} />
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Analytics */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-semibold text-[#2D2D2D]">User Growth</h3>
              <p className="text-sm text-[#9CA3AF]">New registrations vs active users</p>
            </div>
            <button className="text-[#4E6AF3] hover:text-[#3C56C6] text-sm font-medium">
              Export Data
            </button>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={userAnalytics}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip />
              <Line type="monotone" dataKey="registrations" stroke="#4E6AF3" strokeWidth={3} name="New Users" />
              <Line type="monotone" dataKey="active" stroke="#22C55E" strokeWidth={3} name="Active Users" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Location Analytics */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-semibold text-[#2D2D2D]">Popular Locations</h3>
              <p className="text-sm text-[#9CA3AF]">Bookings by destination</p>
            </div>
          </div>
          <div className="space-y-4">
            {locationAnalytics.map((location, index) => (
              <div key={location.location} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-8 rounded-full" style={{ backgroundColor: location.color }}></div>
                  <span className="text-sm font-medium text-[#2D2D2D]">{location.location}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full" 
                      style={{ 
                        backgroundColor: location.color, 
                        width: `${(location.bookings / locationAnalytics[0].bookings) * 100}%` 
                      }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-[#2D2D2D] w-8">{location.bookings}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Revenue by Activity Type */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-lg font-semibold text-[#2D2D2D]">Revenue by Activity Type</h3>
            <p className="text-sm text-[#9CA3AF]">Monthly revenue breakdown by activity categories</p>
          </div>
          <button className="text-[#4E6AF3] hover:text-[#3C56C6] text-sm font-medium">
            View Details
          </button>
        </div>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={revenueByActivity}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" stroke="#9CA3AF" />
            <YAxis stroke="#9CA3AF" />
            <Tooltip />
            <Bar dataKey="historical" fill="#4E6AF3" radius={4} name="Historical Sites" />
            <Bar dataKey="nature" fill="#22C55E" radius={4} name="Nature & Wildlife" />
            <Bar dataKey="adventure" fill="#F59E0B" radius={4} name="Adventure Sports" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Top Destinations Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-lg font-semibold text-[#2D2D2D]">Top Performing Destinations</h3>
            <p className="text-sm text-[#9CA3AF]">Most popular destinations by bookings and revenue</p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-gray-200">
              <tr>
                <th className="text-left text-sm font-medium text-[#9CA3AF] pb-3">Destination</th>
                <th className="text-left text-sm font-medium text-[#9CA3AF] pb-3">Bookings</th>
                <th className="text-left text-sm font-medium text-[#9CA3AF] pb-3">Revenue</th>
                <th className="text-left text-sm font-medium text-[#9CA3AF] pb-3">Avg. per Booking</th>
                <th className="text-left text-sm font-medium text-[#9CA3AF] pb-3">Performance</th>
              </tr>
            </thead>
            <tbody>
              {topDestinations.map((destination, index) => (
                <tr key={destination.name} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-[#4E6AF3] text-white rounded-lg flex items-center justify-center text-xs font-bold">
                        {index + 1}
                      </div>
                      <span className="text-sm font-medium text-[#2D2D2D]">{destination.name}</span>
                    </div>
                  </td>
                  <td className="py-3 text-sm text-[#2D2D2D] font-medium">{destination.bookings}</td>
                  <td className="py-3 text-sm text-[#2D2D2D] font-medium">${destination.revenue.toLocaleString()}</td>
                  <td className="py-3 text-sm text-[#6B7280]">${Math.round(destination.revenue / destination.bookings)}</td>
                  <td className="py-3">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-[#4E6AF3] h-2 rounded-full" 
                        style={{ width: `${(destination.bookings / topDestinations[0].bookings) * 100}%` }}
                      ></div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Analytics;