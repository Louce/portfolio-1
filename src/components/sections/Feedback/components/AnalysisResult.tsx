'use client';

import React from 'react';
import { motion } from 'framer-motion';
import type { ReviewFeedbackOutput } from '@/ai/flows/review-feedback-flow';
import { Badge } from '@/components/ui';
import { Flex, Text, Box } from '@/components/primitives';
import { Sparkles } from 'lucide-react';

/**
 * Props for the AnalysisResult component.
 */
interface AnalysisResultProps {
  /** The AI analysis result object from the Genkit flow to display. */
  analysis: ReviewFeedbackOutput;
}

/**
 * A dedicated sub-component to display the structured results of a Genkit AI
 * feedback analysis. It neatly formats the sentiment, summary, and suggested
 * action returned from the AI model, providing a clear and visually appealing summary.
 *
 * @param {AnalysisResultProps} props - The properties for the component.
 * @returns {React.ReactElement} A formatted display of the AI analysis.
 */
export const AnalysisResult: React.FC<AnalysisResultProps> = ({ analysis }) => {
  const sentimentVariant = {
    Positive: 'success',
    Neutral: 'secondary',
    Negative: 'destructive',
  }[analysis.sentiment] || 'default';

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="mt-4 border-t border-border/20 pt-4"
    >
      <Flex justify="between" align="center" className="mb-3">
        <Text as="h5" className="text-base font-semibold text-primary flex items-center">
          <Sparkles className="mr-2 h-4 w-4" />AI Review
        </Text>
        <Badge variant={sentimentVariant as any}>{analysis.sentiment}</Badge>
      </Flex>
      <Box className="space-y-2 text-sm">
        <Box>
          <Text as="p" className="font-medium text-foreground/80">Summary:</Text>
          <Text as="p" className="text-foreground/70">{analysis.summary}</Text>
        </Box>
        <Box>
          <Text as="p" className="font-medium text-foreground/80">Suggested Action:</Text>
          <Text as="p" className="text-foreground/70">{analysis.suggestedAction}</Text>
        </Box>
      </Box>
    </motion.div>
  );
};

AnalysisResult.displayName = 'AnalysisResult';
