
import type { Metadata } from 'next';
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

export const metadata: Metadata = {
  title: 'KineticFolio - Frontend Architect',
  description: 'A visually stunning, one-page portfolio for an elite frontend developer.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}> {/* Apply font variable to html tag */}
      <head>
        {/* Removed direct Google Font links, next/font handles this */}
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
