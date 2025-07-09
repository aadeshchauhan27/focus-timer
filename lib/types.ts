import { Timestamp } from 'firebase/firestore';

export interface FocusSession {
  id: string;
  userId: string;
  duration: number; // in minutes
  actualTime: number; // actual time spent in minutes
  type: 'pomodoro' | 'deep-focus' | 'custom';
  startTime: Date;
  endTime: Date;
  completed: boolean;
  createdAt: Date;
}

export interface FirestoreFocusSessionData {
  userId: string;
  duration: number;
  actualTime: number;
  type: 'pomodoro' | 'deep-focus' | 'custom';
  startTime: Timestamp;
  endTime: Timestamp;
  completed: boolean;
  createdAt: Timestamp;
}

export interface UserStats {
  totalSessions: number;
  totalFocusTime: number; // in minutes
  averageSessionLength: number;
  completionRate: number;
  streakDays: number;
  longestStreak: number;
}

export interface ChartData {
  date: string;
  sessions: number;
  focusTime: number;
}

export interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  subtitle?: string;
  color?: string;
}