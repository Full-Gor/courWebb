import React from 'react';
import { BookOpen } from 'lucide-react';

interface HeaderProps {
  title: string;
  subtitle?: string;
}

const Header: React.FC<HeaderProps> = ({ title, subtitle }) => {
  return (
    <header className="bg-gradient-to-r from-islamic-primary to-islamic-accent text-white p-6 shadow-lg">
      <div className="flex items-center gap-3">
        <BookOpen size={32} />
        <div>
          <h1 className="text-2xl font-bold">{title}</h1>
          {subtitle && <p className="text-islamic-light text-sm mt-1">{subtitle}</p>}
        </div>
      </div>
    </header>
  );
};

export default Header;