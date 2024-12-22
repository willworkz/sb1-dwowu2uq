import React, { useState } from 'react';
import { Dragon } from '../../types/dragons';
import { DragonStatBar } from './DragonStatBar';
import { ChevronDown, ChevronUp, Zap, Shield } from 'lucide-react';

interface DragonCardProps {
  dragon: Dragon;
}

export const DragonCard: React.FC<DragonCardProps> = ({ dragon }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-gray-800/90 backdrop-blur-lg rounded-lg overflow-hidden">
      <div className="relative h-48">
        <img 
          src={dragon.imageUrl} 
          alt={dragon.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
        <div className="absolute bottom-0 p-4">
          <h3 className="text-xl font-bold text-white mb-1">{dragon.name}</h3>
          <div className="flex items-center gap-2 text-sm">
            <span className="px-2 py-1 bg-purple-500/20 rounded-full text-purple-300">
              {dragon.power}
            </span>
          </div>
        </div>
      </div>

      <div className="p-4">
        <p className="text-gray-300 text-sm mb-4">{dragon.bio}</p>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center gap-2">
            <Zap className="text-yellow-400" size={20} />
            <div>
              <div className="text-sm text-gray-400">Power</div>
              <div className="text-lg font-bold text-white">
                {dragon.stats.power.toLocaleString()}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="text-blue-400" size={20} />
            <div>
              <div className="text-sm text-gray-400">Defense</div>
              <div className="text-lg font-bold text-white">
                {dragon.stats.defense.toLocaleString()}
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-center gap-2 text-gray-400 hover:text-white transition-colors"
        >
          {isExpanded ? (
            <>
              <ChevronUp size={20} />
              <span>Show Less</span>
            </>
          ) : (
            <>
              <ChevronDown size={20} />
              <span>Show More</span>
            </>
          )}
        </button>

        {isExpanded && (
          <div className="mt-4 space-y-4">
            <div className="p-3 bg-purple-500/10 rounded-lg">
              <h4 className="text-purple-300 font-medium mb-2">Secret Power</h4>
              <p className="text-sm text-gray-300">{dragon.secretPower}</p>
            </div>

            <div className="space-y-2">
              <DragonStatBar label="Strength" value={dragon.stats.strength} color="bg-red-500" />
              <DragonStatBar label="Defense" value={dragon.stats.defense} color="bg-blue-500" />
              <DragonStatBar label="Power" value={dragon.stats.power} color="bg-yellow-500" />
              <DragonStatBar label="Healing" value={dragon.stats.healingPower} color="bg-green-500" />
              <DragonStatBar label="Skills" value={dragon.stats.skills} color="bg-purple-500" />
              <DragonStatBar label="Speed" value={dragon.stats.speed} color="bg-cyan-500" />
              <DragonStatBar label="Intelligence" value={dragon.stats.intelligence} color="bg-indigo-500" />
              <DragonStatBar label="Range" value={dragon.stats.range} color="bg-orange-500" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};