// Système de sécurité simplifié pour un seul admin

import { RateLimiter } from './validation';

class SecurityService {
  private rateLimiter: RateLimiter;
  private adminPassword: string;

  constructor() {
    this.rateLimiter = new RateLimiter(5, 15 * 60 * 1000); // 5 tentatives en 15 minutes
    this.adminPassword = import.meta.env.VITE_ADMIN_PASSWORD || 'admin123';
  }

  // Vérifier le mot de passe admin
  authenticate(password: string): boolean {
    const key = 'admin_auth';
    
    // Vérifier le rate limiting
    if (!this.rateLimiter.isAllowed(key)) {
      console.warn('🔒 Trop de tentatives de connexion');
      return false;
    }

    const isValid = password === this.adminPassword;
    
    if (isValid) {
      this.rateLimiter.reset(key);
    }
    
    return isValid;
  }

  // Vérifier si l'utilisateur est admin (session)
  isAdmin(): boolean {
    return sessionStorage.getItem('isAdmin') === 'true';
  }

  // Activer le mode admin
  activateAdmin(): void {
    sessionStorage.setItem('isAdmin', 'true');
    sessionStorage.setItem('adminTimestamp', Date.now().toString());
  }

  // Désactiver le mode admin
  deactivateAdmin(): void {
    sessionStorage.removeItem('isAdmin');
    sessionStorage.removeItem('adminTimestamp');
  }

  // Vérifier l'expiration de la session (24h)
  checkSessionExpiration(): boolean {
    const timestamp = sessionStorage.getItem('adminTimestamp');
    if (!timestamp) return false;

    const sessionAge = Date.now() - parseInt(timestamp);
    const maxAge = 24 * 60 * 60 * 1000; // 24 heures

    if (sessionAge > maxAge) {
      this.deactivateAdmin();
      return false;
    }

    return true;
  }

  // Log des tentatives d'accès
  logAccessAttempt(success: boolean, ip?: string): void {
    const logEntry = {
      timestamp: new Date().toISOString(),
      success,
      ip: ip || 'unknown',
      userAgent: navigator.userAgent
    };

    console.log('🔐 Tentative d\'accès admin:', logEntry);
    
    // En production, envoyer au serveur
    // this.sendLogToServer(logEntry);
  }
}

export const securityService = new SecurityService(); 