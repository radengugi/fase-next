-- Step 1: Drop all problematic policies first
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON profiles;
DROP POLICY IF EXISTS "Admins can update any profile" ON profiles;

DROP POLICY IF EXISTS "Authenticated users can view clients" ON clients;
DROP POLICY IF EXISTS "Authenticated users can create clients" ON clients;
DROP POLICY IF EXISTS "Authenticated users can update clients" ON clients;
DROP POLICY IF EXISTS "Admins can delete clients" ON clients;

DROP POLICY IF EXISTS "Authenticated users can view projects" ON projects;
DROP POLICY IF EXISTS "Authenticated users can create projects" ON projects;
DROP POLICY IF EXISTS "Authenticated users can update projects" ON projects;
DROP POLICY IF EXISTS "Admins can delete projects" ON projects;

DROP POLICY IF EXISTS "Authenticated users can view project_members" ON project_members;
DROP POLICY IF EXISTS "Authenticated users can manage project_members" ON project_members;

DROP POLICY IF EXISTS "Authenticated users can view invoices" ON invoices;
DROP POLICY IF EXISTS "Authenticated users to create invoices" ON invoices;
DROP POLICY IF EXISTS "Authenticated users can update invoices" ON invoices;
DROP POLICY IF EXISTS "Admins can delete invoices" ON invoices;

DROP POLICY IF EXISTS "Authenticated users can view files" ON files;
DROP POLICY IF EXISTS "Authenticated users can create files" ON files;
DROP POLICY IF EXISTS "Authenticated users can update files" ON files;
DROP POLICY IF EXISTS "Admins can delete files" ON files;

DROP POLICY IF EXISTS "Users view own notifications" ON notifications;
DROP POLICY IF EXISTS "Users update own notifications" ON notifications;
DROP POLICY IF EXISTS "Allow create notifications" ON notifications;

DROP POLICY IF EXISTS "Authenticated users can view activities" ON activities;
DROP POLICY IF EXISTS "Allow create activities" ON activities;

-- Step 2: Create helper function with SECURITY DEFINER (bypasses RLS)
CREATE OR REPLACE FUNCTION auth.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid()
    AND role IN ('super_admin', 'admin', 'project_manager')
  );
$$;

CREATE OR REPLACE FUNCTION auth.is_super_admin()
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid()
    AND role IN ('super_admin', 'admin')
  );
$$;

-- Step 3: Create new policies (simpler, no recursion)

-- PROFILES - Allow everyone to view (for now)
CREATE POLICY "Allow view profiles" ON profiles
  FOR SELECT TO authenticated USING (true);

-- PROFILES - Allow update own profile
CREATE POLICY "Allow update own profile" ON profiles
  FOR UPDATE TO authenticated USING (auth.uid() = id);

-- CLIENTS - Allow all operations for authenticated users
CREATE POLICY "Allow all on clients" ON clients
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- PROJECTS - Allow all operations for authenticated users
CREATE POLICY "Allow all on projects" ON projects
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- PROJECT_MEMBERS - Allow all operations for authenticated users
CREATE POLICY "Allow all on project_members" ON project_members
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- INVOICES - Allow all operations for authenticated users
CREATE POLICY "Allow all on invoices" ON invoices
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- FILES - Allow all operations for authenticated users
CREATE POLICY "Allow all on files" ON files
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- NOTIFICATIONS - Users can manage their own
CREATE POLICY "Allow own notifications" ON notifications
  FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- ACTIVITIES - Allow view for authenticated
CREATE POLICY "Allow view activities" ON activities
  FOR SELECT TO authenticated USING (true);

-- ACTIVITIES - Allow insert for authenticated
CREATE POLICY "Allow insert activities" ON activities
  FOR INSERT TO authenticated WITH CHECK (true);
