-- Add missing INSERT policies for profiles
DROP POLICY IF EXISTS "Allow insert profiles" ON profiles;

CREATE POLICY "Allow insert profiles" ON profiles
  FOR INSERT TO authenticated
  WITH CHECK (true);

-- Also allow service role to insert (for triggers)
CREATE POLICY "Allow service insert profiles" ON profiles
  FOR INSERT TO service_role
  WITH CHECK (true);
