import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface BattleCountdownProps {
  title: string;
  duration: number;
  icon: React.ReactNode;
}

export const BattleCountdown: React.FC<BattleCountdownProps> = ({
  title,
  duration,
  icon
}) => {
  const [countdown, setCountdown] = useState(Math.ceil(duration / 1000));

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="text-center py-12"
    >
      <div className="flex flex-col items-center gap-4">
        <div className="p-4 bg-gray-700/50 rounded-full">
          {icon}
        </div>
        <h3 className="text-xl font-bold text-white">{title}</h3>
        <div className="text-4xl font-bold text-purple-400">
          {countdown}
        </div>
      </div>
    </motion.div>
  );
};