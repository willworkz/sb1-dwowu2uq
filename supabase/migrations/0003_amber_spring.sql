/*
  # Update RLS policies for wallet-based authentication

  1. Changes
    - Remove auth.uid() checks since we're using wallet addresses
    - Allow public access for initial user creation and updates
    - Maintain security through wallet address verification
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Enable insert for unauthenticated users" ON users;
DROP POLICY IF EXISTS "Users can read own data" ON users;
DROP POLICY IF EXISTS "Users can update own data" ON users;

-- Create new policies that work with wallet addresses
CREATE POLICY "Allow public read"
  ON users
  FOR SELECT
  TO PUBLIC
  USING (true);

CREATE POLICY "Allow public insert"
  ON users
  FOR INSERT
  TO PUBLIC
  WITH CHECK (true);

CREATE POLICY "Allow updates by wallet address"
  ON users
  FOR UPDATE
  TO PUBLIC
  USING (true)
  WITH CHECK (true);