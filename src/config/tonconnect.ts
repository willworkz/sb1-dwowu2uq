import { TonConnectUIProvider } from '@tonconnect/ui-react';

export const TON_CONNECT_CONFIG = {
  manifestUrl: '/tonconnect-manifest.json',
  walletsListSource: 'https://raw.githubusercontent.com/ton-blockchain/wallets-list/main/wallets.json',
  buttonRootId: 'ton-connect-button',
  uiPreferences: {
    theme: 'DARK'
  },
  actionsConfiguration: {
    twaReturnUrl: window.location.origin
  }
} as const;

// Safe TON wallet interaction helpers
export const tonWalletHelpers = {
  isAvailable: () => {
    try {
      return typeof window !== 'undefined' && 
             window.ton && 
             typeof window.ton.send === 'function';
    } catch {
      return false;
    }
  },

  getProvider: () => {
    if (!tonWalletHelpers.isAvailable()) {
      return null;
    }
    return window.ton;
  },

  // Safely destroy TON wallet connection
  destroyConnection: async () => {
    const provider = tonWalletHelpers.getProvider();
    if (provider && typeof provider._destroy === 'function') {
      try {
        await provider._destroy();
      } catch (error) {
        console.warn('Error destroying TON wallet connection:', error);
      }
    }
  }
};