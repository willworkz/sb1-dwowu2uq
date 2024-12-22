export interface HatchingResult {
  id: string;
  number: number;
  timestamp: number;
  winners?: string[];
  pool: number;
}

export interface UserSelection {
  id: string;
  numbers: number[];
  pool: number;
  timestamp: number;
  status: 'pending' | 'confirmed' | 'won' | 'lost';
  winAmount?: number;
}

export interface User {
  walletAddress: string;
  coinBalance: number;
  dragonsOwned: Dragon[];
  dailyTaps: number;
  lastTapReset: Date;
  dailyTapLimit?: number;
  selections?: UserSelection[];
}