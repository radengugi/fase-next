-- Insert sample clients
INSERT INTO clients (company_name, contact_name, email, phone, website, industry, status) VALUES
('Acme Corporation', 'John Smith', 'john@acme.com', '+1-555-0100', 'https://acme.com', 'Technology', 'active'),
('Global Industries', 'Sarah Johnson', 'sarah@global.com', '+1-555-0101', 'https://global.com', 'Manufacturing', 'active'),
('StartUp Labs', 'Mike Chen', 'mike@startuplabs.com', '+1-555-0102', 'https://startuplabs.com', 'Technology', 'lead'),
('Enterprise Solutions', 'Emily Davis', 'emily@enterprise.com', '+1-555-0103', 'https://enterprise.com', 'Consulting', 'active'),
('Creative Agency', 'Alex Turner', 'alex@creative.com', '+1-555-0104', 'https://creative.com', 'Design', 'completed')
ON CONFLICT (email) DO NOTHING;

-- Insert sample projects
INSERT INTO projects (client_id, name, description, status, priority, start_date, end_date, budget) VALUES
((SELECT id FROM clients WHERE email = 'john@acme.com'), 'Website Redesign', 'Complete overhaul of corporate website with new branding', 'in_progress', 'high', '2024-01-15', '2024-04-30', 50000),
((SELECT id FROM clients WHERE email = 'john@acme.com'), 'Mobile App Development', 'Native iOS and Android app for customer engagement', 'planning', 'medium', '2024-03-01', '2024-08-31', 75000),
((SELECT id FROM clients WHERE email = 'sarah@global.com'), 'E-commerce Platform', 'Full-featured online store with payment integration', 'in_progress', 'high', '2024-02-01', '2024-06-30', 120000),
((SELECT id FROM clients WHERE email = 'mike@startuplabs.com'), 'Brand Identity', 'Logo design and brand guidelines for new startup', 'review', 'medium', '2024-01-10', '2024-02-28', 15000),
((SELECT id FROM clients WHERE email = 'emily@enterprise.com'), 'Internal Dashboard', 'Analytics dashboard for executive team', 'completed', 'low', '2023-11-01', '2024-01-15', 35000),
((SELECT id FROM clients WHERE email = 'alex@creative.com'), 'Marketing Campaign', 'Digital marketing campaign for product launch', 'completed', 'high', '2023-10-01', '2023-12-31', 45000)
ON CONFLICT DO NOTHING;

-- Insert sample invoices
INSERT INTO invoices (client_id, project_id, invoice_number, amount, status, issue_date, due_date) VALUES
((SELECT id FROM clients WHERE email = 'john@acme.com'), (SELECT id FROM projects WHERE name = 'Website Redesign'), 'INV-001', 25000, 'paid', '2024-02-01', '2024-03-01'),
((SELECT id FROM clients WHERE email = 'john@acme.com'), (SELECT id FROM projects WHERE name = 'Website Redesign'), 'INV-002', 25000, 'pending', '2024-03-01', '2024-04-01'),
((SELECT id FROM clients WHERE email = 'sarah@global.com'), (SELECT id FROM projects WHERE name = 'E-commerce Platform'), 'INV-003', 40000, 'pending', '2024-03-15', '2024-04-15'),
((SELECT id FROM clients WHERE email = 'mike@startuplabs.com'), (SELECT id FROM projects WHERE name = 'Brand Identity'), 'INV-004', 7500, 'paid', '2024-02-15', '2024-03-15'),
((SELECT id FROM clients WHERE email = 'emily@enterprise.com'), (SELECT id FROM projects WHERE name = 'Internal Dashboard'), 'INV-005', 35000, 'paid', '2024-01-15', '2024-02-15'),
((SELECT id FROM clients WHERE email = 'alex@creative.com'), (SELECT id FROM projects WHERE name = 'Marketing Campaign'), 'INV-006', 45000, 'paid', '2023-12-01', '2024-01-01')
ON CONFLICT (invoice_number) DO NOTHING;

-- Note: Users must be created through Supabase Auth first
-- Then their profiles will be created automatically via trigger
-- Sample profiles for reference (will be created when users sign up):
-- super_admin@fase.com - Super Admin
-- admin@fase.com - Admin
-- manager@fase.com - Project Manager
-- designer@fase.com - Designer
-- developer@fase.com - Developer
