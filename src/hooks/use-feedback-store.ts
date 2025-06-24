'use client';

import { useState, useEffect, useCallback } from 'react';
import { useToast } from "@/components/ui/use-toast";
import type { ReviewFeedbackOutput } from '@/ai/flows';
import { LOCAL_STORAGE_KEYS } from '@/lib/constants';

/**
 * Represents a single feedback item.
 * @property {string} id - A unique identifier, typically a timestamp.
 * @property {string} title - The title of the feedback.
 * @property {string} content - The main body of the feedback.
 * @property {string} submitter - The username of the person who submitted the feedback.
 * @property {number} timestamp - The UTC timestamp of when the feedback was submitted.
 */
export interface FeedbackItem {
  id: string;
  title: string;
  content: string;
  submitter: string;
  timestamp: number;
}

/**
 * A custom hook to manage all feedback-related state and interactions with localStorage.
 * This hook encapsulates logic for a mock user authentication system, CRUD operations
 * on feedback items, and management of AI analysis results. It is intended for client-side use only.
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
    setIsMounted(true);
    try {
      // On mount, load the logged-in user and any saved analysis from localStorage.
      const storedUser = localStorage.getItem(LOCAL_STORAGE_KEYS.LOGGED_IN_USER);
      if (storedUser) {
        setCurrentUser(storedUser);
      }
      const storedAnalysis = localStorage.getItem(LOCAL_STORAGE_KEYS.AI_ANALYSIS);
      if (storedAnalysis) {
        setAnalysisResults(JSON.parse(storedAnalysis));
      }
    } catch (error) {
      console.error("Failed to read from localStorage on mount", error);
    }
  }, []);

  useEffect(() => {
    // When the current user changes, load their specific feedback from the general feedback store.
    if (currentUser && isMounted) {
      try {
        const allUsersFeedback = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.USERS_FEEDBACK) || '{}');
        setUserFeedback(allUsersFeedback[currentUser] || []);
      } catch (error) {
        console.error("Failed to load user feedback from localStorage", error);
        setUserFeedback([]);
      }
    } else {
      setUserFeedback([]);
    }
  }, [currentUser, isMounted]);

  const login = useCallback((username: string, type: 'login' | 'signup') => {
    setCurrentUser(username);
    localStorage.setItem(LOCAL_STORAGE_KEYS.LOGGED_IN_USER, username);
    toast({ title: type === 'login' ? 'Logged In' : 'Signed Up', description: `Welcome, ${username}!` });
  }, [toast]);

  const logout = useCallback(() => {
    setCurrentUser(null);
    localStorage.removeItem(LOCAL_STORAGE_KEYS.LOGGED_IN_USER);
    toast({ title: 'Logged Out', description: 'You have been successfully logged out.' });
  }, [toast]);

  const addFeedback = useCallback((title: string, content: string): boolean => {
    if (!content.trim() || !currentUser) {
      if (!content.trim()) {
        toast({ title: 'Error', description: 'Feedback content cannot be empty.', variant: 'destructive' });
      }
      return false;
    }

    const newFeedbackItem: FeedbackItem = {
      id: Date.now().toString(),
      title: title.trim() || "General Feedback",
      content,
      submitter: currentUser,
      timestamp: Date.now(),
    };

    try {
      const allUsersFeedback = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.USERS_FEEDBACK) || '{}');
      const currentUserSpecificFeedback = allUsersFeedback[currentUser] || [];
      const updatedFeedback = [newFeedbackItem, ...currentUserSpecificFeedback];
      allUsersFeedback[currentUser] = updatedFeedback;

      localStorage.setItem(LOCAL_STORAGE_KEYS.USERS_FEEDBACK, JSON.stringify(allUsersFeedback));
      setUserFeedback(updatedFeedback);
      toast({ title: 'Feedback Submitted', description: 'Thank you for your feedback!' });
      return true;
    } catch (error) {
      console.error("Failed to save feedback to localStorage", error);
      toast({ title: 'Error', description: 'Could not save your feedback.', variant: 'destructive' });
      return false;
    }
  }, [currentUser, toast]);

  const deleteFeedback = useCallback((feedbackId: string) => {
    if (!currentUser || !feedbackId) return;

    try {
      // Remove feedback from the user's list
      const allUsersFeedback = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.USERS_FEEDBACK) || '{}');
      const currentUserSpecificFeedback = allUsersFeedback[currentUser] || [];
      const updatedFeedback = currentUserSpecificFeedback.filter((item: FeedbackItem) => item.id !== feedbackId);
      allUsersFeedback[currentUser] = updatedFeedback;
      localStorage.setItem(LOCAL_STORAGE_KEYS.USERS_FEEDBACK, JSON.stringify(allUsersFeedback));
      setUserFeedback(updatedFeedback);

      // Also remove any associated AI analysis
      const newAnalysisResults = { ...analysisResults };
      delete newAnalysisResults[feedbackId];
      setAnalysisResults(newAnalysisResults);
      localStorage.setItem(LOCAL_STORAGE_KEYS.AI_ANALYSIS, JSON.stringify(newAnalysisResults));

      toast({ title: 'Feedback Deleted', description: 'The feedback item has been removed.' });
    } catch (error) {
      console.error("Failed to delete feedback from localStorage", error);
      toast({ title: 'Error', description: 'Could not delete the feedback item.', variant: 'destructive' });
    }
  }, [currentUser, toast, analysisResults]);

  const saveAnalysis = useCallback((feedbackId: string, analysis: ReviewFeedbackOutput) => {
    try {
      const newResults = { ...analysisResults, [feedbackId]: analysis };
      setAnalysisResults(newResults);
      localStorage.setItem(LOCAL_STORAGE_KEYS.AI_ANALYSIS, JSON.stringify(newResults));
    } catch (error) {
      console.error("Failed to save AI analysis to localStorage", error);
      toast({ title: 'Error', description: 'Could not save the AI analysis.', variant: 'destructive' });
    }
  }, [analysisResults, toast]);

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
