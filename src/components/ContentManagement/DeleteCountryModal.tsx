import React from 'react';
import { X, AlertTriangle } from 'lucide-react';

interface DeleteCountryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteCountryModal: React.FC<DeleteCountryModalProps> = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Confirm Deletion</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        <div className="flex items-center mb-6">
          <AlertTriangle size={48} className="text-red-500 mr-4" />
          <p className="text-gray-700">Are you sure you want to delete this country? This action cannot be undone.</p>
        </div>
        <div className="flex justify-end space-x-4">
          <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">Cancel</button>
          <button type="button" onClick={onConfirm} className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">Delete</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteCountryModal;