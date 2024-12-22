import React from 'react';
import { TonConnectButton } from '@tonconnect/ui-react';
import { tonWalletHelpers } from '../../config/tonconnect';

export const WalletConnect: React.FC = () => {
  const isWalletAvailable = tonWalletHelpers.isAvailable();

  return (
    <div className="flex flex-col items-center justify-center h-[80vh] text-white">
      <h2 className="text-xl mb-4">Connect your wallet to start playing</h2>
      {!isWalletAvailable && (
        <p className="text-yellow-400 mb-4">
          Please install a TON wallet to continue
        </p>
      )}
      <TonConnectButton />
    </div>
  );
};