import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Location } from '../../types';

interface EditLocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  location: Location | null;
  onUpdateLocation: (updatedLocation: Location) => void;
}

const EditLocationModal: React.FC<EditLocationModalProps> = ({ isOpen, onClose, location, onUpdateLocation }) => {
  const [updatedLocation, setUpdatedLocation] = useState<Location | null>(null);

  useEffect(() => {
    if (location) {
      setUpdatedLocation(location);
    }
  }, [location]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (updatedLocation) {
      const { name, value } = e.target;
      setUpdatedLocation({ ...updatedLocation, [name]: value });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (updatedLocation) {
      onUpdateLocation(updatedLocation);
    }
  };

  if (!isOpen || !updatedLocation) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Edit Location</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <input type="text" name="name" placeholder="Location Name" value={updatedLocation.name} onChange={handleChange} className="w-full p-2 border rounded" required />
            <input type="text" name="slug" placeholder="Slug" value={updatedLocation.slug} onChange={handleChange} className="w-full p-2 border rounded" required />
            <input type="text" name="image" placeholder="Image URL" value={updatedLocation.image} onChange={handleChange} className="w-full p-2 border rounded" required />
          </div>
          <textarea name="description" placeholder="Description" value={updatedLocation.description} onChange={handleChange} className="w-full p-2 border rounded" rows={4} required></textarea>
          <div className="flex justify-end space-x-4">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Update Location</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditLocationModal;