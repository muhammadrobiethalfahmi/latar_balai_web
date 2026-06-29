import React from 'react';

export default function StatCard({ title, value, icon: Icon, color = 'primary' }) {
  // Map color names to classes
  const colorMap = {
    primary: {
      bg: 'bg-primary/10',
      text: 'text-primary',
      border: 'border-primary/20',
    },
    secondary: {
      bg: 'bg-secondary/10',
      text: 'text-secondary',
      border: 'border-secondary/20',
    },
    gold: {
      bg: 'bg-[#D4AF37]/10',
      text: 'text-[#D4AF37]',
      border: 'border-[#D4AF37]/20',
    },
    error: {
      bg: 'bg-error/10',
      text: 'text-error',
      border: 'border-error/20',
    },
  };

  const activeColor = colorMap[color] || colorMap.primary;

  return (
    <div className="bg-surface border border-outline-variant/30 rounded-lg p-6 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow duration-300">
      <div>
        <p className="text-body-md font-medium text-on-surface-variant uppercase tracking-wider mb-1">
          {title}
        </p>
        <h3 className="text-3xl font-bold font-heading text-on-surface">
          {value !== undefined ? value : '...'}
        </h3>
      </div>
      {Icon && (
        <div className={`p-3.5 rounded-full ${activeColor.bg} ${activeColor.text}`}>
          <Icon size={24} />
        </div>
      )}
    </div>
  );
}
