import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { PoolHeader } from './PoolHeader';
import { PoolSummary } from './PoolSummary';
import { PoolGrid } from './PoolGrid';
import { HatchingHistory } from './HatchingHistory';
import { SelectionHistory } from './SelectionHistory';
import { SelectionConfirmation } from './SelectionConfirmation';
import { ConfirmButton } from './ConfirmButton';
import { LevelPanel } from '../game/LevelPanel';
import { NUMBER_GAME_CONFIG } from '../../config/numberGameConfig';
import { useWinningNumber } from '../../hooks/useWinningNumber';
import { useGameStore } from '../../store/gameStore';
import { useNumberGame } from '../../hooks/useNumberGame';

export const NestSelection: React.FC = () => {
  const [selections, setSelections] = useState<Record<number, number[]>>({
    1: [],
    2: [],
    3: []
  });
  const [activePool, setActivePool] = useState<number | null>(null);
  const [pendingConfirmation, setPendingConfirmation] = useState<{
    poolId: number;
    numbers: number[];
  } | null>(null);
  
  const { history } = useWinningNumber();
  const { user } = useGameStore();
  const { confirmSelection, isProcessing } = useNumberGame();

  const handleNumberSelect = (levelId: number, number: number) => {
    setSelections(prev => {
      const currentSelections = prev[levelId];
      const isSelected = currentSelections.includes(number);
      
      if (isSelected) {
        return {
          ...prev,
          [levelId]: currentSelections.filter(n => n !== number)
        };
      }
      
      if (currentSelections.length < NUMBER_GAME_CONFIG.levels[levelId - 1].maxSelections) {
        return {
          ...prev,
          [levelId]: [...currentSelections, number].sort((a, b) => a - b)
        };
      }
      
      return prev;
    });
  };

  const handleConfirmSelection = (poolId: number) => {
    const numbers = selections[poolId];
    if (numbers.length > 0 && !isProcessing) {
      setPendingConfirmation({ poolId, numbers });
    }
  };

  const handleConfirm = async () => {
    if (!pendingConfirmation || !user) return;

    const { poolId, numbers } = pendingConfirmation;
    await confirmSelection(poolId, numbers);

    // Reset selections for this pool
    setSelections(prev => ({
      ...prev,
      [poolId]: []
    }));
    setPendingConfirmation(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900 to-gray-900">
      <div className="max-w-4xl mx-auto p-4 pb-32">
        <PoolHeader />
        <PoolSummary />
        <HatchingHistory results={history} />
        {user?.selections && <SelectionHistory selections={user.selections} />}
        <PoolGrid 
          selections={selections}
          onPoolSelect={setActivePool}
          onConfirm={handleConfirmSelection}
        />
        {activePool && (
          <LevelPanel
            levels={NUMBER_GAME_CONFIG.levels}
            selections={selections}
            onNumberSelect={handleNumberSelect}
          />
        )}

        <AnimatePresence>
          {pendingConfirmation && (
            <SelectionConfirmation
              poolId={pendingConfirmation.poolId}
              selectedNumbers={pendingConfirmation.numbers}
              onConfirm={handleConfirm}
              onCancel={() => setPendingConfirmation(null)}
            />
          )}
        </AnimatePresence>

        <ConfirmButton 
          selections={selections}
          onConfirm={handleConfirmSelection}
        />
      </div>
    </div>
  );
};