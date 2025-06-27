import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Inter } from 'next/font/google';
import { SpeedInsights } from "@vercel/speed-insights/next";
import { AppProviders } from './providers';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
});

/**
 * A helper function to dynamically construct the site's base URL.
 * It prioritizes environment variables in a specific order: a manually set
 * site URL, a Vercel-provided URL, or a local development URL. This ensures
 * that metadata URLs are always correct across different environments.
 * @returns {string} The full, absolute URL of the site.
 */
const getSiteUrl = () => {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.startsWith('http')
      ? process.env.NEXT_PUBLIC_SITE_URL
      : `https://${process.env.NEXT_PUBLIC_SITE_URL}`;
  }
  if (process.env.NEXT_PUBLIC_VERCEL_URL) {
    return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
  }
  return `http://localhost:${process.env.PORT || 3000}`;
};

const SITE_URL = getSiteUrl();

/**
 * The root metadata for the application.
 * `metadataBase` is crucial for ensuring that all relative paths in Open Graph
 * and other metadata fields are resolved correctly into absolute URLs.
 */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Dendi Rivaldi - Python, Automation & Game Dev Enthusiast',
  description: 'Portfolio of Dendi Rivaldi, showcasing skills in Python, automation, game development, and design. Explore projects and connect.',
  keywords: ['Dendi Rivaldi', 'Python Developer', 'Automation Engineer', 'Game Developer', 'Design Enthusiast', 'Portfolio', 'Software Developer'],
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
    title: 'Dendi Rivaldi - Python, Automation & Game Dev Portfolio',
    description: 'Discover the work of Dendi Rivaldi, a developer passionate about Python, automation, game creation, and design.',
    url: SITE_URL,
    siteName: 'Dendi Rivaldi Portfolio',
    images: [
      {
        url: `/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'Dendi Rivaldi - Portfolio Preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dendi Rivaldi - Developer Portfolio',
    description: 'Explore Dendi Rivaldi\'s projects in Python, automation, game development, and design.',
    images: [`/og-image.png`],
  },
  manifest: '/manifest.json',
  icons: {
    icon: '/icons/favicon.ico', 
    apple: '/icons/apple-touch-icon.png', 
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [ 
    { media: '(prefers-color-scheme: light)', color: 'hsl(220 50% 98%)' },
    { media: '(prefers-color-scheme: dark)', color: 'hsl(0 0% 7%)' },
  ],
};

/**
 * The root layout component for the entire application.
 * As a Next.js Server Component, its primary responsibility is to define the
 * main HTML structure (`<html>`, `<body>`) and provide site-wide context.
 * It practices Separation of Concerns by delegating all client-side logic
 * (like theme providers and interactive elements) to the `<AppProviders>` component.
 *
 * @param {Readonly<{ children: React.ReactNode }>} props - The child components to be rendered.
 * @returns {React.ReactElement} The root layout of the application.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} scroll-smooth`}>
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="preconnect" href="https://ipwhois.app" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body 
        className="font-body antialiased bg-background text-foreground min-h-screen transition-colors duration-300 ease-in-out"
      >
        <AppProviders>
          {children}
        </AppProviders>
        <SpeedInsights />
      </body>
    </html>
  );
}
