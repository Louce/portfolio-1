/**
 * @fileOverview
 * This file configures and initializes the Genkit AI instance for the entire application.
 * It follows the modern Genkit v1.x API for setting up plugins.
 */

import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/googleai';

/**
 * The global, configured Genkit AI instance.
 * This `ai` object is imported by all other Genkit-related files (e.g., flows)
 * to define prompts, flows, and tools.
 */
export const ai = genkit({
  plugins: [
    googleAI(),
  ],
});
