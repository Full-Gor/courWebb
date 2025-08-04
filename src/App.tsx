import React, { useState } from 'react';
import BurgerMenu from './components/Layout/BurgerMenu';
import Header from './components/Layout/Header';
import HomePage from './components/Home/HomePage';
import CourseSection from './components/Course/CourseSection';
import ContactForm from './components/Contact/ContactForm';
import GenericSection from './components/Section/GenericSection';
import AdminAuth from './components/Admin/AdminAuth';
import AdminDashboard from './components/Admin/AdminDashboard';
import { mockSections } from './data/mockData';
import { Category } from './types';
import { useAdminAccess } from './hooks/useAdminAccess';

function App() {
  const [currentSection, setCurrentSection] = useState('accueil');
  const [currentCourse, setCurrentCourse] = useState('');
  const [sections, setSections] = useState(mockSections);
  
  // Hook pour l'accès admin
  const {
    isAdmin,
    showAuth,
    activateAdminMode,
    deactivateAdminMode,
    hideAuthModal,
    authenticate
  } = useAdminAccess();

  const getSectionTitle = () => {
    if (currentSection === 'accueil') return 'Accueil';
    if (currentSection === 'contact') return 'Contact';
    if (currentCourse) {
      const courseNames: Record<string, string> = {
        'tawhid': 'Tawhid',
        'min-haj': 'Min Haj (Méthodologie)',
        'sectes': 'Sectes',
        'terrorisme': 'Réfutation du Terrorisme',
        'tafsir-coran': 'Tafsir du Coran',
        'charh-ahadith': 'Charh Ahadith',
        'biographie-prophetes': 'Biographie des Prophètes',
        'biographie-savants': 'Biographie des Savants',
        'rappels': 'Rappels',
        'exhortations': 'Exhortations',
        'mise-en-garde': 'Mise en Garde',
        'divers': 'Divers'
      };
      return courseNames[currentCourse] || 'Cours';
    }
    
    const sectionNames: Record<string, string> = {
      'cours-audio': 'Cours Audio',
      'conferences': 'Conférences',
      'preches': 'Prêches',
      'articles': 'Articles',
      'fatawas': 'Fatawas',
      'videos': 'Vidéos',
      'telechargements': 'Téléchargements'
    };
    return sectionNames[currentSection] || 'Section';
  };

  const getSectionSubtitle = () => {
    if (currentSection === 'accueil') return 'Bienvenue sur notre plateforme d\'apprentissage';
    if (currentSection === 'contact') return 'Contactez-nous pour toute question';
    if (currentCourse) return 'Explorez les catégories et contenus disponibles';
    return 'Gérez les catégories et contenus de cette section';
  };

  const handleSectionChange = (section: string) => {
    setCurrentSection(section);
    setCurrentCourse('');
  };

  const handleCourseChange = (course: string) => {
    setCurrentSection('cours-audio');
    setCurrentCourse(course);
  };

  const handleCategoriesUpdate = (courseId: string, categories: Category[]) => {
    setSections(prev => ({
      ...prev,
      [courseId]: {
        ...prev[courseId],
        categories
      }
    }));
  };

  const renderContent = () => {
    if (currentSection === 'accueil') {
      return <HomePage onCourseChange={handleCourseChange} />;
    }

    if (currentSection === 'contact') {
      return <ContactForm />;
    }

    if (currentCourse) {
      const sectionData = sections[currentCourse];
      return (
        <CourseSection
          courseId={currentCourse}
          courseName={getSectionTitle()}
          categories={sectionData?.categories || []}
          onCategoriesUpdate={(categories) => handleCategoriesUpdate(currentCourse, categories)}
          isAdmin={isAdmin}
        />
      );
    }

    // Sections génériques
    const sectionDescriptions: Record<string, string> = {
      'cours-audio': 'Gérez vos cours audio avec différentes catégories et contenus multimédias',
      'conferences': 'Organisez vos conférences par catégories avec supports audio, vidéo et documents',
      'preches': 'Classifiez vos prêches et sermons avec du contenu multimédia',
      'articles': 'Gérez vos articles et textes religieux par catégories',
      'fatawas': 'Organisez les fatawas et avis religieux avec des catégories thématiques',
      'videos': 'Gérez votre contenu vidéo avec des catégories organisées',
      'telechargements': 'Organisez vos fichiers téléchargeables par catégories'
    };

    return (
      <GenericSection
        sectionId={currentSection}
        sectionName={getSectionTitle()}
        description={sectionDescriptions[currentSection] || 'Gérez le contenu de cette section'}
        isAdmin={isAdmin}
      />
    );
  };

  // Si on est en mode admin, afficher le dashboard
  if (isAdmin) {
    return (
      <AdminDashboard
        onLogout={deactivateAdminMode}
        onBackToSite={deactivateAdminMode}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <BurgerMenu
        currentSection={currentSection}
        onSectionChange={handleSectionChange}
        onCourseChange={handleCourseChange}
      />
      
      <Header 
        title={getSectionTitle()}
        subtitle={getSectionSubtitle()}
      />

      <main className="pt-4">
        {renderContent()}
      </main>

      {/* Modal d'authentification admin */}
      {showAuth && (
        <AdminAuth
          onAuthSuccess={activateAdminMode}
          onClose={hideAuthModal}
        />
      )}
    </div>
  );
}

export default App;