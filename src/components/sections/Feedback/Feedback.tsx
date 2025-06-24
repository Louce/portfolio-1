
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SectionWrapper } from '@/components/layout';
import { Flex, Text, Box } from '@/components/primitives';
import { useToast } from "@/components/ui/use-toast";
import { useFeedbackStore, type FeedbackItem } from '@/hooks';
import { reviewFeedback } from '@/ai/flows/review-feedback-flow';
import { AuthForm, FeedbackForm, FeedbackList } from './components';

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
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
            <AuthForm
              authType={view}
              onAuthSubmit={login}
              onSwitchMode={() => setView(view === 'login' ? 'signup' : 'login')}
            />
          </motion.div>
        ) : (
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
