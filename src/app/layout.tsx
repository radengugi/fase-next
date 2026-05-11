import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/hooks/useAuth';
import { ToastProvider } from '@/components/ui/toast';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://fase.creative'),
  title: {
    default: 'FASE Creative — Premium Digital Agency',
    template: '%s',
  },
  description: 'FASECreative helps brands grow through technology, creativity, and digital innovation. Award-winning digital agency specializing in branding, web development, mobile apps, UI/UX, and digital marketing.',
  keywords: ['creative agency indonesia', 'branding agency jakarta', 'premium creative agency', 'creative production house', 'social media creative agency', 'digital campaign agency', 'creative agency'],
  authors: [{ name: 'FASE Creative' }],
  creator: 'FASE Creative',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://fase.creative',
    siteName: 'FASE Creative',
    title: 'FASE Creative — Premium Digital Agency',
    description: 'FASE Creative helps brands grow through technology, creativity, and digital innovation.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'FASE Creative' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FASE Creative — Premium Digital Agency',
    description: 'FASE Creative helps brands grow through technology, creativity, and digital innovation.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var stored = localStorage.getItem('fase-theme');
                  var preferred = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                  var theme = stored || preferred;
                  document.documentElement.classList.toggle('dark', theme === 'dark');
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="antialiased dark:bg-[#0F172A] bg-white min-h-screen">
        <AuthProvider>
          <ToastProvider>
            <main>{children}</main>
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
