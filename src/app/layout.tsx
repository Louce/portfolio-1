
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

// IMPORTANT: In a real deployment, use process.env.NEXT_PUBLIC_SITE_URL
const SITE_URL = 'http://localhost:9002'; // Replace with your actual production domain

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
        url: `${SITE_URL}/og-image.png`, // Ensure this image exists in /public
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
    images: [`${SITE_URL}/og-image.png`], // Ensure this image exists in /public
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
    { media: '(prefers-color-scheme: light)', color: 'hsl(220 50% 98%)' }, // light background
    { media: '(prefers-color-scheme: dark)', color: 'hsl(0 0% 7%)' },  // dark background
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
        {/* 
          Ensure you have actual icons in your /public/icons folder:
          - /public/icons/favicon.ico
          - /public/icons/apple-touch-icon.png
          - /public/icons/icon-192x192.png (referenced in manifest.json)
          - /public/icons/icon-512x512.png (referenced in manifest.json)
          And /public/og-image.png
        */}
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
