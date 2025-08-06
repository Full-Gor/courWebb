import React, { useState, useEffect } from 'react';
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
  const [isLoading, setIsLoading] = useState(true);
  
  // Hook pour l'accès admin
  const {
    isAdmin,
    showAuth,
    activateAdminMode,
    deactivateAdminMode,
    hideAuthModal,
    authenticate
  } = useAdminAccess();

  // Simulate loading
  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

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
    if (currentSection === 'accueil') return 'Explorez la sagesse islamique authentique';
    if (currentSection === 'contact') return 'Nous sommes à votre écoute';
    if (currentCourse) return 'Enrichissez votre savoir avec nos cours structurés';
    
    const sectionSubtitles: Record<string, string> = {
      'cours-audio': 'Écoutez et apprenez à votre rythme',
      'conferences': 'Interventions de savants reconnus',
      'preches': 'Sermons du vendredi enrichissants',
      'articles': 'Lectures approfondies et analyses',
      'fatawas': 'Avis juridiques des grands savants',
      'videos': 'Contenus visuels éducatifs',
      'telechargements': 'Ressources à télécharger'
    };
    return sectionSubtitles[currentSection] || '';
  };

  const handleSectionChange = (section: string) => {
    setCurrentSection(section);
    setCurrentCourse('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCourseChange = (course: string) => {
    setCurrentSection('cours-audio');
    setCurrentCourse(course);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
      return (
        <div className="min-h-screen bg-gradient-to-b from-islamic-light to-white py-8">
          <ContactForm />
        </div>
      );
    }

    if (currentCourse) {
      const sectionData = sections[currentCourse];
      return (
        <div className="min-h-screen bg-gradient-to-b from-islamic-light to-white">
          <CourseSection
            courseId={currentCourse}
            courseName={getSectionTitle()}
            categories={sectionData?.categories || []}
            onCategoriesUpdate={(categories) => handleCategoriesUpdate(currentCourse, categories)}
            isAdmin={isAdmin}
          />
        </div>
      );
    }

    // Sections génériques
    const sectionDescriptions: Record<string, string> = {
      'cours-audio': 'Découvrez notre collection complète de cours audio islamiques',
      'conferences': 'Assistez à des conférences enrichissantes de nos savants',
      'preches': 'Écoutez des sermons inspirants pour nourrir votre foi',
      'articles': 'Lisez des articles détaillés sur divers sujets islamiques',
      'fatawas': 'Consultez les avis juridiques des éminents savants',
      'videos': 'Regardez des contenus visuels éducatifs et inspirants',
      'telechargements': 'Téléchargez des ressources pour votre apprentissage'
    };

    return (
      <div className="min-h-screen bg-gradient-to-b from-islamic-light to-white">
        <GenericSection
          sectionId={currentSection}
          sectionName={getSectionTitle()}
          description={sectionDescriptions[currentSection] || ''}
          isAdmin={isAdmin}
        />
      </div>
    );
  };

  // Loading screen
  if (isLoading) {
    return (
      <div className="min-h-screen bg-islamic-primary flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 border-4 border-islamic-accent border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white font-arabic text-2xl animate-pulse">جاري التحميل</p>
          <p className="text-white/80 mt-2">Chargement en cours...</p>
        </div>
      </div>
    );
  }

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
    <div className="min-h-screen bg-islamic-light">
      {/* Background pattern */}
      <div className="fixed inset-0 pattern-bg opacity-50 pointer-events-none"></div>
      
      {/* Main content */}
      <div className="relative">
        <BurgerMenu
          currentSection={currentSection}
          onSectionChange={handleSectionChange}
          onCourseChange={handleCourseChange}
        />
        
        <Header 
          title={getSectionTitle()}
          subtitle={getSectionSubtitle()}
        />

        <main className="relative animate-fade-in">
          {renderContent()}
        </main>

        {/* Footer */}
        <footer className="bg-islamic-primary text-white py-8 mt-16">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <p className="font-arabic text-2xl mb-2">بارك الله فيكم</p>
            <p className="text-white/80">© 2024 Cours Islamiques - Tous droits réservés</p>
          </div>
        </footer>
      </div>

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