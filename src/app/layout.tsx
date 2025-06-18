
import type { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';
import './globals.css';
import { Toaster } from "@/components/ui";
import { CookieConsentBanner, ThemeSwitcher } from '@/components/layout';

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
    <html lang="en" suppressHydrationWarning> {/* suppressHydrationWarning is recommended by next-themes */}
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased bg-background text-foreground min-h-screen">
        <ThemeProvider
            attribute="class"
            defaultTheme="system" // Keeps respecting system preference initially
            enableSystem
            disableTransitionOnChange={false} // Ensure transitions are enabled
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
