import { X } from 'lucide-react';
import { ActivityCategory } from '../../types';

interface ViewActivityCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  category: ActivityCategory | null;
}

const ViewActivityCategoryModal = ({ isOpen, onClose, category }: ViewActivityCategoryModalProps) => {
  if (!isOpen || !category) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-[#2D2D2D]">Activity Category Details</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500">Name</h3>
            <p className="text-base text-gray-900">{category.name}</p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500">Slug</h3>
            <p className="text-base text-gray-900">/{category.slug}</p>
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewActivityCategoryModal;