
'use client';

import React, { useState, FormEvent } from 'react';
import { Button, Input, Textarea, Card, CardContent, CardHeader, CardTitle, Avatar, AvatarFallback, AvatarImage } from '@/components/ui';
import { Flex, Text, Box } from '@/components/primitives';
import { LogOut, MessageSquarePlus } from 'lucide-react';

interface FeedbackFormProps {
  currentUser: string;
  onLogout: () => void;
  onAddFeedback: (title: string, content: string) => boolean;
}

export const FeedbackForm: React.FC<FeedbackFormProps> = ({ currentUser, onLogout, onAddFeedback }) => {
  const [feedbackTitle, setFeedbackTitle] = useState('');
  const [feedbackContent, setFeedbackContent] = useState('');

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
            <AvatarImage src={`https://api.dicebear.com/8.x/bottts-neutral/svg?seed=${currentUser}`} alt={currentUser} />
            <AvatarFallback>{currentUser.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
          <Text as="h3" className="text-2xl md:text-3xl font-semibold text-primary">Welcome, {currentUser}!</Text>
        </Flex>
        <Button variant="outline" onClick={onLogout} className="border-accent text-accent hover:bg-accent hover:text-accent-foreground">
          <LogOut className="mr-2 h-4 w-4" /> Logout
        </Button>
      </Flex>

      <Box className="w-full max-w-3xl mx-auto px-4">
        <Text className="text-sm text-center text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/30 border border-yellow-600/50 dark:border-yellow-400/50 rounded-md p-2">
          ⚠️ **DEMO NOTICE:** This feedback feature is for demonstration purposes only. No real accounts are created, and feedback is stored only in your browser's local storage.
        </Text>
      </Box>

      <Card className="w-full max-w-2xl mx-auto bg-card/70 backdrop-blur-md border border-border/30">
        <CardHeader>
          <CardTitle className="text-xl text-primary flex items-center"><MessageSquarePlus className="mr-2" /> Submit New Feedback</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddFeedback} className="space-y-4">
            <Input
              type="text"
              placeholder="Feedback Title (Optional)"
              value={feedbackTitle}
              onChange={(e) => setFeedbackTitle(e.target.value)}
              className="bg-background/50 focus:bg-background"
              aria-label="Feedback Title"
            />
            <Textarea
              placeholder="Your Feedback..."
              value={feedbackContent}
              onChange={(e) => setFeedbackContent(e.target.value)}
              className="min-h-[100px] bg-background/50 focus:bg-background"
              aria-label="Feedback Content"
              required
            />
            <Button type="submit" className="bg-accent hover:bg-accent/90 text-accent-foreground">Submit Feedback</Button>
          </form>
        </CardContent>
      </Card>
    </>
  );
};
