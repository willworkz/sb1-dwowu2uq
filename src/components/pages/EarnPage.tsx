import React from 'react';
import { ReferralSection } from '../earn/referral/ReferralSection';
import { TasksSection } from '../earn/tasks/TasksSection';
import { EarnStats } from '../earn/EarnStats';

export const EarnPage: React.FC = () => {
  return (
    <div className="p-4 max-w-4xl mx-auto space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Earn Coins</h1>
        <p className="text-gray-400">Complete tasks and invite friends to earn rewards!</p>
      </div>

      <EarnStats />
      <ReferralSection />
      <TasksSection />
    </div>
  );
};