import React, { useEffect, useState } from 'react';
import { Users, DollarSign, MapPin, Star, Activity, TrendingUp } from 'lucide-react';
import MetricCard from './MetricCard';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { api } from '../../services/api';

interface DashboardData {
  totalBookings: number;
  totalCountries: number;
  bookingTrends: { month: string; count: number }[];
  bookingsByCountry: { name: string; value: number }[];
  popularActivities: { name: string; value: number }[];
  recentBookings: { id: number; first_name: string; last_name: string; country: string; preferred_travel_date: string }[];
}

const Dashboard: React.FC = () => {
  const [data, setData] = useState<DashboardData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/admin/dashboard');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchData();
  }, []);
  const metrics = [
    { title: 'Total Bookings', value: data?.totalBookings.toString() || '0', change: 12.5, icon: MapPin, color: '#4E6AF3' },
    { title: 'Total Countries', value: data?.totalCountries.toString() || '0', change: 8.2, icon: DollarSign, color: '#22C55E' },
  ];



  const COLORS = ['#4E6AF3', '#22C55E', '#F59E0B', '#EF4444', '#8B5CF6'];



  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center h-20">
        <div>
          <h1 className="text-2xl font-bold text-[#2D2D2D]">Dashboard</h1>
          <p className="text-[#9CA3AF]">Welcome back! Here's what's happening with My Lanka Journey.</p>
        </div>
        <button className="bg-[#4E6AF3] hover:bg-[#3C56C6] text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
          <Activity className="w-4 h-4" />
          <span>View Reports</span>
        </button>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric) => (
          <MetricCard key={metric.title} {...metric} />
        ))}
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Bookings by Country */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-[#2D2D2D]">Bookings by Country</h3>
              <button className="text-[#4E6AF3] hover:text-[#3C56C6] text-sm font-medium">
                View All
              </button>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={data?.bookingsByCountry}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                >
                  {data?.bookingsByCountry?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {data?.bookingsByCountry?.map((item, index) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                    <span className="text-sm text-[#2D2D2D]">{item.name}</span>
                  </div>
                  <span className="text-sm text-[#9CA3AF]">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Popular Activities */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-[#2D2D2D]">Popular Activities</h3>
              <button className="text-[#4E6AF3] hover:text-[#3C56C6] text-sm font-medium">
                View All
              </button>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={data?.popularActivities} layout="vertical" margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis type="number" stroke="#9CA3AF" />
                <YAxis 
                  type="category" 
                  dataKey="name" 
                  stroke="#9CA3AF" 
                  width={150} 
                  tick={{ fontSize: 12 }}
                />
                <Tooltip />
                <Bar dataKey="value" fill="#8B5CF6" radius={4} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Bookings */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-[#2D2D2D]">Recent Bookings</h3>
            <button className="text-[#4E6AF3] hover:text-[#3C56C6] text-sm font-medium">
              View All
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left text-sm font-medium text-[#9CA3AF] pb-3">Customer</th>
                  <th className="text-left text-sm font-medium text-[#9CA3AF] pb-3">Country</th>
                  <th className="text-left text-sm font-medium text-[#9CA3AF] pb-3">Preferred Travel Date</th>
                </tr>
              </thead>
              <tbody className="space-y-3">
                {data?.recentBookings?.map((booking) => (
                  <tr key={booking.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 text-sm text-[#2D2D2D] font-medium">{`${booking.first_name} ${booking.last_name}`}</td>
                    <td className="py-3 text-sm text-[#6B7280]">{booking.country}</td>
                    <td className="py-3 text-sm text-[#6B7280]">{new Date(booking.preferred_travel_date).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">


        {/* Bookings Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-semibold text-[#2D2D2D]">Booking Trends</h3>
              <p className="text-sm text-[#9CA3AF]">Monthly booking statistics</p>
            </div>
            <button className="text-[#4E6AF3] hover:text-[#3C56C6] text-sm font-medium">
              View Report
            </button>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data?.bookingTrends}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip />
              <Line type="monotone" dataKey="bookings" stroke="#4E6AF3" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;