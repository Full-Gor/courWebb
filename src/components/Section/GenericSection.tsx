import React, { useState } from 'react';
import { Category, MediaFile, TextContent } from '../../types';
import CategoryCard from '../Course/CategoryCard';
import CategoryModal from '../Course/CategoryModal';
import AdminPanel from '../Admin/AdminPanel';
import { Plus, Settings } from 'lucide-react';

interface GenericSectionProps {
  sectionId: string;
  sectionName: string;
  description: string;
  isAdmin?: boolean;
}

const GenericSection: React.FC<GenericSectionProps> = ({
  sectionId,
  sectionName,
  description,
  isAdmin = false
}) => {
  const [categories, setCategories] = useState<Category[]>([
    {
      id: `${sectionId}-1`,
      name: 'Catégorie 1',
      description: 'Description de la première catégorie',
      mediaFiles: [],
      textContent: [],
      createdDate: new Date().toISOString().split('T')[0]
    },
    {
      id: `${sectionId}-2`,
      name: 'Catégorie 2',
      description: 'Description de la deuxième catégorie',
      mediaFiles: [],
      textContent: [],
      createdDate: new Date().toISOString().split('T')[0]
    },
    {
      id: `${sectionId}-3`,
      name: 'Catégorie 3',
      description: 'Description de la troisième catégorie',
      mediaFiles: [],
      textContent: [],
      createdDate: new Date().toISOString().split('T')[0]
    }
  ]);

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
      setCategories(prev => prev.filter(cat => cat.id !== categoryId));
    }
  };

  const handleCategorySubmit = (categoryData: Omit<Category, 'id' | 'createdDate'>) => {
    if (selectedCategory) {
      setCategories(prev => prev.map(cat =>
        cat.id === selectedCategory.id
          ? { ...selectedCategory, ...categoryData }
          : cat
      ));
    } else {
      const newCategory: Category = {
        ...categoryData,
        id: `${sectionId}-${Date.now()}`,
        createdDate: new Date().toISOString().split('T')[0]
      };
      setCategories(prev => [...prev, newCategory]);
    }
    setShowCategoryModal(false);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">{sectionName}</h1>
          <p className="text-gray-600 mt-2">{description}</p>
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

export default GenericSection;