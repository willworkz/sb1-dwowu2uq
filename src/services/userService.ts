import { User } from '../types/game';
import { userQueries } from './database/queries';
import { userMapper } from './mappers/userMapper';
import { withErrorHandling } from '../lib/supabase';

export const userService = {
  async createOrUpdateUser(walletAddress: string): Promise<User | null> {
    return withErrorHandling(async () => {
      // First try to get existing user
      const { data: existingUser } = await userQueries.getUserByWallet(walletAddress);
      
      if (existingUser) {
        return userMapper.toUser(existingUser);
      }

      // If user doesn't exist, create new user with retry logic
      let retries = 3;
      while (retries > 0) {
        const { data: newUser, error: createError } = await userQueries.createUser(walletAddress);
        
        if (!createError && newUser) {
          return userMapper.toUser(newUser);
        }

        retries--;
        if (retries > 0) {
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      }
      
      return null;
    }, 'createOrUpdateUser');
  },

  async updateUserPoints(walletAddress: string, points: number): Promise<void> {
    return withErrorHandling(async () => {
      const { error } = await userQueries.updateUserStats(walletAddress, points);
      if (error) throw error;
    }, 'updateUserPoints');
  }
};