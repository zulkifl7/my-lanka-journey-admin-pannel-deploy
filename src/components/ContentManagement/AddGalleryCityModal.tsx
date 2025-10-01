import { useState } from 'react';
import { X } from 'lucide-react';

interface AddGalleryCityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddGalleryCity: (galleryCity: any) => Promise<void>;
}

const AddGalleryCityModal = ({ isOpen, onClose, onAddGalleryCity }: AddGalleryCityModalProps) => {
  const [city, setCity] = useState('');
  const [image, setImage] = useState('');
  const [alt, setAlt] = useState('');
  const [type, setType] = useState('default');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const galleryCity = { city, image, alt, type };
    onAddGalleryCity(galleryCity);
    resetForm();
  };

  const resetForm = () => {
    setCity('');
    setImage('');
    setAlt('');
    setType('default');
    setError(null);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold text-[#2D2D2D]">Add Gallery City</h2>
          <button onClick={handleClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <label htmlFor="city" className="block text-sm font-medium text-gray-700">
              City Name *
            </label>
            <input
              type="text"
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4E6AF3] focus:border-transparent"
              placeholder="Enter city name"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">
              Image URL/Path *
            </label>
            <input
              type="text"
              id="image"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4E6AF3] focus:border-transparent"
              placeholder="Enter image URL"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="alt" className="block text-sm font-medium text-gray-700">
              Image Alt Text *
            </label>
            <input
              type="text"
              id="alt"
              value={alt}
              onChange={(e) => setAlt(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4E6AF3] focus:border-transparent"
              placeholder="Enter image alt text"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="type" className="block text-sm font-medium text-gray-700">
              Type *
            </label>
            <select
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4E6AF3] focus:border-transparent"
            >
              <option value="default">Default</option>
              <option value="alternative">Alternative</option>
            </select>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-[#4E6AF3] hover:bg-[#3C56C6] text-white rounded-lg disabled:opacity-50"
            >
              {loading ? 'Adding...' : 'Add Gallery City'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddGalleryCityModal;