import React from 'react';
import { X, MapPin } from 'lucide-react';
import { Location } from '../../types';

interface ViewLocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  location: Location | null;
}

const ViewLocationModal: React.FC<ViewLocationModalProps> = ({ isOpen, onClose, location }) => {
  if (!isOpen || !location) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Location Details</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>
        
        <div className="space-y-4">
          <div className="relative h-64 rounded-lg overflow-hidden">
            <img 
              src={location.image} 
              alt={location.name}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <MapPin className="w-5 h-5 text-[#4E6AF3]" />
            <h3 className="text-xl font-semibold text-[#2D2D2D]">{location.name}</h3>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium text-[#4B5563] mb-2">Description</h4>
            <p className="text-[#6B7280]">{location.description}</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-[#4B5563] mb-1">Slug</h4>
              <p className="text-[#6B7280]">/{location.slug}</p>
            </div>
            <div>
              <h4 className="font-medium text-[#4B5563] mb-1">Created At</h4>
              <p className="text-[#6B7280]">{new Date(location.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
          
          <div className="flex justify-end">
            <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">Close</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewLocationModal;