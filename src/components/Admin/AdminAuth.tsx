import React, { useState, useEffect } from 'react';
import { Shield, Lock, Eye, EyeOff } from 'lucide-react';

interface AdminAuthProps {
  onAuthSuccess: () => void;
  onClose: () => void;
}

const AdminAuth: React.FC<AdminAuthProps> = ({ onAuthSuccess, onClose }) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Mot de passe admin (dans une vraie app, cela serait géré côté serveur)
  const ADMIN_PASSWORD = 'admin123';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulation d'une vérification
    setTimeout(() => {
      if (password === ADMIN_PASSWORD) {
        onAuthSuccess();
      } else {
        setError('Mot de passe incorrect');
      }
      setIsLoading(false);
    }, 1000);
  };

  // Fermer avec Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-75">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-md mx-4 p-6">
        <div className="flex items-center justify-center mb-6">
          <div className="p-3 bg-red-100 rounded-full">
            <Shield className="text-red-600" size={32} />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
          Accès Administrateur
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Accès restreint - Authentification requise
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mot de passe administrateur
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent pr-12"
                placeholder="Entrez le mot de passe"
                required
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Lock size={18} className="mr-2" />
                  Se connecter
                </>
              )}
            </button>
          </div>
        </form>

        <div className="mt-6 p-3 bg-gray-50 rounded-lg">
          <p className="text-xs text-gray-500 text-center">
            ⚠️ Cet accès est strictement réservé aux administrateurs autorisés.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminAuth; 