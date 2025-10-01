import React from 'react';
import { X, AlertTriangle } from 'lucide-react';

interface DeleteLocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteLocationModal: React.FC<DeleteLocationModalProps> = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Delete Location</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center space-x-3 text-amber-500">
            <AlertTriangle size={24} />
            <h3 className="text-lg font-medium">Confirm Deletion</h3>
          </div>
          
          <p className="text-[#6B7280]">
            Are you sure you want to delete this location? This action cannot be undone and may affect any activities associated with this location.
          </p>
          
          <div className="flex justify-end space-x-4">
            <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">Cancel</button>
            <button onClick={onConfirm} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteLocationModal;