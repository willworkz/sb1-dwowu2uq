import { useState, useCallback } from 'react';
import { useGameStore } from '../store/gameStore';
import { GAME_CONFIG } from '../config/gameConfig';
import { userService } from '../services/userService';
import { createFloatingNumber } from '../utils/animations';

export const useTapping = () => {
  const { user, currentEggProgress, actions } = useGameStore();
  const [canTap, setCanTap] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleTap = useCallback(async () => {
    if (!canTap || !user || user.dailyTaps >= GAME_CONFIG.tapping.dailyLimit || isUpdating) {
      return;
    }

    setCanTap(false);
    setIsUpdating(true);
    
    try {
      // Optimistically update UI
      const points = GAME_CONFIG.tapping.pointsPerTap;
      actions.updateBalance(points);
      actions.updateEggProgress(currentEggProgress + points);
      
      // Show animation
      createFloatingNumber(points, 'tap-area');
      
      // Update server
      await userService.updateUserPoints(user.walletAddress, points);
    } catch (error) {
      // Revert optimistic updates on error
      actions.updateBalance(-GAME_CONFIG.tapping.pointsPerTap);
      console.error('Failed to update points:', error);
    } finally {
      setIsUpdating(false);
      setTimeout(() => setCanTap(true), 100);
    }
  }, [canTap, user, currentEggProgress, actions, isUpdating]);

  return {
    handleTap,
    canTap,
    isUpdating
  };
};