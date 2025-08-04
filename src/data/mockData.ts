import { Section, Category, MediaFile, TextContent } from '../types';

// Données de démonstration pour les sections principales
export const mockSections: Record<string, Section> = {
  'tawhid': {
    id: 'tawhid',
    name: 'Tawhid',
    categories: [
      {
        id: 'tawhid-1',
        name: 'Les fondements du Tawhid',
        description: 'Comprendre l\'unicité d\'Allah',
        mediaFiles: [
          {
            id: 'audio-1',
            name: 'Introduction au Tawhid',
            type: 'mp3',
            url: '#',
            size: '15.2 MB',
            duration: '45:32',
            uploadDate: '2024-01-15'
          }
        ],
        textContent: [
          {
            id: 'text-1',
            title: 'Définition du Tawhid',
            content: 'Le Tawhid est le fondement de la foi islamique...',
            createdDate: '2024-01-15'
          }
        ],
        createdDate: '2024-01-15'
      },
      {
        id: 'tawhid-2',
        name: 'Tawhid Ar-Rububiyya',
        description: 'L\'unicité d\'Allah dans la Seigneurie',
        mediaFiles: [],
        textContent: [],
        createdDate: '2024-01-16'
      },
      {
        id: 'tawhid-3',
        name: 'Tawhid Al-Uluhiyya',
        description: 'L\'unicité d\'Allah dans l\'adoration',
        mediaFiles: [],
        textContent: [],
        createdDate: '2024-01-17'
      }
    ]
  },
  'min-haj': {
    id: 'min-haj',
    name: 'Min Haj (Méthodologie)',
    categories: [
      {
        id: 'min-haj-1',
        name: 'Méthodologie des Salafs',
        description: 'La voie des pieux prédécesseurs',
        mediaFiles: [],
        textContent: [],
        createdDate: '2024-01-15'
      },
      {
        id: 'min-haj-2',
        name: 'Règles de Jurisprudence',
        description: 'Les principes fondamentaux du Fiqh',
        mediaFiles: [],
        textContent: [],
        createdDate: '2024-01-16'
      },
      {
        id: 'min-haj-3',
        name: 'Sciences du Hadith',
        description: 'Méthodologie d\'authentification',
        mediaFiles: [],
        textContent: [],
        createdDate: '2024-01-17'
      }
    ]
  },
  'terrorisme': {
    id: 'terrorisme',
    name: 'Réfutation du Terrorisme',
    categories: [
      {
        id: 'terrorisme-1',
        name: 'Position islamique',
        description: 'La vraie position de l\'Islam sur la violence',
        mediaFiles: [],
        textContent: [],
        createdDate: '2024-01-15'
      },
      {
        id: 'terrorisme-2',
        name: 'Réfutations savantes',
        description: 'Arguments des grands savants',
        mediaFiles: [],
        textContent: [],
        createdDate: '2024-01-16'
      },
      {
        id: 'terrorisme-3',
        name: 'Paix et Justice',
        description: 'L\'Islam religion de paix',
        mediaFiles: [],
        textContent: [],
        createdDate: '2024-01-17'
      }
    ]
  }
};