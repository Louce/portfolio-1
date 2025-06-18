
import type { Metadata, Viewport } from 'next';
import { ThemeProvider } from 'next-themes';
import './globals.css';
import { Toaster } from "@/components/ui";
import { CookieConsentBanner, ThemeSwitcher } from '@/components/layout';
import { Inter } from 'next/font/google';

// Configure Inter font
const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap', // Use swap for better perceived performance
  variable: '--font-inter' // CSS variable for Tailwind
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:9002'; // Fallback for local dev

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'KineticFolio - Elite Frontend Architect & Developer',
  description: 'Visually stunning, interactive one-page portfolio for an elite frontend architect, showcasing kinetic elegance and cutting-edge web development skills with Next.js, React, and Framer Motion.',
  keywords: ['Frontend Developer', 'Frontend Architect', 'React Developer', 'Next.js Developer', 'TypeScript', 'Framer Motion', 'Portfolio', 'Web Developer', 'UI/UX'],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'KineticFolio - Elite Frontend Architect & Developer',
    description: 'A dynamic portfolio showcasing cutting-edge frontend development and design.',
    url: SITE_URL,
    siteName: 'KineticFolio',
    images: [
      {
        url: '/og-image.png', // Replace with your actual OG image path in /public
        width: 1200,
        height: 630,
        alt: 'KineticFolio - Portfolio Preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KineticFolio - Elite Frontend Architect & Developer',
    description: 'Explore the interactive portfolio of a top-tier frontend architect.',
    // site: '@yourtwitterhandle', // Optional: add your Twitter handle
    // creator: '@yourtwitterhandle', // Optional: add your Twitter handle
    images: ['/og-image.png'], // Replace with your actual Twitter card image path in /public
  },
  // Consider adding icons, manifest for PWA capabilities if desired
  // icons: {
  //   icon: '/favicon.ico',
  //   apple: '/apple-touch-icon.png',
  // },
  // manifest: '/site.webmanifest',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [ // For PWA and browser UI theming
    { media: '(prefers-color-scheme: light)', color: '#7DF9FF' }, // Electric Blue for primary
    { media: '(prefers-color-scheme: dark)', color: '#121212' },  // Off-black for background
  ],
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <head>
        {/* next/font handles optimized font loading */}
      </head>
      <body 
        className="font-body antialiased bg-background text-foreground min-h-screen transition-colors duration-300 ease-in-out"
      >
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            disableTransitionOnChange={false}
        >
          <ThemeSwitcher />
          {children}
          <Toaster />
          <CookieConsentBanner />
        </ThemeProvider>
      </body>
    </html>
  );
}
