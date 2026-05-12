-- RLS Policies for CMS tables
-- Public tables: readable by everyone, writable only by authenticated admins

ALTER TABLE global_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE cms_hero ENABLE ROW LEVEL SECURITY;
ALTER TABLE cms_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE cms_portfolio ENABLE ROW LEVEL SECURITY;
ALTER TABLE cms_testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE cms_blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE cms_team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE cms_faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE cms_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE cms_values ENABLE ROW LEVEL SECURITY;
ALTER TABLE cms_process_steps ENABLE ROW LEVEL SECURITY;

-- Public read access for all CMS tables
DO $$
DECLARE
  tbl text;
BEGIN
  FOREACH tbl IN ARRAY ARRAY[
    'global_settings', 'cms_hero', 'cms_services', 'cms_portfolio',
    'cms_testimonials', 'cms_blog_posts', 'cms_team_members',
    'cms_faqs', 'cms_stats', 'cms_values', 'cms_process_steps'
  ] LOOP
    EXECUTE format(
      'DROP POLICY IF EXISTS "Public read %s" ON %s;
       CREATE POLICY "Public read %s" ON %s FOR SELECT USING (true);',
      tbl, tbl, tbl, tbl
    );
    EXECUTE format(
      'DROP POLICY IF EXISTS "Auth write %s" ON %s;
       CREATE POLICY "Auth write %s" ON %s FOR ALL USING (auth.role() = ''authenticated'');',
      tbl, tbl, tbl, tbl
    );
  END LOOP;
END $$;
