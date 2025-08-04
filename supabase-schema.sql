-- Schéma de base de données pour Cours Islamiques
-- À exécuter dans l'éditeur SQL de Supabase

-- Table des sections principales
CREATE TABLE sections (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  icon VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table des catégories
CREATE TABLE categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  section_id UUID REFERENCES sections(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table des fichiers multimédias
CREATE TABLE media_files (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  category_id UUID REFERENCES categories(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  type VARCHAR(10) NOT NULL CHECK (type IN ('mp3', 'mp4', 'pdf')),
  url TEXT NOT NULL,
  size VARCHAR(50),
  duration VARCHAR(20),
  upload_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table des contenus textuels
CREATE TABLE text_contents (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  category_id UUID REFERENCES categories(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table des utilisateurs (pour future authentification)
CREATE TABLE users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  role VARCHAR(20) DEFAULT 'user' CHECK (role IN ('admin', 'user')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insertion des données de base
INSERT INTO sections (name, description, icon) VALUES
  ('Tawhid', 'L''unicité d''Allah', 'BookOpen'),
  ('Min Haj (Méthodologie)', 'La méthodologie des Salafs', 'FileText'),
  ('Réfutation du Terrorisme', 'Réfutation des idées extrémistes', 'Headphones');

-- Insertion des catégories de base
INSERT INTO categories (section_id, name, description) VALUES
  ((SELECT id FROM sections WHERE name = 'Tawhid'), 'Les fondements du Tawhid', 'Comprendre l''unicité d''Allah'),
  ((SELECT id FROM sections WHERE name = 'Tawhid'), 'Tawhid Ar-Rububiyya', 'L''unicité d''Allah dans la Seigneurie'),
  ((SELECT id FROM sections WHERE name = 'Tawhid'), 'Tawhid Al-Uluhiyya', 'L''unicité d''Allah dans l''adoration'),
  ((SELECT id FROM sections WHERE name = 'Min Haj (Méthodologie)'), 'Méthodologie des Salafs', 'La voie des pieux prédécesseurs'),
  ((SELECT id FROM sections WHERE name = 'Min Haj (Méthodologie)'), 'Règles de Jurisprudence', 'Les principes fondamentaux du Fiqh'),
  ((SELECT id FROM sections WHERE name = 'Min Haj (Méthodologie)'), 'Sciences du Hadith', 'Méthodologie d''authentification'),
  ((SELECT id FROM sections WHERE name = 'Réfutation du Terrorisme'), 'Position islamique', 'La vraie position de l''Islam sur la violence'),
  ((SELECT id FROM sections WHERE name = 'Réfutation du Terrorisme'), 'Réfutations savantes', 'Arguments des grands savants');

-- Insertion d'un contenu textuel de base
INSERT INTO text_contents (category_id, title, content) VALUES
  ((SELECT id FROM categories WHERE name = 'Les fondements du Tawhid'), 'Définition du Tawhid', 'Le Tawhid est le fondement de la foi islamique...');

-- Insertion d'un fichier média de base
INSERT INTO media_files (category_id, name, type, url, size, duration) VALUES
  ((SELECT id FROM categories WHERE name = 'Les fondements du Tawhid'), 'Introduction au Tawhid', 'mp3', '/media/audio/introduction-au-tawhid.mp3', '15.2 MB', '45:32');

-- Création des index pour améliorer les performances
CREATE INDEX idx_categories_section_id ON categories(section_id);
CREATE INDEX idx_media_files_category_id ON media_files(category_id);
CREATE INDEX idx_text_contents_category_id ON text_contents(category_id);

-- Fonction pour mettre à jour updated_at automatiquement
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Table des messages de contact
CREATE TABLE contact_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  subject VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Triggers pour mettre à jour updated_at
CREATE TRIGGER update_sections_updated_at BEFORE UPDATE ON sections FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON categories FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_media_files_updated_at BEFORE UPDATE ON media_files FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_text_contents_updated_at BEFORE UPDATE ON text_contents FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_contact_messages_updated_at BEFORE UPDATE ON contact_messages FOR EACH ROW EXECUTE FUNCTION update_updated_at_column(); 