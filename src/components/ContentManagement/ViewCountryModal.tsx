import React from 'react';
import { X } from 'lucide-react';
import { Country } from '../../types';

interface ViewCountryModalProps {
  isOpen: boolean;
  onClose: () => void;
  country: Country | null;
}

const ViewCountryModal: React.FC<ViewCountryModalProps> = ({ isOpen, onClose, country }) => {
  if (!isOpen || !country) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">{country.name}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        <div className="space-y-4">
          <div><strong>Flag:</strong> {country.flag}</div>
          <div><strong>Currency:</strong> {country.currency}</div>
          <div><strong>Image:</strong> <img src={country.image} alt={country.name} className="w-full h-auto rounded-lg" /></div>
          <div><strong>Video URL:</strong> {country.video_url}</div>
          <div><strong>Poster URL:</strong> {country.poster_url}</div>
          <div><strong>Description:</strong> {country.description}</div>
          <div><strong>Timezone:</strong> {country.timezone}</div>
        </div>
      </div>
    </div>
  );
};

export default ViewCountryModal;