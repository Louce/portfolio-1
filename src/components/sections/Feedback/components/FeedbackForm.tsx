'use client';

import React, { useState, FormEvent } from 'react';
import { Button, Input, Textarea, Card, CardContent, CardHeader, CardTitle, Avatar, AvatarFallback, AvatarImage, Alert, AlertTitle, AlertDescription } from '@/components/ui';
import { Flex, Text, Box } from '@/components/primitives';
import { LogOut, MessageSquarePlus } from 'lucide-react';

/**
 * Props for the FeedbackForm component.
 */
interface FeedbackFormProps {
  /** The username of the currently logged-in user. */
  currentUser: string;
  /** Callback function to handle user logout. */
  onLogout: () => void;
  /**
   * Callback function to handle adding new feedback.
   * @param {string} title - The title of the feedback.
   * @param {string} content - The main content of the feedback.
   * @returns {boolean} True if the feedback was added successfully, otherwise false.
   */
  onAddFeedback: (title: string, content: string) => boolean;
}

/**
 * A component for authenticated users to submit new feedback.
 * Its single responsibility is to provide the UI for creating new feedback entries.
 * It includes a welcome message with the user's avatar, a form for the feedback
 * title and content, and a logout button. It uses the `Alert` component to
 * consistently and clearly communicate its demo nature to the user.
 *
 * @param {FeedbackFormProps} props - The properties for the component.
 * @returns {React.ReactElement} The feedback submission form component.
 */
export const FeedbackForm: React.FC<FeedbackFormProps> = ({ currentUser, onLogout, onAddFeedback }) => {
  const [feedbackTitle, setFeedbackTitle] = useState('');
  const [feedbackContent, setFeedbackContent] = useState('');

  /**
   * Handles the form submission for adding new feedback.
   * @param {FormEvent} e - The form submission event.
   */
  const handleAddFeedback = (e: FormEvent) => {
    e.preventDefault();
    const success = onAddFeedback(feedbackTitle, feedbackContent);
    if (success) {
      setFeedbackTitle('');
      setFeedbackContent('');
    }
  };

  return (
    <>
      <Flex justify="between" align="center" className="w-full px-4">
        <Flex align="center" gap={3}>
          <Avatar>
            <AvatarImage src={`https://api.dicebear.com/8.x/bottts-neutral/svg?seed=${currentUser}`} alt={`Avatar for ${currentUser}`} />
            <AvatarFallback>{currentUser.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
          <Text as="h3" className="text-2xl md:text-3xl font-semibold text-primary">Welcome, {currentUser}!</Text>
        </Flex>
        <Button variant="outline" onClick={onLogout} className="border-accent text-accent hover:bg-accent hover:text-accent-foreground" aria-label="Log out">
          <LogOut className="mr-2 h-4 w-4" /> Logout
        </Button>
      </Flex>

      <Box className="w-full max-w-3xl mx-auto px-4">
        <Alert variant="info">
          <AlertTitle>Demo Notice</AlertTitle>
          <AlertDescription>
            This feedback feature is for demonstration purposes. All data is stored only in your browser's local storage and is not sent to a server.
          </AlertDescription>
        </Alert>
      </Box>

      <Card className="w-full max-w-2xl mx-auto bg-card/70 backdrop-blur-md border border-border/30">
        <CardHeader>
          <CardTitle className="text-xl text-primary flex items-center"><MessageSquarePlus className="mr-2" /> Submit New Feedback</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddFeedback} className="space-y-4">
            <Input
              id="feedbackTitle"
              name="feedbackTitle"
              type="text"
              placeholder="Feedback Title (Optional)"
              value={feedbackTitle}
              onChange={(e) => setFeedbackTitle(e.target.value)}
              className="bg-background/50 focus:bg-background"
              aria-label="Feedback Title"
            />
            <Textarea
              id="feedbackContent"
              name="feedbackContent"
              placeholder="Your Feedback..."
              value={feedbackContent}
              onChange={(e) => setFeedbackContent(e.target.value)}
              className="min-h-[100px] bg-background/50 focus:bg-background"
              aria-label="Feedback Content"
              required
            />
            <Button type="submit" className="bg-accent hover:bg-accent/90 text-accent-foreground" aria-label="Submit new feedback">Submit Feedback</Button>
          </form>
        </CardContent>
      </Card>
    </>
  );
};
