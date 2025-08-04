import { useState, useEffect } from 'react';

interface UseAdminAccessReturn {
  isAdmin: boolean;
  showAuth: boolean;
  keySequence: string[];
  activateAdminMode: () => void;
  deactivateAdminMode: () => void;
  showAuthModal: () => void;
  hideAuthModal: () => void;
  authenticate: (password: string) => boolean;
}

export const useAdminAccess = (): UseAdminAccessReturn => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [keySequence, setKeySequence] = useState<string[]>([]);
  
  const ADMIN_PASSWORD = 'admin123';

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Ignorer si on est déjà en mode admin
      if (isAdmin) return;

      // Log pour déboguer
      console.log('Touche pressée:', event.code, 'Ctrl:', event.ctrlKey, 'Alt:', event.altKey);

      // Vérifier si Ctrl + Alt + Q sont pressés simultanément
      if (event.ctrlKey && event.altKey && event.code === 'KeyQ') {
        console.log('🔐 Séquence secrète détectée !');
        setShowAuth(true);
        event.preventDefault(); // Empêcher le comportement par défaut
      }
    };

    // Ajouter l'écouteur d'événements
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isAdmin]);

  const activateAdminMode = () => {
    setIsAdmin(true);
    setShowAuth(false);
    // Stocker en sessionStorage pour persister pendant la session
    sessionStorage.setItem('isAdmin', 'true');
  };

  const deactivateAdminMode = () => {
    setIsAdmin(false);
    setShowAuth(false);
    sessionStorage.removeItem('isAdmin');
  };

  const showAuthModal = () => {
    setShowAuth(true);
  };

  const hideAuthModal = () => {
    setShowAuth(false);
  };

  const authenticate = (password: string): boolean => {
    if (password === ADMIN_PASSWORD) {
      activateAdminMode();
      return true;
    }
    return false;
  };

  // Vérifier si on était déjà admin au chargement
  useEffect(() => {
    const wasAdmin = sessionStorage.getItem('isAdmin') === 'true';
    if (wasAdmin) {
      setIsAdmin(true);
    }
  }, []);

  return {
    isAdmin,
    showAuth,
    keySequence,
    activateAdminMode,
    deactivateAdminMode,
    showAuthModal,
    hideAuthModal,
    authenticate
  };
}; 