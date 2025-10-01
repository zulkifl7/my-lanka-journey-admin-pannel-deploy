import { X } from 'lucide-react';
import { GalleryCity } from '../../types';

interface ViewGalleryCityModalProps {
  isOpen: boolean;
  onClose: () => void;
  galleryCity: GalleryCity | null;
}

const ViewGalleryCityModal = ({ isOpen, onClose, galleryCity }: ViewGalleryCityModalProps) => {
  if (!isOpen || !galleryCity) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold text-[#2D2D2D]">Gallery City Details</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-4">
          {galleryCity.image && (
            <div className="mb-4">
              <img 
                src={galleryCity.image} 
                alt={galleryCity.alt} 
                className="w-full h-48 object-cover rounded-lg"
              />
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">City Name</h3>
              <p className="text-base font-medium">{galleryCity.city}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500">Type</h3>
              <p className="text-base font-medium capitalize">{galleryCity.type}</p>
            </div>

            <div className="col-span-2">
              <h3 className="text-sm font-medium text-gray-500">Image Alt Text</h3>
              <p className="text-base">{galleryCity.alt}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500">Created At</h3>
              <p className="text-base">{new Date(galleryCity.createdAt).toLocaleDateString()}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500">ID</h3>
              <p className="text-base">{galleryCity.id}</p>
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewGalleryCityModal;