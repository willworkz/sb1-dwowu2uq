import { useState, useCallback } from 'react';
import { Dragon } from '../types/dragons';
import { BattleState } from '../types/battle';
import { GAME_CONFIG } from '../config/gameConfig';
import { useGameStore } from '../store/gameStore';
import { generateOpponentDragon } from '../utils/battleUtils';

export const useBattle = () => {
  const [battleState, setBattleState] = useState<BattleState>({ status: 'idle' });
  const { actions } = useGameStore();

  const startBattle = useCallback(async (playerDragon: Dragon) => {
    try {
      // Matchmaking phase - 7 seconds
      setBattleState({ status: 'matchmaking' });
      await new Promise(resolve => setTimeout(resolve, GAME_CONFIG.battle.matchmakingTime));

      // Generate opponent with similar power level
      const opponent = generateOpponentDragon(playerDragon.stats.power);

      // Pre-battle countdown - 3 seconds
      setBattleState({ status: 'preparing', opponent });
      await new Promise(resolve => setTimeout(resolve, GAME_CONFIG.battle.preBattleCountdown));

      // Battle simulation - 1-2 minutes
      setBattleState({ status: 'battling', opponent });
      const battleDuration = Math.random() * 
        (GAME_CONFIG.battle.battleDuration.max - GAME_CONFIG.battle.battleDuration.min) + 
        GAME_CONFIG.battle.battleDuration.min;
      await new Promise(resolve => setTimeout(resolve, battleDuration));

      // Calculate winner based on stats
      const playerPower = Object.values(playerDragon.stats).reduce((a, b) => a + b, 0);
      const opponentPower = Object.values(opponent.stats).reduce((a, b) => a + b, 0);
      
      const playerChance = playerPower / (playerPower + opponentPower);
      const isVictory = Math.random() < playerChance;

      const winner = isVictory ? playerDragon : opponent;
      setBattleState({ status: 'complete', opponent, winner });

      if (isVictory) {
        // Award victory rewards: 5,000 coins + opponent dragon
        actions.updateBalance(GAME_CONFIG.battle.victoryReward);
        actions.addDragon(opponent);
      } else {
        // Handle defeat - dragon loss
        actions.removeDragon(playerDragon.id);
      }

    } catch (error) {
      console.error('Battle error:', error);
      setBattleState({ status: 'idle' });
    }
  }, [actions]);

  return { battleState, startBattle };
};