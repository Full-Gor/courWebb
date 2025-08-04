import React from 'react';
import { Category } from '../../types';
import { Edit, Trash2, FileText, Music, Video, FileDown } from 'lucide-react';

interface CategoryCardProps {
  category: Category;
  onEdit: () => void;
  onDelete: () => void;
  isAdmin?: boolean;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, onEdit, onDelete, isAdmin = false }) => {
  const getFileIcon = (type: string) => {
    switch (type) {
      case 'mp3':
        return <Music size={16} className="text-green-600" />;
      case 'mp4':
        return <Video size={16} className="text-blue-600" />;
      case 'pdf':
        return <FileDown size={16} className="text-red-600" />;
      default:
        return <FileText size={16} className="text-gray-600" />;
    }
  };

  const totalFiles = category.mediaFiles.length;
  const totalTexts = category.textContent.length;

  return (
    <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow p-6">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold text-gray-800">{category.name}</h3>
        {isAdmin && (
          <div className="flex gap-2">
            <button
              onClick={onEdit}
              className="p-2 text-gray-600 hover:text-islamic-primary hover:bg-islamic-light rounded-lg transition-colors"
            >
              <Edit size={18} />
            </button>
            <button
              onClick={onDelete}
              className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <Trash2 size={18} />
            </button>
          </div>
        )}
      </div>

      <p className="text-gray-600 mb-4 text-sm">{category.description}</p>

      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">Fichiers multimédias:</span>
          <span className="font-semibold text-islamic-primary">{totalFiles}</span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">Contenus textuels:</span>
          <span className="font-semibold text-islamic-primary">{totalTexts}</span>
        </div>

        {category.mediaFiles.length > 0 && (
          <div>
            <p className="text-xs text-gray-500 mb-2">Derniers fichiers:</p>
            <div className="space-y-1">
              {category.mediaFiles.slice(0, 3).map((file) => (
                <div key={file.id} className="flex items-center gap-2 text-xs text-gray-600">
                  {getFileIcon(file.type)}
                  <span className="truncate">{file.name}</span>
                </div>
              ))}
              {category.mediaFiles.length > 3 && (
                <p className="text-xs text-gray-400">
                  +{category.mediaFiles.length - 3} autres fichiers
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-500">
          Créé le {new Date(category.createdDate).toLocaleDateString('fr-FR')}
        </p>
      </div>
    </div>
  );
};

export default CategoryCard;