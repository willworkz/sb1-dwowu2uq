import React from 'react';
import { Header } from './components/layout/Header';
import { WalletConnect } from './components/auth/WalletConnect';
import { TabBar } from './components/navigation/TabBar';
import { TapPage } from './components/pages/TapPage';
import { DragonList } from './components/dragons/DragonList';
import { BattleArena } from './components/battle/BattleArena';
import { NestSelection } from './components/pools/NestSelection';
import { WalletPage } from './components/pages/WalletPage';
import { useGameStore } from './store/gameStore';
import { useTonWallet } from './hooks/useTonWallet';

function App() {
  const { user, activeTab } = useGameStore();
  useTonWallet();

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-900">
        <Header />
        <WalletConnect />
      </div>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'tap':
        return <TapPage />;
      case 'nests':
        return <NestSelection />;
      case 'battle':
        return <BattleArena />;
      case 'earn':
        return <DragonList />;
      case 'wallet':
        return <WalletPage />;
      default:
        return <TapPage />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      <main className="pb-16">
        {renderContent()}
      </main>
      <TabBar />
    </div>
  );
}

export default App;