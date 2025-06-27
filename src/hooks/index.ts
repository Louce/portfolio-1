/**
 * @fileoverview Barrel file for exporting all custom hooks.
 * This provides a single, clean entry point for importing hooks
 * into the application's components.
 */

export { useVisitorLocation } from './use-visitor-location';
export { useFeedbackStore } from './use-feedback-store';
export type { FeedbackItem } from '@/services/feedbackService';
