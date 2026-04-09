import { Users } from 'lucide-react';
import type { Language } from '../types';

interface LanguageCardProps {
  language: Language;
  isSelected?: boolean;
  onClick?: () => void;
}

export default function LanguageCard({ language, isSelected, onClick }: LanguageCardProps) {
  return (
    <button
      onClick={onClick}
      className={`relative overflow-hidden rounded-2xl p-6 transition-all duration-300 group ${
        isSelected
          ? 'bg-gradient-to-br from-blue-500 to-blue-600 shadow-xl scale-105'
          : 'bg-white border-2 border-gray-100 hover:border-blue-200 hover:shadow-lg hover:scale-105'
      }`}
    >
      <div className="relative z-10">
        <div className={`text-5xl mb-4 transition-transform duration-300 group-hover:scale-110`}>
          {language.flag}
        </div>
        <h3 className={`text-xl font-bold mb-2 ${
          isSelected ? 'text-white' : 'text-gray-900'
        }`}>
          {language.name}
        </h3>
        <div className={`flex items-center space-x-1.5 ${
          isSelected ? 'text-blue-100' : 'text-gray-500'
        }`}>
          <Users className="w-4 h-4" />
          <span className="text-sm">{language.learners.toLocaleString()} 学习者</span>
        </div>
      </div>
      
      {!isSelected && (
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-orange-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      )}
      
      <div className={`absolute -right-4 -bottom-4 w-24 h-24 rounded-full ${
        isSelected
          ? 'bg-white/10'
          : 'bg-gradient-to-br from-blue-100 to-orange-100 opacity-0 group-hover:opacity-100'
      } transition-all duration-300`} />
    </button>
  );
}
