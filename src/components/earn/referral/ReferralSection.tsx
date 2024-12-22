import React, { useState } from 'react';
import { Share2, Copy, ExternalLink } from 'lucide-react';
import { ReferralStats } from './ReferralStats';
import { useGameStore } from '../../../store/gameStore';
import { GAME_CONFIG } from '../../../config/gameConfig';

export const ReferralSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const referralCode = '1ZUVZ2MD'; // Example code
  const referralLink = `https://dragongame.com/ref/${referralCode}`;

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const shareReferral = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Join Dragon Hatcher & Battle Arena',
          text: `Use my referral code ${referralCode} to get started!`,
          url: referralLink
        });
      } else {
        copyToClipboard(referralLink);
      }
    } catch (err) {
      console.error('Share failed:', err);
    }
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-lg rounded-lg p-6">
      <div className="flex items-center gap-4 mb-6">
        <div className="p-3 bg-emerald-500/20 rounded-lg">
          <Share2 className="text-emerald-400" size={24} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">Refer & Earn</h2>
          <p className="text-gray-400">Get {GAME_CONFIG.referral.reward.toLocaleString()} coins for each friend!</p>
        </div>
      </div>

      <ReferralStats
        referralCount={0}
        totalEarned={0}
        activeReferrals={0}
      />

      <div className="space-y-4">
        <div className="flex gap-2">
          <div className="flex-1 bg-gray-900/50 rounded-lg p-3">
            <div className="text-xs text-gray-400 mb-1">Your Referral Code</div>
            <div className="font-mono text-white text-lg">{referralCode}</div>
          </div>
          <button
            onClick={() => copyToClipboard(referralCode)}
            className="p-3 bg-gray-900/50 rounded-lg text-gray-400 hover:text-white transition-colors"
          >
            {copied ? <Check size={24} /> : <Copy size={24} />}
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => copyToClipboard(referralLink)}
            className="flex items-center justify-center gap-2 py-3 bg-gray-900/50 rounded-lg text-white hover:bg-gray-900/70 transition-colors"
          >
            <Copy size={20} />
            Copy Link
          </button>
          <button
            onClick={shareReferral}
            className="flex items-center justify-center gap-2 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors"
          >
            <Share2 size={20} />
            Share
          </button>
        </div>
      </div>
    </div>
  );
};