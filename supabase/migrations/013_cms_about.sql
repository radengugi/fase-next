-- About page content (Hero & Story sections)
CREATE TABLE IF NOT EXISTS cms_about (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL DEFAULT 'about',
  -- Hero section
  hero_headline text NOT NULL DEFAULT 'We Are Builders of Digital Futures',
  hero_description text DEFAULT 'FASE was born from a simple belief: that the best digital work happens at the intersection of bold strategy, human-centered design, and engineering excellence.',
  hero_badge text DEFAULT 'About FASE',
  -- Story section
  story_badge text DEFAULT 'Our Story',
  story_title text DEFAULT 'Built on Craft, Driven by Purpose',
  story_content text DEFAULT 'FASE was founded with a clear mission: to close the gap between business ambition and digital reality. We saw too many brands struggling with agencies that prioritized volume over craft — and we knew there was a better way.

Today, FASE is a team of senior strategists, designers, and engineers united by a shared obsession with quality. We work with ambitious companies across 20+ countries, helping them build products and brands that define their industries.

Every project we take on is treated as a partnership. We immerse ourselves in your business, your users, and your market — then bring the full weight of our expertise to bear on creating something extraordinary.',
  -- Stats
  founded_year text DEFAULT '2019',
  countries text DEFAULT '20+',
  team_members text DEFAULT '40+',
  awards text DEFAULT '18',
  is_active boolean DEFAULT true,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Updated_at trigger
CREATE TRIGGER update_cms_about_updated_at
BEFORE UPDATE ON cms_about
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
