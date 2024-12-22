import { useState, useCallback } from 'react';
import { Pool } from '../types/game';
import { useGameStore } from '../store/gameStore';
import { userQueries } from '../services/database/queries';
import { withErrorHandling } from '../lib/supabase';

interface SelectionState {
  status: 'idle' | 'processing' | 'complete' | 'error';
  error?: string;
}

export const useNestSelection = () => {
  const [selectionState, setSelectionState] = useState<SelectionState>({ status: 'idle' });
  const { user, actions } = useGameStore();

  const enterPool = useCallback(async (pool: Pool) => {
    if (!user || user.coinBalance < pool.entryCost) {
      setSelectionState({ 
        status: 'error', 
        error: 'Insufficient coins' 
      });
      return;
    }

    setSelectionState({ status: 'processing' });

    try {
      // Update user's balance
      const result = await withErrorHandling(
        async () => {
          const { error } = await userQueries.updateUserStats(
            user.walletAddress,
            -pool.entryCost
          );
          if (error) throw error;
          return true;
        },
        'enterPool'
      );

      if (!result) {
        throw new Error('Failed to update user stats');
      }

      // Update local state
      actions.updateBalance(-pool.entryCost);
      setSelectionState({ status: 'complete' });
      
    } catch (error) {
      console.error('Nest selection error:', error);
      setSelectionState({ 
        status: 'error',
        error: 'Failed to enter nest. Please try again.'
      });
    }
  }, [user, actions]);

  return { selectionState, enterPool };
};