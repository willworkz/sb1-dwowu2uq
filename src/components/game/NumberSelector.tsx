import React from 'react';
import { motion } from 'framer-motion';

interface NumberSelectorProps {
  min: number;
  max: number;
  selectedNumbers: number[];
  onSelect: (number: number) => void;
  maxSelections: number;
  color: string;
}

export const NumberSelector: React.FC<NumberSelectorProps> = ({
  min,
  max,
  selectedNumbers,
  onSelect,
  maxSelections,
  color
}) => {
  const numbers = Array.from({ length: max - min + 1 }, (_, i) => min + i);
  const canSelect = selectedNumbers.length < maxSelections;

  return (
    <div className="grid grid-cols-5 gap-2">
      {numbers.map(num => (
        <motion.button
          key={num}
          whileTap={{ scale: 0.95 }}
          onClick={() => canSelect && onSelect(num)}
          className={`
            p-3 rounded-lg font-bold text-center transition-colors
            ${selectedNumbers.includes(num)
              ? `bg-${color}-500 text-white`
              : canSelect
              ? `bg-${color}-100 hover:bg-${color}-200 text-${color}-800`
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }
          `}
        >
          {num}
        </motion.button>
      ))}
    </div>
  );
};