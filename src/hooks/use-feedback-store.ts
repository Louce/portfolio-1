'use client';

import { useEffect, useReducer, useCallback } from 'react';
import { useToast } from "@/components/ui/use-toast";
import type { ReviewFeedbackOutput } from '@/ai/flows';
import { feedbackService } from '@/services';
import type { FeedbackItem } from '@/services/feedbackService';

// 1. Define State Shape
interface FeedbackState {
  isMounted: boolean;
  currentUser: string | null;
  userFeedback: FeedbackItem[];
  analysisResults: Record<string, ReviewFeedbackOutput>;
}

// 2. Define Action Types and Payloads
type FeedbackAction =
  | { type: 'INITIALIZE'; payload: { user: string | null; feedback: FeedbackItem[]; analysis: Record<string, ReviewFeedbackOutput> } }
  | { type: 'LOGIN'; payload: { username: string; feedback: FeedbackItem[] } }
  | { type: 'LOGOUT' }
  | { type: 'ADD_FEEDBACK'; payload: FeedbackItem }
  | { type: 'DELETE_FEEDBACK'; payload: { updatedFeedback: FeedbackItem[]; updatedAnalysis: Record<string, ReviewFeedbackOutput> } }
  | { type: 'SAVE_ANALYSIS'; payload: Record<string, ReviewFeedbackOutput> };

// 3. Define the Initial State
const initialState: FeedbackState = {
  isMounted: false,
  currentUser: null,
  userFeedback: [],
  analysisResults: {},
};

// 4. Create the Reducer Function
const feedbackReducer = (state: FeedbackState, action: FeedbackAction): FeedbackState => {
  switch (action.type) {
    case 'INITIALIZE':
      return {
        ...state,
        isMounted: true,
        currentUser: action.payload.user,
        userFeedback: action.payload.feedback,
        analysisResults: action.payload.analysis,
      };
    case 'LOGIN':
      return {
        ...state,
        currentUser: action.payload.username,
        userFeedback: action.payload.feedback,
      };
    case 'LOGOUT':
      return {
        ...state,
        currentUser: null,
        userFeedback: [],
      };
    case 'ADD_FEEDBACK':
      return {
        ...state,
        userFeedback: [action.payload, ...state.userFeedback],
      };
    case 'DELETE_FEEDBACK':
      return {
        ...state,
        userFeedback: action.payload.updatedFeedback,
        analysisResults: action.payload.updatedAnalysis,
      };
    case 'SAVE_ANALYSIS':
      return {
        ...state,
        analysisResults: action.payload,
      };
    default:
      return state;
  }
};

/**
 * A custom hook to manage all client-side state for the feedback feature, now refactored
 * to use a reducer for more robust state management.
 * This hook is a powerful example of Separation of Concerns. Its one responsibility
 * is to act as a bridge between the UI components and the `feedbackService`. It
 * manages React state (`useReducer`) and triggers re-renders, while
 * all the logic for *how* the data is stored and retrieved is handled by the service.
 *
 * @returns An object containing the state and action dispatchers for the feedback system.
 */
export const useFeedbackStore = () => {
  const { toast } = useToast();
  const [state, dispatch] = useReducer(feedbackReducer, initialState);

  useEffect(() => {
    // This effect runs once on mount to initialize state from the persistence layer (service).
    const user = feedbackService.getCurrentUser();
    const feedback = user ? feedbackService.getFeedbackForUser(user) : [];
    const analysis = feedbackService.getAnalysisResults();
    dispatch({ type: 'INITIALIZE', payload: { user, feedback, analysis } });
  }, []);

  const login = useCallback((username: string, type: 'login' | 'signup') => {
    feedbackService.loginUser(username);
    const feedback = feedbackService.getFeedbackForUser(username);
    dispatch({ type: 'LOGIN', payload: { username, feedback } });
    toast({ title: type === 'login' ? 'Logged In' : 'Signed Up', description: `Welcome, ${username}!` });
  }, [toast]);

  const logout = useCallback(() => {
    feedbackService.logoutUser();
    dispatch({ type: 'LOGOUT' });
    toast({ title: 'Logged Out', description: 'You have been successfully logged out.' });
  }, [toast]);

  const addFeedback = useCallback((title: string, content: string): boolean => {
    if (!content.trim() || !state.currentUser) {
      if (!content.trim()) {
        toast({ title: 'Error', description: 'Feedback content cannot be empty.', variant: 'destructive' });
      }
      return false;
    }
    try {
      const newFeedbackItem = feedbackService.addFeedbackForUser(state.currentUser, title, content);
      dispatch({ type: 'ADD_FEEDBACK', payload: newFeedbackItem });
      toast({ title: 'Feedback Submitted', description: 'Thank you for your feedback!' });
      return true;
    } catch (error) {
      console.error("Failed to add feedback via service:", error);
      toast({ title: 'Error', description: 'Could not save your feedback.', variant: 'destructive' });
      return false;
    }
  }, [state.currentUser, toast]);

  const deleteFeedback = useCallback((feedbackId: string) => {
    if (!state.currentUser || !feedbackId) return;
    try {
      const updatedFeedback = feedbackService.deleteFeedbackForUser(state.currentUser, feedbackId);
      const updatedAnalysis = feedbackService.deleteAnalysisResult(feedbackId);
      dispatch({ type: 'DELETE_FEEDBACK', payload: { updatedFeedback, updatedAnalysis } });
      toast({ title: 'Feedback Deleted', description: 'The feedback item has been removed.' });
    } catch (error) {
      console.error("Failed to delete feedback via service:", error);
      toast({ title: 'Error', description: 'Could not delete the feedback item.', variant: 'destructive' });
    }
  }, [state.currentUser, toast]);

  const saveAnalysis = useCallback((feedbackId: string, analysis: ReviewFeedbackOutput) => {
    try {
      const newResults = feedbackService.saveAnalysisResult(feedbackId, analysis);
      dispatch({ type: 'SAVE_ANALYSIS', payload: newResults });
    } catch (error) {
      console.error("Failed to save AI analysis via service:", error);
      toast({ title: 'Error', description: 'Could not save the AI analysis.', variant: 'destructive' });
    }
  }, [toast]);

  return {
    isMounted: state.isMounted,
    currentUser: state.currentUser,
    userFeedback: state.userFeedback,
    analysisResults: state.analysisResults,
    login,
    logout,
    addFeedback,
    deleteFeedback,
    saveAnalysis,
  };
};
