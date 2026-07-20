import React from 'react';

export const Card = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => {
  return (
    <div className={`bg-white rounded-2xl border border-slate-100 shadow-xl shadow-slate-200/40 relative overflow-hidden flex flex-col ${className}`}>
      {children}
    </div>
  );
};

export const CardHeader = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => {
  return (
    <div className={`p-6 border-b border-slate-100/60 ${className}`}>
      {children}
    </div>
  );
};

export const CardTitle = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => {
  return (
    <h3 className={`font-bold text-lg text-slate-800 flex items-center gap-2 ${className}`}>
      {children}
    </h3>
  );
};

export const CardContent = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => {
  return (
    <div className={`p-6 flex-1 ${className}`}>
      {children}
    </div>
  );
};
