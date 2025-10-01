import React, { useEffect, useState } from 'react';
import { Booking } from '../../types';
import { getTripPlan } from '../../services/tripPlanService';

interface BookingDetailsProps {
  booking: Booking;
  onClose: () => void;
}

const BookingDetails: React.FC<BookingDetailsProps> = ({ booking, onClose }) => {
  const [activitiesByLocation, setActivitiesByLocation] = useState<any>({});

  useEffect(() => {
    const fetchTripPlan = async () => {
      if (booking && booking.id) {
        try {
          const tripPlan = await getTripPlan(booking.id);
          const activities = tripPlan.activities || [];
          const groupedActivities = activities.reduce((acc: any, activity: any) => {
            const locationName = activity.location.name;
            if (!acc[locationName]) {
              acc[locationName] = [];
            }
            acc[locationName].push(activity);
            return acc;
          }, {});
          setActivitiesByLocation(groupedActivities);
        } catch (error) {
          console.error('Failed to fetch trip plan:', error);
        }
      }
    };

    fetchTripPlan();
  }, [booking]);

  if (!booking) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-[#2D2D2D]">Booking Details</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* User & Trip Info */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-[#4E6AF3] mb-2">User Information</h3>
              <div className="text-sm space-y-1">
                <p><span className="font-medium">Name:</span> {booking.first_name} {booking.last_name}</p>
                <p><span className="font-medium">Email:</span> {booking.email}</p>
                <p><span className="font-medium">Phone:</span> {booking.phone}</p>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-[#4E6AF3] mb-2">Trip Details</h3>
              <div className="text-sm space-y-1">
                <p><span className="font-medium">Country (Traveler's Country):</span> {booking.country}</p>
                <p><span className="font-medium">Preferred Date:</span> {new Date(booking.preferred_travel_date).toLocaleDateString()}</p>
                <p><span className="font-medium">Travelers:</span> {booking.no_of_travelers}</p>

              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#4E6AF3] mb-2">Preferences</h3>
              <div className="text-sm space-y-1">
                <p><span className="font-medium">Hotels:</span> {Array.isArray(booking.hotel_preferences) ? booking.hotel_preferences.join(', ') : booking.hotel_preferences}</p>
                <p><span className="font-medium">Food:</span> {Array.isArray(booking.food_preferences) ? booking.food_preferences.join(', ') : booking.food_preferences}</p>
                <p><span className="font-medium">Vehicles:</span> {Array.isArray(booking.vehicle_preferences) ? booking.vehicle_preferences.join(', ') : booking.vehicle_preferences}</p>
              </div>
            </div>
          </div>

          {/* Journey Roadmap Summary */}
          <div className="bg-gray-50 p-6 rounded-lg max-h-96 overflow-y-auto">
            <h3 className="text-lg font-bold text-[#2D2D2D] mb-4">Your Journey Roadmap</h3>
            <div className="space-y-4">
              {Object.entries(activitiesByLocation).map(([location, activities]: [string, any], index) => (
                <div key={location} className="flex items-start">
                  <div className="bg-[#4E6AF3] text-white rounded-full h-8 w-8 flex items-center justify-center font-bold mr-4 flex-shrink-0">{index + 1}</div>
                  <div>
                    <p className="font-semibold">{location}</p>
                    <ul className="text-sm text-gray-600 list-disc pl-5 mt-1">
                      {activities.map((activity: any) => (
                        <li key={activity.id}>{activity.title}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;