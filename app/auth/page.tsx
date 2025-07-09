import { Metadata } from 'next';
import AuthForm from '@/components/AuthForm';

export const metadata: Metadata = {
  title: 'Sign In to Focus Timer - Track Your Productivity Sessions',
  description: 'Sign in to FocusFlow to track your focus sessions, view productivity analytics, and save your Pomodoro timer history. Free account with Google login available.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AuthPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="w-full max-w-md">
        <AuthForm />
      </div>
    </div>
  );
}