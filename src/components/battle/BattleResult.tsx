import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Skull, Coins } from 'lucide-react';
import { Dragon } from '../../types/dragons';

interface BattleResultProps {
  playerDragon: Dragon;
  opponentDragon: Dragon;
  winner: Dragon;
  reward: number;
}

export const BattleResult: React.FC<BattleResultProps> = ({
  playerDragon,
  opponentDragon,
  winner,
  reward
}) => {
  const isVictory = winner.id === playerDragon.id;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center py-8"
    >
      <div className="flex justify-center mb-6">
        {isVictory ? (
          <div className="p-6 bg-yellow-500/20 rounded-full">
            <Trophy className="text-yellow-400" size={48} />
          </div>
        ) : (
          <div className="p-6 bg-red-500/20 rounded-full">
            <Skull className="text-red-400" size={48} />
          </div>
        )}
      </div>

      <h3 className={`text-2xl font-bold mb-2 ${
        isVictory ? 'text-yellow-400' : 'text-red-400'
      }`}>
        {isVictory ? 'Victory!' : 'Defeat'}
      </h3>

      {isVictory && (
        <div className="flex items-center justify-center gap-2 text-lg text-white mb-6">
          <Coins className="text-yellow-400" size={20} />
          <span>+{reward.toLocaleString()} coins</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        <div className={isVictory ? 'order-1' : 'order-2'}>
          <h4 className="text-white font-bold mb-4">Your Dragon</h4>
          <div className={`relative ${isVictory ? 'opacity-100' : 'opacity-50'}`}>
            {isVictory && (
              <div className="absolute -top-4 -right-4 z-10">
                <Trophy className="text-yellow-400" size={32} />
              </div>
            )}
            <img
              src={playerDragon.imageUrl}
              alt={playerDragon.name}
              className="w-full h-48 object-cover rounded-lg"
            />
          </div>
        </div>

        <div className={isVictory ? 'order-2' : 'order-1'}>
          <h4 className="text-white font-bold mb-4">Opponent Dragon</h4>
          <div className={`relative ${!isVictory ? 'opacity-100' : 'opacity-50'}`}>
            {!isVictory && (
              <div className="absolute -top-4 -right-4 z-10">
                <Trophy className="text-yellow-400" size={32} />
              </div>
            )}
            <img
              src={opponentDragon.imageUrl}
              alt={opponentDragon.name}
              className="w-full h-48 object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};