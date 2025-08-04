import React, { useState } from 'react';
import { Menu, X, Home, Headphones, Mic, BookOpen, FileText, Video, Download, Mail, GraduationCap } from 'lucide-react';

interface BurgerMenuProps {
  currentSection: string;
  onSectionChange: (section: string) => void;
  onCourseChange: (course: string) => void;
}

const BurgerMenu: React.FC<BurgerMenuProps> = ({ currentSection, onSectionChange, onCourseChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showCourses, setShowCourses] = useState(false);

  const mainSections = [
    { id: 'accueil', name: 'Accueil', icon: Home },
    { id: 'cours-audio', name: 'Cours Audio', icon: GraduationCap, hasSubmenu: true },
    { id: 'conferences', name: 'Conférences', icon: Mic },
    { id: 'preches', name: 'Prêches', icon: Headphones },
    { id: 'articles', name: 'Articles', icon: FileText },
    { id: 'fatawas', name: 'Fatawas', icon: BookOpen },
    { id: 'videos', name: 'Vidéos', icon: Video },
    { id: 'telechargements', name: 'Téléchargements', icon: Download },
    { id: 'contact', name: 'Nous Contacter', icon: Mail }
  ];

  const coursesSections = [
    { id: 'tawhid', name: 'Tawhid' },
    { id: 'min-haj', name: 'Min Haj' },
    { id: 'sectes', name: 'Sectes' },
    { id: 'terrorisme', name: 'Terrorisme' },
    { id: 'tafsir-coran', name: 'Tafsir Coran' },
    { id: 'charh-ahadith', name: 'Charh Ahadith' },
    { id: 'biographie-prophetes', name: 'Biographie des Prophètes' },
    { id: 'biographie-savants', name: 'Biographie des Savants' },
    { id: 'rappels', name: 'Rappels' },
    { id: 'exhortations', name: 'Exhortations' },
    { id: 'mise-en-garde', name: 'Mise en Garde' },
    { id: 'divers', name: 'Divers' }
  ];

  const handleSectionClick = (sectionId: string, hasSubmenu?: boolean) => {
    if (hasSubmenu) {
      setShowCourses(!showCourses);
    } else {
      onSectionChange(sectionId);
      setIsOpen(false);
      setShowCourses(false);
    }
  };

  const handleCourseClick = (courseId: string) => {
    onCourseChange(courseId);
    setIsOpen(false);
    setShowCourses(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 p-3 bg-islamic-primary text-white rounded-full shadow-lg hover:bg-islamic-dark transition-colors"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <div className={`fixed inset-0 z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setIsOpen(false)} />
        
        <div className={`absolute left-0 top-0 h-full w-80 bg-white shadow-xl transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="p-6 bg-islamic-primary text-white">
            <h2 className="text-xl font-bold">Cours Islamiques</h2>
            <p className="text-islamic-light text-sm mt-1">Navigation</p>
          </div>

          <nav className="p-4 overflow-y-auto h-full pb-24">
            {mainSections.map((section) => {
              const Icon = section.icon;
              return (
                <div key={section.id}>
                  <button
                    onClick={() => handleSectionClick(section.id, section.hasSubmenu)}
                    className={`w-full flex items-center gap-3 p-3 text-left rounded-lg mb-2 transition-colors ${
                      currentSection === section.id 
                        ? 'bg-islamic-primary text-white' 
                        : 'hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    <Icon size={20} />
                    <span className="font-medium">{section.name}</span>
                  </button>

                  {section.hasSubmenu && showCourses && (
                    <div className="ml-4 pl-4 border-l-2 border-islamic-light">
                      {coursesSections.map((course) => (
                        <button
                          key={course.id}
                          onClick={() => handleCourseClick(course.id)}
                          className="w-full text-left p-2 text-sm text-gray-600 hover:text-islamic-primary hover:bg-islamic-light rounded transition-colors"
                        >
                          {course.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </div>
      </div>
    </>
  );
};

export default BurgerMenu;