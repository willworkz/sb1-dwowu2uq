import { useState, useCallback } from 'react';
import { useGameStore } from '../store/gameStore';

export const useTaskCompletion = () => {
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);
  const { actions } = useGameStore();

  const completeTask = useCallback(async (taskId: string) => {
    try {
      // Here you would typically verify the task completion with your backend
      // For now, we'll just mark it as completed and award coins
      setCompletedTasks(prev => [...prev, taskId]);
      
      // Find task reward amount and update balance
      const reward = 1000; // This should come from task data
      actions.updateBalance(reward);
      
    } catch (error) {
      console.error('Failed to complete task:', error);
    }
  }, [actions]);

  return {
    completedTasks,
    completeTask
  };
};