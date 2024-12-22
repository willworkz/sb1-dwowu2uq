import React from 'react';
import { PoolCard } from './PoolCard';
import { NUMBER_GAME_CONFIG } from '../../config/numberGameConfig';

interface PoolGridProps {
  selections: Record<number, number[]>;
  onPoolSelect: (levelId: number) => void;
}

export const PoolGrid: React.FC<PoolGridProps> = ({ selections, onPoolSelect }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
      {NUMBER_GAME_CONFIG.levels.map(level => (
        <PoolCard
          key={level.id}
          level={level}
          selectedNumbers={selections[level.id]}
          onSelect={() => onPoolSelect(level.id)}
        />
      ))}
    </div>
  );
};