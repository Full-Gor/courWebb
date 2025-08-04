import React, { useState } from 'react';
import { X, Upload, FileText, Plus, Edit, Trash2 } from 'lucide-react';
import { MediaFile, TextContent } from '../../types';

interface AdminPanelProps {
  categoryId: string;
  onClose: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ categoryId, onClose }) => {
  const [activeTab, setActiveTab] = useState<'files' | 'texts'>('files');
  const [showTextModal, setShowTextModal] = useState(false);
  const [selectedContent, setSelectedContent] = useState<TextContent | null>(null);
  const [textTitle, setTextTitle] = useState('');
  const [textContent, setTextContent] = useState('');

  // Données de démonstration - dans une vraie app, cela viendrait du contexte/state global
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([
    {
      id: 'file-1',
      name: 'Introduction au Tawhid.mp3',
      type: 'mp3',
      url: '#',
      size: '15.2 MB',
      duration: '45:32',
      uploadDate: '2024-01-15'
    }
  ]);

  const [textContents, setTextContents] = useState<TextContent[]>([
    {
      id: 'text-1',
      title: 'Définition du Tawhid',
      content: 'Le Tawhid est le fondement de la foi islamique...',
      createdDate: '2024-01-15'
    }
  ]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
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
          setMediaFiles(prev => [...prev, newFile]);
        }
      });
    }
  };

  const handleDeleteFile = (fileId: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce fichier ?')) {
      setMediaFiles(prev => prev.filter(file => file.id !== fileId));
    }
  };

  const handleTextSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (textTitle.trim() && textContent.trim()) {
      if (selectedContent) {
        setTextContents(prev => prev.map(content =>
          content.id === selectedContent.id
            ? { ...content, title: textTitle, content: textContent }
            : content
        ));
      } else {
        const newContent: TextContent = {
          id: `text-${Date.now()}`,
          title: textTitle,
          content: textContent,
          createdDate: new Date().toISOString().split('T')[0]
        };
        setTextContents(prev => [...prev, newContent]);
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

  const handleDeleteText = (contentId: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce contenu ?')) {
      setTextContents(prev => prev.filter(content => content.id !== contentId));
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl mx-4 max-h-[90vh] overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-bold text-gray-800">Panel d'Administration</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex border-b">
          <button
            onClick={() => setActiveTab('files')}
            className={`px-6 py-3 font-medium transition-colors ${
              activeTab === 'files'
                ? 'text-islamic-primary border-b-2 border-islamic-primary'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Fichiers Multimédias
          </button>
          <button
            onClick={() => setActiveTab('texts')}
            className={`px-6 py-3 font-medium transition-colors ${
              activeTab === 'texts'
                ? 'text-islamic-primary border-b-2 border-islamic-primary'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Contenus Textuels
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {activeTab === 'files' ? (
            <div>
              <div className="mb-6">
                <label className="flex items-center gap-2 px-4 py-2 bg-islamic-primary text-white rounded-lg cursor-pointer hover:bg-islamic-dark transition-colors w-fit">
                  <Upload size={20} />
                  Ajouter des fichiers
                  <input
                    type="file"
                    multiple
                    accept=".mp3,.mp4,.pdf"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
                <p className="text-sm text-gray-500 mt-2">
                  Formats acceptés: MP3, MP4, PDF (max 50MB par fichier)
                </p>
              </div>

              <div className="space-y-4">
                {mediaFiles.map((file) => (
                  <div key={file.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-800">{file.name}</h4>
                      <div className="flex gap-4 text-sm text-gray-500 mt-1">
                        <span>Type: {file.type.toUpperCase()}</span>
                        <span>Taille: {file.size}</span>
                        {file.duration && <span>Durée: {file.duration}</span>}
                        <span>Ajouté: {new Date(file.uploadDate).toLocaleDateString('fr-FR')}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDeleteFile(file.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}

                {mediaFiles.length === 0 && (
                  <p className="text-center text-gray-500 py-8">
                    Aucun fichier multimédia. Utilisez le bouton ci-dessus pour en ajouter.
                  </p>
                )}
              </div>
            </div>
          ) : (
            <div>
              <div className="mb-6">
                <button
                  onClick={() => setShowTextModal(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-islamic-primary text-white rounded-lg hover:bg-islamic-dark transition-colors"
                >
                  <Plus size={20} />
                  Nouveau contenu textuel
                </button>
              </div>

              <div className="space-y-4">
                {textContents.map((content) => (
                  <div key={content.id} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-gray-800">{content.title}</h4>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditText(content)}
                          className="p-1 text-gray-600 hover:text-islamic-primary rounded"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteText(content.id)}
                          className="p-1 text-red-600 hover:bg-red-50 rounded"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm mb-2 line-clamp-3">{content.content}</p>
                    <p className="text-xs text-gray-500">
                      Créé le {new Date(content.createdDate).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                ))}

                {textContents.length === 0 && (
                  <p className="text-center text-gray-500 py-8">
                    Aucun contenu textuel. Utilisez le bouton ci-dessus pour en ajouter.
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {showTextModal && (
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
    </div>
  );
};

export default AdminPanel;