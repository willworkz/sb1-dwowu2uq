import React from 'react';
import { Twitter, Telegram, Youtube, Heart, Share2 } from 'lucide-react';
import { SocialTask } from './SocialTask';
import { useTaskCompletion } from '../../../hooks/useTaskCompletion';
import { Task } from '../../../types/tasks';

export const TasksSection: React.FC = () => {
  const { completedTasks, completeTask } = useTaskCompletion();

  const tasks: Task[] = [
    {
      id: 'twitter-follow',
      icon: <Twitter className="text-blue-400" size={24} />,
      title: 'Follow on Twitter',
      description: 'Follow our Twitter account for updates',
      reward: 1000,
      action: 'Follow',
      link: 'https://twitter.com/dragongame'
    },
    {
      id: 'telegram-join',
      icon: <Telegram className="text-blue-500" size={24} />,
      title: 'Join Telegram',
      description: 'Join our Telegram community',
      reward: 1500,
      action: 'Join',
      link: 'https://t.me/dragongame'
    },
    {
      id: 'youtube-subscribe',
      icon: <Youtube className="text-red-500" size={24} />,
      title: 'Subscribe on YouTube',
      description: 'Subscribe to our YouTube channel',
      reward: 2000,
      action: 'Subscribe',
      link: 'https://youtube.com/dragongame'
    },
    {
      id: 'like-share',
      icon: <Heart className="text-pink-500" size={24} />,
      title: 'Like & Share',
      description: 'Like and share our pinned post',
      reward: 1000,
      action: 'Share',
      link: 'https://twitter.com/dragongame/status/1'
    }
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-white">Social Tasks</h2>
        <span className="text-sm text-gray-400">
          {completedTasks.length}/{tasks.length} Completed
        </span>
      </div>
      
      <div className="space-y-3">
        {tasks.map(task => (
          <SocialTask
            key={task.id}
            task={task}
            onComplete={completeTask}
            isCompleted={completedTasks.includes(task.id)}
          />
        ))}
      </div>
    </div>
  );
};