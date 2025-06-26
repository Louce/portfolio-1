'use client';

import { useState, useEffect } from 'react';

/**
 * A custom hook that fetches the visitor's approximate geographical location based on their IP address.
 * It uses the free, privacy-friendly 'ipwhois.app' service. This hook is intended for
 * client-side use only (`'use client'`). It includes a simulation for localhost development to avoid
 * unnecessary API calls and handles API errors gracefully.
 *
 * @returns {string | null} The visitor's location as a formatted string (e.g., "City, Country"),
 * "Location: Unknown" on failure, or null during the initial fetch.
 */
export const useVisitorLocation = () => {
  const [visitorLocation, setVisitorLocation] = useState<string | null>(null);

  useEffect(() => {
    const fetchVisitorLocation = async () => {
      try {
        // Simulate location for local development to avoid unnecessary API calls.
        if (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
            setVisitorLocation("California, USA (Simulated)"); 
            return; 
        }

        const response = await fetch('https://ipwhois.app/json/', {
          headers: {
            'Accept': 'application/json',
          }
        });

        if (!response.ok) {
          let errorMsg = `Failed to fetch location: ${response.statusText}`;
          try {
            const errorData = await response.json();
            errorMsg = errorData.message || errorMsg;
          } catch (jsonError) {
             // Response was not JSON, use original error message.
          }
          console.warn(`IPWHOIS API error: ${response.status}`, errorMsg);
          setVisitorLocation("Location: Unknown");
          return; 
        }

        const data = await response.json();
        
        // Gracefully handle both success and failure responses from the API.
        if (data && data.success !== false) { 
          let locationString = "";
          if (data.country) { 
            // Construct the most specific location string possible.
            if (data.city && data.region && data.city !== data.region) {
              locationString = `${data.city}, ${data.region}, ${data.country}`;
            } else if (data.region && data.region !== data.country) {
              locationString = `${data.region}, ${data.country}`;
            } else if (data.city && data.city !== data.country) { 
              locationString = `${data.city}, ${data.country}`;
            } else {
              locationString = data.country;
            }
          }
          setVisitorLocation(locationString || "Location: Unknown");
        } else {
           console.warn('IPWHOIS API reported failure:', data.message || 'Unknown reason');
           setVisitorLocation("Location: Unknown");
        }
      } catch (error) {
        console.warn('Could not fetch visitor location:', error);
        setVisitorLocation("Location: Unknown");
      }
    };

    fetchVisitorLocation();
  }, []);

  return visitorLocation;
};
