import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Swords, Timer, Trophy, Skull } from 'lucide-react';
import { useGameStore } from '../../store/gameStore';
import { useBattle } from '../../hooks/useBattle';
import { DragonCard } from '../dragons/DragonCard';
import { BattleCountdown } from './BattleCountdown';
import { BattleResult } from './BattleResult';
import { GAME_CONFIG } from '../../config/gameConfig';

export const BattleArena: React.FC = () => {
  const { user } = useGameStore();
  const [selectedDragon, setSelectedDragon] = useState(user?.dragonsOwned[0]);
  const { battleState, startBattle } = useBattle();

  if (!user?.dragonsOwned.length) {
    return (
      <div className="text-center text-white py-8">
        <Skull size={48} className="mx-auto mb-4 text-red-400" />
        <h2 className="text-xl mb-2">No Dragons Available</h2>
        <p>You need at least one dragon to enter the battle arena!</p>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-6">
      <div className="bg-gray-800/50 backdrop-blur-lg rounded-lg p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-red-500/20 rounded-lg">
            <Swords className="text-red-400" size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Battle Arena</h2>
            <p className="text-gray-400">
              Victory Reward: {GAME_CONFIG.battle.victoryReward.toLocaleString()} coins + opponent dragon
            </p>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {battleState.status === 'idle' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <h3 className="text-lg font-semibold text-white mb-4">Select Your Dragon</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {user.dragonsOwned.map(dragon => (
                  <div 
                    key={dragon.id}
                    onClick={() => setSelectedDragon(dragon)}
                    className={`cursor-pointer transition-transform hover:scale-105 ${
                      selectedDragon?.id === dragon.id ? 'ring-2 ring-purple-500' : ''
                    }`}
                  >
                    <DragonCard dragon={dragon} />
                  </div>
                ))}
              </div>

              {selectedDragon && (
                <div className="mt-6 text-center">
                  <button
                    onClick={() => startBattle(selectedDragon)}
                    className="px-8 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-bold transition-colors flex items-center gap-2 mx-auto"
                  >
                    <Swords size={20} />
                    Start Battle
                  </button>
                </div>
              )}
            </motion.div>
          )}

          {battleState.status === 'matchmaking' && (
            <BattleCountdown
              title="Finding Opponent"
              duration={GAME_CONFIG.battle.matchmakingTime}
              icon={<Timer className="text-blue-400" size={24} />}
            />
          )}

          {battleState.status === 'preparing' && battleState.opponent && (
            <BattleCountdown
              title="Battle Starting"
              duration={GAME_CONFIG.battle.preBattleCountdown}
              icon={<Swords className="text-red-400" size={24} />}
            />
          )}

          {battleState.status === 'battling' && battleState.opponent && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-12"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-white font-bold mb-4">Your Dragon</h3>
                  <DragonCard dragon={selectedDragon!} />
                </div>
                <div>
                  <h3 className="text-white font-bold mb-4">Opponent</h3>
                  <DragonCard dragon={battleState.opponent} />
                </div>
              </div>
            </motion.div>
          )}

          {battleState.status === 'complete' && battleState.winner && (
            <BattleResult
              playerDragon={selectedDragon!}
              opponentDragon={battleState.opponent!}
              winner={battleState.winner}
              reward={GAME_CONFIG.battle.victoryReward}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}