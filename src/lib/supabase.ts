import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Configuration temporaire pour le développement
const fallbackUrl = 'https://qqfjtwkqdgganfrzhewb.supabase.co'
const fallbackKey = 'your-anon-key'

export const supabase = createClient(
  supabaseUrl || fallbackUrl, 
  supabaseAnonKey || fallbackKey
)

// Avertissement en mode développement
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('⚠️ Variables Supabase manquantes. Utilisation des valeurs par défaut.')
  console.warn('📝 Créez un fichier .env avec VITE_SUPABASE_URL et VITE_SUPABASE_ANON_KEY')
} 