import { Plus, Search, Eye, Pencil, Trash2, Globe, Calendar } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getCountries, addCountry, updateCountry, deleteCountry } from '../../services/api';
import { Country } from '../../types';
import AddCountryModal from './AddCountryModal';
import EditCountryModal from './EditCountryModal';
import ViewCountryModal from './ViewCountryModal';
import DeleteCountryModal from './DeleteCountryModal';

const Countries = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const data = await getCountries();
        setCountries(data);
      } catch (err) {
        setError('Failed to fetch countries');
      } finally {
        setLoading(false);
      }
    };
    fetchCountries();
  }, []);

  const handleAddCountry = async (newCountry: Omit<Country, 'id' | 'createdAt'>) => {
    try {
      const addedCountry = await addCountry(newCountry);
      setCountries(prev => [addedCountry, ...prev]);
      setIsModalOpen(false);
    } catch (err) {
      setError('Failed to add country');
    }
  };

  const handleViewCountry = (country: Country) => {
    setSelectedCountry(country);
    setIsViewModalOpen(true);
  };

  const handleEditCountry = (country: Country) => {
    setSelectedCountry(country);
    setIsEditModalOpen(true);
  };

  const handleDeleteCountry = (country: Country) => {
    setSelectedCountry(country);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedCountry) return;
    try {
      await deleteCountry(selectedCountry.id);
      setCountries(countries.filter(c => c.id !== selectedCountry.id));
      setIsDeleteModalOpen(false);
      setSelectedCountry(null);
    } catch (err) {
      setError('Failed to delete country');
    }
  };

  const handleUpdateCountry = async (updatedCountry: Country) => {
    if (!updatedCountry) return;
    try {
      const returnedCountry = await updateCountry(updatedCountry.id, updatedCountry);
      setCountries(countries.map(c => c.id === returnedCountry.id ? returnedCountry : c));
      setIsEditModalOpen(false);
      setSelectedCountry(null);
    } catch (err) {
      setError('Failed to update country');
    }
  };

  const filteredCountries = countries.filter(country =>
    country.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#2D2D2D]">Countries</h1>
          <p className="text-[#9CA3AF]">Manage destination countries</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="bg-[#4E6AF3] hover:bg-[#3C56C6] text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
          <Plus className="w-4 h-4" />
          <span>Add Country</span>
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#9CA3AF] w-4 h-4" />
          <input
            type="text"
            placeholder="Search countries..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4E6AF3] focus:border-transparent"
          />
        </div>
      </div>

      {/* Countries Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCountries.map((country) => (
          <div key={country.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
            <div className="relative">
              <img 
                src={country.image} 
                alt={country.name}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-4 left-4">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  country.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {country.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
              <div className="absolute top-4 right-4 text-2xl">
                {country.flag}
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex items-center space-x-2 mb-2">
                <Globe className="w-4 h-4 text-[#4E6AF3]" />
                <h3 className="text-lg font-semibold text-[#2D2D2D]">{country.name}</h3>
              </div>
              
              <p className="text-sm text-[#6B7280] mb-4 line-clamp-2">{country.description}</p>
              
              <div className="flex items-center justify-between text-sm text-[#9CA3AF] mb-4">
                <span>Currency: {country.currency}</span>
                <div className="flex items-center space-x-1">
                  <Calendar className="w-3 h-3" />
                  <span>{new Date(country.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#6B7280]">/{country.slug}</span>
                <div className="flex items-center space-x-2">
                  <button onClick={() => handleViewCountry(country)} className="text-blue-500 hover:text-blue-700">
                    <Eye size={20} />
                  </button>
                  <button onClick={() => handleEditCountry(country)} className="text-yellow-500 hover:text-yellow-700">
                    <Pencil size={20} />
                  </button>
                  <button onClick={() => handleDeleteCountry(country)} className="text-red-500 hover:text-red-700">
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {filteredCountries.length === 0 && (
        <div className="text-center py-12">
          <Globe className="w-12 h-12 text-[#9CA3AF] mx-auto mb-4" />
          <h3 className="text-lg font-medium text-[#2D2D2D] mb-2">No countries found</h3>
          <p className="text-[#9CA3AF]">Try adjusting your search terms or add a new country.</p>
        </div>
      )}

      <AddCountryModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onAddCountry={handleAddCountry} 
      />
      <ViewCountryModal isOpen={isViewModalOpen} onClose={() => setIsViewModalOpen(false)} country={selectedCountry} />
      <EditCountryModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} country={selectedCountry} onUpdateCountry={handleUpdateCountry} />
      <DeleteCountryModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} onConfirm={handleConfirmDelete} />
    </div>
  );
};

export default Countries;