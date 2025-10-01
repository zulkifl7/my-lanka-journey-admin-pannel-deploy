import { Plus, Search, Eye, Pencil, Trash2, MapPin, Calendar } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getGalleryCities, addGalleryCity, updateGalleryCity, deleteGalleryCity } from '../../services/api';
import { GalleryCity } from '../../types';
import AddGalleryCityModal from './AddGalleryCityModal';
import ViewGalleryCityModal from './ViewGalleryCityModal';
import EditGalleryCityModal from './EditGalleryCityModal';
import DeleteGalleryCityModal from './DeleteGalleryCityModal';

const GalleryCities = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [galleryCities, setGalleryCities] = useState<GalleryCity[]>([]);
  const [selectedCity, setSelectedCity] = useState<GalleryCity | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchGalleryCities = async () => {
      try {
        const data = await getGalleryCities();
        setGalleryCities(data);
      } catch (err) {
        setError('Failed to fetch gallery cities');
      } finally {
        setLoading(false);
      }
    };
    fetchGalleryCities();
  }, []);

  const handleAddCity = async (galleryCity: any) => {
    try {
      const newGalleryCity = await addGalleryCity(galleryCity);
      setGalleryCities([...galleryCities, newGalleryCity]);
      setIsAddModalOpen(false);
    } catch (error) {
      console.error("Failed to add gallery city:", error);
    }
  };

  const handleUpdateCity = async (galleryCity: any) => {
    try {
      if (selectedCity) {
        const updatedGalleryCity = await updateGalleryCity(selectedCity.id, galleryCity);
        setGalleryCities(
          galleryCities.map((g) => (g.id === selectedCity.id ? updatedGalleryCity : g))
        );
        setIsEditModalOpen(false);
        setSelectedCity(null);
      }
    } catch (error) {
      console.error("Failed to update gallery city:", error);
    }
  };
  const handleViewCity = (city: GalleryCity) => {
    setSelectedCity(city);
    setIsViewModalOpen(true);
  };

  const handleEditCity = (city: GalleryCity) => {
    setSelectedCity(city);
    setIsEditModalOpen(true);
  };

  const handleDeleteCity = (city: GalleryCity) => {
    setSelectedCity(city);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedCity) return;
    try {
      await deleteGalleryCity(selectedCity.id);
      setGalleryCities(galleryCities.filter(c => c.id !== selectedCity.id));
      setIsDeleteModalOpen(false);
      setSelectedCity(null);
    } catch (err) {
      setError('Failed to delete gallery city');
    }
  };

  const filteredCities = galleryCities.filter(city =>
    city.city.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#2D2D2D]">Gallery Cities</h1>
          <p className="text-[#9CA3AF]">Manage gallery cities for the website</p>
        </div>
        <button onClick={() => setIsAddModalOpen(true)} className="bg-[#4E6AF3] hover:bg-[#3C56C6] text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
          <Plus className="w-4 h-4" />
          <span>Add City</span>
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#9CA3AF] w-4 h-4" />
          <input
            type="text"
            placeholder="Search cities..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4E6AF3] focus:border-transparent"
          />
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <p>Loading gallery cities...</p>
        </div>
      ) : error ? (
        <div className="text-center py-12 text-red-500">
          <p>{error}</p>
        </div>
      ) : (
        <>
          {/* Gallery Cities Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCities.map((city) => (
              <div key={city.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
                <div className="relative">
                  <img 
                    src={city.image} 
                    alt={city.alt}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {city.type}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center space-x-2 mb-2">
                    <MapPin className="w-4 h-4 text-[#4E6AF3]" />
                    <h3 className="text-lg font-semibold text-[#2D2D2D]">{city.city}</h3>
                  </div>
                  
                  <p className="text-sm text-[#6B7280] mb-4 line-clamp-2">{city.alt}</p>
                  
                  <div className="flex items-center justify-between text-sm text-[#9CA3AF] mb-4">
                    <span>Type: {city.type}</span>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3" />
                      <span>{new Date(city.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-end space-x-2">
                    <button onClick={() => handleViewCity(city)} className="text-blue-500 hover:text-blue-700">
                      <Eye size={20} />
                    </button>
                    <button onClick={() => handleEditCity(city)} className="text-yellow-500 hover:text-yellow-700">
                      <Pencil size={20} />
                    </button>
                    <button onClick={() => handleDeleteCity(city)} className="text-red-500 hover:text-red-700">
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {filteredCities.length === 0 && (
            <div className="text-center py-12">
              <MapPin className="w-12 h-12 text-[#9CA3AF] mx-auto mb-4" />
              <h3 className="text-lg font-medium text-[#2D2D2D] mb-2">No gallery cities found</h3>
              <p className="text-[#9CA3AF]">Try adjusting your search terms or add a new city.</p>
            </div>
          )}
        </>
      )}

      {/* Modals */}
      <AddGalleryCityModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        onAddGalleryCity={handleAddCity} 
      />
      
      <ViewGalleryCityModal 
        isOpen={isViewModalOpen} 
        onClose={() => setIsViewModalOpen(false)} 
        galleryCity={selectedCity} 
      />
      
      <EditGalleryCityModal 
        isOpen={isEditModalOpen} 
        onClose={() => setIsEditModalOpen(false)} 
        galleryCity={selectedCity} 
        onUpdateGalleryCity={handleUpdateCity} 
      />
      
      <DeleteGalleryCityModal 
        isOpen={isDeleteModalOpen} 
        onClose={() => setIsDeleteModalOpen(false)} 
        galleryCity={selectedCity} 
        onDeleteCity={handleConfirmDelete} 
        isDeleting={loading} 
      />
    </div>
  );
};

export default GalleryCities;