'use client';
import React from 'react';
import { useState, useEffect, createContext, useContext } from 'react';
import { Language, getBrowserLanguage } from '@/lib/i18n';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    // Load language from localStorage or use browser language
    const savedLanguage = localStorage.getItem('focusflow-language') as Language;
    const initialLanguage = savedLanguage || getBrowserLanguage();
    setLanguageState(initialLanguage);
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('focusflow-language', lang);
    
    // Update document language attribute
    document.documentElement.lang = lang;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};