import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { ActivityCategory } from '../../types';

interface EditActivityCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  category: ActivityCategory | null;
  onUpdateCategory: (category: ActivityCategory) => void;
}

const EditActivityCategoryModal = ({ isOpen, onClose, category, onUpdateCategory }: EditActivityCategoryModalProps) => {
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [image_url, setImageUrl] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (category) {
      setName(category.name);
      setSlug(category.slug);
      setImageUrl(category.image_url || '');
    }
  }, [category]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!slug.trim()) {
      newErrors.slug = 'Slug is required';
    } else if (!/^[a-z0-9-]+$/.test(slug)) {
      newErrors.slug = 'Slug can only contain lowercase letters, numbers, and hyphens';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!category) return;

    if (validateForm()) {
      onUpdateCategory({
        ...category,
        name,
        slug,
        image_url,
      });
    }
  };

  if (!isOpen || !category) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-[#2D2D2D]">Edit Activity Category</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4E6AF3] ${ errors.name ? 'border-red-500' : 'border-gray-300' }`}
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>

            <div>
              <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
              <input
                type="text"
                id="slug"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4E6AF3] ${ errors.slug ? 'border-red-500' : 'border-gray-300' }`}
              />
              {errors.slug && <p className="text-red-500 text-xs mt-1">{errors.slug}</p>}
              <p className="text-xs text-gray-500 mt-1">Used in URLs</p>
            </div>

            <div>
              <label htmlFor="image_url" className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
              <input
                type="text"
                id="image_url"
                value={image_url}
                onChange={(e) => setImageUrl(e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4E6AF3] ${ errors.image_url ? 'border-red-500' : 'border-gray-300' }`}
              />
              {errors.image_url && <p className="text-red-500 text-xs mt-1">{errors.image_url}</p>}
            </div>
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#4E6AF3] text-white rounded-lg hover:bg-[#3C56C6]"
            >
              Update Category
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditActivityCategoryModal;