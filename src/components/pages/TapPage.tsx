import React from 'react';
import { useGameStore } from '../../store/gameStore';
import { ProgressBar } from '../ui/ProgressBar';
import { WalletDetails } from '../wallet/WalletDetails';
import { GAME_CONFIG } from '../../config/gameConfig';
import { useTapping } from '../../hooks/useTapping';

export const TapPage: React.FC = () => {
  const { user, currentEggProgress } = useGameStore();
  const { handleTap } = useTapping();

  return (
    <div className="p-4 max-w-md mx-auto">
      <WalletDetails />
      
      <div 
        id="tap-area"
        className="relative aspect-square bg-gray-800 rounded-xl overflow-hidden cursor-pointer"
        onClick={handleTap}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <img
            src="https://source.unsplash.com/featured/?dragon,fantasy&1"
            alt="Dragon"
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900" />
          <div className="absolute bottom-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-2">
              Tap to Feed Dragon
            </h2>
            <ProgressBar
              progress={currentEggProgress}
              total={GAME_CONFIG.tapping.hatchingThreshold}
              className="w-64 mx-auto"
            />
            <p className="text-gray-300 mt-2">
              Progress: {currentEggProgress} / {GAME_CONFIG.tapping.hatchingThreshold}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-4 text-center">
        <p className="text-gray-400">
          Daily Taps: {user?.dailyTaps || 0} / {GAME_CONFIG.tapping.dailyLimit}
        </p>
      </div>
    </div>
  );
};