import React, { useState } from 'react';
import { 
  Settings, 
  Users, 
  FileText, 
  Headphones, 
  Video, 
  Download, 
  BookOpen, 
  Mic, 
  Plus, 
  Edit, 
  Trash2, 
  LogOut,
  ArrowLeft,
  Eye,
  EyeOff,
  FolderOpen
} from 'lucide-react';
import { mockSections } from '../../data/mockData';
import { Category } from '../../types';
import CategoryManager from './CategoryManager';
import ModuleModal from './CourseModal';
import CategoryModal from './CategoryModal';

interface AdminDashboardProps {
  onLogout: () => void;
  onBackToSite: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout, onBackToSite }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'sections' | 'courses' | 'content' | 'users'>('overview');
  const [sections, setSections] = useState(mockSections);
  const [showPassword, setShowPassword] = useState(false);
  const [showCategoryManager, setShowCategoryManager] = useState(false);
  const [selectedSectionCategories, setSelectedSectionCategories] = useState<Category[]>([]);
  const [showModuleModal, setShowModuleModal] = useState(false);
  const [selectedModule, setSelectedModule] = useState<any>(null);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);

  const mainSections = [
    { id: 'tawhid', name: 'Tawhid', icon: BookOpen, count: 3 },
    { id: 'min-haj', name: 'Min Haj (Méthodologie)', icon: FileText, count: 3 },
    { id: 'terrorisme', name: 'Réfutation du Terrorisme', icon: Headphones, count: 2 }
  ];

  const courses = [
    { id: 'tawhid', name: 'Tawhid', categories: 4, content: 12 },
    { id: 'min-haj', name: 'Min Haj', categories: 3, content: 8 },
    { id: 'sectes', name: 'Sectes', categories: 5, content: 15 },
    { id: 'terrorisme', name: 'Terrorisme', categories: 2, content: 6 },
    { id: 'tafsir-coran', name: 'Tafsir Coran', categories: 6, content: 20 },
    { id: 'charh-ahadith', name: 'Charh Ahadith', categories: 4, content: 10 },
    { id: 'biographie-prophetes', name: 'Biographie des Prophètes', categories: 3, content: 8 },
    { id: 'biographie-savants', name: 'Biographie des Savants', categories: 4, content: 12 },
    { id: 'rappels', name: 'Rappels', categories: 2, content: 5 },
    { id: 'exhortations', name: 'Exhortations', categories: 3, content: 7 },
    { id: 'mise-en-garde', name: 'Mise en Garde', categories: 2, content: 4 },
    { id: 'divers', name: 'Divers', categories: 1, content: 3 }
  ];

  const handleDeleteSection = (sectionId: string) => {
    if (confirm(`Êtes-vous sûr de vouloir supprimer la section "${sectionId}" ?`)) {
      // Logique de suppression
      console.log(`Suppression de la section: ${sectionId}`);
    }
  };

  const handleEditSection = (sectionId: string) => {
    const section = mainSections.find(s => s.id === sectionId);
    if (section) {
      setSelectedCategory(section);
      setShowCategoryModal(true);
    }
  };

  const handleAddSection = () => {
    setSelectedCategory(null);
    setShowCategoryModal(true);
  };

  const handleSaveCategory = (category: any) => {
    console.log('Catégorie sauvegardée:', category);
    // TODO: Intégrer avec Supabase plus tard
    alert(`✅ Catégorie "${category.name}" ${category.id ? 'modifiée' : 'créée'} avec succès !`);
  };

  const handleDeleteCourse = (courseId: string) => {
    if (confirm(`Êtes-vous sûr de vouloir supprimer le cours "${courseId}" ?`)) {
      // Logique de suppression
      console.log(`Suppression du cours: ${courseId}`);
    }
  };

  const handleEditCourse = (courseId: string) => {
    const course = courses.find(c => c.id === courseId);
    if (course) {
      setSelectedModule(course);
      setShowModuleModal(true);
    }
  };

  const handleAddCourse = () => {
    setSelectedModule(null);
    setShowModuleModal(true);
  };

  const handleSaveModule = (module: any) => {
    console.log('Module sauvegardé:', module);
    // TODO: Intégrer avec Supabase plus tard
    alert(`✅ Module "${module.name}" ${module.id ? 'modifié' : 'créé'} avec succès !`);
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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

        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Utilisateurs</p>
              <p className="text-2xl font-bold text-gray-800">1,234</p>
            </div>
            <div className="p-3 bg-orange-100 rounded-full">
              <Users className="text-orange-600" size={24} />
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
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Cours Populaires</h3>
          <div className="space-y-3">
            {courses.slice(0, 5).map((course) => (
              <div key={course.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-medium text-gray-700">{course.name}</span>
                <div className="flex gap-2 text-sm text-gray-500">
                  <span>{course.categories} catégories</span>
                  <span>•</span>
                  <span>{course.content} contenus</span>
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
               <p className="text-sm text-gray-600">{section.count} modules</p>
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
        <h3 className="text-lg font-semibold text-gray-800">Gestion des Modules</h3>
        <button 
          onClick={handleAddCourse}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          <Plus size={18} />
          Nouveau Module
        </button>
      </div>

      <div className="bg-white rounded-lg shadow border overflow-hidden">
        <table className="w-full">
                     <thead className="bg-gray-50">
             <tr>
               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Module</th>
               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fichiers</th>
               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contenus</th>
               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
             </tr>
           </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {courses.map((course) => (
              <tr key={course.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{course.name}</div>
                  <div className="text-sm text-gray-500">ID: {course.id}</div>
                </td>
                                 <td className="px-6 py-4 whitespace-nowrap">
                   <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                     {course.categories} fichiers
                   </span>
                 </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{course.content}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleEditCourse(course.id)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      Modifier
                    </button>
                    <button 
                      onClick={() => handleDeleteCourse(course.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Supprimer
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const handleAddContent = () => {
    console.log('Ajout d\'un nouveau contenu');
    // TODO: Ouvrir modal d'ajout
  };

  const renderContent = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-800">Gestion du Contenu</h3>
        <div className="flex gap-2">
          <button 
            onClick={handleAddContent}
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            <Plus size={18} />
            Nouveau Contenu
          </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow border">
        <p className="text-gray-600 mb-4">
          Gérez tous les contenus de votre plateforme : fichiers audio, vidéos, articles, etc.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-gray-800 mb-2">Fichiers Audio</h4>
            <p className="text-sm text-gray-600">45 fichiers</p>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-gray-800 mb-2">Vidéos</h4>
            <p className="text-sm text-gray-600">23 vidéos</p>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-gray-800 mb-2">Documents</h4>
            <p className="text-sm text-gray-600">67 documents</p>
          </div>
        </div>
      </div>
    </div>
  );

  const handleAddUser = () => {
    console.log('Ajout d\'un nouvel utilisateur');
    // TODO: Ouvrir modal d'ajout
  };

  const renderUsers = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-800">Gestion des Utilisateurs</h3>
        <button 
          onClick={handleAddUser}
          className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
        >
          <Plus size={18} />
          Nouvel Utilisateur
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow border">
        <p className="text-gray-600 mb-4">
          Surveillez l'activité des utilisateurs et gérez les accès.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center p-4 border rounded-lg">
            <div className="text-2xl font-bold text-blue-600">1,234</div>
            <div className="text-sm text-gray-600">Utilisateurs totaux</div>
          </div>
          <div className="text-center p-4 border rounded-lg">
            <div className="text-2xl font-bold text-green-600">892</div>
            <div className="text-sm text-gray-600">Utilisateurs actifs</div>
          </div>
          <div className="text-center p-4 border rounded-lg">
            <div className="text-2xl font-bold text-orange-600">156</div>
            <div className="text-sm text-gray-600">Nouveaux ce mois</div>
          </div>
          <div className="text-center p-4 border rounded-lg">
            <div className="text-2xl font-bold text-purple-600">45</div>
            <div className="text-sm text-gray-600">En ligne</div>
          </div>
        </div>
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
                onClick={() => setShowPassword(!showPassword)}
                className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                {showPassword ? 'Masquer' : 'Afficher'} les mots de passe
              </button>
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
               { id: 'sections', name: 'Cours', icon: FileText },
               { id: 'courses', name: 'Catégories', icon: BookOpen },
               { id: 'content', name: 'Contenu', icon: Headphones },
               { id: 'users', name: 'Utilisateurs', icon: Users }
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
        {activeTab === 'content' && renderContent()}
        {activeTab === 'users' && renderUsers()}
      </main>

             {/* CategoryManager Modal */}
       {showCategoryManager && (
         <CategoryManager
           onClose={() => setShowCategoryManager(false)}
           onSave={handleSaveCategories}
           initialCategories={selectedSectionCategories}
         />
       )}

       {/* ModuleModal */}
       <ModuleModal
         isOpen={showModuleModal}
         onClose={() => {
           setShowModuleModal(false);
           setSelectedModule(null);
         }}
         onSave={handleSaveModule}
         module={selectedModule}
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
     </div>
   );
 };

export default AdminDashboard; 