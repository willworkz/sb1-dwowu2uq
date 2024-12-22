import React from 'react';

interface ProgressBarProps {
  progress: number;
  total: number;
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ progress, total, className = '' }) => {
  const percentage = Math.min((progress / total) * 100, 100);
  
  return (
    <div className={`h-2 bg-gray-700 rounded-full overflow-hidden ${className}`}>
      <div
        className="h-full bg-gradient-to-r from-blue-400 to-purple-400 transition-all duration-300"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};