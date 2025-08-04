import React, { useState } from 'react';
import { X, Plus, Edit, Trash2, FileText, Video, Music, Upload, Save, ArrowLeft, BookOpen } from 'lucide-react';
import { MediaFile, TextContent } from '../../types';
import MediaPlayer from '../MediaPlayer';

interface OngletFile {
  id: string;
  name: string;
  description: string;
  type: 'audio' | 'video' | 'document';
  url: string;
  size: string;
  duration?: string;
  uploadDate: string;
}

interface OngletFileManagerProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (files: OngletFile[]) => void;
  ongletName: string;
  initialFiles?: OngletFile[];
}

const OngletFileManager: React.FC<OngletFileManagerProps> = ({ 
  isOpen, 
  onClose, 
  onSave, 
  ongletName, 
  initialFiles = [] 
}) => {
  const [files, setFiles] = useState<OngletFile[]>(initialFiles);
  const [selectedFile, setSelectedFile] = useState<OngletFile | null>(null);
  const [showFileModal, setShowFileModal] = useState(false);
  const [showTextModal, setShowTextModal] = useState(false);
  const [selectedContent, setSelectedContent] = useState<TextContent | null>(null);
  
  // États pour les modales
  const [fileName, setFileName] = useState('');
  const [fileDescription, setFileDescription] = useState('');
  const [fileType, setFileType] = useState<'audio' | 'video' | 'document'>('audio');
  const [fileUrl, setFileUrl] = useState('');
  const [fileSize, setFileSize] = useState('');
  const [fileDuration, setFileDuration] = useState('');
  const [textTitle, setTextTitle] = useState('');
  const [textContent, setTextContent] = useState('');

  const handleAddFile = () => {
    console.log('🔵 Bouton Ajouter fichier cliqué');
    setFileName('');
    setFileDescription('');
    setFileType('audio');
    setFileUrl('');
    setFileSize('');
    setFileDuration('');
    setSelectedFile(null);
    setShowFileModal(true);
  };

  const resetFileModal = () => {
    setShowFileModal(false);
    setSelectedFile(null);
    setFileName('');
    setFileDescription('');
    setFileType('audio');
    setFileUrl('');
    setFileSize('');
    setFileDuration('');
  };

  const handleEditFile = (file: OngletFile) => {
    console.log('🔵 Bouton Modifier fichier cliqué:', file);
    setSelectedFile(file);
    setFileName(file.name);
    setFileDescription(file.description);
    setFileType(file.type);
    setFileUrl(file.url);
    setFileSize(file.size);
    setFileDuration(file.duration || '');
    setShowFileModal(true);
    console.log('🔵 Modal ouverte pour modification:', file.name);
  };

  const handleDeleteFile = (fileId: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce fichier ?')) {
      setFiles(prev => prev.filter(file => file.id !== fileId));
    }
  };

  const handleFileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Soumission fichier:', { fileName, fileDescription, fileType, fileUrl, selectedFile });
    if (fileName.trim() && fileUrl.trim()) {
      if (selectedFile) {
        // Modifier le fichier existant
        setFiles(prev => prev.map(file =>
          file.id === selectedFile.id
            ? { 
                ...file, 
                name: fileName, 
                description: fileDescription,
                type: fileType,
                url: fileUrl,
                size: fileSize,
                duration: fileDuration || undefined
              }
            : file
        ));
      } else {
        // Créer un nouveau fichier
        const newFile: OngletFile = {
          id: `file-${Date.now()}`,
          name: fileName,
          description: fileDescription,
          type: fileType,
          url: fileUrl,
          size: fileSize,
          duration: fileDuration || undefined,
          uploadDate: new Date().toISOString().split('T')[0]
        };
        setFiles(prev => [...prev, newFile]);
      }
      resetFileModal();
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        const fileType = file.name.split('.').pop()?.toLowerCase();
        if (fileType && ['mp3', 'mp4', 'pdf'].includes(fileType)) {
          const newFile: OngletFile = {
            id: `file-${Date.now()}-${Math.random()}`,
            name: file.name,
            description: '',
            type: fileType === 'mp3' ? 'audio' : fileType === 'mp4' ? 'video' : 'document',
            url: URL.createObjectURL(file),
            size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
            duration: fileType === 'mp3' || fileType === 'mp4' ? '00:00' : undefined,
            uploadDate: new Date().toISOString().split('T')[0]
          };
          setFiles(prev => [...prev, newFile]);
        }
      });
    }
  };

  const handlePlayFile = (file: OngletFile) => {
    console.log('Lecture du fichier:', file);
    // Ici on pourrait ouvrir le MediaPlayer
  };

  const handleAddText = () => {
    setTextTitle('');
    setTextContent('');
    setSelectedContent(null);
    setShowTextModal(true);
  };

  const handleTextSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Soumission texte:', { textTitle, textContent, selectedContent });
    if (textTitle.trim() && textContent.trim()) {
      if (selectedContent) {
        // Modifier le contenu existant
        // TODO: Implémenter la modification
      } else {
        // Créer un nouveau contenu
        const newContent: TextContent = {
          id: `content-${Date.now()}`,
          title: textTitle,
          content: textContent,
          createdDate: new Date().toISOString().split('T')[0]
        };
        // TODO: Ajouter le contenu à la liste
      }
      setShowTextModal(false);
      setSelectedContent(null);
      setTextTitle('');
      setTextContent('');
    }
  };

  const handleSave = () => {
    onSave(files);
    onClose();
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'audio':
        return <Music size={20} className="text-blue-600" />;
      case 'video':
        return <Video size={20} className="text-red-600" />;
      case 'document':
        return <FileText size={20} className="text-green-600" />;
      default:
        return <FileText size={20} className="text-gray-600" />;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black bg-opacity-75">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-6xl mx-4 max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <div className="flex items-center gap-3">
            <BookOpen size={24} className="text-blue-600" />
            <h3 className="text-lg font-bold text-gray-800">
              Gestion des fichiers - {ongletName}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          {/* Actions */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex gap-3">
              <button
                onClick={handleAddFile}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus size={18} />
                Ajouter un fichier
              </button>
              <button
                onClick={handleAddText}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Plus size={18} />
                Ajouter du contenu
              </button>
            </div>
            <div className="flex items-center gap-2">
              <label className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer">
                <Upload size={18} />
                Upload de fichiers
                <input
                  type="file"
                  multiple
                  accept=".mp3,.mp4,.pdf"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Files List */}
          <div className="space-y-4">
            {files.map((file) => (
              <div key={file.id} className="bg-gray-50 p-4 rounded-lg border">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {getFileIcon(file.type)}
                    <div>
                      <h4 className="font-semibold text-gray-800">{file.name}</h4>
                      <p className="text-sm text-gray-600">{file.description}</p>
                      <div className="flex gap-4 text-xs text-gray-500 mt-1">
                        <span>Type: {file.type}</span>
                        <span>Taille: {file.size}</span>
                        {file.duration && <span>Durée: {file.duration}</span>}
                        <span>Ajouté: {file.uploadDate}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handlePlayFile(file)}
                      className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Lire"
                    >
                      <FileText size={16} />
                    </button>
                    <button
                      onClick={() => handleEditFile(file)}
                      className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Modifier"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => handleDeleteFile(file.id)}
                      className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Supprimer"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {files.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                Aucun fichier ajouté pour le moment
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t bg-gray-50">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Annuler
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <Save size={16} />
            Sauvegarder
          </button>
        </div>

        {/* File Modal */}
        {showFileModal && (
          <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black bg-opacity-75">
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-md mx-4">
              <div className="flex justify-between items-center p-6 border-b">
                <h4 className="text-lg font-bold text-gray-800">
                  {selectedFile ? 'Modifier le fichier' : 'Ajouter un fichier'}
                </h4>
                <button
                  onClick={resetFileModal}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleFileSubmit} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nom du fichier *
                  </label>
                  <input
                    type="text"
                    value={fileName}
                    onChange={(e) => setFileName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Nom du fichier"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={fileDescription}
                    onChange={(e) => setFileDescription(e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Description du fichier"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Type de fichier *
                  </label>
                  <select
                    value={fileType}
                    onChange={(e) => setFileType(e.target.value as any)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="audio">Audio</option>
                    <option value="video">Vidéo</option>
                    <option value="document">Document</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    URL du fichier *
                  </label>
                  <input
                    type="url"
                    value={fileUrl}
                    onChange={(e) => setFileUrl(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://example.com/file.mp3"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Taille
                    </label>
                    <input
                      type="text"
                      value={fileSize}
                      onChange={(e) => setFileSize(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="5.2 MB"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Durée (audio/vidéo)
                    </label>
                    <input
                      type="text"
                      value={fileDuration}
                      onChange={(e) => setFileDuration(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="12:34"
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={resetFileModal}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <Save size={16} />
                    {selectedFile ? 'Modifier' : 'Ajouter'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Text Modal */}
        {showTextModal && (
          <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black bg-opacity-75">
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-md mx-4">
              <div className="flex justify-between items-center p-6 border-b">
                <h4 className="text-lg font-bold text-gray-800">
                  {selectedContent ? 'Modifier le contenu' : 'Ajouter du contenu'}
                </h4>
                <button
                  onClick={() => setShowTextModal(false)}
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                    rows={6}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Contenu du texte..."
                    required
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowTextModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <Save size={16} />
                    {selectedContent ? 'Modifier' : 'Ajouter'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OngletFileManager; 