-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE files ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;

-- PROFILES POLICIES
-- Users can view their own profile
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Admins can view all profiles
CREATE POLICY "Admins can view all profiles"
  ON profiles FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND role IN ('super_admin', 'admin')
    )
  );

-- CLIENTS POLICIES
-- Admins and project managers can view all clients
CREATE POLICY "Admins can view all clients"
  ON clients FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND role IN ('super_admin', 'admin', 'project_manager')
    )
  );

-- Admins can create clients
CREATE POLICY "Admins can create clients"
  ON clients FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND role IN ('super_admin', 'admin', 'project_manager')
    )
  );

-- Admins can update clients
CREATE POLICY "Admins can update clients"
  ON clients FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND role IN ('super_admin', 'admin', 'project_manager')
    )
  );

-- Admins can delete clients
CREATE POLICY "Admins can delete clients"
  ON clients FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND role IN ('super_admin', 'admin')
    )
  );

-- PROJECTS POLICIES
-- Admins and project managers can view all projects
CREATE POLICY "Admins can view all projects"
  ON projects FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND role IN ('super_admin', 'admin', 'project_manager')
    )
  );

-- Project members can view their assigned projects
CREATE POLICY "Members can view assigned projects"
  ON projects FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM project_members
      WHERE project_id = projects.id
      AND user_id = auth.uid()
    )
  );

-- Clients can view their own projects
CREATE POLICY "Clients can view own projects"
  ON projects FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM clients
      JOIN profiles ON profiles.role = 'client'
      WHERE profiles.id = auth.uid()
      AND clients.id = projects.client_id
    )
  );

-- Admins can create projects
CREATE POLICY "Admins can create projects"
  ON projects FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND role IN ('super_admin', 'admin', 'project_manager')
    )
  );

-- Admins can update projects
CREATE POLICY "Admins can update projects"
  ON projects FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND role IN ('super_admin', 'admin', 'project_manager')
    )
  );

-- Project members can update their project status
CREATE POLICY "Members can update project status"
  ON projects FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM project_members
      WHERE project_id = projects.id
      AND user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM project_members
      WHERE project_id = projects.id
      AND user_id = auth.uid()
    )
  );

-- Admins can delete projects
CREATE POLICY "Admins can delete projects"
  ON projects FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND role IN ('super_admin', 'admin')
    )
  );

-- PROJECT_MEMBERS POLICIES
-- Everyone can view project members
CREATE POLICY "Everyone can view project members"
  ON project_members FOR SELECT
  USING (true);

-- Admins can manage project members
CREATE POLICY "Admins can manage project members"
  ON project_members FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND role IN ('super_admin', 'admin', 'project_manager')
    )
  );

-- INVOICES POLICIES
-- Admins can view all invoices
CREATE POLICY "Admins can view all invoices"
  ON invoices FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND role IN ('super_admin', 'admin', 'project_manager')
    )
  );

-- Clients can view their invoices
CREATE POLICY "Clients can view own invoices"
  ON invoices FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM clients
      JOIN profiles ON profiles.role = 'client'
      WHERE profiles.id = auth.uid()
      AND clients.id = invoices.client_id
    )
  );

-- Admins can manage invoices
CREATE POLICY "Admins can manage invoices"
  ON invoices FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND role IN ('super_admin', 'admin')
    )
  );

-- FILES POLICIES
-- Admins can view all files
CREATE POLICY "Admins can view all files"
  ON files FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND role IN ('super_admin', 'admin', 'project_manager')
    )
  );

-- Project members can view project files
CREATE POLICY "Members can view project files"
  ON files FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM project_members
      WHERE project_id = files.project_id
      AND user_id = auth.uid()
    )
  );

-- Clients can view their files
CREATE POLICY "Clients can view own files"
  ON files FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM clients
      JOIN profiles ON profiles.role = 'client'
      WHERE profiles.id = auth.uid()
      AND clients.id = files.client_id
    )
  );

-- Admins can manage files
CREATE POLICY "Admins can manage files"
  ON files FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND role IN ('super_admin', 'admin')
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
  USING (auth.uid() = user_id);

-- System can create notifications
CREATE POLICY "System can create notifications"
  ON notifications FOR INSERT
  WITH CHECK (true);

-- ACTIVITIES POLICIES
-- Admins can view all activities
CREATE POLICY "Admins can view all activities"
  ON activities FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND role IN ('super_admin', 'admin', 'project_manager')
    )
  );

-- Project members can view project activities
CREATE POLICY "Members can view project activities"
  ON activities FOR SELECT
  USING (
    entity_type = 'project'
    AND EXISTS (
      SELECT 1 FROM project_members
      WHERE project_id = entity_id
      AND user_id = auth.uid()
    )
  );

-- System can create activities
CREATE POLICY "System can create activities"
  ON activities FOR INSERT
  WITH CHECK (true);
