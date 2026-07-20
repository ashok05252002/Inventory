import React from 'react';
import { ArrowUpRight, ArrowDownRight, type LucideIcon } from 'lucide-react';

interface StatisticCardProps {
  title: string;
  value: string;
  trend: string;
  isPositive: boolean;
  trendLabel: string;
  icon: LucideIcon;
  colorClass: string;
  bgClass: string;
  borderClass: string;
  gradientClass: string;
}

export const StatisticCard = ({
  title, value, trend, isPositive, trendLabel, icon: Icon, colorClass, bgClass, borderClass, gradientClass
}: StatisticCardProps) => {
  return (
    <div className={`bg-white p-6 rounded-2xl border ${borderClass} shadow-xl shadow-slate-200/40 hover:shadow-2xl hover:shadow-slate-200/60 transition-all duration-300 hover:-translate-y-1 relative overflow-hidden group cursor-pointer`}>
      <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${gradientClass} rounded-bl-full -mr-16 -mt-16 transition-transform duration-500 group-hover:scale-110`}></div>
      <div className="flex justify-between items-start relative z-10">
        <div>
          <p className="text-sm font-semibold text-slate-500 mb-1 group-hover:text-slate-700 transition-colors">{title}</p>
          <h3 className="text-3xl font-extrabold text-slate-800 tracking-tight">{value}</h3>
        </div>
        <div className={`p-3 rounded-xl ${bgClass} shadow-inner group-hover:scale-110 transition-transform duration-300`}>
          <Icon className={`w-6 h-6 ${colorClass}`} />
        </div>
      </div>
      <div className="mt-5 flex items-center text-sm relative z-10">
        <span className={`flex items-center font-bold px-2 py-1 rounded-md ${isPositive ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
          {isPositive ? <ArrowUpRight className="w-4 h-4 mr-1" /> : <ArrowDownRight className="w-4 h-4 mr-1" />}
          {trend}
        </span>
        <span className="text-slate-400 font-medium ml-3">{trendLabel}</span>
      </div>
    </div>
  );
};
