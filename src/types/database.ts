export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          wallet_address: string;
          coin_balance: number;
          daily_taps: number;
          last_tap_reset: string;
          last_sync: string;
          status: string;
          session_id: string;
        };
        Insert: {
          wallet_address: string;
          coin_balance?: number;
          daily_taps?: number;
          last_tap_reset?: string;
          last_sync?: string;
          status?: string;
        };
        Update: {
          wallet_address?: string;
          coin_balance?: number;
          daily_taps?: number;
          last_tap_reset?: string;
          last_sync?: string;
          status?: string;
        };
      };
      dragons: {
        Row: {
          id: string;
          owner_address: string;
          name: string;
          level: number;
          stats: Record<string, number>;
          daily_bonus: number;
          created_at: string;
        };
      };
    };
    Functions: {
      update_user_stats: {
        Args: {
          p_wallet_address: string;
          p_points: number;
        };
        Returns: {
          wallet_address: string;
          coin_balance: number;
          daily_taps: number;
        };
      };
    };
  };
}