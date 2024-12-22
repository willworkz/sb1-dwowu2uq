import React from 'react';
import { motion } from 'framer-motion';
import { History, Trophy } from 'lucide-react';
import { HatchingResult } from '../../types/game';
import { formatTimeAgo } from '../../utils/formatters';

interface HatchingHistoryProps {
  results: HatchingResult[];
}

export const HatchingHistory: React.FC<HatchingHistoryProps> = ({ results }) => {
  return (
    <div className="bg-gray-800/30 backdrop-blur-lg rounded-2xl p-6 mb-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-purple-500/20 rounded-xl">
          <History className="text-purple-400" size={24} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">Previous Results</h2>
          <p className="text-gray-400">Last 10 hatching results</p>
        </div>
      </div>

      <div className="space-y-3">
        {results.map((result, index) => (
          <motion.div
            key={`${result.timestamp}-${result.number}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-4 flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <div className="text-2xl font-bold text-white">{result.number}</div>
              <div className="text-gray-400">{formatTimeAgo(result.timestamp)}</div>
            </div>
            {result.winners?.length > 0 && (
              <div className="flex items-center gap-2 text-yellow-400">
                <Trophy size={16} />
                <span>{result.winners.length} Winners</span>
              </div>
            )}
          </motion.div>
        ))}

        {results.length === 0 && (
          <div className="text-center text-gray-400 py-8">
            No hatching results yet
          </div>
        )}
      </div>
    </div>
  );
}