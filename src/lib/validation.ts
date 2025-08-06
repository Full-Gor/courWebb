// Validation et sanitization des données

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  sanitizedData?: any;
}

// Validation des emails
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validation des mots de passe
export const validatePassword = (password: string): ValidationResult => {
  const errors: string[] = [];
  
  if (password.length < 8) {
    errors.push('Le mot de passe doit contenir au moins 8 caractères');
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Le mot de passe doit contenir au moins une majuscule');
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('Le mot de passe doit contenir au moins une minuscule');
  }
  
  if (!/\d/.test(password)) {
    errors.push('Le mot de passe doit contenir au moins un chiffre');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

// Sanitization des chaînes de caractères
export const sanitizeString = (input: string): string => {
  return input
    .trim()
    .replace(/[<>]/g, '') // Supprimer les balises HTML
    .replace(/javascript:/gi, '') // Supprimer les protocoles dangereux
    .replace(/on\w+=/gi, '') // Supprimer les événements JavaScript
    .substring(0, 1000); // Limiter la longueur
};

// Validation des données de contact
export const validateContactForm = (data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): ValidationResult => {
  const errors: string[] = [];
  
  // Validation du nom
  if (!data.name.trim()) {
    errors.push('Le nom est requis');
  } else if (data.name.length < 2) {
    errors.push('Le nom doit contenir au moins 2 caractères');
  }
  
  // Validation de l'email
  if (!validateEmail(data.email)) {
    errors.push('Email invalide');
  }
  
  // Validation du sujet
  if (!data.subject.trim()) {
    errors.push('Le sujet est requis');
  } else if (data.subject.length < 3) {
    errors.push('Le sujet doit contenir au moins 3 caractères');
  }
  
  // Validation du message
  if (!data.message.trim()) {
    errors.push('Le message est requis');
  } else if (data.message.length < 10) {
    errors.push('Le message doit contenir au moins 10 caractères');
  }
  
  // Sanitization des données
  const sanitizedData = {
    name: sanitizeString(data.name),
    email: data.email.toLowerCase().trim(),
    subject: sanitizeString(data.subject),
    message: sanitizeString(data.message)
  };
  
  return {
    isValid: errors.length === 0,
    errors,
    sanitizedData
  };
};

// Validation des données de catégorie
export const validateCategory = (data: {
  name: string;
  description: string;
}): ValidationResult => {
  const errors: string[] = [];
  
  if (!data.name.trim()) {
    errors.push('Le nom de la catégorie est requis');
  } else if (data.name.length < 2) {
    errors.push('Le nom doit contenir au moins 2 caractères');
  }
  
  if (data.description && data.description.length > 500) {
    errors.push('La description ne doit pas dépasser 500 caractères');
  }
  
  const sanitizedData = {
    name: sanitizeString(data.name),
    description: sanitizeString(data.description || '')
  };
  
  return {
    isValid: errors.length === 0,
    errors,
    sanitizedData
  };
};

// Validation des URLs
export const validateUrl = (url: string): boolean => {
  try {
    const urlObj = new URL(url);
    return ['http:', 'https:'].includes(urlObj.protocol);
  } catch {
    return false;
  }
};

// Protection contre les injections SQL (basique)
export const sanitizeSqlInput = (input: string): string => {
  return input
    .replace(/'/g, "''") // Échapper les apostrophes
    .replace(/--/g, '') // Supprimer les commentaires SQL
    .replace(/;/g, '') // Supprimer les points-virgules
    .replace(/union/gi, '') // Supprimer les mots-clés dangereux
    .replace(/drop/gi, '')
    .replace(/delete/gi, '')
    .replace(/insert/gi, '')
    .replace(/update/gi, '')
    .replace(/select/gi, '');
};

// Rate limiting (simulation côté client)
export class RateLimiter {
  private attempts: Map<string, { count: number; lastAttempt: number }> = new Map();
  private maxAttempts: number;
  private windowMs: number;

  constructor(maxAttempts: number = 5, windowMs: number = 15 * 60 * 1000) {
    this.maxAttempts = maxAttempts;
    this.windowMs = windowMs;
  }

  isAllowed(key: string): boolean {
    const now = Date.now();
    const attempt = this.attempts.get(key);

    if (!attempt) {
      this.attempts.set(key, { count: 1, lastAttempt: now });
      return true;
    }

    // Réinitialiser si la fenêtre de temps est écoulée
    if (now - attempt.lastAttempt > this.windowMs) {
      this.attempts.set(key, { count: 1, lastAttempt: now });
      return true;
    }

    // Vérifier si le nombre maximum d'essais est atteint
    if (attempt.count >= this.maxAttempts) {
      return false;
    }

    // Incrémenter le compteur
    attempt.count++;
    attempt.lastAttempt = now;
    return true;
  }

  reset(key: string): void {
    this.attempts.delete(key);
  }
} 