import React, { useState } from 'react';
import { Send, Mail, User, MessageCircle } from 'lucide-react';
import { validateContactForm } from '../../lib/validation';

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    // Validation des données
    const validation = validateContactForm(formData);
    
    if (!validation.isValid) {
      setSubmitStatus('error');
      alert(`Erreurs de validation:\n${validation.errors.join('\n')}`);
      setIsSubmitting(false);
      return;
    }

    try {
      // Utiliser les données sanitizées
      const sanitizedData = validation.sanitizedData!;
      
      // Simulation d'envoi (en attendant Supabase)
      console.log('📧 Message de contact:', sanitizedData);
      
      // Simuler un délai d'envoi
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Erreur lors de l\'envoi:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <Mail size={48} className="mx-auto text-islamic-primary mb-4" />
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Nous Contacter</h1>
        <p className="text-gray-600">
          Vous avez une question ? N'hésitez pas à nous écrire, nous vous répondrons dans les plus brefs délais.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <User size={16} />
                Nom complet *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-islamic-primary focus:border-transparent transition-colors"
                placeholder="Votre nom complet"
              />
            </div>

            <div>
              <label htmlFor="email" className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <Mail size={16} />
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-islamic-primary focus:border-transparent transition-colors"
                placeholder="votre.email@example.com"
              />
            </div>
          </div>

          <div>
            <label htmlFor="subject" className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <MessageCircle size={16} />
              Sujet *
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-islamic-primary focus:border-transparent transition-colors"
              placeholder="Objet de votre message"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
              Message *
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={6}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-islamic-primary focus:border-transparent transition-colors resize-none"
              placeholder="Écrivez votre message ici..."
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-islamic-primary text-white rounded-lg hover:bg-islamic-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send size={20} />
            {isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'}
          </button>
        </form>

        {submitStatus === 'success' && (
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-800 text-center">
              ✅ Votre message a été envoyé avec succès ! Nous vous répondrons rapidement.
            </p>
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800 text-center">
              ❌ Une erreur est survenue lors de l'envoi. Veuillez réessayer.
            </p>
          </div>
        )}
      </div>

      <div className="mt-8 text-center">
        <p className="text-gray-600 text-sm">
          Vous pouvez également nous contacter directement à :
          <br />
          <a href="mailto:contact@cours-islamiques.com" className="text-islamic-primary hover:underline font-medium">
            contact@cours-islamiques.com
          </a>
        </p>
      </div>
    </div>
  );
};

export default ContactForm;