import React from 'react';
import { DragonCard } from './DragonCard';
import { INITIAL_DRAGONS } from '../../types/dragons';

export const DragonList: React.FC = () => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-white mb-6">Your Dragons</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {INITIAL_DRAGONS.map(dragon => (
          <DragonCard key={dragon.id} dragon={dragon} />
        ))}
      </div>
    </div>
  );
};