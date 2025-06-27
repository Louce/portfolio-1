/**
 * @fileOverview
 * This file configures and initializes the Genkit AI instance for the entire application.
 * It follows the modern Genkit v1.x API for setting up plugins and serves as the single
 * source of truth for Genkit configuration. This centralization is a good practice for
 * maintainability, allowing all AI-related settings to be managed in one place.
 */

import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/googleai';

/**
 * The global, configured Genkit AI instance.
 * This `ai` object is imported by all other Genkit-related files (e.g., flows)
 * to define prompts, flows, and tools. This pattern ensures that the entire
 * application uses a single, consistently configured Genkit instance.
 */
export const ai = genkit({
  plugins: [
    googleAI(),
  ],
});
