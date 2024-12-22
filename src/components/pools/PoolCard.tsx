import React from 'react';
import { motion } from 'framer-motion';
import { Coins } from 'lucide-react';

interface PoolCardProps {
  level: {
    id: number;
    name: string;
    range: { min: number; max: number };
    cost: number;
    multiplier: number;
    color: string;
  };
  selectedNumbers: number[];
  onSelect: () => void;
}

export const PoolCard: React.FC<PoolCardProps> = ({ level, selectedNumbers, onSelect }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-gray-800/30 backdrop-blur-lg rounded-xl p-6 cursor-pointer"
      onClick={onSelect}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-white">Pool {level.id}</h3>
          <div className="text-gray-400">Range: {level.range.min}-{level.range.max}</div>
        </div>
        <div className="flex items-center gap-1 bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-lg">
          <Coins size={16} />
          <span>{level.cost}</span>
        </div>
      </div>

      <div className="text-3xl font-bold text-emerald-400 mb-4">
        {level.multiplier}X
      </div>

      <div className="space-y-2">
        {selectedNumbers.map(num => (
          <div key={num} className="bg-gray-700/50 rounded-lg p-2 text-center text-white">
            {num}
          </div>
        ))}
        {Array.from({ length: 3 - selectedNumbers.length }).map((_, i) => (
          <div key={i} className="bg-gray-700/20 rounded-lg p-2 text-center text-gray-500">
            Select number
          </div>
        ))}
      </div>
    </motion.div>
  );
};