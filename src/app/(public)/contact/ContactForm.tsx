'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', company: '', service: '', budget: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  if (sent) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center py-20 text-center"
      >
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#B9fA3C] to-[#8B5CF6] flex items-center justify-center mb-6 shadow-2xl shadow-[#B9fA3C]/30">
          <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold dark:text-white text-[#0F172A] mb-3">Message Sent!</h3>
        <p className="dark:text-white/60 text-black/60">We will be in touch within 24 hours. Looking forward to connecting.</p>
      </motion.div>
    );
  }

  const inputClass = "w-full px-4 py-3 rounded-xl dark:bg-white/5 bg-[#F8FAFC] dark:text-white text-[#0F172A] text-sm placeholder:dark:text-white/30 placeholder:text-black/30 border dark:border-white/10 border-black/10 focus:outline-none focus:border-[#B9fA3C] transition-colors";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs dark:text-white/60 text-black/60 font-medium mb-1.5">Full Name *</label>
          <input type="text" required placeholder="Your name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} className={inputClass} />
        </div>
        <div>
          <label className="block text-xs dark:text-white/60 text-black/60 font-medium mb-1.5">Email Address *</label>
          <input type="email" required placeholder="your@email.com" value={form.email} onChange={e => setForm({...form, email: e.target.value})} className={inputClass} />
        </div>
      </div>
      <div>
        <label className="block text-xs dark:text-white/60 text-black/60 font-medium mb-1.5">Company</label>
        <input type="text" placeholder="Your company name" value={form.company} onChange={e => setForm({...form, company: e.target.value})} className={inputClass} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs dark:text-white/60 text-black/60 font-medium mb-1.5">Service Needed</label>
          <select value={form.service} onChange={e => setForm({...form, service: e.target.value})} className={inputClass}>
            <option value="">Select a service</option>
            <option>Branding Strategy</option>
            <option>Website Development</option>
            <option>Mobile App Development</option>
            <option>UI/UX Design</option>
            <option>Digital Marketing</option>
            <option>SEO Optimization</option>
            <option>Content Production</option>
            <option>Digital Transformation</option>
          </select>
        </div>
        <div>
          <label className="block text-xs dark:text-white/60 text-black/60 font-medium mb-1.5">Project Budget</label>
          <select value={form.budget} onChange={e => setForm({...form, budget: e.target.value})} className={inputClass}>
            <option value="">Select budget range</option>
            <option>Under $10,000</option>
            <option>$10,000 – $25,000</option>
            <option>$25,000 – $50,000</option>
            <option>$50,000 – $100,000</option>
            <option>$100,000+</option>
          </select>
        </div>
      </div>
      <div>
        <label className="block text-xs dark:text-white/60 text-black/60 font-medium mb-1.5">Project Details *</label>
        <textarea
          required
          rows={5}
          placeholder="Tell us about your project, goals, and timeline..."
          value={form.message}
          onChange={e => setForm({...form, message: e.target.value})}
          className={`${inputClass} resize-none`}
        />
      </div>
      <button
        type="submit"
        className="w-full py-4 rounded-xl bg-[#B9fA3C] text-[#04045E] font-semibold hover:shadow-xl hover:shadow-[#B9fA3C]/25 transition-all duration-200 hover:-translate-y-0.5"
      >
        Send Message
      </button>
    </form>
  );
}
