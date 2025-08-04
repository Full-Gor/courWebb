import React, { useState } from 'react';
import { X, Plus, Edit, Trash2, FileText, Video, Music, Upload, Save, ArrowLeft } from 'lucide-react';
import { Category, MediaFile, TextContent } from '../../types';
import MediaPlayer from '../MediaPlayer';

interface CategoryManagerProps {
  onClose: () => void;
  onSave: (categories: Category[]) => void;
  initialCategories: Category[];
}

const CategoryManager: React.FC<CategoryManagerProps> = ({ onClose, onSave, initialCategories }) => {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showTextModal, setShowTextModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState<MediaFile | null>(null);
  const [selectedContent, setSelectedContent] = useState<TextContent | null>(null);
  
  // États pour les modales
  const [categoryName, setCategoryName] = useState('');
  const [categoryDescription, setCategoryDescription] = useState('');
  const [textTitle, setTextTitle] = useState('');
  const [textContent, setTextContent] = useState('');

  const handleAddCategory = () => {
    console.log('🔵 Bouton Ajouter catégorie cliqué');
    setCategoryName('');
    setCategoryDescription('');
    setShowCategoryModal(true);
  };

  const handleEditCategory = (category: Category) => {
    console.log('🔵 Bouton Modifier catégorie cliqué:', category);
    setSelectedCategory(category);
    setCategoryName(category.name);
    setCategoryDescription(category.description);
    setShowCategoryModal(true);
  };

  const handleDeleteCategory = (categoryId: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette catégorie ?')) {
      setCategories(prev => prev.filter(cat => cat.id !== categoryId));
    }
  };

  const handleCategorySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Soumission catégorie:', { categoryName, categoryDescription, selectedCategory });
    
    // Pour la création, on exige les deux champs
    if (!selectedCategory && (!categoryName.trim() || !categoryDescription.trim())) {
      alert('Veuillez remplir tous les champs pour créer une nouvelle catégorie.');
      return;
    }
    
    // Pour la modification, on permet des champs vides
    if (selectedCategory) {
      // Modifier la catégorie existante
      setCategories(prev => prev.map(cat =>
        cat.id === selectedCategory.id
          ? { ...cat, name: categoryName.trim() || cat.name, description: categoryDescription.trim() || cat.description }
          : cat
      ));
    } else {
      // Créer une nouvelle catégorie
      const newCategory: Category = {
        id: `category-${Date.now()}`,
        name: categoryName,
        description: categoryDescription,
        mediaFiles: [],
        textContent: [],
        createdDate: new Date().toISOString().split('T')[0]
      };
      setCategories(prev => [...prev, newCategory]);
    }
    setShowCategoryModal(false);
    setSelectedCategory(null);
    setCategoryName('');
    setCategoryDescription('');
  };

  const handleFileUpload = (categoryId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        const fileType = file.name.split('.').pop()?.toLowerCase();
        if (fileType && ['mp3', 'mp4', 'pdf'].includes(fileType)) {
          const newFile: MediaFile = {
            id: `file-${Date.now()}-${Math.random()}`,
            name: file.name,
            type: fileType as 'mp3' | 'mp4' | 'pdf',
            url: URL.createObjectURL(file),
            size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
            duration: fileType === 'mp3' || fileType === 'mp4' ? '00:00' : undefined,
            uploadDate: new Date().toISOString().split('T')[0]
          };
          setCategories(prev => prev.map(cat =>
            cat.id === categoryId
              ? { ...cat, mediaFiles: [...cat.mediaFiles, newFile] }
              : cat
          ));
        }
      });
    }
  };

  const handleDeleteFile = (categoryId: string, fileId: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce fichier ?')) {
      setCategories(prev => prev.map(cat =>
        cat.id === categoryId
          ? { ...cat, mediaFiles: cat.mediaFiles.filter(file => file.id !== fileId) }
          : cat
      ));
    }
  };

  const handlePlayFile = (file: MediaFile) => {
    setSelectedFile(file);
  };

  const handleTextSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Soumission texte:', { textTitle, textContent, selectedCategory, selectedContent });
    if (textTitle.trim() && textContent.trim() && selectedCategory) {
      if (selectedContent) {
        // Modifier le contenu existant
        setCategories(prev => prev.map(cat =>
          cat.id === selectedCategory.id
            ? {
                ...cat,
                textContent: cat.textContent.map(content =>
                  content.id === selectedContent.id
                    ? { ...content, title: textTitle, content: textContent }
                    : content
                )
              }
            : cat
        ));
      } else {
        // Créer un nouveau contenu
        const newContent: TextContent = {
          id: `text-${Date.now()}`,
          title: textTitle,
          content: textContent,
          createdDate: new Date().toISOString().split('T')[0]
        };
        setCategories(prev => prev.map(cat =>
          cat.id === selectedCategory.id
            ? { ...cat, textContent: [...cat.textContent, newContent] }
            : cat
        ));
      }
      setShowTextModal(false);
      setTextTitle('');
      setTextContent('');
      setSelectedContent(null);
    }
  };

  const handleEditText = (content: TextContent) => {
    setSelectedContent(content);
    setTextTitle(content.title);
    setTextContent(content.content);
    setShowTextModal(true);
  };

  const handleDeleteText = (categoryId: string, contentId: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce contenu ?')) {
      setCategories(prev => prev.map(cat =>
        cat.id === categoryId
          ? { ...cat, textContent: cat.textContent.filter(content => content.id !== contentId) }
          : cat
      ));
    }
  };

  const handleSave = () => {
    onSave(categories);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl mx-4 max-h-[90vh] overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-bold text-gray-800">Gestionnaire de Catégories</h2>
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Save size={16} />
              Sauvegarder
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[70vh]">
          <div className="mb-6">
            <button
              onClick={handleAddCategory}
              className="flex items-center gap-2 px-4 py-2 bg-islamic-primary text-white rounded-lg hover:bg-islamic-dark transition-colors"
            >
              <Plus size={20} />
              Nouvelle Catégorie
            </button>
          </div>

          <div className="grid gap-6">
            {categories.map((category) => (
              <div key={category.id} className="border rounded-lg p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-800">{category.name}</h3>
                    <p className="text-gray-600 mt-1">{category.description}</p>
                    <p className="text-sm text-gray-500 mt-2">
                      Créé le {new Date(category.createdDate).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditCategory(category)}
                      className="p-2 text-gray-600 hover:text-islamic-primary hover:bg-islamic-light rounded-lg transition-colors"
                      title="Modifier la catégorie"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => handleDeleteCategory(category.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Supprimer la catégorie"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>

                {/* Fichiers multimédias */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-medium text-gray-800">Fichiers Multimédias</h4>
                    <label className="flex items-center gap-2 px-3 py-1 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700 transition-colors text-sm">
                      <Upload size={16} />
                      Ajouter des fichiers
                      <input
                        type="file"
                        multiple
                        accept=".mp3,.mp4,.pdf"
                        onChange={(e) => handleFileUpload(category.id, e)}
                        className="hidden"
                      />
                    </label>
                  </div>
                  
                  <div className="space-y-2">
                    {category.mediaFiles.map((file) => (
                      <div key={file.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <h5 className="font-medium text-gray-800">{file.name}</h5>
                          <div className="flex gap-4 text-sm text-gray-500 mt-1">
                            <span>Type: {file.type.toUpperCase()}</span>
                            <span>Taille: {file.size}</span>
                            {file.duration && <span>Durée: {file.duration}</span>}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handlePlayFile(file)}
                            className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                            title="Lire le fichier"
                          >
                            ▶️
                          </button>
                          <button
                            onClick={() => handleDeleteFile(category.id, file.id)}
                            className="p-1 text-red-600 hover:bg-red-50 rounded"
                            title="Supprimer le fichier"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                    
                    {category.mediaFiles.length === 0 && (
                      <p className="text-center text-gray-500 py-4">
                        Aucun fichier multimédia dans cette catégorie
                      </p>
                    )}
                  </div>
                </div>

                {/* Contenus textuels */}
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-medium text-gray-800">Contenus Textuels</h4>
                                         <button
                       onClick={() => {
                         console.log('🔵 Bouton Ajouter contenu cliqué pour catégorie:', category.id);
                         setSelectedCategory(category);
                         setShowTextModal(true);
                       }}
                       className="flex items-center gap-2 px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                     >
                      <Plus size={16} />
                      Ajouter du contenu
                    </button>
                  </div>
                  
                  <div className="space-y-2">
                    {category.textContent.map((content) => (
                      <div key={content.id} className="p-3 bg-gray-50 rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <h5 className="font-medium text-gray-800">{content.title}</h5>
                          <div className="flex gap-2">
                            <button
                              onClick={() => {
                                setSelectedCategory(category);
                                handleEditText(content);
                              }}
                              className="p-1 text-gray-600 hover:text-islamic-primary rounded"
                              title="Modifier le contenu"
                            >
                              <Edit size={16} />
                            </button>
                            <button
                              onClick={() => handleDeleteText(category.id, content.id)}
                              className="p-1 text-red-600 hover:bg-red-50 rounded"
                              title="Supprimer le contenu"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                        <p className="text-gray-600 text-sm line-clamp-2">{content.content}</p>
                        <p className="text-xs text-gray-500 mt-2">
                          Créé le {new Date(content.createdDate).toLocaleDateString('fr-FR')}
                        </p>
                      </div>
                    ))}
                    
                    {category.textContent.length === 0 && (
                      <p className="text-center text-gray-500 py-4">
                        Aucun contenu textuel dans cette catégorie
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {categories.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg mb-4">Aucune catégorie créée</p>
                <button
                  onClick={handleAddCategory}
                  className="px-6 py-3 bg-islamic-primary text-white rounded-lg hover:bg-islamic-dark transition-colors"
                >
                  Créer la première catégorie
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal pour ajouter/modifier une catégorie */}
      {showCategoryModal && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
            <div className="flex justify-between items-center p-6 border-b">
              <h3 className="text-lg font-bold text-gray-800">
                {selectedCategory ? 'Modifier la catégorie' : 'Nouvelle catégorie'}
              </h3>
              <button
                onClick={() => {
                  setShowCategoryModal(false);
                  setSelectedCategory(null);
                  setCategoryName('');
                  setCategoryDescription('');
                }}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCategorySubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nom de la catégorie *
                </label>
                <input
                  type="text"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-islamic-primary focus:border-transparent"
                  placeholder="Nom de la catégorie"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  value={categoryDescription}
                  onChange={(e) => setCategoryDescription(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-islamic-primary focus:border-transparent"
                  placeholder="Description de la catégorie"
                  required
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowCategoryModal(false);
                    setSelectedCategory(null);
                    setCategoryName('');
                    setCategoryDescription('');
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-islamic-primary text-white rounded-lg hover:bg-islamic-dark transition-colors"
                >
                  {selectedCategory ? 'Modifier' : 'Créer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal pour ajouter/modifier du contenu textuel */}
      {showTextModal && selectedCategory && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4">
            <div className="flex justify-between items-center p-6 border-b">
              <h3 className="text-lg font-bold text-gray-800">
                {selectedContent ? 'Modifier le contenu' : 'Nouveau contenu textuel'}
              </h3>
              <button
                onClick={() => {
                  setShowTextModal(false);
                  setSelectedContent(null);
                  setTextTitle('');
                  setTextContent('');
                }}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleTextSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Titre *
                </label>
                <input
                  type="text"
                  value={textTitle}
                  onChange={(e) => setTextTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-islamic-primary focus:border-transparent"
                  placeholder="Titre du contenu"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contenu *
                </label>
                <textarea
                  value={textContent}
                  onChange={(e) => setTextContent(e.target.value)}
                  rows={8}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-islamic-primary focus:border-transparent"
                  placeholder="Rédigez votre contenu ici..."
                  required
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowTextModal(false);
                    setSelectedContent(null);
                    setTextTitle('');
                    setTextContent('');
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-islamic-primary text-white rounded-lg hover:bg-islamic-dark transition-colors"
                >
                  {selectedContent ? 'Modifier' : 'Ajouter'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MediaPlayer */}
      {selectedFile && (
        <MediaPlayer
          file={selectedFile}
          onClose={() => setSelectedFile(null)}
        />
      )}
    </div>
  );
};

export default CategoryManager; 