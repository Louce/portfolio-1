
import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/googleai';

// Correct Genkit v1.x initialization.
// We create a configured 'ai' instance directly and export it.
// This replaces the deprecated `configureGenkit` function.
export const ai = genkit({
  plugins: [
    googleAI(),
  ],
});
