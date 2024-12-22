import { useState, useCallback } from 'react';
import { useGameStore } from '../store/gameStore';
import { NUMBER_GAME_CONFIG } from '../config/numberGameConfig';
import { generateId } from '../utils/generators';
import { generateDragon } from '../utils/dragonGenerator';

export const useNumberGame = () => {
  const { user, actions } = useGameStore();
  const [isProcessing, setIsProcessing] = useState(false);

  const confirmSelection = useCallback(async (poolId: number, numbers: number[]) => {
    if (!user || isProcessing) return;

    const level = NUMBER_GAME_CONFIG.levels.find(l => l.id === poolId);
    if (!level) return;

    const cost = level.cost * numbers.length;
    if (user.coinBalance < cost) return;

    setIsProcessing(true);

    try {
      // Add selection to history
      const selection = {
        id: generateId(),
        numbers,
        pool: poolId,
        timestamp: Date.now(),
        status: 'pending' as const
      };

      // Deduct cost
      actions.updateBalance(-cost);
      actions.addSelection(selection);

      // Wait for next draw (simulated)
      await new Promise(resolve => setTimeout(resolve, NUMBER_GAME_CONFIG.drawInterval * 1000));

      // Generate winning number for this pool
      const winningNumber = Math.floor(Math.random() * (level.range.max - level.range.min + 1)) + level.range.min;

      if (numbers.includes(winningNumber)) {
        // Calculate winnings
        const winAmount = level.cost * level.multiplier;
        actions.updateBalance(winAmount);

        // Generate a dragon reward
        const dragon = generateDragon(level.id);
        actions.addDragon(dragon);

        // Update selection status
        actions.updateSelection({
          ...selection,
          status: 'won',
          winAmount
        });
      } else {
        actions.updateSelection({
          ...selection,
          status: 'lost'
        });
      }
    } finally {
      setIsProcessing(false);
    }
  }, [user, actions, isProcessing]);

  return {
    confirmSelection,
    isProcessing
  };
};