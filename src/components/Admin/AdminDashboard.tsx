import React, { useState } from 'react';
import { 
  Settings, 
  FileText, 
  Video, 
  Download, 
  BookOpen, 
  Mic, 
  Plus, 
  Edit, 
  Trash2, 
  LogOut,
  ArrowLeft,
  FolderOpen
} from 'lucide-react';
import { mockSections } from '../../data/mockData';
import { Category } from '../../types';
import CategoryManager from './CategoryManager';
import OngletModal from './CourseModal';
import CategoryModal from './CategoryModal';
import OngletFileManager from './OngletFileManager';

interface AdminDashboardProps {
  onLogout: () => void;
  onBackToSite: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout, onBackToSite }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'sections' | 'courses'>('overview');
  const [sections, setSections] = useState(mockSections);
  const [showCategoryManager, setShowCategoryManager] = useState(false);
  const [selectedSectionCategories, setSelectedSectionCategories] = useState<Category[]>([]);
  const [showOngletModal, setShowOngletModal] = useState(false);
  const [selectedOnglet, setSelectedOnglet] = useState<any>(null);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [showOngletFileManager, setShowOngletFileManager] = useState(false);
  const [selectedOngletForFiles, setSelectedOngletForFiles] = useState<any>(null);
  const [ongletFiles, setOngletFiles] = useState<any[]>([]);

  const mainSections = [
    { id: 'tawhid', name: 'Tawhid', icon: BookOpen, count: 3, description: 'Fondamentaux de l\'unicité divine' },
    { id: 'min-haj', name: 'Min Haj (Méthodologie)', icon: FileText, count: 3, description: 'Méthodologie islamique' },
    { id: 'terrorisme', name: 'Réfutation du Terrorisme', icon: BookOpen, count: 2, description: 'Réfutation des idéologies extrémistes' },
    { id: 'sectes', name: 'Sectes', icon: BookOpen, count: 4, description: 'Étude des sectes et déviations' },
    { id: 'tafsir', name: 'Tafsir Coran', icon: FileText, count: 6, description: 'Exégèse du Coran' },
    { id: 'hadith', name: 'Charh Ahadith', icon: BookOpen, count: 5, description: 'Explication des hadiths' }
  ];

  const [onglets, setOnglets] = useState([
    { id: 'conferences', name: 'Conférences', files: 15, content: 25, description: 'Conférences islamiques' },
    { id: 'preches', name: 'Prêches', files: 8, content: 12, description: 'Prêches du vendredi' },
    { id: 'cours-audio', name: 'Cours Audio', files: 20, content: 35, description: 'Cours islamiques audio' },
    { id: 'articles', name: 'Articles', files: 12, content: 18, description: 'Articles islamiques' },
    { id: 'fatawas', name: 'Fatawas', files: 10, content: 15, description: 'Fatawas et avis juridiques' },
    { id: 'videos', name: 'Vidéos', files: 25, content: 40, description: 'Vidéos islamiques' },
    { id: 'telechargements', name: 'Téléchargements', files: 30, content: 50, description: 'Fichiers à télécharger' }
  ]);

  const handleDeleteSection = (sectionId: string) => {
    if (confirm(`Êtes-vous sûr de vouloir supprimer la section "${sectionId}" ?`)) {
      // Logique de suppression
      console.log(`Suppression de la section: ${sectionId}`);
    }
  };

  const handleEditSection = (sectionId: string) => {
    const section = mainSections.find(s => s.id === sectionId);
    if (section) {
      console.log('Modification du cours:', section);
      // TODO: Ouvrir une modal pour modifier les informations du cours
      alert(`🔄 Modification du cours "${section.name}" - Fonctionnalité à implémenter`);
    }
  };

  const handleAddSection = () => {
    console.log('Ajout d\'un nouveau cours');
    // TODO: Ouvrir une modal pour créer un nouveau cours
    alert(`🔄 Ajout d'un nouveau cours - Fonctionnalité à implémenter`);
  };

  const handleSaveCategory = (category: any) => {
    console.log('Catégorie sauvegardée:', category);
    // TODO: Intégrer avec Supabase plus tard
    alert(`✅ Catégorie "${category.name}" ${category.id ? 'modifiée' : 'créée'} avec succès !`);
  };

  const handleDeleteCourse = (ongletId: string) => {
    if (confirm(`Êtes-vous sûr de vouloir supprimer l'onglet "${ongletId}" ?`)) {
      // Logique de suppression
      console.log(`Suppression de l'onglet: ${ongletId}`);
    }
  };

  const handleEditCourse = (ongletId: string) => {
    console.log('🔵 Bouton Modifier onglet cliqué pour ID:', ongletId);
    const onglet = onglets.find(o => o.id === ongletId);
    if (onglet) {
      console.log('🔵 Onglet trouvé:', onglet);
      setSelectedOnglet(onglet);
      setShowOngletModal(true);
      console.log('🔵 Modal ouverte pour modification');
    } else {
      console.log('❌ Onglet non trouvé pour ID:', ongletId);
    }
  };

  const handleAddCourse = () => {
    setSelectedOnglet(null);
    setShowOngletModal(true);
  };

  const handleSaveOnglet = (onglet: any) => {
    console.log('Onglet sauvegardé:', onglet);
    
    if (onglet.id && onglet.id.startsWith('onglet-')) {
      // Nouvel onglet
      setOnglets(prev => [...prev, onglet]);
    } else {
      // Modification d'un onglet existant
      setOnglets(prev => prev.map(o => 
        o.id === onglet.id ? onglet : o
      ));
    }
    
    // TODO: Intégrer avec Supabase plus tard
    alert(`✅ Onglet "${onglet.name}" ${onglet.id && !onglet.id.startsWith('onglet-') ? 'modifié' : 'créé'} avec succès !`);
  };

  const handleManageFiles = (ongletId: string) => {
    const onglet = onglets.find(o => o.id === ongletId);
    if (onglet) {
      setSelectedOngletForFiles(onglet);
      // TODO: Charger les fichiers depuis Supabase
      setOngletFiles([]); // Pour l'instant, on commence avec une liste vide
      setShowOngletFileManager(true);
    }
  };

  const handleSaveFiles = (files: any[]) => {
    console.log('Fichiers sauvegardés:', files);
    // TODO: Intégrer avec Supabase plus tard
    alert(`✅ ${files.length} fichier(s) sauvegardé(s) pour "${selectedOngletForFiles?.name}" !`);
  };

  const handleManageCategories = (sectionId: string) => {
    const section = sections[sectionId];
    if (section) {
      setSelectedSectionCategories(section.categories);
      setShowCategoryManager(true);
    }
  };

  const handleSaveCategories = (categories: Category[]) => {
    // Trouver la section qui correspond aux catégories sélectionnées
    const sectionId = Object.keys(sections).find(key => 
      sections[key].categories === selectedSectionCategories
    );
    
    if (sectionId) {
      setSections(prev => ({
        ...prev,
        [sectionId]: {
          ...prev[sectionId],
          categories
        }
      }));
    }
    setSelectedSectionCategories([]);
  };

  const renderOverview = () => (
    <div className="space-y-6">
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Sections</p>
              <p className="text-2xl font-bold text-gray-800">7</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <Settings className="text-blue-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Cours</p>
              <p className="text-2xl font-bold text-gray-800">12</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <BookOpen className="text-green-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Contenus</p>
              <p className="text-2xl font-bold text-gray-800">156</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <FileText className="text-purple-600" size={24} />
            </div>
          </div>
        </div>

        
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow border">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Sections Récentes</h3>
          <div className="space-y-3">
            {mainSections.slice(0, 5).map((section) => (
              <div key={section.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <section.icon size={20} className="text-gray-600" />
                  <span className="font-medium text-gray-700">{section.name}</span>
                </div>
                <span className="text-sm text-gray-500">{section.count} contenus</span>
              </div>
            ))}
          </div>
        </div>

                 <div className="bg-white p-6 rounded-lg shadow border">
           <h3 className="text-lg font-semibold text-gray-800 mb-4">Onglets Populaires</h3>
           <div className="space-y-3">
             {onglets.slice(0, 5).map((onglet) => (
               <div key={onglet.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                 <span className="font-medium text-gray-700">{onglet.name}</span>
                 <div className="flex gap-2 text-sm text-gray-500">
                   <span>{onglet.files} fichiers</span>
                   <span>•</span>
                   <span>{onglet.content} contenus</span>
                 </div>
               </div>
             ))}
           </div>
         </div>
      </div>
    </div>
  );

  const renderSections = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-800">Gestion des Cours</h3>
        <button 
          onClick={handleAddSection}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={18} />
          Nouvelle Catégorie
        </button>
      </div>

             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
         {mainSections.map((section) => (
           <div key={section.id} className="bg-white p-6 rounded-lg shadow border">
             <div className="flex items-center justify-between mb-4">
               <div className="flex items-center gap-3">
                 <section.icon size={24} className="text-gray-600" />
                 <h4 className="font-semibold text-gray-800">{section.name}</h4>
               </div>
               <div className="flex gap-2">
                 <button 
                   onClick={() => handleManageCategories(section.id)}
                   className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                   title="Gérer les modules"
                 >
                   <FolderOpen size={16} />
                 </button>
                 <button 
                   onClick={() => handleEditSection(section.id)}
                   className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                   title="Modifier le cours"
                 >
                   <Edit size={16} />
                 </button>
                 <button 
                   onClick={() => handleDeleteSection(section.id)}
                   className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                 >
                   <Trash2 size={16} />
                 </button>
               </div>
             </div>
             <div className="space-y-2">
               <p className="text-sm text-gray-600">{section.description}</p>
               <p className="text-sm text-gray-600">{section.count} catégories</p>
               <div className="w-full bg-gray-200 rounded-full h-2">
                 <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${(section.count / 30) * 100}%` }}></div>
               </div>
             </div>
           </div>
         ))}
       </div>
    </div>
  );

    const renderCourses = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-800">Gestion des Onglets</h3>
        <button 
          onClick={handleAddCourse}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          <Plus size={18} />
          Nouvel Onglet
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {onglets.map((onglet) => (
          <div key={onglet.id} className="bg-white p-6 rounded-lg shadow border">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <BookOpen size={24} className="text-gray-600" />
                <h4 className="font-semibold text-gray-800">{onglet.name}</h4>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => handleManageFiles(onglet.id)}
                  className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                  title="Gérer les fichiers"
                >
                  <FolderOpen size={16} />
                </button>
                <button 
                  onClick={() => handleEditCourse(onglet.id)}
                  className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  title="Modifier l'onglet"
                >
                  <Edit size={16} />
                </button>
                <button 
                  onClick={() => handleDeleteCourse(onglet.id)}
                  className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Supprimer l'onglet"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-600">{onglet.description}</p>
              <p className="text-sm text-gray-600">{onglet.files} fichiers</p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: `${(onglet.files / 50) * 100}%` }}></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );





  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-4">
              <button
                onClick={onBackToSite}
                className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft size={20} />
                Retour au site
              </button>
              <div className="h-6 w-px bg-gray-300"></div>
              <h1 className="text-xl font-bold text-gray-800">Dashboard Administrateur</h1>
            </div>
            
                         <div className="flex items-center gap-4">
               <button
                 onClick={onLogout}
                 className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
               >
                 <LogOut size={18} />
                 Déconnexion
               </button>
             </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white shadow border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
                         {[
               { id: 'overview', name: 'Vue d\'ensemble', icon: Settings },
               { id: 'courses', name: 'Onglets', icon: BookOpen },
               { id: 'sections', name: 'Cours', icon: FileText }
             ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon size={18} />
                  {tab.name}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                 {activeTab === 'overview' && renderOverview()}
         {activeTab === 'sections' && renderSections()}
         {activeTab === 'courses' && renderCourses()}
      </main>

             {/* CategoryManager Modal */}
       {showCategoryManager && (
         <CategoryManager
           onClose={() => setShowCategoryManager(false)}
           onSave={handleSaveCategories}
           initialCategories={selectedSectionCategories}
         />
       )}

       {/* OngletModal */}
       <OngletModal
         isOpen={showOngletModal}
         onClose={() => {
           setShowOngletModal(false);
           setSelectedOnglet(null);
         }}
         onSave={handleSaveOnglet}
         onglet={selectedOnglet}
       />

               {/* CategoryModal */}
        <CategoryModal
          isOpen={showCategoryModal}
          onClose={() => {
            setShowCategoryModal(false);
            setSelectedCategory(null);
          }}
          onSave={handleSaveCategory}
          category={selectedCategory}
        />

                 {/* OngletFileManager */}
         <OngletFileManager
           isOpen={showOngletFileManager}
           onClose={() => {
             setShowOngletFileManager(false);
             setSelectedOngletForFiles(null);
             setOngletFiles([]);
           }}
           onSave={handleSaveFiles}
           ongletName={selectedOngletForFiles?.name || ''}
           initialFiles={ongletFiles}
         />
      </div>
    );
  };

export default AdminDashboard; 