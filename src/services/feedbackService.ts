'use client';

/**
 * @fileOverview
 * This service module encapsulates all data persistence logic for the feedback feature.
 * Currently, it uses localStorage as a mock database. This abstraction allows for
 * an easy swap to a real database (like Firestore) in the future without changing
 * the application's UI or state management hooks.
 */

import { LOCAL_STORAGE_KEYS } from '@/lib/constants';
import type { ReviewFeedbackOutput } from '@/ai/flows';

/**
 * Represents a single feedback item.
 * This is the canonical data model for feedback.
 */
export interface FeedbackItem {
  id: string;
  title: string;
  content: string;
  submitter: string;
  timestamp: number;
}

/**
* Helper function to safely parse JSON from localStorage.
* @param key The localStorage key.
* @param fallback The fallback value if parsing fails or window is not defined.
* @returns The parsed data or the fallback value.
*/
const safeJsonParse = <T>(key: string, fallback: T): T => {
  if (typeof window === 'undefined') {
    return fallback;
  }
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (error) {
    console.error(`Error parsing JSON from localStorage key "${key}":`, error);
    return fallback;
  }
};

// --- User Management ---

/**
* Retrieves the currently logged-in user from localStorage.
* @returns The username, or null if not logged in.
*/
export const getCurrentUser = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(LOCAL_STORAGE_KEYS.LOGGED_IN_USER);
};

/**
* Saves the logged-in user to localStorage.
* @param username The username to save.
*/
export const loginUser = (username: string): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(LOCAL_STORAGE_KEYS.LOGGED_IN_USER, username);
  }
};

/**
* Removes the logged-in user from localStorage.
*/
export const logoutUser = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(LOCAL_STORAGE_KEYS.LOGGED_IN_USER);
  }
};

// --- Feedback Management ---

/**
* Retrieves all feedback for a specific user.
* @param username The user whose feedback to retrieve.
* @returns An array of feedback items.
*/
export const getFeedbackForUser = (username: string): FeedbackItem[] => {
  const allFeedback = safeJsonParse<Record<string, FeedbackItem[]>>(LOCAL_STORAGE_KEYS.USERS_FEEDBACK, {});
  return allFeedback[username] || [];
};

/**
* Adds a new feedback item for a user.
* @param username The user submitting the feedback.
* @param title The title of the feedback.
* @param content The content of the feedback.
* @returns The newly created feedback item.
*/
export const addFeedbackForUser = (username: string, title: string, content: string): FeedbackItem => {
  const allFeedback = safeJsonParse<Record<string, FeedbackItem[]>>(LOCAL_STORAGE_KEYS.USERS_FEEDBACK, {});
  const userFeedback = allFeedback[username] || [];
  
  const newFeedbackItem: FeedbackItem = {
    id: Date.now().toString(),
    title: title.trim() || 'General Feedback',
    content,
    submitter: username,
    timestamp: Date.now(),
  };

  allFeedback[username] = [newFeedbackItem, ...userFeedback];
  localStorage.setItem(LOCAL_STORAGE_KEYS.USERS_FEEDBACK, JSON.stringify(allFeedback));
  return newFeedbackItem;
};

/**
* Deletes a specific feedback item for a user.
* @param username The user who owns the feedback.
* @param feedbackId The ID of the feedback item to delete.
* @returns The updated array of feedback items for the user.
*/
export const deleteFeedbackForUser = (username: string, feedbackId: string): FeedbackItem[] => {
  const allFeedback = safeJsonParse<Record<string, FeedbackItem[]>>(LOCAL_STORAGE_KEYS.USERS_FEEDBACK, {});
  let userFeedback = allFeedback[username] || [];
  
  userFeedback = userFeedback.filter(item => item.id !== feedbackId);
  
  allFeedback[username] = userFeedback;
  localStorage.setItem(LOCAL_STORAGE_KEYS.USERS_FEEDBACK, JSON.stringify(allFeedback));
  return userFeedback;
};


// --- AI Analysis Management ---

/**
* Retrieves all saved AI analysis results.
* @returns A record of analysis results keyed by feedback ID.
*/
export const getAnalysisResults = (): Record<string, ReviewFeedbackOutput> => {
  return safeJsonParse<Record<string, ReviewFeedbackOutput>>(LOCAL_STORAGE_KEYS.AI_ANALYSIS, {});
};

/**
* Saves a new AI analysis result for a feedback item.
* @param feedbackId The ID of the feedback item.
* @param analysis The analysis result object to save.
* @returns The updated record of all analysis results.
*/
export const saveAnalysisResult = (feedbackId: string, analysis: ReviewFeedbackOutput): Record<string, ReviewFeedbackOutput> => {
  const allResults = getAnalysisResults();
  const newResults = { ...allResults, [feedbackId]: analysis };
  localStorage.setItem(LOCAL_STORAGE_KEYS.AI_ANALYSIS, JSON.stringify(newResults));
  return newResults;
};

/**
* Deletes the AI analysis result associated with a feedback item.
* @param feedbackId The ID of the feedback item whose analysis should be deleted.
* @returns The updated record of all analysis results.
*/
export const deleteAnalysisResult = (feedbackId: string): Record<string, ReviewFeedbackOutput> => {
  const allResults = getAnalysisResults();
  const newResults = { ...allResults };
  delete newResults[feedbackId];
  localStorage.setItem(LOCAL_STORAGE_KEYS.AI_ANALYSIS, JSON.stringify(newResults));
  return newResults;
};
