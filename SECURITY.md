# 🔒 Système de Sécurité - Cours Islamiques

## Vue d'ensemble

Ce projet utilise un système de sécurité **simplifié et efficace** adapté à un site avec un seul administrateur.

## 🎯 Sécurités Implémentées

### 1. **Authentification Admin**
- **Accès secret** : `Ctrl + Alt + Q`
- **Mot de passe** : Configurable via `VITE_ADMIN_PASSWORD`
- **Session persistante** : 24 heures maximum
- **Rate limiting** : 5 tentatives en 15 minutes

### 2. **Validation des Données**
- **Sanitization** : Suppression des balises HTML et scripts
- **Validation** : Emails, mots de passe, formulaires
- **Protection XSS** : Échappement des caractères dangereux
- **Limites** : Longueur des champs contrôlée

### 3. **Headers de Sécurité**
- **CSP** : Content Security Policy
- **XSS Protection** : Protection contre les attaques XSS
- **Clickjacking** : Protection contre le clickjacking
- **MIME Sniffing** : Protection contre le MIME sniffing

### 4. **Base de Données Supabase**
- **Authentification** : Gérée par Supabase
- **Permissions** : Contrôle d'accès par rôles
- **Validation** : Côté serveur et client
- **Backup** : Automatique avec Supabase

## 🚀 Comment Utiliser

### Accès Admin
1. **Ouvrir le site**
2. **Appuyer** : `Ctrl + Alt + Q`
3. **Entrer** le mot de passe admin
4. **Accéder** au dashboard

### Configuration
```env
# .env
VITE_ADMIN_PASSWORD=votre_mot_de_passe_securise
VITE_MAX_LOGIN_ATTEMPTS=5
VITE_LOGIN_TIMEOUT_MINUTES=15
VITE_SESSION_TIMEOUT_HOURS=24
```

## 🔧 Fonctionnalités de Sécurité

### Rate Limiting
- **5 tentatives** de connexion en 15 minutes
- **Blocage automatique** après dépassement
- **Reset** après 15 minutes d'inactivité

### Session Management
- **Expiration** : 24 heures maximum
- **Persistance** : Pendant la session navigateur
- **Déconnexion** : Manuelle ou automatique

### Validation des Formulaires
- **Contact** : Nom, email, sujet, message
- **Catégories** : Nom, description
- **Fichiers** : Type, URL, taille

## 🛡️ Protection contre les Attaques

### XSS (Cross-Site Scripting)
- ✅ **Sanitization** des entrées utilisateur
- ✅ **CSP** pour bloquer les scripts malveillants
- ✅ **Validation** côté client et serveur

### CSRF (Cross-Site Request Forgery)
- ✅ **Tokens** de validation (Supabase)
- ✅ **Headers** de sécurité appropriés

### Injection SQL
- ✅ **Paramètres préparés** (Supabase)
- ✅ **Sanitization** des entrées
- ✅ **Permissions** granulaires

### Clickjacking
- ✅ **X-Frame-Options** : DENY
- ✅ **CSP** : frame-src 'none'

## 📊 Logs et Monitoring

### Tentatives d'Accès
```javascript
// Exemple de log
{
  timestamp: "2024-01-15T10:30:00Z",
  success: true,
  ip: "192.168.1.100",
  userAgent: "Mozilla/5.0..."
}
```

### Erreurs de Validation
- **Console** : Logs détaillés
- **Alertes** : Messages utilisateur
- **Supabase** : Logs serveur

## 🔄 Maintenance

### Changement de Mot de Passe
1. **Modifier** `VITE_ADMIN_PASSWORD` dans `.env`
2. **Redémarrer** l'application
3. **Tester** la nouvelle connexion

### Mise à Jour de Sécurité
1. **Vérifier** les dépendances : `npm audit`
2. **Mettre à jour** : `npm update`
3. **Tester** toutes les fonctionnalités

## ⚠️ Recommandations

### Production
- ✅ **HTTPS** obligatoire
- ✅ **Mot de passe fort** (12+ caractères)
- ✅ **Backup régulier** de la base de données
- ✅ **Monitoring** des tentatives d'accès

### Développement
- ✅ **Variables d'environnement** sécurisées
- ✅ **Logs** détaillés pour le débogage
- ✅ **Tests** de sécurité réguliers

## 🆘 Dépannage

### Problèmes Courants

**Accès admin ne fonctionne pas**
- Vérifier la séquence `Ctrl + Alt + Q`
- Vérifier le mot de passe dans `.env`
- Vérifier les logs console

**Formulaire de contact ne s'envoie pas**
- Vérifier la configuration Supabase
- Vérifier la validation des données
- Vérifier les logs d'erreur

**Session admin expire trop vite**
- Vérifier `VITE_SESSION_TIMEOUT_HOURS`
- Vérifier l'heure système
- Vérifier les cookies du navigateur

## 📞 Support

Pour toute question de sécurité :
- **Email** : security@cours-islamiques.com
- **Documentation** : Ce fichier
- **Logs** : Console du navigateur 