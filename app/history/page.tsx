'use client';
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { getUserStats, getChartData, getUserSessions } from '@/lib/firestore';
import { UserStats, ChartData, FocusSession } from '@/lib/types';
import StatsCard from '@/components/StatsCard';
import SessionChart from '@/components/SessionChart';
import { Clock, Target, TrendingUp, Flame, Download, Calendar, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { useLanguage } from '@/hooks/useLanguage';
import { t } from '@/lib/i18n';
import Link from 'next/link';

export default function HistoryPage() {
  const { user, loading } = useAuth();
  const [stats, setStats] = useState<UserStats | null>(null);
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [sessions, setSessions] = useState<FocusSession[]>([]);
  const [chartType, setChartType] = useState<'line' | 'bar'>('line');
  const [dataKey, setDataKey] = useState<'sessions' | 'focusTime'>('sessions');
  const [timeRange, setTimeRange] = useState(30);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const { language } = useLanguage();

  useEffect(() => {
    if (user && !loading) {
      loadData();
    } else if (!loading && !user) {
      setIsInitialLoad(false);
    }
  }, [user, loading, timeRange]);

  const loadData = async () => {
    if (!user) return;
    
    console.log('Loading history data for user:', user.uid);
    if (isInitialLoad) {
      setIsInitialLoad(false);
    } else {
      setIsLoading(true);
    }
    
    try {
      const [userStats, chartData, userSessions] = await Promise.all([
        getUserStats(user.uid),
        getChartData(user.uid, timeRange),
        getUserSessions(user.uid, 100)
      ]);
      
      console.log('Loaded data:', { userStats, chartData: chartData.length, sessions: userSessions.length });
      
      setStats(userStats);
      setChartData(chartData);
      setSessions(userSessions);
    } catch (error) {
      console.error('Error loading data:', error);
      // Set default values instead of showing error
      setStats({
        totalSessions: 0,
        totalFocusTime: 0,
        averageSessionLength: 0,
        completionRate: 0,
        streakDays: 0,
        longestStreak: 0
      });
      setChartData([]);
      setSessions([]);
      
      // Show a less alarming message
      toast({
        title: "Connection Issue",
        description: "Some data may not be available. Your sessions are still being saved.",
        variant: "default",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const exportToCSV = () => {
    if (!sessions.length) {
      toast({
        title: t('noData', language),
        description: t('noDataDesc', language),
        variant: "destructive",
      });
      return;
    }
    
    const headers = ['Date', 'Duration (min)', 'Actual Time (min)', 'Type', 'Completed'];
    const csvData = sessions.map(session => [
      session.createdAt.toLocaleDateString(),
      session.duration,
      session.actualTime,
      session.type,
      session.completed ? 'Yes' : 'No'
    ]);
    
    const csvContent = [headers, ...csvData]
      .map(row => row.join(','))
      .join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `focus-sessions-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    
    toast({
      title: t('exportSuccessful', language),
      description: t('exportSuccessfulDesc', language),
    });
  };

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  // Show loading skeleton only on initial page load
  if (loading || isInitialLoad) {
    return (
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Hero Section Skeleton */}
        <div className="text-center mb-12 relative">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-emerald-400/10 to-teal-400/10 rounded-full blur-3xl -z-10"></div>
          
          <div className="mb-6">
            <div className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-emerald-200/50 shadow-lg mb-4">
              <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2 animate-pulse"></div>
              <span className="text-sm font-medium text-gray-700">Loading your insights...</span>
            </div>
          </div>
          
          <div className="h-12 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg mb-4 animate-pulse max-w-md mx-auto"></div>
          <div className="h-6 bg-gray-200 rounded-lg animate-pulse max-w-2xl mx-auto"></div>
        </div>

        {/* Stats Cards Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-gray-200/50">
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 bg-gray-200 rounded-2xl animate-pulse"></div>
                <div className="w-2 h-2 bg-gray-200 rounded-full animate-pulse"></div>
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
                <div className="h-8 bg-gray-200 rounded animate-pulse w-1/2"></div>
                <div className="h-3 bg-gray-200 rounded animate-pulse w-2/3"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Chart Skeleton */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-gray-200/50">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="h-6 bg-gray-200 rounded animate-pulse w-48 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse w-64"></div>
            </div>
            <div className="flex space-x-4">
              <div className="h-10 bg-gray-200 rounded-xl animate-pulse w-32"></div>
              <div className="h-10 bg-gray-200 rounded-xl animate-pulse w-24"></div>
            </div>
          </div>
          <div className="h-80 bg-gray-200 rounded-2xl animate-pulse"></div>
        </div>

        {/* Sessions Skeleton */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-gray-200/50">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="h-6 bg-gray-200 rounded animate-pulse w-40 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse w-56"></div>
            </div>
            <div className="h-10 bg-gray-200 rounded-xl animate-pulse w-32"></div>
          </div>
          
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center justify-between p-6 bg-gradient-to-r from-gray-50/80 to-gray-100/80 backdrop-blur-sm rounded-2xl">
                <div className="flex items-center space-x-6">
                  <div className="w-3 h-3 bg-gray-200 rounded-full animate-pulse"></div>
                  <div>
                    <div className="h-5 bg-gray-200 rounded animate-pulse w-32 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-40"></div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="h-5 bg-gray-200 rounded animate-pulse w-16 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-20"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center py-16">
        <Clock className="h-16 w-16 text-gray-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{t('signInToViewHistory', language)}</h2>
        <p className="text-gray-600">{t('trackSessionsDesc', language)}</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-12">
      {/* Loading overlay for data refreshes */}
      {isLoading && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white/90 backdrop-blur-lg rounded-2xl p-6 shadow-2xl border border-gray-200/50 flex items-center space-x-4">
            <Loader2 className="h-6 w-6 animate-spin text-emerald-600" />
            <span className="text-gray-700 font-medium">Updating your data...</span>
          </div>
        </div>
      )}
      
      <div className="text-center mb-12 relative">
        {/* Background decoration */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-emerald-400/10 to-teal-400/10 rounded-full blur-3xl -z-10"></div>
        
        <div className="mb-6">
          <div className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-emerald-200/50 shadow-lg mb-4">
            <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2 animate-pulse"></div>
            <span className="text-sm font-medium text-gray-700">{t('productivityInsights', language)}</span>
          </div>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="gradient-text">{t('focusHistory', language)}</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">{t('historySubtitle', language)}</p>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <StatsCard
            title={t('totalFocusTime', language)}
            value={formatTime(stats.totalFocusTime)}
            icon={<Clock className="h-5 w-5" />}
            subtitle={t('acrossAllSessions', language)}
          />
          <StatsCard
            title={t('sessionsCompleted', language)}
            value={stats.totalSessions}
            icon={<Target className="h-5 w-5" />}
            subtitle={`${stats.completionRate.toFixed(1)}% ${t('completionRate', language)}`}
          />
          <StatsCard
            title={t('averageSession', language)}
            value={formatTime(Math.round(stats.averageSessionLength))}
            icon={<TrendingUp className="h-5 w-5" />}
            subtitle={t('perSession', language)}
          />
          <StatsCard
            title={t('currentStreak', language)}
            value={`${stats.streakDays} ${t('days', language)}`}
            icon={<Flame className="h-5 w-5" />}
            subtitle={`${t('best', language)}: ${stats.longestStreak} ${t('days', language)}`}
            color="text-orange-500"
          />
        </div>
      )}

      {/* Chart Controls */}
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-gray-200/50">
        <div className="flex flex-wrap items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{t('productivityTrends', language)}</h2>
            <p className="text-gray-600">{t('trendsSubtitle', language)}</p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <select
              value={timeRange}
              onChange={(e) => {
                setTimeRange(Number(e.target.value));
              }}
              className="px-4 py-2 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white/80 backdrop-blur-sm shadow-lg transition-all duration-300"
              disabled={isLoading}
            >
              <option value={7}>{t('last7Days', language)}</option>
              <option value={30}>{t('last30Days', language)}</option>
              <option value={90}>{t('last90Days', language)}</option>
            </select>
            
            <div className="flex bg-gray-100/80 backdrop-blur-sm rounded-xl p-1 shadow-lg">
              <button
                onClick={() => setDataKey('sessions')}
                disabled={isLoading}
                className={`px-4 py-2 text-sm rounded-lg transition-all duration-300 font-medium ${
                  dataKey === 'sessions' 
                    ? 'bg-white text-emerald-600 shadow-lg transform scale-105' 
                    : 'text-gray-600 hover:text-gray-800 hover:bg-white/50 disabled:opacity-50'
                }`}
              >
                {t('sessions', language)}
              </button>
              <button
                onClick={() => setDataKey('focusTime')}
                disabled={isLoading}
                className={`px-4 py-2 text-sm rounded-lg transition-all duration-300 font-medium ${
                  dataKey === 'focusTime' 
                    ? 'bg-white text-emerald-600 shadow-lg transform scale-105' 
                    : 'text-gray-600 hover:text-gray-800 hover:bg-white/50 disabled:opacity-50'
                }`}
              >
                {t('focusTime', language)}
              </button>
            </div>
            
            <div className="flex bg-gray-100/80 backdrop-blur-sm rounded-xl p-1 shadow-lg">
              <button
                onClick={() => setChartType('line')}
                disabled={isLoading}
                className={`px-4 py-2 text-sm rounded-lg transition-all duration-300 font-medium ${
                  chartType === 'line' 
                    ? 'bg-white text-emerald-600 shadow-lg transform scale-105' 
                    : 'text-gray-600 hover:text-gray-800 hover:bg-white/50 disabled:opacity-50'
                }`}
              >
                {t('line', language)}
              </button>
              <button
                onClick={() => setChartType('bar')}
                disabled={isLoading}
                className={`px-4 py-2 text-sm rounded-lg transition-all duration-300 font-medium ${
                  chartType === 'bar' 
                    ? 'bg-white text-emerald-600 shadow-lg transform scale-105' 
                    : 'text-gray-600 hover:text-gray-800 hover:bg-white/50 disabled:opacity-50'
                }`}
              >
                {t('bar', language)}
              </button>
            </div>
          </div>
        </div>
        
        {chartData.length > 0 ? (
          <SessionChart data={chartData} type={chartType} dataKey={dataKey} />
        ) : (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">📊</div>
            <p className="text-gray-500 text-lg">{t('noChartData', language)}</p>
          </div>
        )}
      </div>

      {/* Recent Sessions */}
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-gray-200/50">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{t('recentSessions', language)}</h2>
            <p className="text-gray-600">{t('recentSessionsSubtitle', language)}</p>
          </div>
          <Button
            onClick={exportToCSV}
            variant="secondary"
            className="flex items-center space-x-2 bg-white/80 hover:bg-white/90 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 rounded-xl"
            disabled={sessions.length === 0 || isLoading}
          >
            <Download className="h-4 w-4" />
            <span>{t('exportCsv', language)}</span>
          </Button>
        </div>
        
        <div className="space-y-4">
          {sessions.slice(0, 10).map((session) => (
            <div
              key={session.id}
              className="flex items-center justify-between p-6 bg-gradient-to-r from-gray-50/80 to-gray-100/80 backdrop-blur-sm rounded-2xl hover:from-gray-100/80 hover:to-gray-200/80 transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
            >
              <div className="flex items-center space-x-6">
                <div className={`w-3 h-3 rounded-full ${
                  session.completed ? 'bg-green-500 animate-pulse' : 'bg-gray-400'
                } shadow-lg`} />
                <div>
                  <p className="font-semibold text-gray-800 capitalize text-lg">
                    {session.type.replace('-', ' ')} {t('session', language)}
                  </p>
                  <p className="text-sm text-gray-600 font-medium">
                    {session.createdAt.toLocaleDateString()} at {session.createdAt.toLocaleTimeString()}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-gray-800 text-lg">
                  {formatTime(session.actualTime)}
                </p>
                <p className="text-sm text-gray-600 font-medium">
                  {t('of', language)} {formatTime(session.duration)}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        {sessions.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-6">📅</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">{t('noSessions', language)}</h3>
            <p className="text-gray-600 mb-6">{t('noSessionsDesc', language)}</p>
            <Link href="/">
              <Button className="btn-gradient text-white px-6 py-3 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                {t('startFirstSession', language)}
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}