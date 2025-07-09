'use client';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  Mail, 
  Calendar, 
  Shield, 
  Bell, 
  Palette, 
  Download,
  Edit3,
  Check,
  X,
  Camera,
  Globe
} from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { t } from '@/lib/i18n';
import { useState } from 'react';
import { toast } from '@/hooks/use-toast';
import Link from 'next/link';

export default function SettingsPage() {
  const { user, loading } = useAuth();
  const { language } = useLanguage();
  const [isEditingName, setIsEditingName] = useState(false);
  const [editedName, setEditedName] = useState('');

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Loading skeleton */}
        <div className="text-center mb-8">
          <div className="h-8 bg-gray-200 rounded-lg animate-pulse max-w-md mx-auto mb-4"></div>
          <div className="h-4 bg-gray-200 rounded-lg animate-pulse max-w-lg mx-auto"></div>
        </div>
        
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-gray-200/50">
          <div className="flex items-center space-x-6 mb-8">
            <div className="w-24 h-24 bg-gray-200 rounded-full animate-pulse"></div>
            <div className="flex-1">
              <div className="h-6 bg-gray-200 rounded animate-pulse w-48 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse w-64 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse w-32"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto text-center py-16">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 shadow-xl border border-gray-200/50">
          <User className="h-16 w-16 text-gray-400 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-gray-800 mb-4">{t('signInToViewSettings', language)}</h2>
          <p className="text-gray-600 mb-8 text-lg">{t('settingsRequireAuth', language)}</p>
          <Link href="/auth">
            <Button className="btn-gradient text-white px-8 py-3 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              {t('signIn', language)}
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleNameEdit = () => {
    setEditedName(user.displayName || '');
    setIsEditingName(true);
  };

  const handleNameSave = () => {
    // Here you would typically update the user's display name in Firebase
    toast({
      title: t('nameUpdated', language),
      description: t('nameUpdatedDesc', language),
    });
    setIsEditingName(false);
  };

  const handleNameCancel = () => {
    setEditedName('');
    setIsEditingName(false);
  };

  const formatJoinDate = (user: any) => {
    // Since we don't have the actual join date, we'll use a placeholder
    return new Date().toLocaleDateString(language === 'en' ? 'en-US' : language, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center mb-8 relative">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-emerald-400/10 to-teal-400/10 rounded-full blur-3xl -z-10"></div>
        
        <div className="mb-6">
          <div className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-emerald-200/50 shadow-lg mb-4">
            <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2 animate-pulse"></div>
            <span className="text-sm font-medium text-gray-700">{t('accountSettings', language)}</span>
          </div>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="gradient-text">{t('settings', language)}</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">{t('settingsSubtitle', language)}</p>
      </div>

      {/* Profile Card */}
      <Card className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-200/50 overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-emerald-50/80 to-teal-50/80 border-b border-gray-200/30">
          <CardTitle className="flex items-center space-x-3 text-2xl">
            <div className="p-3 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl shadow-lg">
              <User className="h-6 w-6 text-white" />
            </div>
            <span>{t('profileInformation', language)}</span>
          </CardTitle>
          <CardDescription className="text-gray-600 text-lg">
            {t('profileDesc', language)}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="p-8">
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-6 md:space-y-0 md:space-x-8">
            {/* Profile Picture */}
            <div className="relative group">
              <div className="w-32 h-32 rounded-full overflow-hidden shadow-2xl ring-4 ring-emerald-200/50 group-hover:ring-emerald-300/70 transition-all duration-300">
                <img
                  src={user.photoURL || 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop'}
                  alt={user.displayName || 'Profile'}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop';
                  }}
                />
              </div>
              <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <Camera className="h-8 w-8 text-white" />
              </div>
            </div>
            
            {/* Profile Details */}
            <div className="flex-1 space-y-6">
              {/* Display Name */}
              <div className="space-y-3">
                <Label className="text-sm font-semibold text-gray-700 flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span>{t('displayName', language)}</span>
                </Label>
                {isEditingName ? (
                  <div className="flex items-center space-x-3">
                    <Input
                      value={editedName}
                      onChange={(e) => setEditedName(e.target.value)}
                      className="flex-1 rounded-xl border-2 border-gray-200 focus:border-emerald-500"
                      placeholder={t('enterDisplayName', language)}
                    />
                    <Button
                      onClick={handleNameSave}
                      size="sm"
                      className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl"
                    >
                      <Check className="h-4 w-4" />
                    </Button>
                    <Button
                      onClick={handleNameCancel}
                      size="sm"
                      variant="outline"
                      className="rounded-xl"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between p-4 bg-gray-50/80 rounded-xl border border-gray-200/50">
                    <span className="text-lg font-semibold text-gray-800">
                      {user.displayName || t('noDisplayName', language)}
                    </span>
                    <Button
                      onClick={handleNameEdit}
                      size="sm"
                      variant="ghost"
                      className="text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"
                    >
                      <Edit3 className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>

              {/* Email */}
              <div className="space-y-3">
                <Label className="text-sm font-semibold text-gray-700 flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <span>{t('emailAddress', language)}</span>
                </Label>
                <div className="flex items-center justify-between p-4 bg-gray-50/80 rounded-xl border border-gray-200/50">
                  <span className="text-lg text-gray-800">{user.email}</span>
                  <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 border-emerald-200">
                    <Shield className="h-3 w-3 mr-1" />
                    {t('verified', language)}
                  </Badge>
                </div>
              </div>

              {/* Member Since */}
              <div className="space-y-3">
                <Label className="text-sm font-semibold text-gray-700 flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>{t('memberSince', language)}</span>
                </Label>
                <div className="p-4 bg-gray-50/80 rounded-xl border border-gray-200/50">
                  <span className="text-lg text-gray-800">{formatJoinDate(user)}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Account Actions */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Preferences */}
        <Card className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl">
                <Palette className="h-5 w-5 text-white" />
              </div>
              <span>{t('preferences', language)}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50/80 rounded-xl">
              <div className="flex items-center space-x-3">
                <Bell className="h-4 w-4 text-gray-600" />
                <span className="text-sm font-medium">{t('notifications', language)}</span>
              </div>
              <Badge variant="outline">{t('enabled', language)}</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50/80 rounded-xl">
              <div className="flex items-center space-x-3">
                <Globe className="h-4 w-4 text-gray-600" />
                <span className="text-sm font-medium">{t('language', language)}</span>
              </div>
              <Badge variant="outline">{language.toUpperCase()}</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Data & Privacy */}
        <Card className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <span>{t('dataPrivacy', language)}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              variant="outline"
              className="w-full justify-start rounded-xl border-2 hover:border-emerald-300 hover:bg-emerald-50"
            >
              <Download className="h-4 w-4 mr-3" />
              {t('exportData', language)}
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start rounded-xl border-2 hover:border-red-300 hover:bg-red-50 text-red-600 hover:text-red-700"
            >
              <X className="h-4 w-4 mr-3" />
              {t('deleteAccount', language)}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Account Statistics */}
      <Card className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl">
              <User className="h-5 w-5 text-white" />
            </div>
            <span>{t('accountStats', language)}</span>
          </CardTitle>
          <CardDescription>
            {t('accountStatsDesc', language)}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl">
              <div className="text-2xl font-bold text-emerald-600">47</div>
              <div className="text-sm text-gray-600">{t('totalSessions', language)}</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl">
              <div className="text-2xl font-bold text-blue-600">23h</div>
              <div className="text-sm text-gray-600">{t('totalFocusTime', language)}</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl">
              <div className="text-2xl font-bold text-purple-600">5</div>
              <div className="text-sm text-gray-600">{t('currentStreak', language)}</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-red-50 rounded-xl">
              <div className="text-2xl font-bold text-orange-600">89%</div>
              <div className="text-sm text-gray-600">{t('completionRate', language)}</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}