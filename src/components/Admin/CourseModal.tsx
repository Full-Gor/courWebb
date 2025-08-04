import React, { useState, useEffect } from 'react';
import { X, Save, BookOpen } from 'lucide-react';

interface Module {
  id: string;
  name: string;
  files: number;
  content: number;
  description?: string;
}

interface ModuleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (module: Module) => void;
  module?: Module | null;
}

const ModuleModal: React.FC<ModuleModalProps> = ({ isOpen, onClose, onSave, module }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [files, setFiles] = useState(0);
  const [content, setContent] = useState(0);

  useEffect(() => {
    if (module) {
      setName(module.name);
      setDescription(module.description || '');
      setFiles(module.files);
      setContent(module.content);
    } else {
      setName('');
      setDescription('');
      setFiles(0);
      setContent(0);
    }
  }, [module]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (name.trim()) {
      const newModule: Module = {
        id: module?.id || `module-${Date.now()}`,
        name: name.trim(),
        description: description.trim(),
        files,
        content
      };
      
      onSave(newModule);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black bg-opacity-75">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-md mx-4">
        <div className="flex justify-between items-center p-6 border-b">
          <div className="flex items-center gap-3">
            <BookOpen size={24} className="text-green-600" />
                         <h3 className="text-lg font-bold text-gray-800">
               {module ? 'Modifier le module' : 'Nouveau module'}
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
               Nom du module *
             </label>
             <input
               type="text"
               value={name}
               onChange={(e) => setName(e.target.value)}
               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
               placeholder="Nom du module"
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
               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
               placeholder="Description du module"
             />
           </div>

          <div className="grid grid-cols-2 gap-4">
                         <div>
               <label className="block text-sm font-medium text-gray-700 mb-2">
                 Nombre de fichiers
               </label>
               <input
                 type="number"
                 value={files}
                 onChange={(e) => setFiles(parseInt(e.target.value) || 0)}
                 min="0"
                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
               />
             </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nombre de contenus
              </label>
              <input
                type="number"
                value={content}
                onChange={(e) => setContent(parseInt(e.target.value) || 0)}
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
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
              className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
            >
              <Save size={16} />
              {course ? 'Modifier' : 'Créer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModuleModal; 