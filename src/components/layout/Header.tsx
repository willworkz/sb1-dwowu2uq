import React, { useState } from 'react';
import { TonConnectButton } from '@tonconnect/ui-react';
import { LogOut, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTonWallet } from '../../hooks/useTonWallet';
import { formatAddress } from '../../utils/formatters';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const tonConnectUI = useTonWallet();
  const wallet = tonConnectUI.account;

  const handleDisconnect = async () => {
    try {
      await tonConnectUI.disconnect();
      setIsMenuOpen(false);
    } catch (error) {
      console.error('Failed to disconnect wallet:', error);
    }
  };

  return (
    <header className="p-4 flex justify-between items-center relative">
      <h1 className="text-2xl font-bold text-white">Dragon Hatcher & Battle Arena</h1>
      
      {wallet ? (
        <div className="relative">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <span className="font-mono">{formatAddress(wallet.address)}</span>
            <ChevronDown size={16} className={`transform transition-transform ${isMenuOpen ? 'rotate-180' : ''}`} />
          </button>

          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg overflow-hidden z-50"
              >
                <button
                  onClick={handleDisconnect}
                  className="w-full flex items-center gap-2 px-4 py-3 text-white hover:bg-gray-700 transition-colors"
                >
                  <LogOut size={16} />
                  <span>Disconnect Wallet</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ) : (
        <TonConnectButton />
      )}

      {/* Overlay to close menu when clicking outside */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </header>
  );
};