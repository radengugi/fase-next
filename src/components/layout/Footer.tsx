import Link from 'next/link';
import { services } from '@/lib/data';
import Image from 'next/image';

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
    <footer className="bg-[#04045E] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        {/* Main Footer */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2 group mb-6">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br bg-[#B9fA3C] flex items-center justify-center text-white font-bold text-sm">
                <Image
                  src="/blue-fase.png"
                  width={72}
                  height={72}
                  alt="FASE Logo"
                  className="rounded-lg object-contain p-1.5"
                />
              </div>
              <span className="text-xl font-bold tracking-tight dark:text-white text-white">FASE Creative</span>
            </Link>
            <p className="dark:text-white/50 text-white/60 text-sm leading-relaxed max-w-xs mb-8">
              We help ambitious brands grow through technology, creativity, and digital innovation. Based everywhere that matters.
            </p>
            {/* Newsletter */}
            <div>
              <p className="dark:text-white text-white text-sm font-medium mb-3">Stay in the loop</p>
              <form className="flex gap-2" >
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 px-4 py-2.5 rounded-xl bg-white/[0.07] text-white text-sm placeholder:text-white/30 border border-white/[0.12] focus:outline-none focus:border-[#B9fA3C] focus:bg-white/[0.10] transition-colors"
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
              <h3 className="dark:text-white text-white font-semibold text-sm mb-5">{heading}</h3>
              <ul className="flex flex-col gap-3">
                {links.map(link => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="dark:text-white/50 text-white/60 text-sm hover:text-[#B9fA3C] dark:hover:text-[#B9fA3C] transition-colors duration-200"
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
        <div className="py-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="dark:text-white/30 text-white/40 text-sm">
            © 2026 FASE Digital Agency. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="#" className="dark:text-white/30 text-white/40 text-sm hover:text-[#B9fA3C] transition-colors">Privacy</Link>
            <Link href="#" className="dark:text-white/30 text-white/40 text-sm hover:text-[#B9fA3C] transition-colors">Terms</Link>
            <Link href="#" className="dark:text-white/30 text-white/40 text-sm hover:text-[#B9fA3C] transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
