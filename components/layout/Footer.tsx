import Link from 'next/link';
import { services } from '@/lib/data';

const footerLinks = {
  Company: [
    { label: 'About', href: '/about' },
    { label: 'Portfolio', href: '/portfolio' },
    { label: 'Careers', href: '#' },
    { label: 'Contact', href: '/contact' },
  ],
  Services: services.slice(0, 6).map(s => ({ label: s.title, href: `/services#${s.id}` })),
  Connect: [
    { label: 'Instagram', href: '#' },
    { label: 'LinkedIn', href: '#' },
    { label: 'Twitter/X', href: '#' },
    { label: 'Dribbble', href: '#' },
    { label: 'Behance', href: '#' },
  ],
};

export default function Footer() {
  return (
    <footer className="dark:bg-[#080D1A] bg-[#F1F5F9] border-t dark:border-white/5 border-black/5">
      <div className="max-w-7xl mx-auto px-6">
        {/* Main Footer */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2 group mb-6">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#B9fA3C] to-[#8B5CF6] flex items-center justify-center text-white font-bold text-sm">
                F
              </div>
              <span className="text-xl font-bold tracking-tight dark:text-white text-[#0F172A]">FASE</span>
            </Link>
            <p className="dark:text-white/50 text-[#0F172A]/60 text-sm leading-relaxed max-w-xs mb-8">
              We help ambitious brands grow through technology, creativity, and digital innovation. Based everywhere that matters.
            </p>
            {/* Newsletter */}
            <div>
              <p className="dark:text-white text-[#0F172A] text-sm font-medium mb-3">Stay in the loop</p>
              <form className="flex gap-2" >
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 px-4 py-2.5 rounded-xl dark:bg-white/5 bg-black/5 dark:text-white text-[#0F172A] text-sm placeholder:dark:text-white/30 placeholder:text-black/30 border dark:border-white/10 border-black/10 focus:outline-none focus:border-[#B9fA3C] transition-colors"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-xl bg-[#B9fA3C] text-[#04045E] text-sm font-medium transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h3 className="dark:text-white text-[#0F172A] font-semibold text-sm mb-5">{heading}</h3>
              <ul className="flex flex-col gap-3">
                {links.map(link => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="dark:text-white/50 text-[#0F172A]/60 text-sm hover:text-[#B9fA3C] dark:hover:text-[#B9fA3C] transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t dark:border-white/5 border-black/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="dark:text-white/30 text-[#0F172A]/40 text-sm">
            © 2026 FASE Digital Agency. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="#" className="dark:text-white/30 text-[#0F172A]/40 text-sm hover:text-[#B9fA3C] transition-colors">Privacy</Link>
            <Link href="#" className="dark:text-white/30 text-[#0F172A]/40 text-sm hover:text-[#B9fA3C] transition-colors">Terms</Link>
            <Link href="#" className="dark:text-white/30 text-[#0F172A]/40 text-sm hover:text-[#B9fA3C] transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
