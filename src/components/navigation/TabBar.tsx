import React from 'react';
import { Hand, Egg, Swords, Coins, Wallet } from 'lucide-react';
import { useGameStore } from '../../store/gameStore';

interface TabProps {
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const Tab: React.FC<TabProps> = ({ icon, label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`flex flex-col items-center p-2 flex-1 transition-colors ${
      isActive ? 'text-cyan-400' : 'text-gray-400 hover:text-gray-300'
    }`}
  >
    {icon}
    <span className="text-xs mt-1">{label}</span>
  </button>
);

export const TabBar: React.FC = () => {
  const { activeTab, actions } = useGameStore();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900/95 backdrop-blur-lg border-t border-gray-800">
      <nav className="flex justify-between max-w-md mx-auto">
        <Tab
          icon={<Hand size={24} />}
          label="TAP"
          isActive={activeTab === 'tap'}
          onClick={() => actions.setActiveTab('tap')}
        />
        <Tab
          icon={<Egg size={24} />}
          label="NESTS"
          isActive={activeTab === 'nests'}
          onClick={() => actions.setActiveTab('nests')}
        />
        <Tab
          icon={<Swords size={24} />}
          label="BATTLE"
          isActive={activeTab === 'battle'}
          onClick={() => actions.setActiveTab('battle')}
        />
        <Tab
          icon={<Coins size={24} />}
          label="EARN"
          isActive={activeTab === 'earn'}
          onClick={() => actions.setActiveTab('earn')}
        />
        <Tab
          icon={<Wallet size={24} />}
          label="WALLET"
          isActive={activeTab === 'wallet'}
          onClick={() => actions.setActiveTab('wallet')}
        />
      </nav>
    </div>
  );
};