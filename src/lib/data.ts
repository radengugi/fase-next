import type { Service, Project, Testimonial, Stat, TeamMember, Value, ProcessStep } from '@/types';

export const services: Service[] = [
  {
    id: 'branding',
    icon: '◈',
    title: 'Branding Strategy',
    description: 'Build a distinctive brand identity that resonates globally and drives recognition across markets.',
    color: '#B9fA3C',
  },
  {
    id: 'social-media',
    icon: '◎',
    title: 'Social Media Management',
    description: 'Strategic social presence that builds community, drives engagement, and amplifies your brand.',
    color: '#8B5CF6',
  },
  {
    id: 'web-dev',
    icon: '⬡',
    title: 'Website Development',
    description: 'Premium, high-performance websites built for scale, conversion, and exceptional user experience.',
    color: '#A78BFA',
  },
  {
    id: 'mobile-dev',
    icon: '◉',
    title: 'Mobile App Development',
    description: 'Native and cross-platform applications that deliver seamless experiences across all devices.',
    color: '#B9fA3C',
  },
  {
    id: 'ui-ux',
    icon: '◐',
    title: 'UI/UX Design',
    description: 'Human-centered design solutions that balance aesthetics with function to delight users.',
    color: '#8B5CF6',
  },
  {
    id: 'seo',
    icon: '◑',
    title: 'SEO Optimization',
    description: 'Data-driven search strategies that increase organic visibility and qualified traffic.',
    color: '#A78BFA',
  },
  {
    id: 'digital-marketing',
    icon: '◒',
    title: 'Digital Marketing',
    description: 'Full-funnel marketing campaigns that drive measurable growth and maximize ROI.',
    color: '#B9fA3C',
  },
  {
    id: 'content',
    icon: '◓',
    title: 'Content Production',
    description: 'Premium video, photo, and written content that captivates audiences and drives action.',
    color: '#8B5CF6',
  },
  {
    id: 'creative-campaign',
    icon: '◔',
    title: 'Creative Campaign',
    description: 'Breakthrough campaigns that capture attention, spark conversation, and build lasting brand equity.',
    color: '#A78BFA',
  },
  {
    id: 'digital-transformation',
    icon: '◕',
    title: 'Digital Transformation',
    description: 'End-to-end digitalization strategies that modernize operations and accelerate business growth.',
    color: '#B9fA3C',
  },
];

export const projects: Project[] = [
  {
    id: '1',
    title: 'Luminary Finance Platform',
    category: 'Web Development',
    description: 'A next-generation financial dashboard with real-time analytics, AI insights, and premium UX.',
    tags: ['Next.js', 'TypeScript', 'Figma', 'Branding'],
    image: '/projects/luminary.jpg',
    year: '2024',
    client: 'Luminary Group',
  },
  {
    id: '2',
    title: 'Nexus Brand Identity',
    category: 'Branding',
    description: 'Complete brand overhaul for a global tech firm — logo, system, guidelines, and digital assets.',
    tags: ['Branding', 'Strategy', 'Identity', 'Design'],
    image: '/projects/nexus.jpg',
    year: '2024',
    client: 'Nexus Corp',
  },
  {
    id: '3',
    title: 'Aura Mobile App',
    category: 'Mobile Development',
    description: 'Wellness application with personalized AI coaching, live tracking, and premium interactions.',
    tags: ['React Native', 'AI', 'iOS', 'Android'],
    image: '/projects/aura.jpg',
    year: '2023',
    client: 'Aura Health',
  },
  {
    id: '4',
    title: 'Vantage E-Commerce',
    category: 'Web Development',
    description: 'High-converting luxury e-commerce platform with immersive product experiences.',
    tags: ['Next.js', 'Commerce', 'UI/UX', 'Animation'],
    image: '/projects/vantage.jpg',
    year: '2023',
    client: 'Vantage Luxury',
  },
  {
    id: '5',
    title: 'Meridian Campaign',
    category: 'Creative Campaign',
    description: 'Award-winning integrated campaign across digital and physical touchpoints.',
    tags: ['Campaign', 'Content', 'Social', 'OOH'],
    image: '/projects/meridian.jpg',
    year: '2024',
    client: 'Meridian Ventures',
  },
  {
    id: '6',
    title: 'Orbit SaaS Dashboard',
    category: 'UI/UX Design',
    description: 'Enterprise SaaS interface redesign focused on efficiency, clarity, and modern aesthetics.',
    tags: ['UI/UX', 'Figma', 'SaaS', 'Design System'],
    image: '/projects/orbit.jpg',
    year: '2024',
    client: 'Orbit Systems',
  },
];

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Alexandra Chen',
    role: 'Chief Marketing Officer',
    company: 'Luminary Group',
    quote: 'FASE transformed our entire digital presence. The quality of work is simply unmatched — they think strategically, execute flawlessly, and deliver beyond expectations every single time.',
    avatar: '/testimonials/alexandra.jpg',
    rating: 5,
  },
  {
    id: '2',
    name: 'Marcus Williams',
    role: 'Founder & CEO',
    company: 'Nexus Corp',
    quote: 'Working with FASE was a game-changer. They redefined our brand identity and the results were immediate — 300% growth in brand recognition within the first quarter.',
    avatar: '/testimonials/marcus.jpg',
    rating: 5,
  },
  {
    id: '3',
    name: 'Sofia Reyes',
    role: 'VP of Product',
    company: 'Aura Health',
    quote: 'The app FASE built for us exceeded every benchmark. User retention went up 40%, and the design language they created has become our competitive edge.',
    avatar: '/testimonials/sofia.jpg',
    rating: 5,
  },
  {
    id: '4',
    name: 'James Okafor',
    role: 'Head of Digital',
    company: 'Vantage Luxury',
    quote: 'FASE understands the intersection of luxury and technology like no other agency. Our e-commerce conversion rate tripled after their redesign.',
    avatar: '/testimonials/james.jpg',
    rating: 5,
  },
];

