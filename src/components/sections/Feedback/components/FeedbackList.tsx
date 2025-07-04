'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import type { ReviewFeedbackOutput } from '@/ai/flows/review-feedback-flow';
import type { FeedbackItem } from '@/hooks';
import {
  Button, Card, CardContent, CardHeader, CardTitle, CardDescription,
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription,
  AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
  ScrollArea,
} from '@/components/ui';
import { Flex, Text, Box } from '@/components/primitives';
import { MessageSquareText, Trash2, Sparkles, Loader2, AlertTriangle } from 'lucide-react';
import { AnalysisResult } from './AnalysisResult';

/**
 * Props for the FeedbackList component.
 */
interface FeedbackListProps {
  /** An array of feedback items submitted by the current user. */
  feedbackItems: FeedbackItem[];
  /** A record of AI analysis results, keyed by feedback item ID. */
  analysisResults: Record<string, ReviewFeedbackOutput>;
  /** The ID of the feedback item currently being analyzed, or null. */
  analyzingId: string | null;
  /** 
   * Callback function to trigger an AI review for a feedback item.
   * @param {FeedbackItem} item - The feedback item to be reviewed.
   */
  onAiReview: (item: FeedbackItem) => void;
  /** 
   * Callback function to delete a feedback item.
   * @param {string} feedbackId - The ID of the feedback item to delete.
   */
  onDelete: (feedbackId: string) => void;
}

/**
 * Displays a list of feedback items submitted by the user.
 * Its single responsibility is to render the list of feedback and handle user
 * interactions for deleting or analyzing items. It includes a confirmation
 * dialog for the delete action to prevent accidental data loss, and a styled
 * scroll area for managing long lists of feedback.
 *
 * @param {FeedbackListProps} props - The properties for the component.
 * @returns {React.ReactElement} The list of user-submitted feedback.
 */
export const FeedbackList: React.FC<FeedbackListProps> = ({
  feedbackItems,
  analysisResults,
  analyzingId,
  onAiReview,
  onDelete,
}) => {
  const [feedbackToDelete, setFeedbackToDelete] = useState<string | null>(null);

  const confirmDelete = () => {
    if (feedbackToDelete) {
      onDelete(feedbackToDelete);
      setFeedbackToDelete(null);
    }
  };

  return (
    <AlertDialog onOpenChange={(open) => !open && setFeedbackToDelete(null)}>
      <Box className="w-full max-w-3xl mx-auto space-y-4">
        <Text as="h4" className="text-xl md:text-2xl font-semibold text-primary flex items-center px-4"><MessageSquareText className="mr-2" /> Your Submitted Feedback</Text>
        {feedbackItems.length === 0 ? (
          <Text className="text-muted-foreground px-4">You haven't submitted any feedback yet.</Text>
        ) : (
          <ScrollArea className="h-[calc(100vh-400px)] md:h-[calc(100vh-450px)] w-full">
            <Box className="space-y-4 pr-3 pl-4 pb-4">
              {feedbackItems.map(item => (
                <motion.div key={item.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
                  <Card className="bg-card/60 backdrop-blur-sm border border-border/20 overflow-hidden">
                    <CardContent className="p-4">
                      <Flex justify="between" align="start" className="mb-2">
                        <Box>
                          <CardTitle className="text-lg text-foreground">{item.title}</CardTitle>
                          <CardDescription className="text-xs text-muted-foreground">
                            Submitted: {new Date(item.timestamp).toLocaleString()}
                          </CardDescription>
                        </Box>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="icon" onClick={() => setFeedbackToDelete(item.id)} aria-label={`Delete feedback item titled "${item.title}"`} className="text-destructive hover:text-destructive/80 hover:bg-destructive/10">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                      </Flex>
                      <Text className="text-sm text-foreground/90 whitespace-pre-wrap">{item.content}</Text>
                      {analysisResults[item.id] ? (
                        <AnalysisResult analysis={analysisResults[item.id]} />
                      ) : (
                        <Flex justify="end" className="mt-4">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onAiReview(item)}
                            disabled={!!analyzingId}
                            className="text-primary border-primary/50 hover:bg-primary/10 hover:text-primary"
                            aria-label={`Get AI review for feedback item titled "${item.title}"`}
                          >
                            {analyzingId === item.id ? (
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                              <Sparkles className="mr-2 h-4 w-4" />
                            )}
                            AI Review
                          </Button>
                        </Flex>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </Box>
          </ScrollArea>
        )}
      </Box>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2"><AlertTriangle className="text-destructive" />Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            feedback from your browser's local storage.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setFeedbackToDelete(null)}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={confirmDelete} className="bg-destructive hover:bg-destructive/90">Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
