import React, { useState, useEffect } from 'react';
import { Search, ListFilter as Filter, Eye, Trash2 } from 'lucide-react';
import { Booking } from '../../types';
import { api } from '../../services/api';
import BookingDetails from './BookingDetails';

const Bookings: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCountry, setFilterCountry] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  const [sortOrder, setSortOrder] = useState<string>('latest');

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await api.get('/admin/trip-plans');
        setBookings(response.data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchBookings();
  }, []);

  const sortedBookings = [...bookings].sort((a, b) => {
    if (sortOrder === 'latest') {
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    } else if (sortOrder === 'oldest') {
      return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
    }
    return 0;
  });

  const filteredBookings = sortedBookings.filter(booking => {
    const matchesSearch = (booking.first_name + ' ' + booking.last_name).toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCountry = filterCountry === 'all' || booking.country === filterCountry;
    const matchesStatus = filterStatus === 'all' || booking.status === filterStatus;
    return matchesSearch && matchesCountry && matchesStatus;
  });

  const handleViewBooking = (booking: Booking) => {
    setSelectedBooking(booking);
  };

  const handleCloseDetails = () => {
    setSelectedBooking(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#2D2D2D]">Bookings</h1>
          <p className="text-[#9CA3AF]">Manage and view trip bookings</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#9CA3AF] w-4 h-4" />
            <input
              type="text"
              placeholder="Search bookings..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4E6AF3] focus:border-transparent"
            />
          </div>
          <div className="flex gap-3">
            <select
              value={filterCountry}
              onChange={(e) => setFilterCountry(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4E6AF3] focus:border-transparent"
            >
              <option value="all">All Countries</option>
              {/* Add country options dynamically later */}
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4E6AF3] focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4E6AF3] focus:border-transparent"
            >
              <option value="latest">Latest</option>
              <option value="oldest">Oldest</option>
            </select>
          </div>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left text-sm font-medium text-[#9CA3AF] px-6 py-4">User</th>
                <th className="text-left text-sm font-medium text-[#9CA3AF] px-6 py-4">Country</th>
                <th className="text-left text-sm font-medium text-[#9CA3AF] px-6 py-4">Preferred Travel Date</th>
                <th className="text-left text-sm font-medium text-[#9CA3AF] px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map((booking) => (
                <tr key={booking.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-[#4E6AF3] rounded-full flex items-center justify-center">
                        <span className="text-white font-medium text-sm">
                          {booking.first_name.charAt(0)}{booking.last_name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-[#2D2D2D]">{booking.first_name} {booking.last_name}</p>
                        <p className="text-sm text-[#9CA3AF]">{booking.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-[#6B7280]">{booking.country}</td>
                  <td className="px-6 py-4 text-sm text-[#6B7280]">{new Date(booking.preferred_travel_date).toLocaleDateString()}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button onClick={() => handleViewBooking(booking)} className="p-1 hover:bg-gray-100 rounded text-[#6B7280] hover:text-[#4E6AF3]">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1 hover:bg-gray-100 rounded text-[#6B7280] hover:text-[#EF4444]">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedBooking && (
        <BookingDetails booking={selectedBooking} onClose={handleCloseDetails} />
      )}
    </div>
  );
};

export default Bookings;