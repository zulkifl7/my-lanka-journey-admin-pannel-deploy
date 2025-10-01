import { Plus, Search, Eye, Pencil, Trash2, Tag } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getActivityCategories, addActivityCategory, updateActivityCategory, deleteActivityCategory } from '../../services/api';
import { ActivityCategory } from '../../types';
import { toast } from 'react-hot-toast';
import AddActivityCategoryModal from './AddActivityCategoryModal';
import EditActivityCategoryModal from './EditActivityCategoryModal';
import ViewActivityCategoryModal from './ViewActivityCategoryModal';
import DeleteActivityCategoryModal from './DeleteActivityCategoryModal';

const ActivityCategories = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categories, setCategories] = useState<ActivityCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<ActivityCategory | null>(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getActivityCategories();
        setCategories(data);
      } catch (err) {
        setError('Failed to fetch activity categories');
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const handleAddCategory = async (newCategory: Omit<ActivityCategory, 'id' | 'createdAt'>) => {
    try {
      const addedCategory = await addActivityCategory(newCategory);
      setCategories(prev => [addedCategory, ...prev]);
      setIsModalOpen(false);
    } catch (err) {
      setError('Failed to add activity category');
    }
  };

  const handleViewCategory = (category: ActivityCategory) => {
    setSelectedCategory(category);
    setIsViewModalOpen(true);
  };

  const handleEditCategory = (category: ActivityCategory) => {
    setSelectedCategory(category);
    setIsEditModalOpen(true);
  };

  const handleDeleteCategory = (category: ActivityCategory) => {
    setSelectedCategory(category);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedCategory) return;

    try {
      await deleteActivityCategory(selectedCategory.id);
      setCategories(categories.filter(c => c.id !== selectedCategory.id));
      setIsDeleteModalOpen(false);
      setSelectedCategory(null);
    } catch (err) {
      setError('Failed to delete activity category');
    }
  };

  const handleUpdateCategory = async (updatedCategory: ActivityCategory) => {
    if (!updatedCategory) return;
    try {
      const returnedCategory = await updateActivityCategory(updatedCategory.id, updatedCategory);
      setCategories(categories.map(c => c.id === returnedCategory.id ? returnedCategory : c));
      setIsEditModalOpen(false);
      setSelectedCategory(null);
    } catch (err) {
      setError('Failed to update activity category');
    }
  };

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#2D2D2D]">Activity Categories</h1>
          <p className="text-[#9CA3AF]">Manage activity categories</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="bg-[#4E6AF3] hover:bg-[#3C56C6] text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
          <Plus className="w-4 h-4" />
          <span>Add Category</span>
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#9CA3AF] w-4 h-4" />
          <input
            type="text"
            placeholder="Search categories..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4E6AF3] focus:border-transparent"
          />
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCategories.map((category) => (
          <div key={category.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
            <div className="h-40 bg-gray-200 flex items-center justify-center">
              {category.image_url ? (
                <img src={category.image_url} alt={category.name} className="h-full w-full object-cover" />
              ) : (
                <Tag className="w-12 h-12 text-gray-400" />
              )}
            </div>
            <div className="p-6">
              <div className="flex items-center space-x-2 mb-2">
                <Tag className="w-4 h-4 text-[#4E6AF3]" />
                <h3 className="text-lg font-semibold text-[#2D2D2D]">{category.name}</h3>
              </div>

              <div className="flex items-center justify-between mt-4">
                <span className="text-xs text-[#6B7280]">/{category.slug}</span>
                <div className="flex items-center space-x-2">
                  <button onClick={() => handleViewCategory(category)} className="text-blue-500 hover:text-blue-700">
                    <Eye size={20} />
                  </button>
                  <button onClick={() => handleEditCategory(category)} className="text-yellow-500 hover:text-yellow-700">
                    <Pencil size={20} />
                  </button>
                  <button onClick={() => handleDeleteCategory(category)} className="text-red-500 hover:text-red-700">
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredCategories.length === 0 && (
        <div className="text-center py-12">
          <Tag className="w-12 h-12 text-[#9CA3AF] mx-auto mb-4" />
          <h3 className="text-lg font-medium text-[#2D2D2D] mb-2">No categories found</h3>
          <p className="text-[#9CA3AF]">Try adjusting your search terms or add a new category.</p>
        </div>
      )}

      <AddActivityCategoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddCategory={handleAddCategory}
      />
      <ViewActivityCategoryModal isOpen={isViewModalOpen} onClose={() => setIsViewModalOpen(false)} category={selectedCategory} />
      <EditActivityCategoryModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} category={selectedCategory} onUpdateCategory={handleUpdateCategory} />
      <DeleteActivityCategoryModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} category={selectedCategory} onDelete={handleConfirmDelete} />
    </div>
  );
};

export default ActivityCategories;