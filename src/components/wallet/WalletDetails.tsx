import React from 'react';
import { useGameStore } from '../../store/gameStore';
import { formatAddress } from '../../utils/formatters';

export const WalletDetails: React.FC = () => {
  const { user } = useGameStore();

  if (!user) return null;

  return (
    <div className="bg-gray-800 rounded-lg p-4 mb-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-gray-400 text-sm">Connected Wallet</h3>
          <p className="text-white font-mono">{formatAddress(user.walletAddress)}</p>
        </div>
        <div className="text-right">
          <h3 className="text-gray-400 text-sm">Balance</h3>
          <p className="text-yellow-400 font-bold">
            💰 {user.coinBalance.toLocaleString()}
          </p>
        </div>
      </div>
      <div className="mt-2 flex justify-between text-sm">
        <span className="text-gray-400">
          Daily Taps: {user.dailyTaps}/{user.dailyTapLimit}
        </span>
        <span className="text-purple-400">
          Level: {Math.floor(user.coinBalance / 1000)}
        </span>
      </div>
    </div>
  );
};