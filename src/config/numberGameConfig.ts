export const NUMBER_GAME_CONFIG = {
  drawInterval: 120, // 2 minutes in seconds
  levels: [
    {
      id: 1,
      name: 'Basic',
      range: { min: 1, max: 9 },
      cost: 250,
      multiplier: 8,
      maxSelections: 3,
      color: 'emerald'
    },
    {
      id: 2,
      name: 'Advanced',
      range: { min: 10, max: 99 },
      cost: 500,
      multiplier: 80,
      maxSelections: 3,
      color: 'purple'
    },
    {
      id: 3,
      name: 'Premium',
      range: { min: 100, max: 999 },
      cost: 1000,
      multiplier: 150,
      maxSelections: 3,
      color: 'amber'
    }
  ],
  rewards: {
    dragonTypes: [
      { name: 'Common', chance: 0.6, multiplier: 1 },
      { name: 'Rare', chance: 0.3, multiplier: 2 },
      { name: 'Epic', chance: 0.08, multiplier: 4 },
      { name: 'Legendary', chance: 0.02, multiplier: 8 }
    ]
  }
} as const;