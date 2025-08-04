import React, { useState } from 'react';
import { Category } from '../../types';
import CategoryCard from './CategoryCard';
import CategoryModal from './CategoryModal';
import AdminPanel from '../Admin/AdminPanel';
import { Plus, Settings } from 'lucide-react';

interface CourseSectionProps {
  courseId: string;
  courseName: string;
  categories: Category[];
  onCategoriesUpdate: (categories: Category[]) => void;
  isAdmin?: boolean;
}

const CourseSection: React.FC<CourseSectionProps> = ({
  courseId,
  courseName,
  categories,
  onCategoriesUpdate,
  isAdmin = false
}) => {
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const handleAddCategory = () => {
    setSelectedCategory(null);
    setShowCategoryModal(true);
  };

  const handleEditCategory = (category: Category) => {
    setSelectedCategory(category);
    setShowCategoryModal(true);
  };

  const handleDeleteCategory = (categoryId: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette catégorie et tout son contenu ?')) {
      const updatedCategories = categories.filter(cat => cat.id !== categoryId);
      onCategoriesUpdate(updatedCategories);
    }
  };

  const handleCategorySubmit = (categoryData: Omit<Category, 'id' | 'createdDate'>) => {
    if (selectedCategory) {
      // Modifier une catégorie existante
      const updatedCategories = categories.map(cat =>
        cat.id === selectedCategory.id
          ? { ...selectedCategory, ...categoryData }
          : cat
      );
      onCategoriesUpdate(updatedCategories);
    } else {
      // Ajouter une nouvelle catégorie
      const newCategory: Category = {
        ...categoryData,
        id: `${courseId}-${Date.now()}`,
        createdDate: new Date().toISOString().split('T')[0]
      };
      onCategoriesUpdate([...categories, newCategory]);
    }
    setShowCategoryModal(false);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">{courseName}</h1>
          <p className="text-gray-600 mt-2">
            Gérez les catégories et le contenu de cette section
          </p>
        </div>
        {isAdmin && (
          <div className="flex gap-3">
            <button
              onClick={() => setShowAdminPanel(true)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              <Settings size={20} />
              Admin
            </button>
            <button
              onClick={handleAddCategory}
              className="flex items-center gap-2 px-4 py-2 bg-islamic-primary text-white rounded-lg hover:bg-islamic-dark transition-colors"
            >
              <Plus size={20} />
              Nouvelle Catégorie
            </button>
          </div>
        )}
      </div>

      {categories.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg mb-4">Aucune catégorie dans cette section</p>
          {isAdmin && (
            <button
              onClick={handleAddCategory}
              className="px-6 py-3 bg-islamic-primary text-white rounded-lg hover:bg-islamic-dark transition-colors"
            >
              Créer la première catégorie
            </button>
          )}
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              onEdit={() => handleEditCategory(category)}
              onDelete={() => handleDeleteCategory(category.id)}
              isAdmin={isAdmin}
            />
          ))}
        </div>
      )}

      {showCategoryModal && (
        <CategoryModal
          category={selectedCategory}
          onSubmit={handleCategorySubmit}
          onClose={() => setShowCategoryModal(false)}
        />
      )}

      {showAdminPanel && (
        <AdminPanel
          categoryId={selectedCategory?.id || ''}
          onClose={() => setShowAdminPanel(false)}
        />
      )}
    </div>
  );
};

export default CourseSection;