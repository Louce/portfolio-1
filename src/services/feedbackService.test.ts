import { describe, it, expect, beforeEach, vi } from 'vitest';
import { feedbackService } from './feedbackService';
import { LOCAL_STORAGE_KEYS } from '@/lib/constants';
import type { ReviewFeedbackOutput } from '@/ai/flows';

// A simple in-memory store to mock localStorage
let store: Record<string, string> = {};

const localStorageMock = {
  getItem: vi.fn((key: string) => store[key] || null),
  setItem: vi.fn((key: string, value: string) => {
    store[key] = value.toString();
  }),
  removeItem: vi.fn((key: string) => {
    delete store[key];
  }),
  clear: vi.fn(() => {
    store = {};
  }),
};

// Replace the global localStorage with our mock
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('feedbackService', () => {
  beforeEach(() => {
    // Clear the mock store and spies before each test
    store = {};
    vi.clearAllMocks();
  });

  // Test User Management
  describe('User Management', () => {
    it('should login a user and set them as current', () => {
      const username = 'testuser';
      feedbackService.loginUser(username);
      expect(localStorage.setItem).toHaveBeenCalledWith(LOCAL_STORAGE_KEYS.LOGGED_IN_USER, username);
      
      const currentUser = feedbackService.getCurrentUser();
      expect(localStorage.getItem).toHaveBeenCalledWith(LOCAL_STORAGE_KEYS.LOGGED_IN_USER);
      expect(currentUser).toBe(username);
    });

    it('should logout a user', () => {
      const username = 'testuser';
      feedbackService.loginUser(username);
      feedbackService.logoutUser();
      expect(localStorage.removeItem).toHaveBeenCalledWith(LOCAL_STORAGE_KEYS.LOGGED_IN_USER);
      
      const currentUser = feedbackService.getCurrentUser();
      expect(currentUser).toBeNull();
    });
  });

  // Test Feedback Management
  describe('Feedback Management', () => {
    const username = 'feedback_tester';
    
    it('should add feedback for a user', () => {
      const newItem = feedbackService.addFeedbackForUser(username, 'Test Title', 'Test Content');
      
      expect(newItem.title).toBe('Test Title');
      expect(newItem.content).toBe('Test Content');
      expect(newItem.submitter).toBe(username);
      
      const userFeedback = feedbackService.getFeedbackForUser(username);
      expect(userFeedback).toHaveLength(1);
      expect(userFeedback[0]).toEqual(newItem);
    });

    it('should return an empty array for a user with no feedback', () => {
      const userFeedback = feedbackService.getFeedbackForUser('no_feedback_user');
      expect(userFeedback).toEqual([]);
    });

    it('should delete feedback for a user', () => {
      const newItem = feedbackService.addFeedbackForUser(username, 'To Be Deleted', 'Content');
      
      let userFeedback = feedbackService.getFeedbackForUser(username);
      expect(userFeedback).toHaveLength(1);

      const updatedFeedback = feedbackService.deleteFeedbackForUser(username, newItem.id);
      expect(updatedFeedback).toHaveLength(0);

      userFeedback = feedbackService.getFeedbackForUser(username);
      expect(userFeedback).toHaveLength(0);
    });
  });

  // Test AI Analysis Management
  describe('AI Analysis Management', () => {
    const feedbackId = 'fb_123';
    const analysis: ReviewFeedbackOutput = {
      sentiment: 'Positive',
      summary: 'A positive review.',
      suggestedAction: 'Thank the user.',
    };

    it('should save an analysis result', () => {
      feedbackService.saveAnalysisResult(feedbackId, analysis);
      const allResults = feedbackService.getAnalysisResults();

      expect(allResults[feedbackId]).toBeDefined();
      expect(allResults[feedbackId]).toEqual(analysis);
    });

    it('should return empty object if no analyses are saved', () => {
      const allResults = feedbackService.getAnalysisResults();
      expect(allResults).toEqual({});
    });

    it('should delete an analysis result', () => {
      feedbackService.saveAnalysisResult(feedbackId, analysis);
      let allResults = feedbackService.getAnalysisResults();
      expect(allResults[feedbackId]).toBeDefined();

      const updatedResults = feedbackService.deleteAnalysisResult(feedbackId);
      expect(updatedResults[feedbackId]).toBeUndefined();

      allResults = feedbackService.getAnalysisResults();
      expect(allResults[feedbackId]).toBeUndefined();
    });
  });
});
