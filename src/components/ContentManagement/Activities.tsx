import React, { useState, useEffect } from 'react';
import { Plus, Search, CreditCard as Edit2, Trash2, Eye, Activity, DollarSign, Users, Clock, X } from 'lucide-react';
import { Activity as ActivityType, ActivityCategory, Location } from '../../types';
import { getActivities, getActivityCategories, getLocations, addActivity, updateActivity, deleteActivity } from '../../services/api';
import { useNavigate } from 'react-router-dom';

const Activities: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterLocation, setFilterLocation] = useState<string>('all');
  const [activities, setActivities] = useState<ActivityType[]>([]);
  const [categories, setCategories] = useState<ActivityCategory[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentActivity, setCurrentActivity] = useState<ActivityType | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    price: 0,
    duration: '',
    image: '',
    activity_category_id: '',
    location_id: ''
  });

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [activitiesData, categoriesData, locationsData] = await Promise.all([
          getActivities(),
          getActivityCategories(),
          getLocations()
        ]);
        
        setActivities(activitiesData);
        setCategories(categoriesData);
        setLocations(locationsData);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load data. Please try again.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter activities based on search term, category, and location
  const filteredActivities = activities.filter(activity => {
    const matchesSearch = activity.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         activity.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || 
                           (activity.activity_category_id && activity.activity_category_id.toString() === filterCategory) ||
                           (activity.activityCategory && activity.activityCategory.id.toString() === filterCategory);
    const matchesLocation = filterLocation === 'all' || 
                           (activity.location && activity.location.id.toString() === filterLocation);
    return matchesSearch && matchesCategory && matchesLocation;
  });

  // Helper functions
  const getCategoryName = (categoryId: string) => {
    const category = categories.find(cat => cat.id.toString() === categoryId);
    return category ? category.name : 'Unknown';
  };

  const getLocationName = (locationId: string) => {
    const location = locations.find(loc => loc.id.toString() === locationId);
    return location ? location.name : 'Unknown';
  };

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'price' ? parseFloat(value) : value
    });
  };

  // Handle add activity
  const handleAddActivity = () => {
    setFormData({
      title: '',
      slug: '',
      description: '',
      price: 0,
      duration: '',
      image: '',
      activity_category_id: '',
      location_id: ''
    });
    setShowAddModal(true);
  };

  // Handle edit activity
  const handleEditActivity = (activity: ActivityType) => {
    setCurrentActivity(activity);
    setFormData({
      title: activity.title || '',
      slug: activity.slug || '',
      description: activity.description || '',
      price: activity.price || 0,
      duration: activity.duration || '',
      image: activity.image || '',
      activity_category_id: activity.activityCategory?.id.toString() || '',
      location_id: activity.location?.id.toString() || ''
    });
    setShowEditModal(true);
  };

  // Handle delete activity
  const handleDeleteActivity = (activity: ActivityType) => {
    setCurrentActivity(activity);
    setShowDeleteModal(true);
  };

  // Submit add activity form
  const submitAddActivity = async () => {
    try {
      // Validate required fields
      if (!formData.title || !formData.description || !formData.activity_category_id || !formData.location_id) {
        setError('Please fill in all required fields');
        return;
      }

      // Create a FormData object for multipart/form-data submission
      const formDataObj = new FormData();
      formDataObj.append('title', formData.title);
      formDataObj.append('slug', formData.slug || formData.title.toLowerCase().replace(/\s+/g, '-'));
      formDataObj.append('description', formData.description);
      formDataObj.append('price', formData.price.toString());
      formDataObj.append('duration', formData.duration);
      formDataObj.append('image', formData.image);
      formDataObj.append('activity_category_id', formData.activity_category_id);
      formDataObj.append('location_id', formData.location_id);
      
      // Log the form data being sent
      console.log('Sending form data:', Object.fromEntries(formDataObj));
      
      const newActivity = await addActivity(formDataObj);
      
      setActivities([...activities, newActivity]);
      setShowAddModal(false);
      setError(null); // Clear any previous errors
    } catch (err) {
      console.error('Error adding activity:', err);
      setError('Failed to add activity. Please try again.');
    }
  };

  // Submit edit activity form
  const submitEditActivity = async () => {
    if (!currentActivity) return;
    
    try {
      const updatedActivity = await updateActivity(parseInt(currentActivity.id), {
        title: formData.title,
        slug: formData.slug,
        description: formData.description,
        price: formData.price,
        duration: formData.duration,
        image: formData.image,
        activity_category_id: parseInt(formData.activity_category_id),
        location_id: parseInt(formData.location_id)
      });
      
      setActivities(activities.map(activity => 
        activity.id === currentActivity.id ? updatedActivity : activity
      ));
      setShowEditModal(false);
    } catch (err) {
      console.error('Error updating activity:', err);
      setError('Failed to update activity. Please try again.');
    }
  };

  // Submit delete activity
  const submitDeleteActivity = async () => {
    if (!currentActivity) return;
    
    try {
      await deleteActivity(parseInt(currentActivity.id));
      setActivities(activities.filter(activity => activity.id !== currentActivity.id));
      setShowDeleteModal(false);
    } catch (err) {
      console.error('Error deleting activity:', err);
      setError('Failed to delete activity. Please try again.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#2D2D2D]">Activities</h1>
          <p className="text-[#9CA3AF]">Manage tours and activities</p>
        </div>
        <button 
          onClick={handleAddActivity}
          className="bg-[#4E6AF3] hover:bg-[#3C56C6] text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Activity</span>
        </button>
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
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4E6AF3] focus:border-transparent"
          >
            <option value="all">All Categories</option>
            {categories.map(category => (
              <option key={category.id} value={category.id.toString()}>{category.name}</option>
            ))}
          </select>
          <select
            value={filterLocation}
            onChange={(e) => setFilterLocation(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4E6AF3] focus:border-transparent"
          >
            <option value="all">All Locations</option>
            {locations.map(location => (
              <option key={location.id} value={location.id.toString()}>{location.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4E6AF3] mx-auto mb-4"></div>
          <p className="text-[#6B7280]">Loading activities...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          <p>{error}</p>
        </div>
      )}

      {/* Activities Grid */}
      {!loading && !error && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredActivities.map((activity) => (
            <div key={activity.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
              <div className="flex">
                <div className="w-1/3">
                  <img 
                    src={activity.image || 'https://via.placeholder.com/300x200?text=No+Image'} 
                    alt={activity.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300x200?text=Error+Loading+Image';
                    }}
                  />
                </div>
                
                <div className="flex-1 p-6">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Activity className="w-4 h-4 text-[#4E6AF3]" />
                      <h3 className="text-lg font-semibold text-[#2D2D2D]">{activity.title}</h3>
                    </div>
                  </div>
                  
                  <p className="text-sm text-[#6B7280] mb-3 line-clamp-2">{activity.description}</p>
                  
                  <div className="text-xs text-[#9CA3AF] mb-3">
                    Category: {activity.activityCategory ? activity.activityCategory.name : 'Unknown'}
                  </div>
                  
                  <div className="text-xs text-[#9CA3AF] mb-3">
                    Location: {activity.location ? activity.location.name : 'Unknown'}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center space-x-1">
                      <DollarSign className="w-3 h-3 text-[#22C55E]" />
                      <span className="text-sm font-medium text-[#2D2D2D]">${activity.price}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3 text-[#F59E0B]" />
                      <span className="text-xs text-[#6B7280]">{activity.duration}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#9CA3AF]">
                      Created: {new Date(activity.created_at).toLocaleDateString()}
                    </span>
                    <div className="flex space-x-2">
                      <button 
                        className="p-1 hover:bg-gray-100 rounded text-[#6B7280] hover:text-[#4E6AF3] transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleEditActivity(activity)}
                        className="p-1 hover:bg-gray-100 rounded text-[#6B7280] hover:text-[#4E6AF3] transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDeleteActivity(activity)}
                        className="p-1 hover:bg-gray-100 rounded text-[#6B7280] hover:text-[#EF4444] transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {!loading && !error && filteredActivities.length === 0 && (
        <div className="text-center py-12">
          <Activity className="w-12 h-12 text-[#9CA3AF] mx-auto mb-4" />
          <h3 className="text-lg font-medium text-[#2D2D2D] mb-2">No activities found</h3>
          <p className="text-[#9CA3AF]">Try adjusting your search terms or add a new activity.</p>
        </div>
      )}

      {/* Add Activity Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-bold text-[#2D2D2D]">Add New Activity</h2>
              <button onClick={() => setShowAddModal(false)} className="text-[#9CA3AF] hover:text-[#2D2D2D]">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-[#4B5563]">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4E6AF3] focus:border-transparent"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-[#4B5563]">Slug</label>
                <input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4E6AF3] focus:border-transparent"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-[#4B5563]">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4E6AF3] focus:border-transparent"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-[#4B5563]">Price</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4E6AF3] focus:border-transparent"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-[#4B5563]">Duration</label>
                  <input
                    type="text"
                    name="duration"
                    value={formData.duration}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4E6AF3] focus:border-transparent"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-[#4B5563]">Image URL</label>
                <input
                  type="text"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4E6AF3] focus:border-transparent"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-[#4B5563]">Category</label>
                  <select
                    name="activity_category_id"
                    value={formData.activity_category_id}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4E6AF3] focus:border-transparent"
                  >
                    <option value="">Select a category</option>
                    {categories.map(category => (
                      <option key={category.id} value={category.id.toString()}>{category.name}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-[#4B5563]">Location</label>
                  <select
                    name="location_id"
                    value={formData.location_id}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4E6AF3] focus:border-transparent"
                  >
                    <option value="">Select a location</option>
                    {locations.map(location => (
                      <option key={location.id} value={location.id.toString()}>{location.name}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="p-6 border-t flex justify-end space-x-3">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-[#4B5563] hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={submitAddActivity}
                className="px-4 py-2 bg-[#4E6AF3] hover:bg-[#3C56C6] text-white rounded-lg"
              >
                Add Activity
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Activity Modal */}
      {showEditModal && currentActivity && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-bold text-[#2D2D2D]">Edit Activity</h2>
              <button onClick={() => setShowEditModal(false)} className="text-[#9CA3AF] hover:text-[#2D2D2D]">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-[#4B5563]">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4E6AF3] focus:border-transparent"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-[#4B5563]">Slug</label>
                <input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4E6AF3] focus:border-transparent"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-[#4B5563]">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4E6AF3] focus:border-transparent"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-[#4B5563]">Price</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4E6AF3] focus:border-transparent"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-[#4B5563]">Duration</label>
                  <input
                    type="text"
                    name="duration"
                    value={formData.duration}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4E6AF3] focus:border-transparent"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-[#4B5563]">Image URL</label>
                <input
                  type="text"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4E6AF3] focus:border-transparent"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-[#4B5563]">Category</label>
                  <select
                    name="activity_category_id"
                    value={formData.activity_category_id}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4E6AF3] focus:border-transparent"
                  >
                    <option value="">Select a category</option>
                    {categories.map(category => (
                      <option key={category.id} value={category.id.toString()}>{category.name}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-[#4B5563]">Location</label>
                  <select
                    name="location_id"
                    value={formData.location_id}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4E6AF3] focus:border-transparent"
                  >
                    <option value="">Select a location</option>
                    {locations.map(location => (
                      <option key={location.id} value={location.id.toString()}>{location.name}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="p-6 border-t flex justify-end space-x-3">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-[#4B5563] hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={submitEditActivity}
                className="px-4 py-2 bg-[#4E6AF3] hover:bg-[#3C56C6] text-white rounded-lg"
              >
                Update Activity
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Activity Modal */}
      {showDeleteModal && currentActivity && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg max-w-md w-full">
            <div className="p-6">
              <h2 className="text-xl font-bold text-[#2D2D2D] mb-4">Delete Activity</h2>
              <p className="text-[#4B5563] mb-6">
                Are you sure you want to delete <span className="font-semibold">{currentActivity.title}</span>? This action cannot be undone.
              </p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-[#4B5563] hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={submitDeleteActivity}
                  className="px-4 py-2 bg-[#EF4444] hover:bg-[#DC2626] text-white rounded-lg"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Activities;