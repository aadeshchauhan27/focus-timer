import dummyData from './dummyAuth.json';

export interface DummyUser {
  uid: string;
  email: string;
  password: string;
  displayName: string;
  photoURL: string;
}

export interface DummySession {
  id: string;
  userId: string;
  duration: number;
  actualTime: number;
  type: 'pomodoro' | 'deep-focus' | 'custom';
  startTime: string;
  endTime: string;
  completed: boolean;
  createdAt: string;
}

// Global state management
let currentUser: DummyUser | null = null;
let sessions: DummySession[] = [];
let authStateListeners: ((user: DummyUser | null) => void)[] = [];

// Initialize dummy sessions for demo user
const initializeDummySessions = () => {
  if (sessions.length > 0) return; // Already initialized
  
  const dummySessions: DummySession[] = [];
  const today = new Date();
  
  // Generate sessions for the last 30 days
  for (let i = 0; i < 30; i++) {
    const sessionDate = new Date(today);
    sessionDate.setDate(sessionDate.getDate() - i);
    
    // Random number of sessions per day (0-3)
    const sessionsPerDay = Math.floor(Math.random() * 4);
    
    for (let j = 0; j < sessionsPerDay; j++) {
      const sessionStart = new Date(sessionDate);
      sessionStart.setHours(9 + Math.floor(Math.random() * 10));
      sessionStart.setMinutes(Math.floor(Math.random() * 60));
      
      const types: ('pomodoro' | 'deep-focus' | 'custom')[] = ['pomodoro', 'deep-focus', 'custom'];
      const type = types[Math.floor(Math.random() * types.length)];
      const duration = type === 'pomodoro' ? 25 : type === 'deep-focus' ? 50 : 30;
      const completed = Math.random() > 0.2; // 80% completion rate
      const actualTime = completed ? duration : Math.floor(duration * (0.3 + Math.random() * 0.6));
      
      const sessionEnd = new Date(sessionStart);
      sessionEnd.setMinutes(sessionEnd.getMinutes() + actualTime);
      
      dummySessions.push({
        id: `session-user-1-${i}-${j}`,
        userId: 'user-1',
        duration,
        actualTime,
        type,
        startTime: sessionStart.toISOString(),
        endTime: sessionEnd.toISOString(),
        completed,
        createdAt: sessionStart.toISOString()
      });
    }
  }
  
  sessions = dummySessions;
  
  // Store in localStorage
  if (typeof window !== 'undefined') {
    localStorage.setItem('dummyAuth_sessions', JSON.stringify(sessions));
  }
};

// Initialize on module load
if (typeof window !== 'undefined') {
  // Try to load from localStorage first
  const storedSessions = localStorage.getItem('dummyAuth_sessions');
  if (storedSessions) {
    try {
      sessions = JSON.parse(storedSessions);
    } catch (e) {
      console.error('Error parsing stored sessions:', e);
      initializeDummySessions();
    }
  } else {
    initializeDummySessions();
  }
  
  // Try to restore user from localStorage
  const storedUser = localStorage.getItem('dummyAuth_currentUser');
  if (storedUser) {
    try {
      currentUser = JSON.parse(storedUser);
    } catch (e) {
      console.error('Error parsing stored user:', e);
    }
  }
} else {
  // Server-side, just initialize dummy sessions
  initializeDummySessions();
}

const notifyAuthStateChange = (user: DummyUser | null) => {
  authStateListeners.forEach(listener => {
    try {
      listener(user);
    } catch (e) {
      console.error('Error in auth state listener:', e);
    }
  });
};

