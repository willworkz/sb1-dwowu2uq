export const GAME_CONFIG = {
  tapping: {
    dailyLimit: 500,
    pointsPerTap: 100,
    hatchingThreshold: 5000
  },
  battle: {
    matchmakingTime: 7000,
    preBattleCountdown: 3000,
    battleDuration: {
      min: 60000,
      max: 120000
    },
    victoryReward: 5000
  },
  referral: {
    reward: 10000
  },
  tasks: {
    rewards: {
      twitter: 1000,
      telegram: 1500,
      youtube: 2000,
      share: 1000
    }
  },
  pools: {
    drawInterval: 120, // 2 minutes in seconds
    maxNumber: 999,
    minSelections: 1,
    maxSelections: 3,
    confirmationTimeout: 30 // 30 seconds to confirm selections
  },
  conversion: {
    tonToCoins: 50000
  }
} as const;