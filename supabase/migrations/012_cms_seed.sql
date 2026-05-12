-- Seed CMS tables with data from lib/data.ts

-- Global settings
INSERT INTO global_settings (key, value) VALUES
  ('company_name', 'FASE'),
  ('company_tagline', 'We Build Digital Experiences That Move The World'),
  ('company_email', 'hello@fase.agency'),
  ('company_phone', '+62 812 3456 7890'),
  ('company_address', 'Jakarta, Indonesia'),
  ('seo_title', 'FASE Creative — Premium Digital Agency'),
  ('seo_description', 'FASE is a full-service digital agency specializing in branding, web development, mobile apps, UI/UX design, and digital marketing.'),
  ('seo_keywords', 'digital agency, branding, web development, mobile apps, UI/UX, SEO, digital marketing'),
  ('og_image', '/og-image.jpg'),
  ('twitter_handle', '@faseagency'),
  ('trusted_brands', 'Luminary,Nexus Corp,Aura Health,Vantage,Meridian,Orbit,Pinnacle,Zenith Co,Apex Group,Solaris,Elevate,Vertex')
ON CONFLICT (key) DO NOTHING;

-- Hero
INSERT INTO cms_hero (headline, subheadline, cta_primary_label, cta_primary_href, cta_secondary_label, cta_secondary_href, sort_order) VALUES
  ('We Build Digital Experiences That Move The World', 'From brand identity to full-scale digital transformation — we partner with ambitious companies to create work that shapes culture and drives growth.', 'Start a Project', '/contact', 'View Our Work', '/portfolio', 0)
ON CONFLICT DO NOTHING;

-- Services
INSERT INTO cms_services (slug, icon, title, description, color, sort_order) VALUES
  ('branding', '◈', 'Branding Strategy', 'Build a distinctive brand identity that resonates globally and drives recognition across markets.', '#6366F1', 0),
  ('social-media', '◎', 'Social Media Management', 'Strategic social presence that builds community, drives engagement, and amplifies your brand.', '#8B5CF6', 1),
  ('web-dev', '⬡', 'Website Development', 'Premium, high-performance websites built for scale, conversion, and exceptional user experience.', '#A78BFA', 2),
  ('mobile-dev', '◉', 'Mobile App Development', 'Native and cross-platform applications that deliver seamless experiences across all devices.', '#6366F1', 3),
  ('ui-ux', '◐', 'UI/UX Design', 'Human-centered design solutions that balance aesthetics with function to delight users.', '#8B5CF6', 4),
  ('seo', '◑', 'SEO Optimization', 'Data-driven search strategies that increase organic visibility and qualified traffic.', '#A78BFA', 5),
  ('digital-marketing', '◒', 'Digital Marketing', 'Full-funnel marketing campaigns that drive measurable growth and maximize ROI.', '#6366F1', 6),
  ('content', '◓', 'Content Production', 'Premium video, photo, and written content that captivates audiences and drives action.', '#8B5CF6', 7),
  ('creative-campaign', '◔', 'Creative Campaign', 'Breakthrough campaigns that capture attention, spark conversation, and build lasting brand equity.', '#A78BFA', 8),
  ('digital-transformation', '◕', 'Digital Transformation', 'End-to-end digitalization strategies that modernize operations and accelerate business growth.', '#6366F1', 9)
ON CONFLICT (slug) DO NOTHING;

