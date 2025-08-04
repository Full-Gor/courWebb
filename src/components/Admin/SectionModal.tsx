import React, { useState, useEffect } from 'react';
import { X, Save, FileText } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  icon: any;
  count: number;
  description?: string;
}

interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (category: Category) => void;
  category?: Category | null;
}

const CategoryModal: React.FC<CategoryModalProps> = ({ isOpen, onClose, onSave, category }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [count, setCount] = useState(0);
  const [selectedIcon, setSelectedIcon] = useState('FileText');

  const iconOptions = [
    { name: 'FileText', label: 'Document' },
    { name: 'BookOpen', label: 'Livre' },
    { name: 'Headphones', label: 'Audio' },
    { name: 'Video', label: 'Vidéo' },
    { name: 'Mic', label: 'Micro' },
    { name: 'Download', label: 'Téléchargement' }
  ];

  useEffect(() => {
    if (category) {
      setName(category.name);
      setDescription(category.description || '');
      setCount(category.count);
      setSelectedIcon(category.icon?.name || 'FileText');
    } else {
      setName('');
      setDescription('');
      setCount(0);
      setSelectedIcon('FileText');
    }
  }, [category]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (name.trim()) {
      const newCategory: Category = {
        id: category?.id || `category-${Date.now()}`,
        name: name.trim(),
        description: description.trim(),
        icon: { name: selectedIcon },
        count
      };
      
      onSave(newCategory);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black bg-opacity-75">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-md mx-4">
        <div className="flex justify-between items-center p-6 border-b">
          <div className="flex items-center gap-3">
            <FileText size={24} className="text-blue-600" />
                         <h3 className="text-lg font-bold text-gray-800">
               {category ? 'Modifier la catégorie' : 'Nouvelle catégorie'}
             </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                     <div>
             <label className="block text-sm font-medium text-gray-700 mb-2">
               Nom de la catégorie *
             </label>
             <input
               type="text"
               value={name}
               onChange={(e) => setName(e.target.value)}
               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
               placeholder="Nom de la catégorie"
               required
             />
           </div>

                     <div>
             <label className="block text-sm font-medium text-gray-700 mb-2">
               Description
             </label>
             <textarea
               value={description}
               onChange={(e) => setDescription(e.target.value)}
               rows={3}
               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
               placeholder="Description de la catégorie"
             />
           </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Icône
            </label>
            <select
              value={selectedIcon}
              onChange={(e) => setSelectedIcon(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {iconOptions.map((icon) => (
                <option key={icon.name} value={icon.name}>
                  {icon.label}
                </option>
              ))}
            </select>
          </div>

                     <div>
             <label className="block text-sm font-medium text-gray-700 mb-2">
               Nombre de modules
             </label>
             <input
               type="number"
               value={count}
               onChange={(e) => setCount(parseInt(e.target.value) || 0)}
               min="0"
               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
             />
           </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              <Save size={16} />
              {section ? 'Modifier' : 'Créer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryModal; 