import React from 'react';
import { Timer } from 'lucide-react';
import { useWinningNumber } from '../../hooks/useWinningNumber';

export const WinningNumber: React.FC = () => {
  const { winningNumber, timeLeft } = useWinningNumber();
  
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="bg-gray-800/50 backdrop-blur-lg rounded-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold text-white">Current Winning Number</h3>
          <p className="text-gray-400">Next draw in {minutes}:{seconds.toString().padStart(2, '0')}</p>
        </div>
        <div className="p-3 bg-purple-500/20 rounded-lg">
          <Timer className="text-purple-400" size={24} />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="bg-gray-900/50 rounded-lg p-3">
          <div className="text-sm text-gray-400 mb-1">Pool 1</div>
          <div className="text-2xl font-bold text-white">{Math.floor(winningNumber / 100)}</div>
        </div>
        <div className="bg-gray-900/50 rounded-lg p-3">
          <div className="text-sm text-gray-400 mb-1">Pool 2</div>
          <div className="text-2xl font-bold text-white">{Math.floor(winningNumber / 10) % 100}</div>
        </div>
        <div className="bg-gray-900/50 rounded-lg p-3">
          <div className="text-sm text-gray-400 mb-1">Pool 3</div>
          <div className="text-2xl font-bold text-white">{winningNumber}</div>
        </div>
      </div>
    </div>
  );
};