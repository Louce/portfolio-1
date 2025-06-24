
'use server';
/**
 * @fileOverview An AI flow to review user feedback using Genkit.
 * This file defines the structured input/output schemas with Zod and the Genkit
 * flow that communicates with the Gemini model to analyze sentiment, summarize, and
 * suggest actions for a given piece of feedback.
 *
 * @exports reviewFeedback - The main server action to be called from the frontend.
 * @exports ReviewFeedbackInput - The Zod schema type for the flow's input.
 * @exports ReviewFeedbackOutput - The Zod schema type for the flow's structured output.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';
import {googleAI} from '@genkit-ai/googleai';

/**
 * Defines the schema for the input of the feedback review flow.
 * @property {string} feedbackText - The user feedback text to be analyzed.
 */
const ReviewFeedbackInputSchema = z.object({
  feedbackText: z.string().describe('The user feedback text to be analyzed.'),
});
export type ReviewFeedbackInput = z.infer<typeof ReviewFeedbackInputSchema>;

/**
 * Defines the schema for the structured output of the feedback review flow.
 * @property {('Positive' | 'Neutral' | 'Negative')} sentiment - The overall sentiment of the feedback.
 * @property {string} summary - A concise one-sentence summary of the feedback.
 * @property {string} suggestedAction - A brief, actionable next step to address the feedback.
 */
const ReviewFeedbackOutputSchema = z.object({
  sentiment: z
    .enum(['Positive', 'Neutral', 'Negative'])
    .describe('The overall sentiment of the feedback.'),
  summary: z.string().describe('A concise one-sentence summary of the feedback.'),
  suggestedAction: z
    .string()
    .describe('A brief, actionable next step to address the feedback.'),
});
export type ReviewFeedbackOutput = z.infer<typeof ReviewFeedbackOutputSchema>;

/**
 * Analyzes a given piece of feedback text using an AI model.
 * This function acts as a server-side entry point to the Genkit flow,
 * providing a structured analysis including sentiment, a summary, and a suggested action.
 * @param {ReviewFeedbackInput} input - The object containing the feedback text.
 * @returns {Promise<ReviewFeedbackOutput>} A promise that resolves to the structured analysis of the feedback.
 * @throws {Error} Throws an error if the AI model fails to return a structured response.
 */
export async function reviewFeedback(input: ReviewFeedbackInput): Promise<ReviewFeedbackOutput> {
  return reviewFeedbackFlow(input);
}

/**
 * @internal
 * Defines the Genkit prompt for the feedback review task.
 * It specifies the AI model, the input/output schemas for structured prompting,
 * and the instructions for the AI.
 */
const reviewPrompt = ai.definePrompt({
  name: 'reviewFeedbackPrompt',
  model: googleAI.model('gemini-1.5-flash'),
  input: {schema: ReviewFeedbackInputSchema},
  output: {schema: ReviewFeedbackOutputSchema},
  prompt: `You are a helpful assistant for a portfolio website owner.
Your task is to analyze a piece of user feedback and provide a structured analysis.
Your response MUST conform to the specified JSON schema.

Analyze the following feedback:
"{{{feedbackText}}}"

Based on your analysis, determine the sentiment, provide a one-sentence summary, and suggest a clear, actionable next step for the portfolio owner.
`,
});

/**
 * @internal
 * Defines the main Genkit flow for reviewing feedback.
 * This flow takes the input, calls the defined prompt, and returns the structured output.
 */
const reviewFeedbackFlow = ai.defineFlow(
  {
    name: 'reviewFeedbackFlow',
    inputSchema: ReviewFeedbackInputSchema,
    outputSchema: ReviewFeedbackOutputSchema,
  },
  async (input) => {
    const {output} = await reviewPrompt(input);
    if (!output) {
      throw new Error('Failed to get a structured response from the AI model.');
    }
    return output;
  }
);
