
import type { Metadata, Viewport } from 'next';
import { ThemeProvider } from 'next-themes';
import './globals.css';
import { Toaster, TooltipProvider } from "@/components/ui";
import { CookieConsentBanner, Navbar, Footer } from '@/components/layout';
import { Inter } from 'next/font/google';
import { SpeedInsights } from "@vercel/speed-insights/next";

/**
 * Configures the Inter font from Google Fonts with a CSS variable.
 * This is the modern, performance-optimized way to handle web fonts in Next.js.
 * @see https://nextjs.org/docs/app/building-your-application/optimizing/fonts
 */
const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap', // Use swap for better perceived performance
  variable: '--font-inter' // CSS variable for Tailwind
});

/**
 * Dynamically determines the site's base URL.
 * Prioritizes environment variables for production/preview deployments (Vercel)
 * and falls back to localhost for local development. This is crucial for correct
 * metadata generation (e.g., Open Graph URLs).
 * @returns {string} The full base URL of the site.
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
 * Defines the static metadata for the application.
 * This object is used by Next.js to generate <meta> tags for SEO and social sharing.
 * It includes title, description, keywords, Open Graph, and Twitter card information.
 * The `metadataBase` is crucial for resolving relative image paths into absolute URLs.
 * @see https://nextjs.org/docs/app/building-your-application/optimizing/metadata
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

/**
 * Configures the viewport for the application.
 * This sets the initial scale and theme colors for the browser chrome,
 * adapting to the user's system preference for light or dark mode.
 * @see https://nextjs.org/docs/app/api-reference/functions/generate-viewport
 */
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [ 
    { media: '(prefers-color-scheme: light)', color: 'hsl(220 50% 98%)' }, // light background
    { media: '(prefers-color-scheme: dark)', color: 'hsl(0 0% 7%)' },  // dark background
  ],
};

/**
 * The root layout component for the entire application.
 * This component wraps every page, providing a consistent structure and global context providers.
 *
 * @param {object} props - The properties for the component.
 * @param {React.ReactNode} props.children - The child components to be rendered within the layout (i.e., the current page).
 * @returns {React.ReactElement} The root HTML structure of the application.
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
        className="font-body antialiased bg-background text-foreground min-h-screen"
      >
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            disableTransitionOnChange
        >
          <TooltipProvider delayDuration={100}>
            <Navbar />
            <main>{children}</main>
            <Footer />
            <Toaster />
            <CookieConsentBanner />
          </TooltipProvider>
        </ThemeProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
