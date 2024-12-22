import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Timer, Trophy, Coins, Flame } from 'lucide-react';
import { LevelPanel } from './LevelPanel';
import { NUMBER_GAME_CONFIG } from '../../config/numberGameConfig';
import { useWinningNumber } from '../../hooks/useWinningNumber';
import { useGameStore } from '../../store/gameStore';

export const NumberGame: React.FC = () => {
  const [selections, setSelections] = useState<Record<number, number[]>>({
    1: [],
    2: [],
    3: []
  });
  const { winningNumber, timeLeft } = useWinningNumber();
  const { user } = useGameStore();

  const handleNumberSelect = (levelId: number, number: number) => {
    setSelections(prev => {
      const currentSelections = prev[levelId];
      const isSelected = currentSelections.includes(number);
      
      if (isSelected) {
        return {
          ...prev,
          [levelId]: currentSelections.filter(n => n !== number)
        };
      }
      
      if (currentSelections.length < 3) {
        return {
          ...prev,
          [levelId]: [...currentSelections, number].sort((a, b) => a - b)
        };
      }
      
      return prev;
    });
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="max-w-4xl mx-auto p-4">
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

      <div className="bg-gray-800/30 backdrop-blur-lg rounded-2xl p-6 mb-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-yellow-500/20 rounded-xl">
            <Coins className="text-yellow-400" size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Gold Pools</h2>
            <p className="text-gray-400">Play with crypto to win big!</p>
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
              <div className="text-gray-400">Pool {level.id}</div>
            </div>
          ))}
        </div>

        <button className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold py-4 rounded-xl mb-4 flex items-center justify-center gap-2">
          <Coins size={20} />
          Play with Crypto - Win 250X
        </button>

        <p className="text-center text-gray-400">
          Higher stakes, better odds, instant withdrawals!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {NUMBER_GAME_CONFIG.levels.map(level => (
          <div key={level.id} className="bg-gray-800/30 backdrop-blur-lg rounded-xl p-6">
            <h3 className="text-xl font-bold text-white mb-2">Pool {level.id}</h3>
            <div className="text-gray-400 mb-2">
              Range: {level.range.min}-{level.range.max}
            </div>
            <div className="text-3xl font-bold text-emerald-400 mb-4">
              {level.multiplier}X
            </div>
            <div className="space-y-2">
              {selections[level.id].map(num => (
                <div key={num} className="bg-gray-700/50 rounded-lg p-2 text-center text-white">
                  {num}
                </div>
              ))}
              {Array.from({ length: 3 - selections[level.id].length }).map((_, i) => (
                <div key={i} className="bg-gray-700/20 rounded-lg p-2 text-center text-gray-500">
                  Select number
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <LevelPanel
        levels={NUMBER_GAME_CONFIG.levels}
        selections={selections}
        onNumberSelect={handleNumberSelect}
      />
    </div>
  );
};