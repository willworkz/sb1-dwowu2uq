import React from 'react';

interface DragonStatBarProps {
  label: string;
  value: number;
  maxValue?: number;
  color: string;
}

export const DragonStatBar: React.FC<DragonStatBarProps> = ({ 
  label, 
  value, 
  maxValue = 10000,
  color 
}) => {
  const percentage = (value / maxValue) * 100;

  return (
    <div className="mb-2">
      <div className="flex justify-between text-sm mb-1">
        <span className="text-gray-300">{label}</span>
        <span className="text-gray-400">{value.toLocaleString()}</span>
      </div>
      <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
        <div
          className={`h-full ${color} transition-all duration-300`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};