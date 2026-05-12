import type { Metadata } from 'next';
import ContactForm from './ContactForm';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Start your project with FASE. Get in touch to discuss your brand, digital product, or transformation initiative.',
};

const ContactIcon = ({ iconType }: { iconType: 'email' | 'location' | 'time' }) => {
  const icons = {
    email: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    ),
    location: (
      <>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </>
    ),
    time: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    ),
  };

  return (
    <svg className="w-5 h-5 text-[#B9fA3C]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      {icons[iconType]}
    </svg>
  );
};

const contactInfo = [
  { type: 'email' as const, label: 'Email', value: 'hello@fase.agency' },
  { type: 'location' as const, label: 'Headquarters', value: 'Jakarta, Indonesia · Remote Worldwide' },
  { type: 'time' as const, label: 'Response Time', value: 'Within 24 hours' },
];

const socials = [
  { label: 'Instagram', href: '#' },
  { label: 'LinkedIn', href: '#' },
  { label: 'Twitter / X', href: '#' },
  { label: 'Behance', href: '#' },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#04045E]">
      {/* Hero */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#B9fA3C] mb-6">
            <span className="text-xs text-[#04045E] font-semibold uppercase tracking-widest">Get in Touch</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight mb-6">
            Let&rsquo;s Start a <span className="gradient-text">Conversation</span>
          </h1>
          <p className="text-xl text-white/60 max-w-2xl">
            Tell us about your project and we will connect you with the right team to make it extraordinary.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-32 bg-[#04045E]">
        <div className="max-w-7xl mx-auto px-6 pt-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left: Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-xl font-bold text-white mb-6">Contact Information</h2>
                <div className="space-y-5">
                  {contactInfo.map(item => (
                    <div key={item.label} className="flex gap-4">
                      <div className="w-10 h-10 rounded-xl bg-white/[0.08] flex items-center justify-center shrink-0">
                        <ContactIcon iconType={item.type} />
                      </div>
                      <div>
                        <p className="text-xs text-white/60 mb-0.5">{item.label}</p>
                        <p className="text-sm text-white font-medium">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-white mb-4">Follow Us</h3>
                <div className="flex flex-col gap-2">
                  {socials.map(s => (
                    <a key={s.label} href={s.href} className="text-sm text-white/50 hover:text-[#B9fA3C] transition-colors">{s.label}</a>
                  ))}
                </div>
              </div>

              {/* Badge */}
              <div className="p-5 rounded-2xl bg-white/[0.06] border border-white/[0.12]">
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-2 h-2 rounded-full bg-[#10B981]" />
                  <span className="text-sm font-medium text-white">Available for Projects</span>
                </div>
                <p className="text-xs text-white/40">We are currently accepting new clients and would love to hear about your project.</p>
              </div>
            </div>

            {/* Right: Form */}
            <div className="lg:col-span-2 p-8 rounded-3xl bg-white/[0.06] border border-white/[0.12]">
              <h2 className="text-xl font-bold text-white mb-8">Start Your Project</h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
