import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Focus Session History & Productivity Analytics - Track Your Progress',
  description: 'View your focus session history, productivity analytics, and track your progress. See detailed charts, statistics, and export your focus data. Monitor your Pomodoro sessions, study time, and work productivity trends.',
  keywords: [
    'focus history',
    'productivity analytics',
    'session tracking',
    'focus statistics',
    'productivity charts',
    'work time tracker',
    'pomodoro history',
    'study session tracker',
    'focus session analytics',
    'productivity dashboard',
    'time tracking history',
    'focus progress tracker',
    'work productivity analytics',
    'study time analytics',
    'focus session statistics'
  ],
  openGraph: {
    title: 'Focus History & Analytics - FocusFlow',
    description: 'Track your focus sessions, view productivity analytics, and monitor your progress with detailed charts and statistics.',
    url: 'https://focusflow.app/history',
  },
};

export default function HistoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}