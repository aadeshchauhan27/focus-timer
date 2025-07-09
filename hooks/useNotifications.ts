'use client';
import { useCallback, useEffect, useState } from 'react';

export const useNotifications = () => {
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);

  useEffect(() => {
    // Check initial notification permission
    if ('Notification' in window) {
      setPermission(Notification.permission);
    }

    // Initialize audio context on user interaction
    const initAudio = () => {
      if (!audioContext) {
        const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
        setAudioContext(ctx);
      }
    };

    // Add event listeners for user interaction
    document.addEventListener('click', initAudio, { once: true });
    document.addEventListener('keydown', initAudio, { once: true });

    return () => {
      document.removeEventListener('click', initAudio);
      document.removeEventListener('keydown', initAudio);
    };
  }, [audioContext]);

  const requestPermission = useCallback(async () => {
    if ('Notification' in window && Notification.permission === 'default') {
      try {
        const permission = await Notification.requestPermission();
        setPermission(permission);
        return permission === 'granted';
      } catch (error) {
        console.error('Error requesting notification permission:', error);
        return false;
      }
    }
    return Notification.permission === 'granted';
  }, []);

  const showNotification = useCallback((title: string, body: string, icon?: string) => {
    if ('Notification' in window && Notification.permission === 'granted') {
      const notification = new Notification(title, {
        body,
        icon: icon || '/favicon.ico',
        badge: '/favicon.ico',
        tag: 'focus-timer',
        requireInteraction: true,
        silent: false,
        timestamp: Date.now(),
        data: {
          url: window.location.href
        }
      });

      // Auto-close notification after 10 seconds
      setTimeout(() => {
        notification.close();
      }, 10000);

      // Handle notification click
      notification.onclick = () => {
        window.focus();
        notification.close();
      };

      return notification;
    } else if (permission === 'default') {
      // Try to request permission again
      requestPermission();
    }
    return null;
  }, [permission, requestPermission]);

  const playSound = useCallback((type: 'completion' | 'tick' | 'warning') => {
    if (!audioContext) return;

    try {
      // Resume audio context if suspended
      if (audioContext.state === 'suspended') {
        audioContext.resume();
      }

      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      // Different sounds for different events
      switch (type) {
        case 'completion':
          // Success melody: C-E-G-C
          const frequencies = [523.25, 659.25, 783.99, 1046.50];
          frequencies.forEach((freq, index) => {
            const osc = audioContext.createOscillator();
            const gain = audioContext.createGain();
            
            osc.connect(gain);
            gain.connect(audioContext.destination);
            
            osc.frequency.setValueAtTime(freq, audioContext.currentTime + index * 0.2);
            osc.type = 'sine';
            
            gain.gain.setValueAtTime(0, audioContext.currentTime + index * 0.2);
            gain.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + index * 0.2 + 0.05);
            gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + index * 0.2 + 0.3);
            
            osc.start(audioContext.currentTime + index * 0.2);
            osc.stop(audioContext.currentTime + index * 0.2 + 0.3);
          });
          break;
          
        case 'tick':
          oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
          oscillator.type = 'square';
          gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
          oscillator.start();
          oscillator.stop(audioContext.currentTime + 0.1);
          break;
          
        case 'warning':
          // Warning beep
          oscillator.frequency.setValueAtTime(440, audioContext.currentTime);
          oscillator.type = 'sawtooth';
          gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
          oscillator.start();
          oscillator.stop(audioContext.currentTime + 0.5);
          break;
      }
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  }, [audioContext]);

  return {
    permission,
    requestPermission,
    showNotification,
    playSound
  };
};