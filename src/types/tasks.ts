import { ReactNode } from 'react';

export interface Task {
  id: string;
  icon: ReactNode;
  title: string;
  description: string;
  reward: number;
  action: string;
  link: string;
  duration?: string;
}

export interface TaskCompletion {
  taskId: string;
  userId: string;
  completedAt: Date;
  rewardClaimed: boolean;
}