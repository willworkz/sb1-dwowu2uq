import React from 'react';
import { useGameStore } from '../../store/gameStore';
import { Coins, Egg, Swords } from 'lucide-react';

export const WalletStats: React.FC = () => {
  const { user } = useGameStore();

  if (!user) return null;

  const stats = [
    {
      icon: <Coins className="text-yellow-400" size={20} />,
      label: 'Total Earnings',
      value: user.coinBalance.toLocaleString()
    },
    {
      icon: <Egg className="text-purple-400" size={20} />,
      label: 'Dragons Owned',
      value: user.dragonsOwned.length
    },
    {
      icon: <Swords className="text-cyan-400" size={20} />,
      label: 'Battle Power',
      value: user.dragonsOwned.reduce((acc, dragon) => acc + dragon.stats.power, 0).toLocaleString()
    }
  ];

  return (
    <div className="grid grid-cols-3 gap-2">
      {stats.map((stat, index) => (
        <div 
          key={index}
          className="bg-gray-800 rounded-lg p-3 text-center"
        >
          <div className="flex justify-center mb-2">{stat.icon}</div>
          <div className="text-xs text-gray-400 mb-1">{stat.label}</div>
          <div className="text-white font-bold">{stat.value}</div>
        </div>
      ))}
    </div>
  );
};