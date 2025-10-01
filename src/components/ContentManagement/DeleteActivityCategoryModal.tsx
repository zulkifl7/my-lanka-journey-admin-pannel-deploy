import { X } from 'lucide-react';
import { ActivityCategory } from '../../types';

interface DeleteActivityCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  category: ActivityCategory | null;
  onDelete: () => void;
}

const DeleteActivityCategoryModal = ({ isOpen, onClose, category, onDelete }: DeleteActivityCategoryModalProps) => {
  if (!isOpen || !category) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-[#2D2D2D]">Delete Activity Category</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>

        <div className="mb-6">
          <p className="text-gray-700">
            Are you sure you want to delete the activity category <span className="font-semibold">{category.name}</span>?
          </p>
          <p className="text-gray-500 text-sm mt-2">
            This action cannot be undone.
          </p>
        </div>

        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={onDelete}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteActivityCategoryModal;