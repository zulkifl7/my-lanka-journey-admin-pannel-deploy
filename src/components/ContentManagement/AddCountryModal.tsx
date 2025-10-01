import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Country } from '../../types';

interface AddCountryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddCountry: (newCountry: Omit<Country, 'id' | 'createdAt'>) => void;
}

const AddCountryModal: React.FC<AddCountryModalProps> = ({ isOpen, onClose, onAddCountry }) => {
  const [newCountry, setNewCountry] = useState<Omit<Country, 'id' | 'createdAt'>>({
    name: '',
    slug: '',
    flag: '',
    currency: '',
    image: '',
    video_url: '',
    poster_url: '',
    description: '',
    timezone: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewCountry(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddCountry(newCountry);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Add New Country</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" name="name" placeholder="Name" value={newCountry.name} onChange={handleChange} className="w-full p-2 border rounded" required />
            <input type="text" name="slug" placeholder="Slug" value={newCountry.slug} onChange={handleChange} className="w-full p-2 border rounded" required />
            <input type="text" name="flag" placeholder="Flag Emoji" value={newCountry.flag} onChange={handleChange} className="w-full p-2 border rounded" />
            <input type="text" name="currency" placeholder="Currency Code" value={newCountry.currency} onChange={handleChange} className="w-full p-2 border rounded" />
            <input type="text" name="image" placeholder="Image URL" value={newCountry.image} onChange={handleChange} className="w-full p-2 border rounded" />
            <input type="text" name="video_url" placeholder="Video URL" value={newCountry.video_url} onChange={handleChange} className="w-full p-2 border rounded" />
            <input type="text" name="poster_url" placeholder="Poster URL" value={newCountry.poster_url} onChange={handleChange} className="w-full p-2 border rounded" />
            <input type="text" name="timezone" placeholder="Timezone" value={newCountry.timezone} onChange={handleChange} className="w-full p-2 border rounded" />
          </div>
          <textarea name="description" placeholder="Description" value={newCountry.description} onChange={handleChange} className="w-full p-2 border rounded" rows={4}></textarea>
          <div className="flex justify-end space-x-4">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Add Country</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCountryModal;