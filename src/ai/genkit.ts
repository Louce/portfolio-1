
import { configureGenkit, genkit } from 'genkit';
import { googleAI } from '@genkit-ai/googleai';

configureGenkit({
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

export { genkit as ai };
