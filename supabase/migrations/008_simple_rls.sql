-- Drop all existing policies first
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON profiles;
DROP POLICY IF EXISTS "Admins can update any profile" ON profiles;
DROP POLICY IF EXISTS "Allow view profiles" ON profiles;
DROP POLICY IF EXISTS "Allow update own profile" ON profiles;

DROP POLICY IF EXISTS "Authenticated users can view clients" ON clients;
DROP POLICY IF EXISTS "Authenticated users can create clients" ON clients;
DROP POLICY IF EXISTS "Authenticated users can update clients" ON clients;
DROP POLICY IF EXISTS "Admins can delete clients" ON clients;
DROP POLICY IF EXISTS "Allow all on clients" ON clients;

DROP POLICY IF EXISTS "Authenticated users can view projects" ON projects;
DROP POLICY IF EXISTS "Authenticated users can create projects" ON projects;
DROP POLICY IF EXISTS "Authenticated users can update projects" ON projects;
DROP POLICY IF EXISTS "Admins can delete projects" ON projects;
DROP POLICY IF EXISTS "Allow all on projects" ON projects;

DROP POLICY IF EXISTS "Authenticated users can view project_members" ON project_members;
DROP POLICY IF EXISTS "Authenticated users can manage project_members" ON project_members;
DROP POLICY IF EXISTS "Allow all on project_members" ON project_members;

DROP POLICY IF EXISTS "Authenticated users can view invoices" ON invoices;
DROP POLICY IF EXISTS "Authenticated users to create invoices" ON invoices;
DROP POLICY IF EXISTS "Authenticated users can update invoices" ON invoices;
DROP POLICY IF EXISTS "Admins can delete invoices" ON invoices;
DROP POLICY IF EXISTS "Allow all on invoices" ON invoices;

DROP POLICY IF EXISTS "Authenticated users can view files" ON files;
DROP POLICY IF EXISTS "Authenticated users can create files" ON files;
DROP POLICY IF EXISTS "Authenticated users can update files" ON files;
DROP POLICY IF EXISTS "Admins can delete files" ON files;
DROP POLICY IF EXISTS "Allow all on files" ON files;

DROP POLICY IF EXISTS "Users view own notifications" ON notifications;
DROP POLICY IF EXISTS "Users update own notifications" ON notifications;
DROP POLICY IF EXISTS "Allow create notifications" ON notifications;
DROP POLICY IF EXISTS "Allow own notifications" ON notifications;

DROP POLICY IF EXISTS "Authenticated users can view activities" ON activities;
DROP POLICY IF EXISTS "Allow create activities" ON activities;
DROP POLICY IF EXISTS "Allow view activities" ON activities;
DROP POLICY IF EXISTS "Allow insert activities" ON activities;

-- Drop old functions if exist
DROP FUNCTION IF EXISTS public.is_admin();
DROP FUNCTION IF EXISTS public.is_super_admin();
DROP FUNCTION IF EXISTS auth.is_admin();
DROP FUNCTION IF EXISTS auth.is_super_admin();
DROP FUNCTION IF EXISTS auth.user_role();

-- Create helper functions in PUBLIC schema (not auth)
CREATE OR REPLACE FUNCTION public.is_admin(user_id uuid)
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
STABLE
PARALLEL SAFE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM profiles
    WHERE id = user_id
    AND role IN ('super_admin', 'admin')
  );
$$;

CREATE OR REPLACE FUNCTION public.get_user_role(user_id uuid)
RETURNS TEXT
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
STABLE
PARALLEL SAFE
AS $$
  SELECT role FROM profiles WHERE id = user_id LIMIT 1;
$$;

-- NEW POLICIES (3 Roles: SuperAdmin, Admin, Client)

-- PROFILES
-- All authenticated users can view profiles
CREATE POLICY "Allow view profiles" ON profiles
  FOR SELECT TO authenticated USING (true);

-- Users can update their own profile
CREATE POLICY "Allow update own profile" ON profiles
  FOR UPDATE TO authenticated USING (auth.uid() = id);

-- SuperAdmin and Admin can update any profile and change roles
CREATE POLICY "Allow admins to update profiles" ON profiles
  FOR UPDATE TO authenticated
  USING (public.is_admin(auth.uid()));

