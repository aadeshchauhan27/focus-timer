import { ReactNode } from 'react';
import { StatsCardProps } from '@/lib/types';


export default function StatsCard({ title, value, icon, subtitle, color = 'text-emerald-500' }: StatsCardProps) {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-gray-200/50 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 card-hover shimmer-effect">
      <div className="flex items-center justify-between mb-6">
        <div className={`p-4 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 shadow-lg ${color} transform hover:scale-110 transition-all duration-300`}>
          {icon}
        </div>
        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
      </div>
      <div className="space-y-2">
        <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">{title}</p>
        <p className="text-3xl font-bold text-gray-800 gradient-text">{value}</p>
        {subtitle && (
          <p className="text-sm text-gray-500 font-medium">{subtitle}</p>
        )}
      </div>
    </div>
  );
}