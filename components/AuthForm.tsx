'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { initializeUserProfile } from '@/lib/firestore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Mail, Lock, User, Timer, Chrome } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useLanguage } from '@/hooks/useLanguage';
import { t } from '@/lib/i18n';

export default function AuthForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const { signInWithGoogle, signInWithEmail, signUpWithEmail } = useAuth();
  const { language } = useLanguage();

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setError('');

    try {
      const user = await signInWithGoogle();
      await initializeUserProfile(user);
      
      toast({
        title: t('welcomeBack', language),
        description: t('welcomeBackDesc', language),
      });
      
      router.push('/');
    } catch (error: any) {
      console.error('Google sign in error:', error);
      setError(error.message || 'Failed to sign in with Google');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const user = await signInWithEmail(email, password);
      await initializeUserProfile(user);
      
      toast({
        title: t('welcomeBack', language),
        description: t('welcomeBackDesc', language),
      });
      
      router.push('/');
    } catch (error: any) {
      console.error('Email sign in error:', error);
      setError(error.message || 'An error occurred during sign in.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      setIsLoading(false);
      return;
    }

    try {
      const user = await signUpWithEmail(email, password, displayName || email.split('@')[0]);
      await initializeUserProfile(user);
      
      toast({
        title: t('accountCreated', language),
        description: t('accountCreatedDesc', language),
      });
      
      router.push('/');
    } catch (error: any) {
      console.error('Email sign up error:', error);
      setError(error.message || 'An error occurred during sign up.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full shadow-2xl border-0 bg-white/90 backdrop-blur-lg rounded-3xl overflow-hidden">
      {/* Decorative header background */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-r from-emerald-500/10 to-teal-500/10"></div>
      
      <CardHeader className="text-center pb-8 relative z-10">
        <div className="flex justify-center mb-4">
          <div className="p-4 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl shadow-xl animate-float">
            <Timer className="h-10 w-10 text-white" />
          </div>
        </div>
        <CardTitle className="text-3xl font-bold mb-2">
          <span className="gradient-text">{t('welcomeTo', language)}</span>
          <span className="text-gray-800"> FocusFlow</span>
        </CardTitle>
        <CardDescription className="text-gray-600 text-lg">
          {t('authSubtitle', language)}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="relative z-10">
        <Tabs defaultValue="signin" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8 bg-gray-100/80 backdrop-blur-sm rounded-2xl p-1 shadow-lg">
            <TabsTrigger value="signin" className="flex items-center space-x-2 rounded-xl transition-all duration-300 data-[state=active]:bg-white data-[state=active]:shadow-lg">
              <User className="h-4 w-4" />
              <span>{t('signIn', language)}</span>
            </TabsTrigger>
            <TabsTrigger value="signup" className="flex items-center space-x-2 rounded-xl transition-all duration-300 data-[state=active]:bg-white data-[state=active]:shadow-lg">
              <Mail className="h-4 w-4" />
              <span>{t('signUp', language)}</span>
            </TabsTrigger>
          </TabsList>

          {error && (
            <Alert className="mb-6 border-red-200 bg-red-50/80 backdrop-blur-sm rounded-2xl shadow-lg">
              <AlertDescription className="text-red-700">{error}</AlertDescription>
            </Alert>
          )}

          {/* Google Sign In Button */}
          <div className="mb-6">
            <Button
              onClick={handleGoogleSignIn}
              variant="outline"
              className="w-full py-3 rounded-xl border-2 border-gray-200 hover:border-gray-300 bg-white/80 backdrop-blur-sm hover:bg-white/90 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 font-semibold text-lg ripple"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="mr-3 h-5 w-5 animate-spin" />
              ) : (
                <Chrome className="mr-3 h-5 w-5 text-emerald-500" />
              )}
              <span className="text-gray-700">{t('continueWithGoogle', language)}</span>
            </Button>
            
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white/90 text-gray-500 font-medium">{t('orContinueWith', language)}</span>
              </div>
            </div>
          </div>

          <TabsContent value="signin">
            <form onSubmit={handleSignIn} className="space-y-6">
              <div className="space-y-3">
                <Label htmlFor="signin-email" className="text-sm font-semibold text-gray-700">{t('email', language)}</Label>
                <div className="relative">
                  <Mail className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
                  <Input
                    id="signin-email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-12 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-300 bg-white/80 backdrop-blur-sm"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>
              
              <div className="space-y-3">
                <Label htmlFor="signin-password" className="text-sm font-semibold text-gray-700">{t('password', language)}</Label>
                <div className="relative">
                  <Lock className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
                  <Input
                    id="signin-password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-12 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-300 bg-white/80 backdrop-blur-sm"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full btn-gradient text-white py-3 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 font-semibold text-lg ripple"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  t('signIn', language)
                )}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="signup">
            <form onSubmit={handleSignUp} className="space-y-6">
              <div className="space-y-3">
                <Label htmlFor="signup-name" className="text-sm font-semibold text-gray-700">Display Name</Label>
                <div className="relative">
                  <User className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
                  <Input
                    id="signup-name"
                    type="text"
                    placeholder="Enter your name (optional)"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="pl-12 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-300 bg-white/80 backdrop-blur-sm"
                    disabled={isLoading}
                  />
                </div>
              </div>
              
              <div className="space-y-3">
                <Label htmlFor="signup-email" className="text-sm font-semibold text-gray-700">{t('email', language)}</Label>
                <div className="relative">
                  <Mail className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-12 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-300 bg-white/80 backdrop-blur-sm"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>
              
              <div className="space-y-3">
                <Label htmlFor="signup-password" className="text-sm font-semibold text-gray-700">{t('password', language)}</Label>
                <div className="relative">
                  <Lock className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
                  <Input
                    id="signup-password"
                    type="password"
                    placeholder="Create a password (min. 6 characters)"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-12 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-300 bg-white/80 backdrop-blur-sm"
                    required
                    minLength={6}
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Label htmlFor="confirm-password" className="text-sm font-semibold text-gray-700">{t('confirmPassword', language)}</Label>
                <div className="relative">
                  <Lock className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
                  <Input
                    id="confirm-password"
                    type="password"
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="pl-12 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-300 bg-white/80 backdrop-blur-sm"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full btn-gradient text-white py-3 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 font-semibold text-lg ripple"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  t('createAccount', language)
                )}
              </Button>

              <p className="text-xs text-gray-500 text-center font-medium">
                By creating an account, you agree to our terms of service and privacy policy.
              </p>
            </form>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}