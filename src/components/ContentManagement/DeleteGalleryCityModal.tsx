import { X } from 'lucide-react';
import { GalleryCity } from '../../types';

interface DeleteGalleryCityModalProps {
  isOpen: boolean;
  onClose: () => void;
  galleryCity: GalleryCity | null;
  onDeleteGalleryCity: () => Promise<void>;
  isDeleting: boolean;
}

const DeleteGalleryCityModal = ({ 
  isOpen, 
  onClose, 
  galleryCity, 
  onDeleteGalleryCity,
  isDeleting
}: DeleteGalleryCityModalProps) => {
  if (!isOpen || !galleryCity) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-lg max-w-md w-full">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold text-[#2D2D2D]">Delete Gallery City</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>

        <div className="p-6">
          <p className="text-gray-700 mb-6">
            Are you sure you want to delete <span className="font-semibold">{galleryCity.city}</span>? 
            This action cannot be undone.
          </p>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              disabled={isDeleting}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={onDeleteGalleryCity}
              disabled={isDeleting}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg disabled:opacity-50"
            >
              {isDeleting ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteGalleryCityModal;