import { supabase, withErrorHandling } from '../../lib/supabase';
import { Database } from '../../types/database';

type UserRow = Database['public']['Tables']['users']['Row'];

export const userQueries = {
  async getUserByWallet(walletAddress: string) {
    return withErrorHandling(async () => {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('wallet_address', walletAddress)
        .eq('status', 'active')
        .maybeSingle();
      
      if (error) throw error;
      return { data, error: null };
    }, 'getUserByWallet');
  },

  async createUser(walletAddress: string): Promise<{ data: UserRow | null; error: any }> {
    return withErrorHandling(async () => {
      // First check if user exists
      const { data: existingUser } = await userQueries.getUserByWallet(walletAddress);
      if (existingUser) {
        return { data: existingUser, error: null };
      }

      const { data, error } = await supabase
        .from('users')
        .insert({
          wallet_address: walletAddress,
          coin_balance: 10000, // Starting balance
          daily_taps: 0,
          last_tap_reset: new Date().toISOString(),
          last_sync: new Date().toISOString(),
          status: 'active'
        })
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    }, 'createUser');
  },

  async updateUserStats(walletAddress: string, points: number) {
    return withErrorHandling(async () => {
      const { data, error } = await supabase
        .rpc('update_user_stats', {
          p_wallet_address: walletAddress,
          p_points: points
        });

      if (error) throw error;
      return { data, error: null };
    }, 'updateUserStats');
  }
};