import React from 'react';
import { Timer, Trophy, Coins } from 'lucide-react';
import { useWinningNumber } from '../../hooks/useWinningNumber';
import { useGameStore } from '../../store/gameStore';

export const PoolHeader: React.FC = () => {
  const { timeLeft } = useWinningNumber();
  const { user } = useGameStore();
  
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <>
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">Dragon Egg Nests</h1>
        <div className="text-emerald-400 text-xl font-medium">
          Next hatching in: {minutes}:{seconds.toString().padStart(2, '0')}
        </div>
      </div>

      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-2 bg-gray-800/50 backdrop-blur-lg rounded-lg px-4 py-2">
          <Coins className="text-yellow-400" />
          <span className="text-white font-bold">{user?.coinBalance.toLocaleString()}</span>
        </div>
        <div className="flex items-center gap-2 bg-gray-800/50 backdrop-blur-lg rounded-lg px-4 py-2">
          <Trophy className="text-yellow-400" />
          <span className="text-white font-bold">$10.0K</span>
        </div>
      </div>
    </>
  );
};