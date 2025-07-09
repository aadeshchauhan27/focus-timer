'use client';
import { useState } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { languages, Language } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { Globe, ChevronDown } from 'lucide-react';

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="default"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 rounded-xl hover:bg-white/40 backdrop-blur-sm transition-all duration-300"
      >
        <Globe className="h-4 w-4 text-gray-600" />
        <span className="text-sm font-medium text-gray-700">{languages[language]}</span>
        <ChevronDown className={`h-3 w-3 text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </Button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div className="absolute right-0 top-full mt-2 w-48 bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-200/50 z-50 overflow-hidden">
            {Object.entries(languages).map(([code, name]) => (
              <button
                key={code}
                onClick={() => handleLanguageChange(code as Language)}
                className={`w-full px-4 py-3 text-left hover:bg-gray-50/80 transition-all duration-200 flex items-center space-x-3 ${
                  language === code ? 'bg-emerald-50/80 text-emerald-700 font-semibold' : 'text-gray-700'
                }`}
              >
                <div className={`w-2 h-2 rounded-full ${
                  language === code ? 'bg-emerald-500' : 'bg-transparent'
                }`} />
                <span className="text-sm">{name}</span>
                {language === code && (
                  <div className="ml-auto w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}