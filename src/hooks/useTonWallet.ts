import { useTonConnectUI } from '@tonconnect/ui-react';
import { useEffect } from 'react';
import { useGameStore } from '../store/gameStore';
import { userService } from '../services/userService';
import { tonWalletHelpers } from '../config/tonconnect';

export const useTonWallet = () => {
  const [tonConnectUI] = useTonConnectUI();
  const { actions } = useGameStore();

  useEffect(() => {
    let isSubscribed = true;

    const handleWalletConnection = async () => {
      try {
        const wallet = tonConnectUI.account;
        
        if (wallet?.address && isSubscribed) {
          const user = await userService.createOrUpdateUser(wallet.address);
          if (user && isSubscribed) {
            actions.setUser(user);
          }
        } else if (isSubscribed) {
          actions.setUser(null);
        }
      } catch (error) {
        console.error('Wallet connection error:', error);
        if (isSubscribed) {
          actions.setUser(null);
        }
      }
    };

    // Initial check
    handleWalletConnection();

    // Subscribe to wallet changes with error handling
    const unsubscribe = tonConnectUI.onStatusChange(async () => {
      try {
        await handleWalletConnection();
      } catch (error) {
        console.error('Wallet status change error:', error);
      }
    });

    // Cleanup function
    return () => {
      isSubscribed = false;
      if (typeof unsubscribe === 'function') {
        unsubscribe();
      }
      tonWalletHelpers.destroyConnection();
    };
  }, [tonConnectUI, actions]);

  return tonConnectUI;
};