import { Plus, Search, Eye, Pencil, Trash2, MapPin } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getLocations, addLocation, updateLocation, deleteLocation } from '../../services/api';
import { Location } from '../../types';
import AddLocationModal from './AddLocationModal';
import EditLocationModal from './EditLocationModal';
import ViewLocationModal from './ViewLocationModal';
import DeleteLocationModal from './DeleteLocationModal';

const Locations = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const data = await getLocations();
        setLocations(data);
      } catch (err) {
        setError('Failed to fetch locations');
      } finally {
        setLoading(false);
      }
    };
    fetchLocations();
  }, []);

  const handleAddLocation = async (newLocation: Omit<Location, 'id' | 'createdAt'>) => {
    try {
      const addedLocation = await addLocation(newLocation);
      setLocations(prev => [addedLocation, ...prev]);
      setIsModalOpen(false);
    } catch (err) {
      setError('Failed to add location');
    }
  };

  const handleViewLocation = (location: Location) => {
    setSelectedLocation(location);
    setIsViewModalOpen(true);
  };

  const handleEditLocation = (location: Location) => {
    setSelectedLocation(location);
    setIsEditModalOpen(true);
  };

  const handleDeleteLocation = (location: Location) => {
    setSelectedLocation(location);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedLocation) return;
    try {
      await deleteLocation(selectedLocation.id);
      setLocations(locations.filter(l => l.id !== selectedLocation.id));
      setIsDeleteModalOpen(false);
      setSelectedLocation(null);
    } catch (err) {
      setError('Failed to delete location');
    }
  };

  const handleUpdateLocation = async (updatedLocation: Location) => {
    if (!updatedLocation) return;
    try {
      const returnedLocation = await updateLocation(updatedLocation.id, updatedLocation);
      setLocations(locations.map(l => l.id === returnedLocation.id ? returnedLocation : l));
      setIsEditModalOpen(false);
      setSelectedLocation(null);
    } catch (err) {
      setError('Failed to update location');
    }
  };

  const filteredLocations = locations.filter(location =>
    location.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#2D2D2D]">Locations</h1>
          <p className="text-[#9CA3AF]">Manage destination locations</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="bg-[#4E6AF3] hover:bg-[#3C56C6] text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
          <Plus className="w-4 h-4" />
          <span>Add Location</span>
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#9CA3AF] w-4 h-4" />
          <input
            type="text"
            placeholder="Search locations..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4E6AF3] focus:border-transparent"
          />
        </div>
      </div>

      {/* Locations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLocations.map((location) => (
          <div key={location.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
            <div className="relative">
              <img 
                src={location.image} 
                alt={location.name}
                className="w-full h-48 object-cover"
              />
            </div>
            
            <div className="p-6">
              <div className="flex items-center space-x-2 mb-2">
                <MapPin className="w-4 h-4 text-[#4E6AF3]" />
                <h3 className="text-lg font-semibold text-[#2D2D2D]">{location.name}</h3>
              </div>
              
              <p className="text-sm text-[#6B7280] mb-4 line-clamp-2">{location.description}</p>
              
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#6B7280]">/{location.slug}</span>
                <div className="flex items-center space-x-2">
                  <button onClick={() => handleViewLocation(location)} className="text-blue-500 hover:text-blue-700">
                    <Eye size={20} />
                  </button>
                  <button onClick={() => handleEditLocation(location)} className="text-yellow-500 hover:text-yellow-700">
                    <Pencil size={20} />
                  </button>
                  <button onClick={() => handleDeleteLocation(location)} className="text-red-500 hover:text-red-700">
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {filteredLocations.length === 0 && (
        <div className="text-center py-12">
          <MapPin className="w-12 h-12 text-[#9CA3AF] mx-auto mb-4" />
          <h3 className="text-lg font-medium text-[#2D2D2D] mb-2">No locations found</h3>
          <p className="text-[#9CA3AF]">Try adjusting your search terms or add a new location.</p>
        </div>
      )}

      <AddLocationModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onAddLocation={handleAddLocation} 
      />
      <ViewLocationModal isOpen={isViewModalOpen} onClose={() => setIsViewModalOpen(false)} location={selectedLocation} />
      <EditLocationModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} location={selectedLocation} onUpdateLocation={handleUpdateLocation} />
      <DeleteLocationModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} onConfirm={handleConfirmDelete} />
    </div>
  );
};

export default Locations;