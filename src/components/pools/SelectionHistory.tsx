import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Trophy, X } from 'lucide-react';
import { UserSelection } from '../../types/game';
import { formatTimeAgo } from '../../utils/formatters';

interface SelectionHistoryProps {
  selections: UserSelection[];
}

export const SelectionHistory: React.FC<SelectionHistoryProps> = ({ selections }) => {
  return (
    <div className="bg-gray-800/30 backdrop-blur-lg rounded-2xl p-6 mb-8">
      <h2 className="text-xl font-bold text-white mb-4">Your Selections</h2>
      
      <div className="space-y-3">
        {selections.map(selection => (
          <motion.div
            key={selection.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-4"
          >
            <div className="flex justify-between items-center mb-2">
              <div className="text-gray-400">Pool {selection.pool}</div>
              <div className="flex items-center gap-2">
                <Clock size={14} className="text-gray-400" />
                <span className="text-gray-400 text-sm">
                  {formatTimeAgo(selection.timestamp)}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 mb-2">
              {selection.numbers.map(num => (
                <div
                  key={num}
                  className="bg-purple-500/20 text-purple-400 px-3 py-1 rounded-lg"
                >
                  {num}
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2">
              {selection.status === 'won' && (
                <>
                  <Trophy size={16} className="text-yellow-400" />
                  <span className="text-yellow-400">
                    Won {selection.winAmount?.toLocaleString()} coins
                  </span>
                </>
              )}
              {selection.status === 'lost' && (
                <>
                  <X size={16} className="text-red-400" />
                  <span className="text-red-400">No match</span>
                </>
              )}
              {selection.status === 'pending' && (
                <span className="text-blue-400">Waiting for result...</span>
              )}
            </div>
          </motion.div>
        ))}

        {selections.length === 0 && (
          <div className="text-center text-gray-400 py-8">
            No selections yet
          </div>
        )}
      </div>
    </div>
  );
};