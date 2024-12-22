import { User } from '../../types/game';
import { GAME_CONFIG } from '../../config/gameConfig';

export const userMapper = {
  toUser(dbUser: any): User {
    return {
      walletAddress: dbUser.wallet_address,
      coinBalance: dbUser.coin_balance,
      dragonsOwned: [],
      dailyTaps: dbUser.daily_taps,
      lastTapReset: new Date(dbUser.last_tap_reset),
      dailyTapLimit: GAME_CONFIG.tapping.dailyLimit
    };
  }
};