import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Country } from '../../types';

interface EditCountryModalProps {
  isOpen: boolean;
  onClose: () => void;
  country: Country | null;
  onUpdateCountry: (updatedCountry: Country) => void;
}

const EditCountryModal: React.FC<EditCountryModalProps> = ({ isOpen, onClose, country, onUpdateCountry }) => {
  const [updatedCountry, setUpdatedCountry] = useState<Country | null>(null);

  useEffect(() => {
    if (country) {
      setUpdatedCountry(country);
    }
  }, [country]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (updatedCountry) {
      const { name, value, type } = e.target;
      const checked = (e.target as HTMLInputElement).checked;
      setUpdatedCountry({ 
        ...updatedCountry, 
        [name]: type === 'checkbox' ? checked : value 
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (updatedCountry) {
      onUpdateCountry(updatedCountry);
    }
  };

  if (!isOpen || !updatedCountry) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Edit Country</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input type="text" name="name" value={updatedCountry.name} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Slug</label>
            <input type="text" name="slug" value={updatedCountry.slug} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Flag URL</label>
            <input type="text" name="flag" value={updatedCountry.flag || ''} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Currency</label>
            <input type="text" name="currency" value={updatedCountry.currency || ''} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Image URL</label>
            <input type="text" name="image" value={updatedCountry.image || ''} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Video URL</label>
            <input type="text" name="video_url" value={updatedCountry.video_url || ''} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Poster URL</label>
            <input type="text" name="poster_url" value={updatedCountry.poster_url || ''} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea name="description" value={updatedCountry.description} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Timezone</label>
            <input type="text" name="timezone" value={updatedCountry.timezone || ''} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
          </div>
          <div className="flex items-center">
            <input type="checkbox" name="isActive" checked={updatedCountry.isActive} onChange={handleChange} className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
            <label htmlFor="isActive" className="ml-2 block text-sm text-gray-900">Active</label>
          </div>
          <div className="flex justify-end space-x-4">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCountryModal;