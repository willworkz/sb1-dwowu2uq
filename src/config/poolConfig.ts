import { Pool } from '../types/game';

export const POOL_CONFIG: Pool[] = [
  {
    id: 1,
    entryCost: 500,
    range: { min: 1, max: 9 },
    reward: { dragonLevel: 1, dailyCoins: 338 }
  },
  {
    id: 2,
    entryCost: 2500,
    range: { min: 10, max: 99 },
    reward: { dragonLevel: 2, dailyCoins: 676 }
  },
  {
    id: 3,
    entryCost: 5000,
    range: { min: 100, max: 999 },
    reward: { dragonLevel: 3, dailyCoins: 1690 }
  }
];