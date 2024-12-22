import React from 'react';
import { Users, Coins, ArrowUpRight } from 'lucide-react';

interface ReferralStatsProps {
  referralCount: number;
  totalEarned: number;
  activeReferrals: number;
}

export const ReferralStats: React.FC<ReferralStatsProps> = ({
  referralCount,
  totalEarned,
  activeReferrals
}) => {
  return (
    <div className="grid grid-cols-3 gap-3 mb-4">
      <div className="bg-gray-800/50 backdrop-blur-lg rounded-lg p-3 text-center">
        <Users className="mx-auto text-blue-400 mb-1" size={20} />
        <div className="text-lg font-bold text-white">{referralCount}</div>
        <div className="text-xs text-gray-400">Total Referrals</div>
      </div>
      
      <div className="bg-gray-800/50 backdrop-blur-lg rounded-lg p-3 text-center">
        <Coins className="mx-auto text-yellow-400 mb-1" size={20} />
        <div className="text-lg font-bold text-white">{totalEarned}</div>
        <div className="text-xs text-gray-400">Coins Earned</div>
      </div>
      
      <div className="bg-gray-800/50 backdrop-blur-lg rounded-lg p-3 text-center">
        <ArrowUpRight className="mx-auto text-green-400 mb-1" size={20} />
        <div className="text-lg font-bold text-white">{activeReferrals}</div>
        <div className="text-xs text-gray-400">Active Friends</div>
      </div>
    </div>
  );
};