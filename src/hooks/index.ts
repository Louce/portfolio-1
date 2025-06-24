/**
 * @fileoverview Barrel file for exporting all custom hooks and related types.
 * This also re-exports key types from the service layer to provide a unified
 * public API for the presentation layer.
 */

export { useVisitorLocation } from './use-visitor-location';
export { useFeedbackStore } from './use-feedback-store';
export type { FeedbackItem } from '@/services/feedbackService';
