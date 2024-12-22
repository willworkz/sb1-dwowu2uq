/*
  # Fix RLS policies for users table

  1. Changes
    - Update users table RLS policies to allow unauthenticated inserts
    - Add policy for unauthenticated users to create accounts
    - Modify existing policies to use wallet_address comparison
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Users can read own data" ON users;
DROP POLICY IF EXISTS "Users can update own data" ON users;

-- Create new policies
CREATE POLICY "Enable insert for unauthenticated users"
  ON users
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can read own data"
  ON users
  FOR SELECT
  USING (wallet_address = auth.uid()::text);

CREATE POLICY "Users can update own data"
  ON users
  FOR UPDATE
  USING (wallet_address = auth.uid()::text);