import React from 'react';
import { Pool } from '../../types/game';
import { useGameStore } from '../../store/gameStore';
import { Egg } from 'lucide-react';

interface NestPoolProps {
  pool: Pool;
  onSelect: (pool: Pool) => void;
}

export const NestPool: React.FC<NestPoolProps> = ({ pool, onSelect }) => {
  const { user } = useGameStore();
  const canAfford = user?.coinBalance >= pool.entryCost;

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 text-white">
      <div className="flex items-center gap-4 mb-4">
        <div className="p-3 bg-purple-600 rounded-lg">
          <Egg size={24} />
        </div>
        <div>
          <h3 className="text-xl font-bold">Level {pool.reward.dragonLevel} Nest</h3>
          <p className="text-sm opacity-80">Range: {pool.range.min}-{pool.range.max}</p>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <p className="text-sm">
          <span className="text-yellow-400">Entry Cost:</span> {pool.entryCost} coins
        </p>
        <p className="text-sm">
          <span className="text-green-400">Daily Bonus:</span> +{pool.reward.dailyCoins} coins
        </p>
      </div>

      <button
        onClick={() => onSelect(pool)}
        disabled={!canAfford}
        className={`w-full py-2 rounded-lg font-bold transition-colors ${
          canAfford 
            ? 'bg-purple-600 hover:bg-purple-700' 
            : 'bg-gray-600 cursor-not-allowed'
        }`}
      >
        {canAfford ? 'Select Nest' : 'Insufficient Coins'}
      </button>
    </div>
  );
};