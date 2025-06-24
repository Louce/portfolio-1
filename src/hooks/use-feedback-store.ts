'use client';

import { useState, useEffect, useCallback } from 'react';
import { useToast } from "@/components/ui/use-toast";
import type { ReviewFeedbackOutput } from '@/ai/flows';
import { feedbackService } from '@/services';
import type { FeedbackItem } from '@/services/feedbackService';

/**
 * A custom hook to manage UI state for the feedback feature.
 * It acts as a bridge between the UI components and the `feedbackService`, which handles
 * all data persistence logic. This hook's primary responsibility is to manage React state
 * and trigger re-renders when data changes.
 *
 * @returns An object containing the state and action dispatchers for the feedback system.
 * @property {boolean} isMounted - True if the component has mounted, used to prevent hydration errors.
 * @property {string | null} currentUser - The username of the currently logged-in user.
 * @property {FeedbackItem[]} userFeedback - An array of feedback items for the current user.
 * @property {Record<string, ReviewFeedbackOutput>} analysisResults - A map of AI analysis results keyed by feedback ID.
 * @property {(username: string, type: 'login' | 'signup') => void} login - Function to log a user in.
 * @property {() => void} logout - Function to log the current user out.
 * @property {(title: string, content: string) => boolean} addFeedback - Function to add a new feedback item.
 * @property {(feedbackId: string) => void} deleteFeedback - Function to delete a feedback item.
 * @property {(feedbackId: string, analysis: ReviewFeedbackOutput) => void} saveAnalysis - Function to save an AI analysis result.
 */
export const useFeedbackStore = () => {
  const { toast } = useToast();
  const [isMounted, setIsMounted] = useState(false);
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [userFeedback, setUserFeedback] = useState<FeedbackItem[]>([]);
  const [analysisResults, setAnalysisResults] = useState<Record<string, ReviewFeedbackOutput>>({});

  useEffect(() => {
    // This effect runs once on mount to initialize state from the persistence layer (service).
    setIsMounted(true);
    const user = feedbackService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
      setUserFeedback(feedbackService.getFeedbackForUser(user));
    }
    setAnalysisResults(feedbackService.getAnalysisResults());
  }, []);

  const login = useCallback((username: string, type: 'login' | 'signup') => {
    feedbackService.loginUser(username);
    setCurrentUser(username);
    // On login, fetch the feedback for the new user.
    setUserFeedback(feedbackService.getFeedbackForUser(username));
    toast({ title: type === 'login' ? 'Logged In' : 'Signed Up', description: `Welcome, ${username}!` });
  }, [toast]);

  const logout = useCallback(() => {
    feedbackService.logoutUser();
    setCurrentUser(null);
    setUserFeedback([]);
    toast({ title: 'Logged Out', description: 'You have been successfully logged out.' });
  }, [toast]);

  const addFeedback = useCallback((title: string, content: string): boolean => {
    if (!content.trim() || !currentUser) {
      if (!content.trim()) {
        toast({ title: 'Error', description: 'Feedback content cannot be empty.', variant: 'destructive' });
      }
      return false;
    }

    try {
      const newFeedbackItem = feedbackService.addFeedbackForUser(currentUser, title, content);
      setUserFeedback(prev => [newFeedbackItem, ...prev]);
      toast({ title: 'Feedback Submitted', description: 'Thank you for your feedback!' });
      return true;
    } catch (error) {
      console.error("Failed to add feedback via service:", error);
      toast({ title: 'Error', description: 'Could not save your feedback.', variant: 'destructive' });
      return false;
    }
  }, [currentUser, toast]);

  const deleteFeedback = useCallback((feedbackId: string) => {
    if (!currentUser || !feedbackId) return;

    try {
      const updatedFeedback = feedbackService.deleteFeedbackForUser(currentUser, feedbackId);
      setUserFeedback(updatedFeedback);
      
      const updatedAnalysis = feedbackService.deleteAnalysisResult(feedbackId);
      setAnalysisResults(updatedAnalysis);

      toast({ title: 'Feedback Deleted', description: 'The feedback item has been removed.' });
    } catch (error) {
      console.error("Failed to delete feedback via service:", error);
      toast({ title: 'Error', description: 'Could not delete the feedback item.', variant: 'destructive' });
    }
  }, [currentUser, toast]);

  const saveAnalysis = useCallback((feedbackId: string, analysis: ReviewFeedbackOutput) => {
    try {
      const newResults = feedbackService.saveAnalysisResult(feedbackId, analysis);
      setAnalysisResults(newResults);
    } catch (error) {
      console.error("Failed to save AI analysis via service:", error);
      toast({ title: 'Error', description: 'Could not save the AI analysis.', variant: 'destructive' });
    }
  }, [toast]);

  return {
    isMounted,
    currentUser,
    userFeedback,
    analysisResults,
    login,
    logout,
    addFeedback,
    deleteFeedback,
    saveAnalysis,
  };
};
