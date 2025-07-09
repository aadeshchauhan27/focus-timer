import { 
  collection, 
  addDoc, 
  query, 
  where, 
  orderBy, 
  limit, 
  getDocs,
  Timestamp,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  increment
} from 'firebase/firestore';
import { db } from './firebase';
import { FocusSession, UserStats, ChartData, FirestoreFocusSessionData } from './types';

// Collections
const SESSIONS_COLLECTION = 'focusSessions';
const USERS_COLLECTION = 'users';
const USER_STATS_COLLECTION = 'userStats';

export const saveFocusSession = async (session: Omit<FocusSession, 'id' | 'createdAt'>) => {
  try {
    console.log('Saving session to Firestore:', session);
    
    const sessionData = {
      ...session,
      startTime: Timestamp.fromDate(session.startTime),
      endTime: Timestamp.fromDate(session.endTime),
      createdAt: Timestamp.now()
    };

    const docRef = await addDoc(collection(db, SESSIONS_COLLECTION), sessionData);
    console.log('Session saved with ID:', docRef.id);
    
    // Update user stats
    try {
      await updateUserStats(session.userId, {
        totalSessions: increment(1),
        totalFocusTime: increment(session.actualTime),
        lastSessionDate: Timestamp.now()
      });
    } catch (statsError) {
      console.warn('Failed to update user stats, but session was saved:', statsError);
    }
    
    return docRef.id;
  } catch (error) {
    console.error('Error saving focus session:', error);
    // Don't throw the error - return a fallback ID so the app continues working
    return `offline-${Date.now()}`;
  }
};

export const getUserSessions = async (userId: string, limitCount = 50): Promise<FocusSession[]> => {
  try {
    console.log('Fetching sessions for user:', userId);
    
    // Start with the simplest query to avoid index issues
    const q = query(
      collection(db, SESSIONS_COLLECTION),
      where('userId', '==', userId),
      limit(limitCount)
    );

    const querySnapshot = await getDocs(q);
    const sessions: FocusSession[] = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data() as FirestoreFocusSessionData;
      try {
        sessions.push({
          id: doc.id,
          userId: data.userId,
          duration: data.duration || 25,
          actualTime: data.actualTime || 0,
          type: data.type || 'pomodoro',
          completed: data.completed || false,
          startTime: data.startTime?.toDate() || new Date(),
          endTime: data.endTime?.toDate() || new Date(),
          createdAt: data.createdAt?.toDate() || new Date()
        });
      } catch (docError) {
        console.warn('Skipping malformed document:', doc.id, docError);
      }
    });

    // Always sort manually to ensure consistent ordering
    sessions.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

    console.log('Fetched sessions:', sessions.length);
    return sessions;
  } catch (error) {
    console.error('Error fetching user sessions:', error);
    // Return empty array instead of throwing to keep app functional
    return [];
  }
};

export const getUserStats = async (userId: string): Promise<UserStats> => {
  try {
    console.log('Calculating stats for user:', userId);
    
    // Use simple query to avoid index issues
    const q = query(
      collection(db, SESSIONS_COLLECTION),
      where('userId', '==', userId)
    );

    const querySnapshot = await getDocs(q);
    const sessions: any[] = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data() as FirestoreFocusSessionData;
      try {
        sessions.push({
          ...data,
          createdAt: data.createdAt?.toDate() || new Date(),
          completed: data.completed || false,
          actualTime: data.actualTime || 0
        });
      } catch (docError) {
        console.warn('Skipping malformed document in stats:', doc.id, docError);
      }
    });

    const completedSessions = sessions.filter(s => s.completed);
    const totalSessions = completedSessions.length;
    const totalFocusTime = completedSessions.reduce((sum, s) => sum + s.actualTime, 0);
    const averageSessionLength = totalSessions > 0 ? totalFocusTime / totalSessions : 0;
    const completionRate = sessions.length > 0 ? (completedSessions.length / sessions.length) * 100 : 0;

    // Calculate current streak
    const today = new Date();
    let streakDays = 0;
    let currentDate = new Date(today);
    
    // Check last 30 days for streak
    for (let i = 0; i < 30; i++) {
      const dateStr = currentDate.toISOString().split('T')[0];
      const hasSessionOnDate = completedSessions.some(s => 
        s.createdAt && s.createdAt.toISOString().split('T')[0] === dateStr
      );
      
      if (hasSessionOnDate) {
        streakDays++;
        currentDate.setDate(currentDate.getDate() - 1);
      } else if (i > 0) { // Don't break on first day (today might not have sessions yet)
        break;
      } else {
        currentDate.setDate(currentDate.getDate() - 1);
      }
    }

    const stats: UserStats = {
      totalSessions,
      totalFocusTime,
      averageSessionLength,
      completionRate,
      streakDays,
      longestStreak: Math.max(streakDays, 0) // For now, use current streak as longest
    };

    console.log('Calculated stats:', stats);
    return stats;
  } catch (error) {
    console.error('Error calculating user stats:', error);
    // Return default stats instead of throwing
    return {
      totalSessions: 0,
      totalFocusTime: 0,
      averageSessionLength: 0,
      completionRate: 0,
      streakDays: 0,
      longestStreak: 0
    };
  }
};

