'use server';
/**
 * @fileOverview An AI flow to generate a styled avatar image.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';
import {googleAI} from '@genkit-ai/googleai';

// An array of artistic styles for the avatar generation.
const avatarStyles = [
  "pixel art", "vaporwave", "cyberpunk", "anime", "fantasy", 
  "steampunk", "watercolor painting", "line art", "3d render", "retro comic book"
];

const GenerateAvatarInputSchema = z.object({
  // No input needed, we'll pick a random style.
});
export type GenerateAvatarInput = z.infer<typeof GenerateAvatarInputSchema>;

const GenerateAvatarOutputSchema = z.object({
  imageUrl: z.string().describe("The data URI of the generated image."),
  style: z.string().describe("The style used for generation."),
});
export type GenerateAvatarOutput = z.infer<typeof GenerateAvatarOutputSchema>;

export async function generateAvatar(input: GenerateAvatarInput): Promise<GenerateAvatarOutput> {
  return generateAvatarFlow(input);
}

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
      model: googleAI.model('gemini-2.0-flash-preview-image-generation'),
      prompt: prompt,
      config: {
        // Must include both IMAGE and TEXT modalities.
        responseModalities: ['TEXT', 'IMAGE'],
      },
    });

    if (!media.url) {
      throw new Error('Image generation failed to return a data URI.');
    }

    return {
      imageUrl: media.url,
      style: style,
    };
  }
);