export const stats: Stat[] = [
  { value: '120', suffix: '+', label: 'Projects Delivered' },
  { value: '50', suffix: '+', label: 'Global Clients' },
  { value: '10', suffix: '+', label: 'Industries Served' },
  { value: '99', suffix: '%', label: 'Client Satisfaction' },
];

export const teamMembers: TeamMember[] = [
  {
    name: 'Aden Fariz',
    role: 'Founder & Creative Director',
    bio: 'Visionary leader with 12+ years building digital experiences for global brands across 20 countries.',
    avatar: '/team/aden.jpg',
    socials: { linkedin: '#', twitter: '#' },
  },
  {
    name: 'Senna Malik',
    role: 'Head of Technology',
    bio: 'Full-stack architect and engineering lead behind our most complex digital transformation projects.',
    avatar: '/team/senna.jpg',
    socials: { linkedin: '#', github: '#' },
  },
  {
    name: 'Priya Nair',
    role: 'Lead UX Designer',
    bio: 'Human-centered design expert who has shipped products used by millions across finance, health, and tech.',
    avatar: '/team/priya.jpg',
    socials: { linkedin: '#', twitter: '#' },
  },
  {
    name: 'Leo Hartmann',
    role: 'Strategy Director',
    bio: 'Brand strategist and market analyst who translates business goals into campaigns that move the needle.',
    avatar: '/team/leo.jpg',
    socials: { linkedin: '#', twitter: '#' },
  },
];

export const values: Value[] = [
  {
    icon: '◈',
    title: 'Relentless Quality',
    description: 'We set the bar at world-class and refuse to ship anything that falls short. Excellence is our baseline.',
  },
  {
    icon: '◎',
    title: 'Strategic Thinking',
    description: 'Every pixel, every word, every decision is rooted in strategy. We design with purpose and intent.',
  },
  {
    icon: '⬡',
    title: 'Bold Innovation',
    description: 'We actively explore the frontier — new technologies, new ideas, new possibilities for our clients.',
  },
  {
    icon: '◉',
    title: 'Radical Transparency',
    description: 'We communicate openly, set honest expectations, and build relationships on trust.',
  },
];

export const processSteps: ProcessStep[] = [
  {
    number: '01',
    title: 'Discovery',
    description: 'We start with deep research into your business, market, and users to uncover opportunities and define the vision.',
  },
  {
    number: '02',
    title: 'Strategy',
    description: 'We craft a precise roadmap — defining scope, objectives, KPIs, and the path to achieving them.',
  },
  {
    number: '03',
    title: 'Design',
    description: 'Our designers bring the vision to life with premium, user-centered design that balances beauty and function.',
  },
  {
    number: '04',
    title: 'Development',
    description: 'Our engineers build with precision — clean code, best practices, and a focus on performance and scalability.',
  },
  {
    number: '05',
    title: 'Launch',
    description: 'We handle the full deployment, testing, and launch process to ensure a flawless go-live experience.',
  },
  {
    number: '06',
    title: 'Growth',
    description: 'Post-launch, we monitor, optimize, and iterate — ensuring your digital product keeps performing at its best.',
  },
];

export const trustedBrands = [
  'Luminary', 'Nexus Corp', 'Aura Health', 'Vantage', 'Meridian', 'Orbit',
  'Pinnacle', 'Zenith Co', 'Apex Group', 'Solaris', 'Elevate', 'Vertex',
];

export const navItems = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Contact', href: '/contact' },
];
