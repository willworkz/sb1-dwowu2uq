import React from 'react';
import { Coins, Flame } from 'lucide-react';
import { NUMBER_GAME_CONFIG } from '../../config/numberGameConfig';

export const PoolSummary: React.FC = () => {
  return (
    <div className="bg-gray-800/30 backdrop-blur-lg rounded-2xl p-6 mb-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-yellow-500/20 rounded-xl">
          <Coins className="text-yellow-400" size={24} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">Gold Pools</h2>
          <p className="text-gray-400">Select numbers to win dragons!</p>
        </div>
        <Flame className="text-orange-500 ml-auto" size={24} />
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        {NUMBER_GAME_CONFIG.levels.map(level => (
          <div key={level.id} 
            className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-4 text-center"
          >
            <div className="text-2xl font-bold text-yellow-400 mb-1">
              {level.multiplier}X
            </div>
            <div className="text-gray-400">Cost: {level.cost} coins</div>
          </div>
        ))}
      </div>

      <div className="bg-gray-700/30 rounded-xl p-4 mb-4">
        <h3 className="text-lg font-bold text-white mb-2">How to Play</h3>
        <ul className="text-gray-400 space-y-2 text-sm">
          <li>• Select up to 3 numbers per pool</li>
          <li>• Each selection costs the pool's entry fee</li>
          <li>• Win multiplier × cost if your number hatches</li>
          <li>• Get a special dragon for each win!</li>
        </ul>
      </div>
    </div>
  );
};