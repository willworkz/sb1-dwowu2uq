import React from 'react';
import { motion } from 'framer-motion';
import { Check, AlertCircle } from 'lucide-react';
import { NUMBER_GAME_CONFIG } from '../../config/numberGameConfig';
import { useGameStore } from '../../store/gameStore';

interface ConfirmButtonProps {
  selections: Record<number, number[]>;
  onConfirm: (poolId: number) => void;
}

export const ConfirmButton: React.FC<ConfirmButtonProps> = ({ selections, onConfirm }) => {
  const { user } = useGameStore();

  // Calculate total cost for all selections
  const totalCost = Object.entries(selections).reduce((acc, [poolId, numbers]) => {
    const level = NUMBER_GAME_CONFIG.levels[parseInt(poolId) - 1];
    return acc + (numbers.length * level.cost);
  }, 0);

  // Check if any numbers are selected
  const hasSelections = Object.values(selections).some(nums => nums.length > 0);
  const canAfford = user?.coinBalance && user.coinBalance >= totalCost;

  if (!hasSelections) return null;

  const handleConfirm = () => {
    // Find the highest level pool with selections
    for (let i = NUMBER_GAME_CONFIG.levels.length - 1; i >= 0; i--) {
      const poolId = i + 1;
      if (selections[poolId].length > 0) {
        onConfirm(poolId);
        break;
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-20 left-0 right-0 p-4 z-50"
    >
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-800/95 backdrop-blur-lg rounded-2xl p-4 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-white font-bold">Your Selections</h3>
              <p className="text-gray-400 text-sm">
                Total Cost: {totalCost.toLocaleString()} coins
              </p>
            </div>
            {!canAfford && (
              <div className="flex items-center gap-2 text-red-400">
                <AlertCircle size={16} />
                <span className="text-sm">Insufficient balance</span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-3 gap-4 mb-4">
            {NUMBER_GAME_CONFIG.levels.map(level => {
              const nums = selections[level.id];
              if (nums.length === 0) return null;

              return (
                <div key={level.id} className="bg-gray-700/50 rounded-xl p-3">
                  <div className="text-gray-400 text-sm mb-2">
                    Pool {level.id} ({level.cost} coins each)
                  </div>
                  <div className="flex gap-2">
                    {nums.map(num => (
                      <div key={num} className="bg-purple-500/20 text-purple-400 px-2 py-1 rounded-lg text-sm">
                        {num}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <button
            onClick={handleConfirm}
            disabled={!canAfford}
            className={`
              w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2
              ${canAfford
                ? 'bg-emerald-500 hover:bg-emerald-600 text-white'
                : 'bg-gray-600 text-gray-400 cursor-not-allowed'
              }
            `}
          >
            <Check size={20} />
            Confirm Selections
          </button>
        </div>
      </div>
    </motion.div>
  );
};