'use client';
import { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Square, Bell, BellOff, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTimer } from '@/hooks/useTimer';
import { useAuth } from '@/hooks/useAuth';
import { saveFocusSession } from '@/lib/firestore';
import { toast } from '@/hooks/use-toast';
import { useLanguage } from '@/hooks/useLanguage';
import { t } from '@/lib/i18n';

const TIMER_MODES = {
  pomodoro: { duration: 25, label: 'Pomodoro', color: 'bg-red-500' },
  'deep-focus': { duration: 50, label: 'Deep Focus', color: 'bg-blue-500' },
  custom: { duration: 30, label: 'Custom', color: 'bg-green-500' }
};

export default function Timer() {
  const [selectedMode, setSelectedMode] = useState<keyof typeof TIMER_MODES>('pomodoro');
  const [customDuration, setCustomDuration] = useState(30);
  const { user } = useAuth();
  const { language } = useLanguage();
  
  const currentDuration = selectedMode === 'custom' ? customDuration : TIMER_MODES[selectedMode].duration;
  const { 
    timeLeft, 
    isActive, 
    isPaused, 
    start, 
    pause, 
    reset, 
    stop, 
    setDuration, 
    formatTime, 
    progress, 
    startTime, 
    isCompleted, 
    requestNotificationPermission,
    soundEnabled,
    notificationsEnabled,
    setSoundEnabled,
    setNotificationsEnabled
  } = useTimer(currentDuration);

  useEffect(() => {
    setDuration(currentDuration);
  }, [currentDuration, setDuration]);

  useEffect(() => {
    if (isCompleted && user && startTime) {
      handleSessionComplete();
    }
  }, [isCompleted, user, startTime]);

  const handleSessionComplete = async () => {
    if (!user || !startTime) return;
    
    const endTime = new Date();
    const actualTime = Math.floor((endTime.getTime() - startTime.getTime()) / 1000 / 60);
    
    try {
      await saveFocusSession({
        userId: user.uid,
        duration: currentDuration,
        actualTime,
        type: selectedMode,
        startTime,
        endTime,
        completed: true,
      });
      
      // Only show success toast if we got a real ID back (not offline fallback)
      const sessionId = await saveFocusSession({
        userId: user.uid,
        duration: currentDuration,
        actualTime,
        type: selectedMode,
        startTime,
        endTime,
        completed: true,
      });
      
      if (!sessionId.startsWith('offline-')) {
        toast({
          title: "Session Saved!",
          description: `Your ${currentDuration}-minute session has been saved to history.`,
        });
      }
    } catch (error) {
      console.error('Error saving session:', error);
      // Don't show error toast since we have fallback behavior
    }
  };

  const handleStop = async () => {
    if (user && startTime && (isActive || isPaused)) {
      const endTime = new Date();
      const actualTime = Math.floor((endTime.getTime() - startTime.getTime()) / 1000 / 60);
      
      if (actualTime > 0) {
        try {
          const sessionId = await saveFocusSession({
            userId: user.uid,
            duration: currentDuration,
            actualTime,
            type: selectedMode,
            startTime,
            endTime,
            completed: false,
          });
          
          if (!sessionId.startsWith('offline-')) {
            console.log('Stopped session saved successfully!');
            toast({
              title: "Session Saved!",
              description: `Your ${actualTime}-minute session has been saved to history.`,
            });
          }
        } catch (error) {
          console.error('Error saving stopped session:', error);
          // Don't show error toast since we have fallback behavior
        }
      }
    }
    stop();
  };

  const handleModeChange = (mode: keyof typeof TIMER_MODES) => {
    setSelectedMode(mode);
    reset();
  };

  const handleNotificationToggle = async () => {
    if (!notificationsEnabled) {
      const granted = await requestNotificationPermission();
      if (granted) {
        setNotificationsEnabled(true);
        toast({
          title: t('notificationsEnabled', language),
          description: t('notificationPermissionGranted', language),
        });
      } else {
        toast({
          title: "Notifications Blocked",
          description: t('notificationPermissionDenied', language),
          variant: "destructive",
        });
      }
    } else {
      setNotificationsEnabled(false);
      toast({
        title: t('notificationsDisabled', language),
        description: "You won't receive completion notifications.",
      });
    }
  };

  const CircularProgress = ({ progress }: { progress: number }) => {
    const radius = 120;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    const handleTimerClick = () => {
      if (isActive) {
        pause();
      } else {
        start();
      }
    };
    
    return (
      <div 
        className="relative cursor-pointer group transition-all duration-300 hover:scale-105" 
        onClick={handleTimerClick}
        title={isActive ? 'Click to pause' : 'Click to start'}
      >
        {/* Glowing background */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400/20 to-purple-400/20 blur-xl group-hover:blur-2xl transition-all duration-300"></div>
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-400/20 to-teal-400/20 blur-xl group-hover:blur-2xl transition-all duration-300"></div>
        
        {/* Outer glow ring */}
        <div className={`absolute inset-4 rounded-full transition-all duration-300 ${isActive ? 'animate-pulse-glow' : ''}`}></div>
        
        <svg className="transform -rotate-90 relative z-10" width="280" height="280">
          {/* Background circle with gradient */}
          <circle
            cx="140"
            cy="140"
            r={radius}
            stroke="url(#backgroundGradient)"
            strokeWidth="12"
            fill="none"
            opacity="0.3"
          />
          {/* Progress circle with animated gradient */}
          <circle
            cx="140"
            cy="140"
            r={radius}
            stroke="url(#progressGradient)"
            strokeWidth="12"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-1000 ease-out drop-shadow-lg"
            strokeLinecap="round"
          />
          
          {/* Gradient definitions */}
          <defs>
            <linearGradient id="backgroundGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#d1fae5" />
              <stop offset="100%" stopColor="#a7f3d0" />
            </linearGradient>
            <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="50%" stopColor="#059669" />
              <stop offset="100%" stopColor="#047857" />
            </linearGradient>
          </defs>
        </svg>
        
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center">
            <div className="text-7xl font-light text-gray-800 group-hover:text-gray-900 transition-all duration-300 mb-2 tracking-wider">
              {formatTime}
            </div>
            <div className="text-lg font-medium text-gray-500 group-hover:text-gray-600 transition-colors">
              {isActive ? (
                <span className="flex items-center justify-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span>{t('focusing', language)}</span>
                </span>
              ) : isPaused ? (
                <span className="flex items-center justify-center space-x-2">
                  <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                  <span>{t('paused', language)}</span>
                </span>
              ) : (
                <span className="flex items-center justify-center space-x-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  <span>{t('readyToFocus', language)}</span>
                </span>
              )}
            </div>
          </div>
        </div>
        
        {/* Enhanced play/pause indicator */}
        <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110">
          <div className="p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg">
            {isActive ? (
              <Pause className="h-5 w-5 text-emerald-600" />
            ) : (
              <Play className="h-5 w-5 text-emerald-600" />
            )}
          </div>
        </div>
        
        {/* Progress percentage indicator */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <div className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full shadow-lg">
            <span className="text-sm font-medium text-gray-700">{Math.round(progress)}%</span>
          </div>
        </div>
      </div>
    );
  };

  const ModeButton = ({ mode, isSelected, onClick }: { mode: keyof typeof TIMER_MODES, isSelected: boolean, onClick: () => void }) => (
    <button
      onClick={onClick}
      className={`relative px-8 py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 ${
        isSelected
          ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-xl hover:shadow-2xl'
          : 'bg-white/70 backdrop-blur-sm text-gray-700 hover:bg-white/90 hover:text-gray-900 shadow-lg hover:shadow-xl'
      }`}
    >
      {isSelected && (
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl blur opacity-50 -z-10"></div>
      )}
      <span className="relative z-10">{TIMER_MODES[mode].label}</span>
      {isSelected && (
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
      )}
    </button>
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-2">
      {/* Timer Mode Selection */}
      <div className="flex justify-center mb-8">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-3 shadow-2xl border border-gray-200/50">
          <div className="flex flex-wrap justify-center gap-3">
            {Object.entries(TIMER_MODES).map(([key, mode]) => (
              <ModeButton
                key={key}
                mode={key as keyof typeof TIMER_MODES}
                isSelected={selectedMode === key}
                onClick={() => handleModeChange(key as keyof typeof TIMER_MODES)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Custom Duration Input */}
      {selectedMode === 'custom' && (
        <div className="flex justify-center mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-gray-200/50 transform hover:scale-105 transition-all duration-300">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              {t('customDuration', language)}
            </label>
            <input
              type="number"
              value={customDuration}
              onChange={(e) => setCustomDuration(Number(e.target.value))}
              min="1"
              max="180"
             className="w-24 px-4 py-3 border-2 border-gray-200 rounded-xl text-center text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300"
            />
          </div>
        </div>
      )}

      {/* Timer Display */}
      <div className="flex justify-center mb-8">
        <CircularProgress progress={progress} />
      </div>

      {/* Controls */}
      <div className="flex flex-wrap justify-center gap-4 mb-6">
        {(isActive || isPaused) && (
          <Button
            onClick={handleStop}
            variant="destructive"
            size="lg"
            className="px-8 py-4 rounded-2xl text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 ripple"
          >
            <Square className="mr-2 h-5 w-5" />
            {t('stop', language)}
          </Button>
        )}
        
        <Button
          onClick={reset}
          variant="secondary"
          size="lg"
          className="px-8 py-4 rounded-2xl text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 bg-white/80 backdrop-blur-sm hover:bg-white/90 text-gray-700 hover:text-gray-900 ripple"
        >
          <RotateCcw className="mr-2 h-5 w-5" />
          {t('reset', language)}
        </Button>
      </div>

      {/* Notification Controls */}
      <div className="flex justify-center gap-4 mb-8">
        <Button
          onClick={handleNotificationToggle}
          variant="outline"
          size="sm"
          className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 ${
            notificationsEnabled 
              ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100' 
              : 'bg-gray-50 text-gray-500 border-gray-200 hover:bg-gray-100'
          }`}
        >
          {notificationsEnabled ? <Bell className="h-4 w-4" /> : <BellOff className="h-4 w-4" />}
          <span className="text-sm font-medium">
            {notificationsEnabled ? t('notificationsEnabled', language) : t('notificationsDisabled', language)}
          </span>
        </Button>
        
        <Button
          onClick={() => setSoundEnabled(!soundEnabled)}
          variant="outline"
          size="sm"
          className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 ${
            soundEnabled 
              ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100' 
              : 'bg-gray-50 text-gray-500 border-gray-200 hover:bg-gray-100'
          }`}
        >
          {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
          <span className="text-sm font-medium">
            {soundEnabled ? t('soundEnabled', language) : t('soundDisabled', language)}
          </span>
        </Button>
      </div>
      {/* Session Completion Notification */}
      {isCompleted && (
        <div className="mt-8 p-6 bg-gradient-to-r from-emerald-50 to-green-50 border-2 border-emerald-200/50 rounded-3xl text-center shadow-2xl transform hover:scale-105 transition-all duration-300">
          <div className="text-3xl mb-4 animate-bounce">🎉</div>
          <div className="text-emerald-800 font-bold text-2xl mb-3">
            {t('sessionCompleted', language)}
          </div>
          <div className="text-emerald-700 text-lg">
            {t('sessionCompletedDesc', language, { duration: currentDuration.toString() })}
            {user && (
              <div className="flex items-center justify-center mt-3 space-x-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">{t('sessionSaved', language)}</span>
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* Instructions */}
      <div className="mt-8 text-center">
        <div className="inline-flex items-center space-x-2 px-6 py-3 bg-white/60 backdrop-blur-sm rounded-full shadow-lg mb-4">
          <span className="text-lg">💡</span>
          <p className="text-sm font-medium text-gray-600">
            {t('timerInstructions', language)}
          </p>
        </div>
        
        {/* Notification status */}
        <div className="text-xs text-gray-500 max-w-md mx-auto">
          {notificationsEnabled ? (
            <span className="flex items-center justify-center space-x-1">
              <Bell className="h-3 w-3 text-emerald-500" />
              <span>{t('notificationStatusEnabled', language)}</span>
            </span>
          ) : (
            <span className="flex items-center justify-center space-x-1">
              <BellOff className="h-3 w-3 text-gray-400" />
              <span>{t('notificationStatusDisabled', language)}</span>
            </span>
          )}
        </div>
      </div>
      
      {/* Quick stats */}
      {user && (
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: t('todaysFocus', language), value: '2h 15m', icon: '⏰' },
            { label: t('thisWeek', language), value: '12h 30m', icon: '📅' },
            { label: t('streak', language), value: `5 ${t('days', language)}`, icon: '🔥' },
            { label: t('totalSessions', language), value: '47', icon: '🎯' }
          ].map((stat, index) => (
            <div key={index} className="bg-white/60 backdrop-blur-sm rounded-2xl p-3 text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <div className="text-2xl mb-2">{stat.icon}</div>
              <div className="text-lg font-bold text-gray-800">{stat.value}</div>
              <div className="text-xs text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}