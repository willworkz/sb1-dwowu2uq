import React from 'react';
import { ExternalLink, Check } from 'lucide-react';
import { Task } from '../../../types/tasks';

interface SocialTaskProps {
  task: Task;
  onComplete: (taskId: string) => void;
  isCompleted: boolean;
}

export const SocialTask: React.FC<SocialTaskProps> = ({ task, onComplete, isCompleted }) => {
  const handleAction = () => {
    if (!isCompleted) {
      window.open(task.link, '_blank');
      onComplete(task.id);
    }
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-lg rounded-lg p-4">
      <div className="flex items-center gap-4">
        <div className="p-2 bg-gray-700 rounded-lg">
          {task.icon}
        </div>
        
        <div className="flex-1">
          <h3 className="text-white font-medium">{task.title}</h3>
          <p className="text-gray-400 text-sm">{task.description}</p>
        </div>

        <div className="text-right">
          <div className="text-emerald-400 font-bold mb-1">
            {task.reward.toLocaleString()}
          </div>
          <button 
            onClick={handleAction}
            disabled={isCompleted}
            className={`px-4 py-1 rounded-lg text-sm flex items-center gap-2 ${
              isCompleted 
                ? 'bg-gray-600 text-gray-300 cursor-not-allowed'
                : 'bg-emerald-500 hover:bg-emerald-600 text-white'
            }`}
          >
            {isCompleted ? (
              <>
                <Check size={16} />
                Completed
              </>
            ) : (
              <>
                <ExternalLink size={16} />
                {task.action}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};