export const dummyAuth = {
  signInWithEmailAndPassword: async (email: string, password: string): Promise<DummyUser> => {
    const user = dummyData.users.find(u => u.email === email && u.password === password);
    if (!user) {
      throw new Error('Invalid email or password');
    }
    
    const authUser: DummyUser = {
      uid: user.id,
      email: user.email,
      password: user.password,
      displayName: user.displayName,
      photoURL: user.photoURL
    };
    
    currentUser = authUser;
    
    // Store in localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('dummyAuth_currentUser', JSON.stringify(authUser));
    }
    
    // Notify listeners
    setTimeout(() => notifyAuthStateChange(authUser), 10);
    
    return authUser;
  },

  createUserWithEmailAndPassword: async (email: string, password: string): Promise<DummyUser> => {
    const existingUser = dummyData.users.find(u => u.email === email);
    if (existingUser) {
      throw new Error('User already exists');
    }
    
    const newUser: DummyUser = {
      uid: `user-${Date.now()}`,
      email,
      password,
      displayName: email.split('@')[0],
      photoURL: "https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"
    };
    
    currentUser = newUser;
    
    // Store in localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('dummyAuth_currentUser', JSON.stringify(newUser));
    }
    
    // Notify listeners
    setTimeout(() => notifyAuthStateChange(newUser), 10);
    
    return newUser;
  },

  signOut: async (): Promise<void> => {
    currentUser = null;
    
    // Remove from localStorage
    if (typeof window !== 'undefined') {
      localStorage.removeItem('dummyAuth_currentUser');
    }
    
    // Notify listeners
    setTimeout(() => notifyAuthStateChange(null), 10);
  },

  getCurrentUser: (): DummyUser | null => {
    return currentUser;
  },

  onAuthStateChanged: (callback: (user: DummyUser | null) => void) => {
    // Add listener
    authStateListeners.push(callback);
    
    // Immediately call with current user
    setTimeout(() => callback(currentUser), 10);
    
    // Return unsubscribe function
    return () => {
      const index = authStateListeners.indexOf(callback);
      if (index > -1) {
        authStateListeners.splice(index, 1);
      }
    };
  }
};

export const dummyFirestore = {
  saveFocusSession: async (session: Omit<DummySession, 'id' | 'createdAt'>): Promise<string> => {
    const newSession: DummySession = {
      ...session,
      id: `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString()
    };
    
    sessions.unshift(newSession); // Add to beginning for recent first
    
    // Store in localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('dummyAuth_sessions', JSON.stringify(sessions));
    }
    
    return newSession.id;
  },

  getUserSessions: async (userId: string, limit = 50): Promise<DummySession[]> => {
    // Ensure sessions are initialized
    if (sessions.length === 0) {
      initializeDummySessions();
    }
    
    return sessions
      .filter(s => s.userId === userId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, limit);
  },

  getUserStats: async (userId: string) => {
    // Ensure sessions are initialized
    if (sessions.length === 0) {
      initializeDummySessions();
    }
    
    const userSessions = sessions.filter(s => s.userId === userId);
    const completedSessions = userSessions.filter(s => s.completed);
    
    const totalSessions = completedSessions.length;
    const totalFocusTime = completedSessions.reduce((sum, s) => sum + s.actualTime, 0);
    const averageSessionLength = totalSessions > 0 ? totalFocusTime / totalSessions : 0;
    const completionRate = userSessions.length > 0 ? (completedSessions.length / userSessions.length) * 100 : 0;
    
    // Calculate current streak
    const today = new Date();
    let streakDays = 0;
    let currentDate = new Date(today);
    
    // Check last 30 days for streak
    for (let i = 0; i < 30; i++) {
      const dateStr = currentDate.toISOString().split('T')[0];
      const hasSessionOnDate = completedSessions.some(s => 
        s.createdAt.split('T')[0] === dateStr
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
    
    return {
      totalSessions,
      totalFocusTime,
      averageSessionLength,
      completionRate,
      streakDays,
      longestStreak: Math.max(streakDays, 5) // Demo purposes
    };
  },

  getChartData: async (userId: string, days = 30) => {
    // Ensure sessions are initialized
    if (sessions.length === 0) {
      initializeDummySessions();
    }
    
    const userSessions = sessions.filter(s => s.userId === userId && s.completed);
    const chartData = [];
    const today = new Date();
    
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      
      const daySessions = userSessions.filter(s => 
        s.createdAt.split('T')[0] === dateStr
      );
      
      chartData.push({
        date: dateStr,
        sessions: daySessions.length,
        focusTime: daySessions.reduce((sum, s) => sum + s.actualTime, 0)
      });
    }
    
    return chartData;
  }
};