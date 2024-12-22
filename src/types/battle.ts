export interface BattleState {
  status: 'idle' | 'matchmaking' | 'preparing' | 'battling' | 'complete';
  opponent?: Dragon;
  winner?: Dragon;
  countdown?: number;
}

export interface BattleResult {
  winner: Dragon;
  loser: Dragon;
  reward?: number;
}