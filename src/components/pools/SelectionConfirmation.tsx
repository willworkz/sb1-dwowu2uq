import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, X, Timer, AlertCircle } from 'lucide-react';
import { NUMBER_GAME_CONFIG } from '../../config/numberGameConfig';
import { useGameStore } from '../../store/gameStore';

interface SelectionConfirmationProps {
  poolId: number;
  selectedNumbers: number[];
  onConfirm: () => void;
  onCancel: () => void;
}

export const SelectionConfirmation: React.FC<SelectionConfirmationProps> = ({
  poolId,
  selectedNumbers,
  onConfirm,
  onCancel
}) => {
  const [timeLeft, setTimeLeft] = useState(30); // 30 seconds to confirm
  const { user } = useGameStore();
  const level = NUMBER_GAME_CONFIG.levels.find(l => l.id === poolId);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          onCancel();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onCancel]);

  if (!level) return null;

  const cost = level.cost * selectedNumbers.length;
  const canAfford = user?.coinBalance && user.coinBalance >= cost;
  const potentialWin = cost * level.multiplier;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
    >
      <div className="bg-gray-800 rounded-2xl p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-white">Confirm Selection</h3>
          <div className="flex items-center gap-2 text-yellow-400">
            <Timer size={16} />
            <span>{timeLeft}s</span>
          </div>
        </div>

        <div className="space-y-4 mb-6">
          <div className="bg-gray-700/50 rounded-xl p-4">
            <div className="text-gray-400 mb-2">Selected Numbers:</div>
            <div className="flex gap-2">
              {selectedNumbers.map(num => (
                <div key={num} className="bg-purple-500/20 text-purple-400 px-3 py-1 rounded-lg">
                  {num}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-700/50 rounded-xl p-4">
            <div className="flex justify-between items-center">
              <div>
                <div className="text-gray-400">Cost:</div>
                <div className="text-xl font-bold text-yellow-400">
                  {cost.toLocaleString()} coins
                </div>
              </div>
              <div className="text-right">
                <div className="text-gray-400">Potential Win:</div>
                <div className="text-xl font-bold text-emerald-400">
                  {potentialWin.toLocaleString()} coins
                </div>
              </div>
            </div>
          </div>

          {!canAfford && (
            <div className="flex items-center gap-2 text-red-400 bg-red-400/10 rounded-xl p-4">
              <AlertCircle size={20} />
              <span>Insufficient balance</span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={onCancel}
            className="flex items-center justify-center gap-2 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-xl transition-colors"
          >
            <X size={20} />
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={!canAfford}
            className={`
              flex items-center justify-center gap-2 py-3 rounded-xl transition-colors
              ${canAfford
                ? 'bg-emerald-500 hover:bg-emerald-600 text-white'
                : 'bg-gray-600 text-gray-400 cursor-not-allowed'
              }
            `}
          >
            <Check size={20} />
            Confirm
          </button>
        </div>
      </div>
    </motion.div>
  );
};