import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Location } from '../../types';

interface AddLocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddLocation: (newLocation: Omit<Location, 'id' | 'createdAt'>) => void;
}

const AddLocationModal: React.FC<AddLocationModalProps> = ({ isOpen, onClose, onAddLocation }) => {
  const [newLocation, setNewLocation] = useState<Omit<Location, 'id' | 'createdAt'>>({
    name: '',
    slug: '',
    description: '',
    image: '',
  });

  // Auto-generate slug from name
  useEffect(() => {
    if (newLocation.name) {
      const slug = newLocation.name
        .toLowerCase()
        .replace(/[^\w\s-]/g, '') // Remove special characters
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .replace(/-+/g, '-'); // Replace multiple hyphens with single hyphen
      
      setNewLocation(prev => ({ ...prev, slug }));
    }
  }, [newLocation.name]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewLocation({ ...newLocation, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Ensure slug is not empty
    if (!newLocation.slug) {
      alert("Slug cannot be empty. Please enter a valid name.");
      return;
    }
    onAddLocation(newLocation);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Add New Location</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <input type="text" name="name" placeholder="Location Name" value={newLocation.name} onChange={handleChange} className="w-full p-2 border rounded" required />
            <input type="text" name="slug" placeholder="Slug" value={newLocation.slug} onChange={handleChange} className="w-full p-2 border rounded" required />
            <input type="text" name="image" placeholder="Image URL" value={newLocation.image} onChange={handleChange} className="w-full p-2 border rounded" required />
          </div>
          <textarea name="description" placeholder="Description" value={newLocation.description} onChange={handleChange} className="w-full p-2 border rounded" rows={4} required></textarea>
          <div className="flex justify-end space-x-4">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Add Location</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddLocationModal;