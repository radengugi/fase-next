-- DROP all existing policies first
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON profiles;
DROP POLICY IF EXISTS "Admins can create clients" ON clients;
DROP POLICY IF EXISTS "Admins can view all clients" ON clients;
DROP POLICY IF EXISTS "Admins can update clients" ON clients;
DROP POLICY IF EXISTS "Admins can delete clients" ON clients;
DROP POLICY IF EXISTS "Admins can view all projects" ON projects;
DROP POLICY IF EXISTS "Members can view assigned projects" ON projects;
DROP POLICY IF EXISTS "Clients can view own projects" ON projects;
DROP POLICY IF EXISTS "Admins can create projects" ON projects;
DROP POLICY IF EXISTS "Admins can update projects" ON projects;
DROP POLICY IF EXISTS "Members can update project status" ON projects;
DROP POLICY IF EXISTS "Admins can delete projects" ON projects;
DROP POLICY IF EXISTS "Everyone can view project members" ON project_members;
DROP POLICY IF EXISTS "Admins can manage project members" ON project_members;
DROP POLICY IF EXISTS "Admins can view all invoices" ON invoices;
DROP POLICY IF EXISTS "Clients can view own invoices" ON invoices;
DROP POLICY IF EXISTS "Admins can manage invoices" ON invoices;
DROP POLICY IF EXISTS "Admins can view all files" ON files;
DROP POLICY IF EXISTS "Members can view project files" ON files;
DROP POLICY IF EXISTS "Clients can view own files" ON files;
DROP POLICY IF EXISTS "Admins can manage files" ON files;
DROP POLICY IF EXISTS "Users can view own notifications" ON notifications;
DROP POLICY IF EXISTS "Users can update own notifications" ON notifications;
DROP POLICY IF EXISTS "System can create notifications" ON notifications;
DROP POLICY IF EXISTS "Admins can view all activities" ON activities;
DROP POLICY IF EXISTS "Members can view project activities" ON activities;
DROP POLICY IF EXISTS "System can create activities" ON activities;

-- Create a helper function to check user role
CREATE OR REPLACE FUNCTION auth.user_role()
RETURNS TEXT
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT role FROM profiles WHERE id = auth.uid();
$$;

-- PROFILES POLICIES
-- Users can view their own profile
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

-- Users can update their own profile (except role)
CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Admins can view all profiles
CREATE POLICY "Admins can view all profiles"
  ON profiles FOR SELECT
  USING (
    auth.uid() IN (
      SELECT id FROM profiles WHERE role IN ('super_admin', 'admin')
    )
  );

-- Admins can update any profile
CREATE POLICY "Admins can update any profile"
  ON profiles FOR UPDATE
  USING (
    auth.uid() IN (
      SELECT id FROM profiles WHERE role IN ('super_admin', 'admin')
    )
  );

-- CLIENTS POLICIES
-- Allow authenticated users to view clients (for admins/project managers)
CREATE POLICY "Authenticated users can view clients"
  ON clients FOR SELECT
  TO authenticated
  USING (true);

-- Allow authenticated users to create clients
CREATE POLICY "Authenticated users can create clients"
  ON clients FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Allow authenticated users to update clients
CREATE POLICY "Authenticated users can update clients"
  ON clients FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Allow admins to delete clients
CREATE POLICY "Admins can delete clients"
  ON clients FOR DELETE
  TO authenticated
  USING (
    auth.uid() IN (
      SELECT id FROM profiles WHERE role IN ('super_admin', 'admin')
    )
  );

-- PROJECTS POLICIES
-- Allow authenticated users to view projects
CREATE POLICY "Authenticated users can view projects"
  ON projects FOR SELECT
  TO authenticated
  USING (true);

-- Allow authenticated users to create projects
CREATE POLICY "Authenticated users can create projects"
  ON projects FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Allow authenticated users to update projects
CREATE POLICY "Authenticated users can update projects"
  ON projects FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Allow admins to delete projects
CREATE POLICY "Admins can delete projects"
  ON projects FOR DELETE
  TO authenticated
  USING (
    auth.uid() IN (
      SELECT id FROM profiles WHERE role IN ('super_admin', 'admin')
    )
  );

-- INVOICES POLICIES
-- Allow authenticated users to view invoices
CREATE POLICY "Authenticated users can view invoices"
  ON invoices FOR SELECT
  TO authenticated
  USING (true);

-- Allow authenticated users to create invoices
CREATE POLICY "Authenticated users can create invoices"
  ON invoices FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Allow authenticated users to update invoices
CREATE POLICY "Authenticated users can update invoices"
  ON invoices FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Allow admins to delete invoices
CREATE POLICY "Admins can delete invoices"
  ON invoices FOR DELETE
  TO authenticated
  USING (
    auth.uid() IN (
      SELECT id FROM profiles WHERE role IN ('super_admin', 'admin')
    )
  );

-- FILES POLICIES
-- Allow authenticated users to view files
CREATE POLICY "Authenticated users can view files"
  ON files FOR SELECT
  TO authenticated
  USING (true);

-- Allow authenticated users to create files
CREATE POLICY "Authenticated users can create files"
  ON files FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Allow authenticated users to update files
CREATE POLICY "Authenticated users can update files"
  ON files FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Allow admins to delete files
CREATE POLICY "Admins can delete files"
  ON files FOR DELETE
  TO authenticated
  USING (
    auth.uid() IN (
      SELECT id FROM profiles WHERE role IN ('super_admin', 'admin')
    )
  );

-- NOTIFICATIONS POLICIES
-- Users can view their own notifications
CREATE POLICY "Users can view own notifications"
  ON notifications FOR SELECT
  USING (auth.uid() = user_id);

-- Users can update their own notifications
CREATE POLICY "Users can update own notifications"
  ON notifications FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Allow inserts (system/service role)
CREATE POLICY "Allow insert notifications"
  ON notifications FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- ACTIVITIES POLICIES
-- Allow authenticated users to view activities
CREATE POLICY "Authenticated users can view activities"
  ON activities FOR SELECT
  TO authenticated
  USING (true);

-- Allow inserts (system/service role)
CREATE POLICY "Allow insert activities"
  ON activities FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- PROJECT_MEMBERS POLICIES
-- Allow authenticated users to view project members
CREATE POLICY "Authenticated users can view project members"
  ON project_members FOR SELECT
  TO authenticated
  USING (true);

-- Allow authenticated users to manage project members
CREATE POLICY "Authenticated users can manage project members"
  ON project_members FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);
