import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Egg } from 'lucide-react';
import { useGameStore } from '../store/gameStore';
import { GAME_CONFIG } from '../config/gameConfig';

export const EggHatching = () => {
  const { user, currentEggProgress, actions } = useGameStore();
  const [canTap, setCanTap] = useState(true);

  const handleTap = async () => {
    if (!canTap || !user || user.dailyTaps >= GAME_CONFIG.tapping.dailyLimit) return;

    setCanTap(false);
    const newProgress = currentEggProgress + GAME_CONFIG.tapping.pointsPerTap;
    actions.updateEggProgress(newProgress);

    if (newProgress >= GAME_CONFIG.tapping.hatchingThreshold) {
      actions.setHatching(true);
      // Trigger hatching animation and dragon creation
    }

    setTimeout(() => setCanTap(true), 100);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-blue-900 to-purple-900">
      <motion.div
        className="relative"
        whileTap={{ scale: 0.95 }}
        onClick={handleTap}
      >
        <Egg
          size={120}
          className="text-white cursor-pointer"
        />
        <motion.div
          className="absolute bottom-0 w-full h-1 bg-blue-500 rounded-full"
          style={{
            scaleX: currentEggProgress / GAME_CONFIG.tapping.hatchingThreshold,
            transformOrigin: "left"
          }}
        />
      </motion.div>
      
      <div className="mt-4 text-white text-center">
        <p>Progress: {currentEggProgress} / {GAME_CONFIG.tapping.hatchingThreshold}</p>
        <p>Daily Taps: {user?.dailyTaps || 0} / {GAME_CONFIG.tapping.dailyLimit}</p>
      </div>
    </div>
  );
};