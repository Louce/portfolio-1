
'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui'; // Updated import
import { Text } from '@/components/primitives/Text';
import { Box } from '@/components/primitives/Box';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie } from 'lucide-react';

const COOKIE_NAME = 'kineticfolio_cookie_consent';

export const CookieConsentBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // This effect runs only on the client side
    const consentCookie = document.cookie
      .split('; ')
      .find(row => row.startsWith(`${COOKIE_NAME}=`));
    if (!consentCookie) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    const expires = new Date();
    expires.setFullYear(expires.getFullYear() + 1);
    document.cookie = `${COOKIE_NAME}=true; expires=${expires.toUTCString()}; path=/; SameSite=Lax; Secure`;
    setIsVisible(false);
  };

  if (typeof window === 'undefined' && !isVisible) {
    // Avoid rendering anything on the server if the banner is not supposed to be visible initially
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-[200] p-4 sm:p-6 bg-card/80 backdrop-blur-md shadow-2xl border-t border-border/50"
          role="dialog"
          aria-labelledby="cookie-consent-title"
          aria-describedby="cookie-consent-description"
        >
          <Box className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <Box className="flex items-start sm:items-center gap-3">
              <Cookie className="h-8 w-8 sm:h-6 sm:w-6 text-primary flex-shrink-0 mt-1 sm:mt-0" />
              <Box>
                <Text as="h2" id="cookie-consent-title" className="text-base sm:text-lg font-semibold text-foreground">
                  Our Cookie Policy
                </Text>
                <Text as="p" id="cookie-consent-description" className="text-xs sm:text-sm text-muted-foreground mt-1">
                  We use cookies to enhance your browsing experience and ensure our website functions optimally. By clicking "Accept", you agree to our use of cookies.
                </Text>
              </Box>
            </Box>
            <Button 
              onClick={handleAccept} 
              className="bg-primary hover:bg-primary/90 text-primary-foreground w-full sm:w-auto flex-shrink-0"
              aria-label="Accept cookie policy"
            >
              Accept
            </Button>
          </Box>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

CookieConsentBanner.displayName = 'CookieConsentBanner';
