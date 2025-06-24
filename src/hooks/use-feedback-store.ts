'use client';

import { useState, useEffect, useCallback } from 'react';
import { useToast } from "@/components/ui/use-toast";
import type { ReviewFeedbackOutput } from '@/ai/flows';
import { LOCAL_STORAGE_KEYS } from '@/lib/constants';

export interface FeedbackItem {
  id: string;
  title: string;
  content: string;
  submitter: string;
  timestamp: number;
}

/**
 * A custom hook to manage all feedback-related state and interactions with localStorage.
 * This hook encapsulates logic for user authentication, CRUD operations on feedback items,
 * and management of AI analysis results. It is intended for client-side use only.
 *
 * @returns {{
 *  isMounted: boolean;
 *  currentUser: string | null;
 *  userFeedback: FeedbackItem[];
 *  analysisResults: Record<string, ReviewFeedbackOutput>;
 *  login: (username: string, type: 'login' | 'signup') => void;
 *  logout: () => void;
 *  addFeedback: (title: string, content: string) => boolean;
 *  deleteFeedback: (feedbackId: string) => void;
 *  saveAnalysis: (feedbackId: string, analysis: ReviewFeedbackOutput) => void;
 * }} An object containing the state and action dispatchers for the feedback system.
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

    if (type === 'login') {
      toast({ title: 'Logged In', description: `Welcome back, ${username}!` });
    } else {
      toast({ title: 'Signed Up', description: `Welcome, ${username}!` });
    }
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
      const allUsersFeedback = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.USERS_FEEDBACK) || '{}');
      let currentUserSpecificFeedback = allUsersFeedback[currentUser] || [];
      const updatedFeedback = currentUserSpecificFeedback.filter((item: FeedbackItem) => item.id !== feedbackId);
      allUsersFeedback[currentUser] = updatedFeedback;
      localStorage.setItem(LOCAL_STORAGE_KEYS.USERS_FEEDBACK, JSON.stringify(allUsersFeedback));
      setUserFeedback(updatedFeedback);

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