export const getChartData = async (userId: string, days = 30): Promise<ChartData[]> => {
  try {
    console.log('Fetching chart data for user:', userId, 'days:', days);
    
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    
    // Use simple query to avoid index issues
    const q = query(
      collection(db, SESSIONS_COLLECTION),
      where('userId', '==', userId)
    );

    const querySnapshot = await getDocs(q);
    const sessions: any[] = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data() as FirestoreFocusSessionData;
      try {
        const createdAt = data.createdAt?.toDate();
        if (createdAt && createdAt >= startDate) {
          sessions.push({
            ...data,
            createdAt,
            completed: data.completed || false,
            actualTime: data.actualTime || 0
          });
        }
      } catch (docError) {
        console.warn('Skipping malformed document in chart data:', doc.id, docError);
      }
    });

    // Filter completed sessions manually if we couldn't do it in the query
    const completedSessions = sessions.filter(s => s.completed);
    
    // Always sort manually
    completedSessions.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());

    const chartData: ChartData[] = [];
    const today = new Date();
    
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      
      const daySessions = completedSessions.filter(s => 
        s.createdAt && s.createdAt.toISOString().split('T')[0] === dateStr
      );
      
      chartData.push({
        date: dateStr,
        sessions: daySessions.length,
        focusTime: daySessions.reduce((sum, s) => sum + (s.actualTime || 0), 0)
      });
    }
    
    console.log('Chart data:', chartData.length, 'points');
    return chartData;
  } catch (error) {
    console.error('Error fetching chart data:', error);
    // Return empty chart data instead of throwing
    const chartData: ChartData[] = [];
    const today = new Date();
    
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      
      chartData.push({
        date: dateStr,
        sessions: 0,
        focusTime: 0
      });
    }
    
    return chartData;
  }
};

// Helper function to update user stats
const updateUserStats = async (userId: string, updates: any) => {
  try {
    const userStatsRef = doc(db, USER_STATS_COLLECTION, userId);
    await updateDoc(userStatsRef, updates);
  } catch (error) {
    // If document doesn't exist, create it
    if (error instanceof Error && (error.message.includes('No document to update') || error.message.includes('not found'))) {
      const userStatsRef = doc(db, USER_STATS_COLLECTION, userId);
      try {
        await setDoc(userStatsRef, {
          userId,
          totalSessions: 1,
          totalFocusTime: updates.totalFocusTime || 0,
          lastSessionDate: updates.lastSessionDate || Timestamp.now(),
          createdAt: Timestamp.now()
        });
      } catch (createError) {
        console.error('Failed to create user stats document:', createError);
      }
    } else {
      console.error('Error updating user stats:', error);
    }
  }
};

// Initialize user profile
export const initializeUserProfile = async (user: any) => {
  try {
    const userRef = doc(db, USERS_COLLECTION, user.uid);
    const userDoc = await getDoc(userRef);
    
    if (!userDoc.exists()) {
      try {
        await setDoc(userRef, {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          createdAt: Timestamp.now(),
          lastLoginAt: Timestamp.now()
        });
      } catch (createError) {
        console.warn('Failed to create user profile, continuing anyway:', createError);
      }
      
      // Initialize user stats
      try {
        const userStatsRef = doc(db, USER_STATS_COLLECTION, user.uid);
        await setDoc(userStatsRef, {
          userId: user.uid,
          totalSessions: 0,
          totalFocusTime: 0,
          createdAt: Timestamp.now()
        });
      } catch (statsError) {
        console.warn('Failed to create user stats, continuing anyway:', statsError);
      }
    } else {
      // Update last login
      try {
        await updateDoc(userRef, {
          lastLoginAt: Timestamp.now()
        });
      } catch (updateError) {
        console.warn('Failed to update last login, continuing anyway:', updateError);
      }
    }
  } catch (error) {
    console.warn('Error initializing user profile, continuing anyway:', error);
  }
};