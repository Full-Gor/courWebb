import React from 'react';
import { Shield, Compass, AlertTriangle, ChevronRight } from 'lucide-react';

interface HomePageProps {
  onCourseChange: (course: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onCourseChange }) => {
  const featuredSections = [
    {
      id: 'tawhid',
      title: 'Tawhid',
      description: 'L\'unicité d\'Allah - Le fondement de la foi islamique',
      icon: Shield,
      color: 'from-emerald-600 to-emerald-700',
      content: 'Apprenez les bases du Tawhid, pilier fondamental de l\'Islam. Découvrez l\'unicité d\'Allah dans Sa seigneurie, Son adoration et Ses noms et attributs.'
    },
    {
      id: 'min-haj',
      title: 'Min Haj',
      description: 'La méthodologie islamique authentique',
      icon: Compass,
      color: 'from-amber-600 to-amber-700',
      content: 'Étudiez la méthodologie des pieux prédécesseurs (Salaf as-Salih) pour comprendre l\'Islam selon la compréhension des trois meilleures générations.'
    },
    {
      id: 'terrorisme',
      title: 'Réfutation du Terrorisme',
      description: 'La vraie position de l\'Islam sur la violence',
      icon: AlertTriangle,
      color: 'from-red-600 to-red-700',
      content: 'Découvrez la position claire de l\'Islam concernant le terrorisme et la violence, avec des preuves du Coran et de la Sunnah authentique.'
    }
  ];

  return (
    <div className="p-6 space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Bienvenue sur Cours Islamiques
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Approfondissez vos connaissances religieuses avec des cours authentiques basés sur le Coran et la Sunnah selon la compréhension des Salafs.
        </p>
      </div>

      <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-6">
        {featuredSections.map((section) => {
          const Icon = section.icon;
          return (
            <div
              key={section.id}
              className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <div className={`bg-gradient-to-r ${section.color} p-6 text-white`}>
                <Icon size={48} className="mb-4" />
                <h3 className="text-xl font-bold mb-2">{section.title}</h3>
                <p className="text-white/90 text-sm">{section.description}</p>
              </div>
              
              <div className="p-6">
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {section.content}
                </p>
                
                <button
                  onClick={() => onCourseChange(section.id)}
                  className="flex items-center gap-2 text-islamic-primary hover:text-islamic-dark font-semibold group-hover:gap-3 transition-all"
                >
                  Accéder aux cours
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-islamic-light rounded-xl p-8 text-center">
        <h2 className="text-2xl font-bold text-islamic-dark mb-4">
          Explorez nos autres sections
        </h2>
        <p className="text-gray-700 mb-6">
          Découvrez également nos conférences, prêches, articles, fatawas et bien plus encore.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          {['Conférences', 'Prêches', 'Articles', 'Fatawas', 'Vidéos'].map((item) => (
            <span
              key={item}
              className="px-4 py-2 bg-white text-islamic-primary rounded-full text-sm font-medium shadow-sm"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;