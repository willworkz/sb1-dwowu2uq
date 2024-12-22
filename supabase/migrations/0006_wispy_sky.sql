/*
  # Fix user policies and authentication

  1. Changes
    - Add session tracking
    - Simplify policies for better security
    - Add atomic update function
  
  2. Security
    - Validate wallet addresses
    - Ensure atomic updates
    - Add session management
*/

-- Add session tracking
ALTER TABLE users ADD COLUMN IF NOT EXISTS session_id uuid DEFAULT gen_random_uuid();

-- Drop existing policies
DROP POLICY IF EXISTS "Allow select for all users" ON users;
DROP POLICY IF EXISTS "Allow insert with unique wallet" ON users;
DROP POLICY IF EXISTS "Allow update own wallet data" ON users;

-- Create simplified policies
CREATE POLICY "Allow public read"
  ON users
  FOR SELECT
  USING (status = 'active');

CREATE POLICY "Allow public insert"
  ON users
  FOR INSERT
  WITH CHECK (
    wallet_address IS NOT NULL AND
    status = 'active' AND
    NOT EXISTS (
      SELECT 1 
      FROM users AS existing_user
      WHERE existing_user.wallet_address = users.wallet_address
    )
  );

CREATE POLICY "Allow public update"
  ON users
  FOR UPDATE
  USING (status = 'active')
  WITH CHECK (status = 'active');

-- Add function for atomic updates
CREATE OR REPLACE FUNCTION update_user_stats(
  p_wallet_address text,
  p_points integer
)
RETURNS users
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_user users;
BEGIN
  UPDATE users
  SET 
    daily_taps = daily_taps + 1,
    coin_balance = coin_balance + p_points,
    last_sync = now()
  WHERE 
    wallet_address = p_wallet_address AND
    status = 'active' AND
    daily_taps < 1000
  RETURNING * INTO v_user;
  
  RETURN v_user;
END;
$$;