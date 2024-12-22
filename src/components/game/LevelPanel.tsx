import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Lock } from 'lucide-react';
import { NumberSelector } from './NumberSelector';

interface Level {
  id: number;
  name: string;
  range: { min: number; max: number };
  multiplier: number;
  maxSelections: number;
  color: string;
}

interface LevelPanelProps {
  levels: Level[];
  selections: Record<number, number[]>;
  onNumberSelect: (levelId: number, number: number) => void;
}

export const LevelPanel: React.FC<LevelPanelProps> = ({
  levels,
  selections,
  onNumberSelect
}) => {
  const [activeLevel, setActiveLevel] = useState<number | null>(null);

  return (
    <div className="bg-gray-800/30 backdrop-blur-lg rounded-2xl p-6">
      <div className="space-y-4">
        {levels.map(level => (
          <div key={level.id} className="bg-gray-800/50 rounded-xl overflow-hidden">
            <button
              onClick={() => setActiveLevel(activeLevel === level.id ? null : level.id)}
              className="w-full p-4 flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-lg bg-${level.color}-500/20`}>
                  {selections[level.id].length === level.maxSelections ? (
                    <Lock className={`text-${level.color}-400`} />
                  ) : (
                    <span className={`text-${level.color}-400 font-bold`}>
                      {level.id}
                    </span>
                  )}
                </div>
                <div className="text-left">
                  <h3 className="text-white font-bold">Level {level.id}</h3>
                  <p className={`text-${level.color}-400`}>
                    {level.multiplier}X Multiplier
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className={`px-3 py-1 rounded-full bg-${level.color}-500/20 text-${level.color}-400`}>
                  {selections[level.id].length}/{level.maxSelections}
                </div>
                {activeLevel === level.id ? <ChevronUp /> : <ChevronDown />}
              </div>
            </button>

            <AnimatePresence>
              {activeLevel === level.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="p-4 border-t border-gray-700"
                >
                  <NumberSelector
                    min={level.range.min}
                    max={level.range.max}
                    selectedNumbers={selections[level.id]}
                    onSelect={(number) => onNumberSelect(level.id, number)}
                    maxSelections={level.maxSelections}
                    color={level.color}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
};