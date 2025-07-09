'use client';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Timer, BarChart3, LogOut, Mail, Globe, Settings } from 'lucide-react';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useLanguage } from '@/hooks/useLanguage';
import { t } from '@/lib/i18n';
import { useState } from 'react';

export default function Header() {
  const { user, logout } = useAuth();
  const { language } = useLanguage();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
    }
    setShowUserMenu(true);
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setShowUserMenu(false);
    }, 300); // 300ms delay before hiding
    setHoverTimeout(timeout);
  };

  return (
    <header className="sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-18 py-4">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="p-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-110">
              <Timer className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold gradient-text">FocusFlow</span>
          </Link>

          <nav className="flex items-center space-x-6">
            <LanguageSwitcher />
            
            {user ? (
              <div className="flex items-center space-x-4">
                <div 
                  className="relative"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="flex items-center space-x-3 px-4 py-2 bg-white/40 backdrop-blur-sm rounded-xl shadow-lg cursor-pointer hover:bg-white/60 transition-all duration-300">
                    <img
                      src={user.photoURL || ''}
                      alt={user.displayName || ''}
                      className="h-8 w-8 rounded-full ring-2 ring-emerald-200 shadow-md"
                      onError={(e) => {
                        // Fallback to a default avatar if image fails to load
                        e.currentTarget.src = 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop';
                      }}
                    />
                    <span className="text-sm font-medium text-gray-700">
                      Welcome, {user.displayName?.split(' ')[0] || 'User'}
                    </span>
                  </div>
                  
                  {/* Hover Menu */}
                  <div 
                    className={`absolute top-full right-0 mt-1 w-44 bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-200/50 z-50 overflow-hidden transition-all duration-300 transform origin-top-right ${
                    showUserMenu 
                      ? 'opacity-100 scale-100 translate-y-0' 
                      : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
                  }`}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    {/* User Info Header */}
                    <div className="px-4 py-3 border-b border-gray-200/30 bg-gradient-to-r from-emerald-50/50 to-teal-50/50">
                      <div className="flex items-center space-x-3">
                        <img
                          src={user.photoURL || ''}
                          alt={user.displayName || ''}
                          className="h-10 w-10 rounded-full ring-2 ring-emerald-200 shadow-md"
                          onError={(e) => {
                            e.currentTarget.src = 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop';
                          }}
                        />
                        <div>
                          <p className="text-sm font-semibold text-gray-800">{user.displayName || 'User'}</p>
                          <p className="text-xs text-gray-500">{user.email}</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Menu Items */}
                    <div className="py-2">
                      <Link
                        href="/history"
                        className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-emerald-50/60 hover:text-emerald-700 transition-all duration-200 group"
                      >
                        <BarChart3 className="h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
                        <span className="text-sm font-medium">{t('history', language)}</span>
                      </Link>
                      
                      <Link
                        href="/settings"
                        className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-emerald-50/60 hover:text-emerald-700 transition-all duration-200 group"
                      >
                        <Settings className="h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
                        <span className="text-sm font-medium">{t('settings', language)}</span>
                      </Link>
                      
                      <div className="border-t border-gray-200/30 mt-1 pt-2">
                        <button
                          onClick={logout}
                          className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50/60 hover:text-red-700 transition-all duration-200 group"
                        >
                          <LogOut className="h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
                          <span className="text-sm font-medium">{t('logout', language)}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <Link href="/auth">
                <Button className="btn-gradient text-white flex items-center space-x-2 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 rounded-xl px-6 py-2">
                  <Mail className="h-4 w-4" />
                  <span>{t('signIn', language)}</span>
                </Button>
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}