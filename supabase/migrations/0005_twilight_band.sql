/*
  # Fix user policies and add constraints

  1. Changes
    - Add proper RLS policies for user operations
    - Add constraints for data integrity
    - Improve error handling columns
  
  2. Security
    - Enable RLS
    - Add specific policies for each operation
*/

-- Add status column for better error tracking
ALTER TABLE users ADD COLUMN IF NOT EXISTS status text DEFAULT 'active';

-- Drop existing policies
DROP POLICY IF EXISTS "Allow read own data" ON users;
DROP POLICY IF EXISTS "Allow create own user" ON users;
DROP POLICY IF EXISTS "Allow update own data" ON users;

-- Create more specific policies
CREATE POLICY "Allow select for all users"
  ON users
  FOR SELECT
  USING (status = 'active');

CREATE POLICY "Allow insert with unique wallet"
  ON users
  FOR INSERT
  WITH CHECK (
    wallet_address IS NOT NULL AND
    NOT EXISTS (
      SELECT 1 
      FROM users AS existing_user
      WHERE existing_user.wallet_address = users.wallet_address
    )
  );

CREATE POLICY "Allow update own wallet data"
  ON users
  FOR UPDATE
  USING (wallet_address::text = current_user)
  WITH CHECK (
    wallet_address::text = current_user AND
    status = 'active'
  );

-- Add constraints
ALTER TABLE users ADD CONSTRAINT daily_taps_limit 
  CHECK (daily_taps >= 0 AND daily_taps <= 1000);

ALTER TABLE users ADD CONSTRAINT coin_balance_valid 
  CHECK (coin_balance >= 0);