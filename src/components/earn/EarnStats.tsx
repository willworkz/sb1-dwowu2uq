import React from 'react';
import { Trophy, Users, Clock } from 'lucide-react';

export const EarnStats: React.FC = () => {
  return (
    <div className="grid grid-cols-3 gap-3">
      <div className="bg-gray-800/50 backdrop-blur-lg rounded-lg p-4 text-center">
        <Trophy className="mx-auto text-yellow-400 mb-2" size={24} />
        <div className="text-2xl font-bold text-white">0</div>
        <div className="text-xs text-gray-400">Tasks Completed</div>
      </div>
      
      <div className="bg-gray-800/50 backdrop-blur-lg rounded-lg p-4 text-center">
        <Users className="mx-auto text-blue-400 mb-2" size={24} />
        <div className="text-2xl font-bold text-white">0</div>
        <div className="text-xs text-gray-400">Referrals</div>
      </div>
      
      <div className="bg-gray-800/50 backdrop-blur-lg rounded-lg p-4 text-center">
        <Clock className="mx-auto text-purple-400 mb-2" size={24} />
        <div className="text-2xl font-bold text-white">100,000</div>
        <div className="text-xs text-gray-400">Total Earned</div>
      </div>
    </div>
  );
};