
'use server';
/**
 * @fileOverview An AI flow to review user feedback.
 *
 * - reviewFeedback - A function that analyzes feedback text.
 * - ReviewFeedbackInput - The input type for the reviewFeedback function.
 * - ReviewFeedbackOutput - The return type for the reviewFeedback function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';

const ReviewFeedbackInputSchema = z.object({
  feedbackText: z.string().describe('The user feedback text to be analyzed.'),
});
export type ReviewFeedbackInput = z.infer<typeof ReviewFeedbackInputSchema>;

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

export async function reviewFeedback(input: ReviewFeedbackInput): Promise<ReviewFeedbackOutput> {
  return reviewFeedbackFlow(input);
}

const reviewPrompt = ai.definePrompt({
  name: 'reviewFeedbackPrompt',
  input: {schema: ReviewFeedbackInputSchema},
  output: {schema: ReviewFeedbackOutputSchema},
  prompt: `You are a helpful assistant for a portfolio website owner.
Your task is to analyze a piece of user feedback and provide a structured analysis.

Analyze the following feedback:
"{{{feedbackText}}}"

Based on your analysis, determine the sentiment, provide a one-sentence summary, and suggest a clear, actionable next step for the portfolio owner.
`,
});

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
