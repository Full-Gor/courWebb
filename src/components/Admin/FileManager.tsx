import React, { useState, useEffect } from 'react';
import { X, Save, FileText, Headphones, Video, Download, Plus, Edit, Trash2, Upload } from 'lucide-react';

interface File {
  id: string;
  name: string;
  description: string;
  type: 'audio' | 'video' | 'document';
  url: string;
  size: string;
  duration?: string;
}

interface FileManagerProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (files: File[]) => void;
  ongletName: string;
  initialFiles?: File[];
}

const FileManager: React.FC<FileManagerProps> = ({ 
  isOpen, 
  onClose, 
  onSave, 
  ongletName, 
  initialFiles = [] 
}) => {
  const [files, setFiles] = useState<File[]>(initialFiles);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingFile, setEditingFile] = useState<File | null>(null);
  const [newFile, setNewFile] = useState({
    name: '',
    description: '',
    type: 'audio' as const,
    url: '',
    size: '',
    duration: ''
  });

  useEffect(() => {
    setFiles(initialFiles);
  }, [initialFiles]);

  const handleAddFile = () => {
    if (newFile.name.trim() && newFile.url.trim()) {
      const file: File = {
        id: editingFile?.id || `file-${Date.now()}`,
        name: newFile.name.trim(),
        description: newFile.description.trim(),
        type: newFile.type,
        url: newFile.url.trim(),
        size: newFile.size.trim(),
        duration: newFile.duration.trim() || undefined
      };

      if (editingFile) {
        setFiles(prev => prev.map(f => f.id === editingFile.id ? file : f));
      } else {
        setFiles(prev => [...prev, file]);
      }

      setNewFile({
        name: '',
        description: '',
        type: 'audio',
        url: '',
        size: '',
        duration: ''
      });
      setEditingFile(null);
      setShowAddModal(false);
    }
  };

  const handleEditFile = (file: File) => {
    setEditingFile(file);
    setNewFile({
      name: file.name,
      description: file.description,
      type: file.type,
      url: file.url,
      size: file.size,
      duration: file.duration || ''
    });
    setShowAddModal(true);
  };

  const handleDeleteFile = (fileId: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce fichier ?')) {
      setFiles(prev => prev.filter(f => f.id !== fileId));
    }
  };

  const handleSave = () => {
    onSave(files);
    onClose();
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'audio':
        return <Headphones size={20} className="text-blue-600" />;
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
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl mx-4 max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <div className="flex items-center gap-3">
            <FileText size={24} className="text-blue-600" />
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
          {/* Add File Button */}
          <div className="mb-6">
            <button
              onClick={() => {
                setEditingFile(null);
                setNewFile({
                  name: '',
                  description: '',
                  type: 'audio',
                  url: '',
                  size: '',
                  duration: ''
                });
                setShowAddModal(true);
              }}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus size={18} />
              Ajouter un fichier
            </button>
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
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
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

        {/* Add/Edit File Modal */}
        {showAddModal && (
          <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black bg-opacity-75">
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-md mx-4">
              <div className="flex justify-between items-center p-6 border-b">
                <h4 className="text-lg font-bold text-gray-800">
                  {editingFile ? 'Modifier le fichier' : 'Ajouter un fichier'}
                </h4>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={(e) => { e.preventDefault(); handleAddFile(); }} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nom du fichier *
                  </label>
                  <input
                    type="text"
                    value={newFile.name}
                    onChange={(e) => setNewFile(prev => ({ ...prev, name: e.target.value }))}
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
                    value={newFile.description}
                    onChange={(e) => setNewFile(prev => ({ ...prev, description: e.target.value }))}
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
                    value={newFile.type}
                    onChange={(e) => setNewFile(prev => ({ ...prev, type: e.target.value as any }))}
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
                    value={newFile.url}
                    onChange={(e) => setNewFile(prev => ({ ...prev, url: e.target.value }))}
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
                      value={newFile.size}
                      onChange={(e) => setNewFile(prev => ({ ...prev, size: e.target.value }))}
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
                      value={newFile.duration}
                      onChange={(e) => setNewFile(prev => ({ ...prev, duration: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="12:34"
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <Save size={16} />
                    {editingFile ? 'Modifier' : 'Ajouter'}
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

export default FileManager; 