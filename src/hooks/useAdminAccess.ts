import { useState, useEffect } from 'react';
import { securityService } from '../lib/security';

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

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Ignorer si on est déjà en mode admin
      if (isAdmin) return;

      // Vérifier si Ctrl + Alt + Q sont pressés simultanément
      if (event.ctrlKey && event.altKey && event.code === 'KeyQ') {
        console.log('🔐 Séquence secrète détectée !');
        setShowAuth(true);
        event.preventDefault();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isAdmin]);

  const activateAdminMode = () => {
    setIsAdmin(true);
    setShowAuth(false);
    securityService.activateAdmin();
    securityService.logAccessAttempt(true);
  };

  const deactivateAdminMode = () => {
    setIsAdmin(false);
    setShowAuth(false);
    securityService.deactivateAdmin();
  };

  const showAuthModal = () => {
    setShowAuth(true);
  };

  const hideAuthModal = () => {
    setShowAuth(false);
  };

  const authenticate = (password: string): boolean => {
    const success = securityService.authenticate(password);
    securityService.logAccessAttempt(success);
    
    if (success) {
      activateAdminMode();
    }
    
    return success;
  };

  // Vérifier la session au chargement
  useEffect(() => {
    const isAdminSession = securityService.isAdmin() && securityService.checkSessionExpiration();
    if (isAdminSession) {
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