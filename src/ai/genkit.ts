
import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/googleai';

// Correct Genkit v1.x initialization.
// We create a configured 'ai' instance directly and export it.
// This replaces the deprecated `configureGenkit` function.
export const ai = genkit({
  plugins: [
    googleAI({
      // The Gemini 1.5 Flash model is a good default for text generation.
      textGenerationModel: 'gemini-1.5-flash',
    }),
  ],
  // Log developer-friendly errors to the console
  // during development.
  enableDevLogs: true,
});
