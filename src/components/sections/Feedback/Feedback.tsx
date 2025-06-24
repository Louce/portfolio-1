
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SectionWrapper } from '@/components/layout';
import { Flex, Text, Box } from '@/components/primitives';
import { useToast } from "@/components/ui/use-toast";
import { useFeedbackStore, type FeedbackItem } from '@/hooks';
import { reviewFeedback } from '@/ai/flows';
import { AuthForm, FeedbackForm, FeedbackList } from './components';

/**
 * The main component for the Feedback section.
 * This component acts as a controller, managing the overall state and view logic.
 * It orchestrates the authentication, feedback submission, and feedback display functionalities
 * by composing the `AuthForm`, `FeedbackForm`, and `FeedbackList` sub-components.
 *
 * It uses the `useFeedbackStore` custom hook to manage all state related to feedback,
 * ensuring a clean separation of concerns.
 *
 * @returns {React.ReactElement} The Feedback section component.
 */
export const Feedback: React.FC = () => {
  const { toast } = useToast();
  const [view, setView] = useState<'login' | 'signup'>('login');
  const [analyzingId, setAnalyzingId] = useState<string | null>(null);

  const {
    isMounted,
    currentUser,
    userFeedback,
    analysisResults,
    login,
    logout,
    addFeedback,
    deleteFeedback,
    saveAnalysis,
  } = useFeedbackStore();

  /**
   * Handles the AI review request for a feedback item.
   * It calls the `reviewFeedback` server action and saves the result using the feedback store.
   * @param {FeedbackItem} item - The feedback item to be analyzed.
   */
  const handleAiReview = async (item: FeedbackItem) => {
    if (analyzingId) return;

    setAnalyzingId(item.id);
    try {
      const result = await reviewFeedback({ feedbackText: item.content });
      saveAnalysis(item.id, result);
      toast({ title: "AI Analysis Complete", description: "Review generated successfully." });
    } catch (error) {
      console.error("AI analysis failed:", error);
      toast({ title: "AI Analysis Failed", description: "Could not get a response from the AI. Please try again.", variant: 'destructive' });
    } finally {
      setAnalyzingId(null);
    }
  };

  // Render a loading state until the component is mounted on the client.
  // This prevents hydration errors related to localStorage access.
  if (!isMounted) {
    return (
      <SectionWrapper id="feedback" className="bg-transparent">
        <Flex align="center" justify="center" className="h-full">
          <Text>Loading Feedback Section...</Text>
        </Flex>
      </SectionWrapper>
    );
  }

  return (
    <SectionWrapper id="feedback" className="bg-transparent">
      <Flex direction="col" align="center" justify="start" className="h-auto min-h-full w-full py-8">
        {!currentUser ? (
          // If no user is logged in, show the authentication form.
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
            <AuthForm
              authType={view}
              onAuthSubmit={login}
              onSwitchMode={() => setView(view === 'login' ? 'signup' : 'login')}
            />
          </motion.div>
        ) : (
          // If a user is logged in, show the feedback management interface.
          <Flex direction="col" className="w-full h-full space-y-8 pt-12 pb-8 md:pt-16">
            <FeedbackForm
              currentUser={currentUser}
              onLogout={logout}
              onAddFeedback={addFeedback}
            />
            <FeedbackList
              feedbackItems={userFeedback}
              analysisResults={analysisResults}
              analyzingId={analyzingId}
              onAiReview={handleAiReview}
              onDelete={deleteFeedback}
            />
          </Flex>
        )}
      </Flex>
    </SectionWrapper>
  );
};

Feedback.displayName = 'FeedbackSection';
