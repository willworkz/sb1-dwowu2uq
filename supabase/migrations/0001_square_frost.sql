/*
  # Initial Schema for Dragon Hatcher & Battle Arena

  1. New Tables
    - users
      - wallet_address (primary key)
      - coin_balance
      - daily_taps
      - last_tap_reset
    - dragons
      - id (primary key)
      - owner_address (foreign key to users)
      - name
      - level
      - stats (JSON)
      - daily_bonus
      - created_at
    - battles
      - id (primary key)
      - player_dragon_id (foreign key to dragons)
      - opponent_dragon_id (foreign key to dragons)
      - winner_id (foreign key to dragons)
      - reward_amount
      - created_at
    - transactions
      - id (primary key)
      - user_address (foreign key to users)
      - type (enum)
      - amount
      - created_at

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create custom types
CREATE TYPE transaction_type AS ENUM ('deposit', 'withdrawal', 'battle_reward', 'pool_entry');

-- Create users table
CREATE TABLE users (
  wallet_address text PRIMARY KEY,
  coin_balance bigint DEFAULT 0,
  daily_taps integer DEFAULT 0,
  last_tap_reset timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- Create dragons table
CREATE TABLE dragons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_address text REFERENCES users(wallet_address),
  name text NOT NULL,
  level integer NOT NULL,
  stats jsonb NOT NULL,
  daily_bonus integer NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create battles table
CREATE TABLE battles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  player_dragon_id uuid REFERENCES dragons(id),
  opponent_dragon_id uuid REFERENCES dragons(id),
  winner_id uuid REFERENCES dragons(id),
  reward_amount bigint,
  created_at timestamptz DEFAULT now()
);

-- Create transactions table
CREATE TABLE transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_address text REFERENCES users(wallet_address),
  type transaction_type NOT NULL,
  amount bigint NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE dragons ENABLE ROW LEVEL SECURITY;
ALTER TABLE battles ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can read own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid()::text = wallet_address);

CREATE POLICY "Users can update own data"
  ON users
  FOR UPDATE
  TO authenticated
  USING (auth.uid()::text = wallet_address);

CREATE POLICY "Users can read own dragons"
  ON dragons
  FOR SELECT
  TO authenticated
  USING (owner_address = auth.uid()::text);

CREATE POLICY "Users can create dragons"
  ON dragons
  FOR INSERT
  TO authenticated
  WITH CHECK (owner_address = auth.uid()::text);

CREATE POLICY "Users can read own battles"
  ON battles
  FOR SELECT
  TO authenticated
  USING (
    player_dragon_id IN (
      SELECT id FROM dragons WHERE owner_address = auth.uid()::text
    )
  );

CREATE POLICY "Users can read own transactions"
  ON transactions
  FOR SELECT
  TO authenticated
  USING (user_address = auth.uid()::text);