import React from 'react';
import { WalletDetails } from '../wallet/WalletDetails';
import { WalletStats } from '../wallet/WalletStats';
import { DragonCollection } from '../wallet/DragonCollection';

export const WalletPage: React.FC = () => {
  return (
    <div className="p-4 max-w-md mx-auto space-y-4">
      <WalletDetails />
      <WalletStats />
      <DragonCollection />
    </div>
  );
};