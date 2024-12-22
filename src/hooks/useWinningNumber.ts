import { useState, useEffect, useRef } from 'react';
import { GAME_CONFIG } from '../config/gameConfig';
import { HatchingResult } from '../types/game';
import { generateId } from '../utils/generators';

export const useWinningNumber = () => {
  const [winningNumber, setWinningNumber] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(GAME_CONFIG.pools.drawInterval);
  const [history, setHistory] = useState<HatchingResult[]>([]);
  const nextDrawTimeRef = useRef<Date>(new Date(Date.now() + GAME_CONFIG.pools.drawInterval * 1000));

  useEffect(() => {
    const generateNumber = () => {
      const newNumber = Math.floor(Math.random() * (GAME_CONFIG.pools.maxNumber + 1));
      setWinningNumber(newNumber);
      
      // Add to history with unique ID
      setHistory(prev => [{
        id: generateId(),
        number: newNumber,
        timestamp: Date.now()
      }, ...prev].slice(0, 10));
      
      nextDrawTimeRef.current = new Date(Date.now() + GAME_CONFIG.pools.drawInterval * 1000);
    };

    // Generate initial number
    generateNumber();

    // Update timer every second
    const timerInterval = setInterval(() => {
      const now = new Date();
      const diff = Math.max(0, Math.floor((nextDrawTimeRef.current.getTime() - now.getTime()) / 1000));
      
      if (diff <= 0) {
        generateNumber();
        setTimeLeft(GAME_CONFIG.pools.drawInterval);
      } else {
        setTimeLeft(diff);
      }
    }, 1000);

    return () => clearInterval(timerInterval);
  }, []);

  return { winningNumber, timeLeft, history };
};