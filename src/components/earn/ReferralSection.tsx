import React from 'react';
import { Share2, Copy } from 'lucide-react';
import { useGameStore } from '../../store/gameStore';

export const ReferralSection: React.FC = () => {
  const { user } = useGameStore();
  const referralCode = '1ZUVZ2MD'; // Example code, should come from user data

  const copyCode = () => {
    navigator.clipboard.writeText(referralCode);
  };

  const shareLink = () => {
    // Implement share functionality
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-lg rounded-lg p-6">
      <div className="flex items-center gap-4 mb-4">
        <div className="p-3 bg-emerald-500/20 rounded-lg">
          <Share2 className="text-emerald-400" size={24} />
        </div>
        <div>
          <h3 className="text-white font-bold text-lg">Refer & Earn</h3>
          <p className="text-gray-400 text-sm">Get 10,000 coins for each friend!</p>
        </div>
      </div>

      <div className="flex gap-2 mb-4">
        <div className="flex-1 bg-gray-900 rounded-lg p-3 font-mono text-white">
          {referralCode}
        </div>
        <button 
          onClick={copyCode}
          className="p-3 bg-gray-900 rounded-lg text-gray-400 hover:text-white transition-colors"
        >
          <Copy size={20} />
        </button>
      </div>

      <button
        onClick={shareLink}
        className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-bold transition-colors flex items-center justify-center gap-2"
      >
        <Share2 size={20} />
        Share Link
      </button>
    </div>
  );
};