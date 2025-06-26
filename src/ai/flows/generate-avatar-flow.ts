'use server';
/**
 * @fileOverview An AI flow to generate a styled avatar image using Genkit.
 * This flow randomly selects an artistic style and generates a developer-themed
 * portrait using an experimental Google AI image generation model.
 *
 * @exports generateAvatar - The main server action to be called from the frontend.
 * @exports GenerateAvatarInput - The Zod schema type for the flow's input.
 * @exports GenerateAvatarOutput - The Zod schema type for the flow's structured output.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';

/** An array of artistic styles for the avatar generation. */
const avatarStyles = [
  "pixel art", "vaporwave", "cyberpunk", "anime", "fantasy", 
  "steampunk", "watercolor painting", "line art", "3d render", "retro comic book"
];

/**
 * Defines the schema for the input of the avatar generation flow.
 * In this case, no input is needed from the client.
 */
const GenerateAvatarInputSchema = z.object({});
export type GenerateAvatarInput = z.infer<typeof GenerateAvatarInputSchema>;

/**
 * Defines the schema for the structured output of the avatar generation flow.
 * @property {string} imageUrl - The data URI of the generated image (e.g., 'data:image/png;base64,...').
 * @property {string} style - The artistic style that was randomly selected and used for generation.
 */
const GenerateAvatarOutputSchema = z.object({
  imageUrl: z.string().describe("The data URI of the generated image."),
  style: z.string().describe("The style used for generation."),
});
export type GenerateAvatarOutput = z.infer<typeof GenerateAvatarOutputSchema>;

/**
 * Generates a stylized avatar image.
 * This function acts as a server-side entry point to the Genkit flow.
 * @param {GenerateAvatarInput} input - The input object (currently empty).
 * @returns {Promise<GenerateAvatarOutput>} A promise that resolves to the generated image URL and style.
 */
export async function generateAvatar(input: GenerateAvatarInput): Promise<GenerateAvatarOutput> {
  return generateAvatarFlow(input);
}

/**
 * @internal
 * Defines the main Genkit flow for generating an avatar.
 * This flow selects a random style, constructs a prompt, and calls the Google AI
 * image generation model to create a new avatar.
 */
const generateAvatarFlow = ai.defineFlow(
  {
    name: 'generateAvatarFlow',
    inputSchema: GenerateAvatarInputSchema,
    outputSchema: GenerateAvatarOutputSchema,
  },
  async () => {
    // Select a random style from the predefined list.
    const style = avatarStyles[Math.floor(Math.random() * avatarStyles.length)];
    const prompt = `A stylized developer portrait of a man, focusing on code and creativity. Artistic style: ${style}.`;

    const {media} = await ai.generate({
      // Use the experimental image generation model from Google AI.
      model: 'googleai/gemini-2.0-flash-preview-image-generation',
      prompt: prompt,
      config: {
        // The API requires both IMAGE and TEXT modalities for this model.
        responseModalities: ['TEXT', 'IMAGE'],
      },
    });

    // Handle the case where image generation might fail and not return media.
    if (!media || !media.url) {
      throw new Error('Image generation failed to return a data URI.');
    }

    return {
      imageUrl: media.url,
      style: style,
    };
  }
);
