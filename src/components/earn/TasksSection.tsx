import React from 'react';
import { Play, Gift } from 'lucide-react';

interface Task {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  reward: number;
  duration?: string;
  action: string;
}

export const TasksSection: React.FC = () => {
  const tasks: Task[] = [
    {
      id: '1',
      icon: <Play className="text-emerald-400" size={24} />,
      title: 'Watch Game Tutorial',
      description: 'Learn how to play and earn rewards',
      reward: 1000,
      duration: '2 min',
      action: 'Watch Now'
    },
    {
      id: '2',
      icon: <Gift className="text-purple-400" size={24} />,
      title: 'Daily Bonus',
      description: 'Claim your daily reward',
      reward: 500,
      action: 'Claim'
    }
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-white">Available Tasks</h2>
      
      <div className="space-y-3">
        {tasks.map(task => (
          <div key={task.id} className="bg-gray-800/50 backdrop-blur-lg rounded-lg p-4">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-gray-700 rounded-lg">
                {task.icon}
              </div>
              
              <div className="flex-1">
                <h3 className="text-white font-medium">{task.title}</h3>
                <p className="text-gray-400 text-sm">{task.description}</p>
                {task.duration && (
                  <p className="text-gray-500 text-xs mt-1">
                    <Clock size={12} className="inline mr-1" />
                    {task.duration}
                  </p>
                )}
              </div>

              <div className="text-right">
                <div className="text-emerald-400 font-bold mb-1">
                  {task.reward.toLocaleString()}
                </div>
                <button className="px-4 py-1 bg-emerald-500 hover:bg-emerald-600 text-white text-sm rounded-lg transition-colors">
                  {task.action}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};