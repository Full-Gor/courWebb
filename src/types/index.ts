export interface MediaFile {
  id: string;
  name: string;
  type: 'mp3' | 'mp4' | 'pdf';
  url: string;
  size: string;
  duration?: string;
  uploadDate: string;
}

export interface TextContent {
  id: string;
  title: string;
  content: string;
  createdDate: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  mediaFiles: MediaFile[];
  textContent: TextContent[];
  createdDate: string;
}

export interface Section {
  id: string;
  name: string;
  categories: Category[];
}

export type SectionType = 
  | 'accueil' 
  | 'cours-audio' 
  | 'conferences' 
  | 'preches' 
  | 'articles' 
  | 'fatawas' 
  | 'videos' 
  | 'telechargements'
  | 'contact';

export type CourseType = 
  | 'tawhid' 
  | 'min-haj' 
  | 'sectes' 
  | 'terrorisme' 
  | 'tafsir-coran' 
  | 'charh-ahadith' 
  | 'biographie-prophetes' 
  | 'biographie-savants' 
  | 'rappels' 
  | 'exhortations' 
  | 'mise-en-garde' 
  | 'divers';