-- Portfolio
INSERT INTO cms_portfolio (title, category, description, tags, image_url, year, client_name, sort_order) VALUES
  ('Luminary Finance Platform', 'Web Development', 'A next-generation financial dashboard with real-time analytics, AI insights, and premium UX.', ARRAY['Next.js', 'TypeScript', 'Figma', 'Branding'], '/projects/luminary.jpg', '2024', 'Luminary Group', 0),
  ('Nexus Brand Identity', 'Branding', 'Complete brand overhaul for a global tech firm — logo, system, guidelines, and digital assets.', ARRAY['Branding', 'Strategy', 'Identity', 'Design'], '/projects/nexus.jpg', '2024', 'Nexus Corp', 1),
  ('Aura Mobile App', 'Mobile Development', 'Wellness application with personalized AI coaching, live tracking, and premium interactions.', ARRAY['React Native', 'AI', 'iOS', 'Android'], '/projects/aura.jpg', '2023', 'Aura Health', 2),
  ('Vantage E-Commerce', 'Web Development', 'High-converting luxury e-commerce platform with immersive product experiences.', ARRAY['Next.js', 'Commerce', 'UI/UX', 'Animation'], '/projects/vantage.jpg', '2023', 'Vantage Luxury', 3),
  ('Meridian Campaign', 'Creative Campaign', 'Award-winning integrated campaign across digital and physical touchpoints.', ARRAY['Campaign', 'Content', 'Social', 'OOH'], '/projects/meridian.jpg', '2024', 'Meridian Ventures', 4),
  ('Orbit SaaS Dashboard', 'UI/UX Design', 'Enterprise SaaS interface redesign focused on efficiency, clarity, and modern aesthetics.', ARRAY['UI/UX', 'Figma', 'SaaS', 'Design System'], '/projects/orbit.jpg', '2024', 'Orbit Systems', 5)
ON CONFLICT DO NOTHING;

-- Testimonials
INSERT INTO cms_testimonials (name, role, company, quote, avatar_url, rating, sort_order) VALUES
  ('Alexandra Chen', 'Chief Marketing Officer', 'Luminary Group', 'FASE transformed our entire digital presence. The quality of work is simply unmatched — they think strategically, execute flawlessly, and deliver beyond expectations every single time.', '/testimonials/alexandra.jpg', 5, 0),
  ('Marcus Williams', 'Founder & CEO', 'Nexus Corp', 'Working with FASE was a game-changer. They redefined our brand identity and the results were immediate — 300% growth in brand recognition within the first quarter.', '/testimonials/marcus.jpg', 5, 1),
  ('Sofia Reyes', 'VP of Product', 'Aura Health', 'The app FASE built for us exceeded every benchmark. User retention went up 40%, and the design language they created has become our competitive edge.', '/testimonials/sofia.jpg', 5, 2),
  ('James Okafor', 'Head of Digital', 'Vantage Luxury', 'FASE understands the intersection of luxury and technology like no other agency. Our e-commerce conversion rate tripled after their redesign.', '/testimonials/james.jpg', 5, 3)
ON CONFLICT DO NOTHING;

-- Blog posts
INSERT INTO cms_blog_posts (slug, title, excerpt, content, category, published_date, read_time, author, author_avatar_url, image_url, is_published, sort_order) VALUES
  ('future-of-digital-branding-ai-era', 'The Future of Digital Branding in the AI Era', 'As artificial intelligence reshapes how brands communicate, the agencies that thrive will be those that harness AI as a creative amplifier, not a replacement.', 'As artificial intelligence reshapes how brands communicate, the agencies that thrive will be those that harness AI as a creative amplifier, not a replacement. The future of branding lies at the intersection of human creativity and machine intelligence.', 'Branding', 'May 2, 2025', '6 min read', 'FASE Editorial', '/blog/author1.jpg', '/blog/ai-branding.jpg', true, 0),
  ('designing-for-trust-ux-enterprise', 'Designing for Trust: UX Principles for Enterprise Products', 'Enterprise software has long been plagued by poor UX. Here is how world-class design thinking is transforming complex systems into intuitive experiences.', 'Enterprise software has long been plagued by poor UX. Here is how world-class design thinking is transforming complex systems into intuitive experiences that users actually want to engage with.', 'UI/UX Design', 'April 24, 2025', '8 min read', 'FASE Editorial', '/blog/author2.jpg', '/blog/enterprise-ux.jpg', true, 1),
  ('why-performance-is-the-new-premium-feature', 'Why Performance Is the New Premium Feature', 'In a world of milliseconds, site speed is no longer a technical concern — it is a brand statement. Premium brands invest in performance as a core user experience.', 'In a world of milliseconds, site speed is no longer a technical concern — it is a brand statement. Premium brands invest in performance as a core user experience that directly impacts conversion, retention, and brand perception.', 'Web Development', 'April 14, 2025', '5 min read', 'FASE Editorial', '/blog/author3.jpg', '/blog/performance.jpg', true, 2)
