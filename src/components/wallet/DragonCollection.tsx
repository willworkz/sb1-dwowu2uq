import React from 'react';
import { useGameStore } from '../../store/gameStore';
import { Skull } from 'lucide-react'; // Using Skull icon instead of Dragon as it's available in lucide-react

export const DragonCollection: React.FC = () => {
  const { user } = useGameStore();

  if (!user?.dragonsOwned.length) {
    return (
      <div className="bg-gray-800 rounded-lg p-6 text-center">
        <Skull className="mx-auto text-gray-600 mb-3" size={32} />
        <h3 className="text-white font-bold mb-2">No Dragons Yet</h3>
        <p className="text-gray-400 text-sm">
          Start hatching eggs to build your collection!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-white">Your Dragons</h2>
      <div className="grid grid-cols-2 gap-3">
        {user.dragonsOwned.map((dragon) => (
          <div 
            key={dragon.id}
            className="bg-gray-800 rounded-lg p-3 flex items-center space-x-3"
          >
            <img
              src={dragon.imageUrl}
              alt={dragon.name}
              className="w-12 h-12 rounded-lg object-cover"
            />
            <div>
              <h3 className="text-white font-medium text-sm">{dragon.name}</h3>
              <p className="text-yellow-400 text-xs">+{dragon.dailyBonus} coins/day</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};