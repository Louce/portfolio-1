/**
 * @fileOverview
 * This file contains centralized constants used throughout the application.
 * Using a constants file helps prevent "magic strings" and typos, making the
 * code more maintainable and easier to refactor.
 */

/**
 * A collection of keys used for storing data in the browser's localStorage.
 * This provides a single source of truth for all storage keys, ensuring
 * consistency between the service layer that writes the data and any other
 * part of the app that might need to read it.
 */
export const LOCAL_STORAGE_KEYS = {
  /** The key for storing the currently logged-in user's name. */
  LOGGED_IN_USER: 'kineticfolio_loggedInUser_feedback',
  /** The key for storing all feedback from all users, keyed by username. */
  USERS_FEEDBACK: 'kineticfolio_usersFeedback',
  /** The key for storing AI analysis results, keyed by feedback ID. */
  AI_ANALYSIS: 'kineticfolio_ai_analysis',
};