-- CLIENTS
-- All authenticated users can view clients
CREATE POLICY "Allow view clients" ON clients
  FOR SELECT TO authenticated USING (true);

-- All authenticated users can create clients
CREATE POLICY "Allow create clients" ON clients
  FOR INSERT TO authenticated WITH CHECK (true);

-- All authenticated users can update clients
CREATE POLICY "Allow update clients" ON clients
  FOR UPDATE TO authenticated USING (true);

-- Only SuperAdmin and Admin can delete clients
CREATE POLICY "Allow admins to delete clients" ON clients
  FOR DELETE TO authenticated
  USING (public.is_admin(auth.uid()));

-- PROJECTS
-- All authenticated users can view projects
CREATE POLICY "Allow view projects" ON projects
  FOR SELECT TO authenticated USING (true);

-- All authenticated users can create projects
CREATE POLICY "Allow create projects" ON projects
  FOR INSERT TO authenticated WITH CHECK (true);

-- All authenticated users can update projects
CREATE POLICY "Allow update projects" ON projects
  FOR UPDATE TO authenticated USING (true);

-- Only SuperAdmin and Admin can delete projects
CREATE POLICY "Allow admins to delete projects" ON projects
  FOR DELETE TO authenticated
  USING (public.is_admin(auth.uid()));

-- PROJECT_MEMBERS
-- All authenticated users can view project members
CREATE POLICY "Allow view project_members" ON project_members
  FOR SELECT TO authenticated USING (true);

-- All authenticated users can create project members
CREATE POLICY "Allow create project_members" ON project_members
  FOR INSERT TO authenticated WITH CHECK (true);

-- All authenticated users can update project members
CREATE POLICY "Allow update project_members" ON project_members
  FOR UPDATE TO authenticated USING (true);

-- Only SuperAdmin and Admin can delete project members
CREATE POLICY "Allow admins to delete project_members" ON project_members
  FOR DELETE TO authenticated
  USING (public.is_admin(auth.uid()));

-- INVOICES
-- All authenticated users can view invoices
CREATE POLICY "Allow view invoices" ON invoices
  FOR SELECT TO authenticated USING (true);

-- All authenticated users can create invoices
CREATE POLICY "Allow create invoices" ON invoices
  FOR INSERT TO authenticated WITH CHECK (true);

-- All authenticated users can update invoices
CREATE POLICY "Allow update invoices" ON invoices
  FOR UPDATE TO authenticated USING (true);

-- Only SuperAdmin and Admin can delete invoices
CREATE POLICY "Allow admins to delete invoices" ON invoices
  FOR DELETE TO authenticated
  USING (public.is_admin(auth.uid()));

-- FILES
-- All authenticated users can view files
CREATE POLICY "Allow view files" ON files
  FOR SELECT TO authenticated USING (true);

-- All authenticated users can create files
CREATE POLICY "Allow create files" ON files
  FOR INSERT TO authenticated WITH CHECK (true);

-- All authenticated users can update files
CREATE POLICY "Allow update files" ON files
  FOR UPDATE TO authenticated USING (true);

-- Only SuperAdmin and Admin can delete files
CREATE POLICY "Allow admins to delete files" ON files
  FOR DELETE TO authenticated
  USING (public.is_admin(auth.uid()));

-- NOTIFICATIONS
-- Users can view their own notifications
CREATE POLICY "Allow view own notifications" ON notifications
  FOR SELECT TO authenticated USING (auth.uid() = user_id);

-- Users can create notifications
CREATE POLICY "Allow create notifications" ON notifications
  FOR INSERT TO authenticated WITH CHECK (true);

-- Users can update their own notifications
CREATE POLICY "Allow update own notifications" ON notifications
  FOR UPDATE TO authenticated USING (auth.uid() = user_id);

-- ACTIVITIES
-- All authenticated users can view activities
CREATE POLICY "Allow view activities" ON activities
  FOR SELECT TO authenticated USING (true);

-- All authenticated users can create activities
CREATE POLICY "Allow create activities" ON activities
  FOR INSERT TO authenticated WITH CHECK (true);