ON CONFLICT (slug) DO NOTHING;

-- Team members
INSERT INTO cms_team_members (name, role, bio, avatar_url, linkedin_url, twitter_url, sort_order) VALUES
  ('Aden Fariz', 'Founder & Creative Director', 'Visionary leader with 12+ years building digital experiences for global brands across 20 countries.', '/team/aden.jpg', '#', '#', 0),
  ('Senna Malik', 'Head of Technology', 'Full-stack architect and engineering lead behind our most complex digital transformation projects.', '/team/senna.jpg', '#', null, 1),
  ('Priya Nair', 'Lead UX Designer', 'Human-centered design expert who has shipped products used by millions across finance, health, and tech.', '/team/priya.jpg', '#', '#', 2),
  ('Leo Hartmann', 'Strategy Director', 'Brand strategist and market analyst who translates business goals into campaigns that move the needle.', '/team/leo.jpg', '#', '#', 3)
ON CONFLICT DO NOTHING;

-- FAQs
INSERT INTO cms_faqs (question, answer, category, sort_order) VALUES
  ('What services does FASE offer?', 'FASE offers a full range of digital services including branding strategy, web development, mobile app development, UI/UX design, SEO optimization, digital marketing, content production, social media management, creative campaigns, and digital transformation consulting.', 'General', 0),
  ('How long does a typical project take?', 'Project timelines vary based on scope and complexity. A brand identity project typically takes 4-6 weeks, a website 6-12 weeks, and a mobile app 12-20 weeks. We provide detailed timelines during our discovery phase.', 'Process', 1),
  ('What is your pricing model?', 'We offer project-based pricing tailored to each engagement. After an initial discovery call, we provide a detailed proposal with transparent pricing. We also offer retainer packages for ongoing partnerships.', 'Pricing', 2),
  ('Do you work with international clients?', 'Yes, we work with clients globally. Our team operates across multiple time zones and we have experience delivering projects for clients in Southeast Asia, Europe, North America, and the Middle East.', 'General', 3),
  ('What industries do you specialize in?', 'We have deep expertise across technology, finance, healthcare, luxury goods, e-commerce, and SaaS. However, our strategic approach allows us to deliver exceptional results across virtually any industry.', 'General', 4)
ON CONFLICT DO NOTHING;

-- Stats
INSERT INTO cms_stats (value, suffix, label, sort_order) VALUES
  ('120', '+', 'Projects Delivered', 0),
  ('50', '+', 'Global Clients', 1),
  ('10', '+', 'Industries Served', 2),
  ('99', '%', 'Client Satisfaction', 3)
ON CONFLICT DO NOTHING;

-- Values
INSERT INTO cms_values (icon, title, description, sort_order) VALUES
  ('◈', 'Relentless Quality', 'We set the bar at world-class and refuse to ship anything that falls short. Excellence is our baseline.', 0),
  ('◎', 'Strategic Thinking', 'Every pixel, every word, every decision is rooted in strategy. We design with purpose and intent.', 1),
  ('⬡', 'Bold Innovation', 'We actively explore the frontier — new technologies, new ideas, new possibilities for our clients.', 2),
  ('◉', 'Radical Transparency', 'We communicate openly, set honest expectations, and build relationships on trust.', 3)
ON CONFLICT DO NOTHING;

-- Process steps
INSERT INTO cms_process_steps (number, title, description, sort_order) VALUES
  ('01', 'Discovery', 'We start with deep research into your business, market, and users to uncover opportunities and define the vision.', 0),
  ('02', 'Strategy', 'We craft a precise roadmap — defining scope, objectives, KPIs, and the path to achieving them.', 1),
  ('03', 'Design', 'Our designers bring the vision to life with premium, user-centered design that balances beauty and function.', 2),
  ('04', 'Development', 'Our engineers build with precision — clean code, best practices, and a focus on performance and scalability.', 3),
  ('05', 'Launch', 'We handle the full deployment, testing, and launch process to ensure a flawless go-live experience.', 4),
  ('06', 'Growth', 'Post-launch, we monitor, optimize, and iterate — ensuring your digital product keeps performing at its best.', 5)
ON CONFLICT DO NOTHING;
