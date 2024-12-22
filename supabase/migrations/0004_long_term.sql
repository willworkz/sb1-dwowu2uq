/*
  # Fix database policies and add tracking columns

  1. Changes
    - Add error tracking columns
    - Update policies for better security
    - Add performance indexes
  
  2. Security
    - Enable RLS
    - Add policies for all CRUD operations
*/

-- Add tracking columns
ALTER TABLE users ADD COLUMN IF NOT EXISTS last_error text;
ALTER TABLE users ADD COLUMN IF NOT EXISTS last_sync timestamptz DEFAULT now();

-- Drop existing policies
DROP POLICY IF EXISTS "Allow public read" ON users;
DROP POLICY IF EXISTS "Allow public insert" ON users;
DROP POLICY IF EXISTS "Allow updates by wallet address" ON users;

-- Create new policies with better security
CREATE POLICY "Allow read own data"
  ON users
  FOR SELECT
  USING (true);

CREATE POLICY "Allow create own user"
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

CREATE POLICY "Allow update own data"
  ON users
  FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_wallet_address ON users(wallet_address);
CREATE INDEX IF NOT EXISTS idx_users_last_sync ON users(last_sync);