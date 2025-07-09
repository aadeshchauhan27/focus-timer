'use client';
import { useState, useEffect, useCallback } from 'react';
import { useNotifications } from './useNotifications';

export const useTimer = (initialDuration: number) => {
  const [timeLeft, setTimeLeft] = useState(initialDuration * 60); // Convert to seconds
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const { showNotification, playSound, requestPermission } = useNotifications();

  const start = useCallback(() => {
    setIsActive(true);
    setIsPaused(false);
    if (!startTime) {
      setStartTime(new Date());
      // Request notification permission when user starts timer
      requestPermission();
    }
  }, [startTime]);

  const pause = useCallback(() => {
    setIsActive(false);
    setIsPaused(true);
  }, []);

  const reset = useCallback(() => {
    setIsActive(false);
    setIsPaused(false);
    setTimeLeft(initialDuration * 60);
    setStartTime(null);
  }, [initialDuration]);

  const stop = useCallback(() => {
    setIsActive(false);
    setIsPaused(false);
    setTimeLeft(initialDuration * 60);
    setStartTime(null);
  }, [initialDuration]);
  const setDuration = useCallback((duration: number) => {
    setTimeLeft(duration * 60);
    setIsActive(false);
    setIsPaused(false);
    setStartTime(null);
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      setIsPaused(false);
      // Timer completed - show notifications
      handleTimerComplete();
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft]);

  const handleTimerComplete = useCallback(() => {
    // Play completion sound if enabled
    if (soundEnabled) {
      playSound('completion');
    }
    
    // Show browser notification if enabled
    if (notificationsEnabled) {
      showNotification(
        '🎉 Focus Session Complete!',
        `Great job! You've completed your ${initialDuration}-minute focus session.`,
        '/favicon.ico'
      );
    }
    
    // Flash the page title
    const originalTitle = document.title;
    let flashCount = 0;
    const flashInterval = setInterval(() => {
      document.title = flashCount % 2 === 0 ? '🎉 Session Complete!' : originalTitle;
      flashCount++;
      if (flashCount >= 10) {
        clearInterval(flashInterval);
        document.title = originalTitle;
      }
    }, 500);
    
    // Vibrate on mobile devices
    if ('vibrate' in navigator) {
      navigator.vibrate([200, 100, 200, 100, 200]);
    }
  }, [initialDuration, showNotification, playSound, soundEnabled, notificationsEnabled]);

  // Load settings from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedSound = localStorage.getItem('focusflow-sound-enabled');
      const savedNotifications = localStorage.getItem('focusflow-notifications-enabled');
      
      if (savedSound !== null) {
        setSoundEnabled(JSON.parse(savedSound));
      }
      if (savedNotifications !== null) {
        setNotificationsEnabled(JSON.parse(savedNotifications));
      }
    }
  }, []);

  // Save settings to localStorage
  const updateSoundEnabled = useCallback((enabled: boolean) => {
    setSoundEnabled(enabled);
    if (typeof window !== 'undefined') {
      localStorage.setItem('focusflow-sound-enabled', JSON.stringify(enabled));
    }
  }, []);

  const updateNotificationsEnabled = useCallback((enabled: boolean) => {
    setNotificationsEnabled(enabled);
    if (typeof window !== 'undefined') {
      localStorage.setItem('focusflow-notifications-enabled', JSON.stringify(enabled));
    }
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getProgress = () => {
    return ((initialDuration * 60 - timeLeft) / (initialDuration * 60)) * 100;
  };

  return {
    timeLeft,
    isActive,
    isPaused,
    start,
    pause,
    reset,
    stop,
    setDuration,
    formatTime: formatTime(timeLeft),
    progress: getProgress(),
    startTime,
    isCompleted: timeLeft === 0,
    requestNotificationPermission: requestPermission,
    soundEnabled,
    notificationsEnabled,
    setSoundEnabled: updateSoundEnabled,
    setNotificationsEnabled: updateNotificationsEnabled
  };
};