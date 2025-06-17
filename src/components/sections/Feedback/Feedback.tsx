
'use client';

import React, { useState, useEffect, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { SectionWrapper } from '@/components/layout';
import { Flex, Text, Box } from '@/components/primitives';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { UserPlus, LogIn, LogOut, MessageSquarePlus, MessageSquareText, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface FeedbackItem {
  id: string;
  title: string; // Optional: Title for feedback
  content: string;
  submitter: string;
  timestamp: number;
}

type ViewState = 'login' | 'signup' | 'manageFeedback';

const LOCAL_STORAGE_KEYS = {
  LOGGED_IN_USER: 'kineticfolio_loggedInUser_feedback',
  USERS_FEEDBACK: 'kineticfolio_usersFeedback', 
};

export const Feedback: React.FC = () => {
  const { toast } = useToast();
  const [isMounted, setIsMounted] = useState(false);
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [view, setView] = useState<ViewState>('login');

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState(''); // Note: Password is not stored or validated securely.

  const [feedbackTitle, setFeedbackTitle] = useState('');
  const [feedbackContent, setFeedbackContent] = useState('');
  const [userFeedback, setUserFeedback] = useState<FeedbackItem[]>([]);

  useEffect(() => {
    setIsMounted(true);
    const storedUser = localStorage.getItem(LOCAL_STORAGE_KEYS.LOGGED_IN_USER);
    if (storedUser) {
      setCurrentUser(storedUser);
      setView('manageFeedback');
    }
  }, []);

  useEffect(() => {
    if (currentUser && isMounted) {
      const allUsersFeedback = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.USERS_FEEDBACK) || '{}');
      setUserFeedback(allUsersFeedback[currentUser] || []);
    } else {
      setUserFeedback([]);
    }
  }, [currentUser, isMounted]);

  const handleAuthSubmit = (e: FormEvent, authType: 'login' | 'signup') => {
    e.preventDefault();
    if (!username.trim()) {
      toast({ title: 'Error', description: 'Username cannot be empty.', variant: 'destructive' });
      return;
    }
    setCurrentUser(username);
    localStorage.setItem(LOCAL_STORAGE_KEYS.LOGGED_IN_USER, username);
    setView('manageFeedback');
    
    if (authType === 'login') {
      toast({ title: 'Logged In', description: `Welcome back, ${username}!`});
    } else {
      toast({ title: 'Signed Up', description: `Welcome, ${username}!`});
    }
    setUsername('');
    setPassword('');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem(LOCAL_STORAGE_KEYS.LOGGED_IN_USER);
    setView('login');
    toast({ title: 'Logged Out', description: 'You have been successfully logged out.' });
  };

  const handleAddFeedback = (e: FormEvent) => {
    e.preventDefault();
    if (!feedbackContent.trim() || !currentUser) {
       toast({ title: 'Error', description: 'Feedback content cannot be empty.', variant: 'destructive' });
      return;
    }

    const newFeedbackItem: FeedbackItem = {
      id: Date.now().toString(),
      title: feedbackTitle.trim() || "General Feedback", // Default title if none provided
      content: feedbackContent,
      submitter: currentUser,
      timestamp: Date.now(),
    };

    const allUsersFeedback = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.USERS_FEEDBACK) || '{}');
    const currentUserSpecificFeedback = allUsersFeedback[currentUser] || [];
    const updatedFeedback = [newFeedbackItem, ...currentUserSpecificFeedback];
    allUsersFeedback[currentUser] = updatedFeedback;

    localStorage.setItem(LOCAL_STORAGE_KEYS.USERS_FEEDBACK, JSON.stringify(allUsersFeedback));
    setUserFeedback(updatedFeedback);
    setFeedbackTitle('');
    setFeedbackContent('');
    toast({ title: 'Feedback Submitted', description: 'Thank you for your feedback!' });
  };

  const handleDeleteFeedback = (feedbackId: string) => {
    if (!currentUser) return;
    
    const allUsersFeedback = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.USERS_FEEDBACK) || '{}');
    let currentUserSpecificFeedback = allUsersFeedback[currentUser] || [];
    const updatedFeedback = currentUserSpecificFeedback.filter((item: FeedbackItem) => item.id !== feedbackId);
    allUsersFeedback[currentUser] = updatedFeedback;

    localStorage.setItem(LOCAL_STORAGE_KEYS.USERS_FEEDBACK, JSON.stringify(allUsersFeedback));
    setUserFeedback(updatedFeedback);
    toast({ title: 'Feedback Deleted', description: 'The feedback item has been removed.' });
  };
  
  if (!isMounted) {
    return (
      <SectionWrapper id="feedback" className="bg-gradient-to-br from-background to-slate-900/60">
        <Flex align="center" justify="center" className="h-full">
          <Text>Loading Feedback Section...</Text>
        </Flex>
      </SectionWrapper>
    );
  }

  const renderAuthForm = (authType: 'login' | 'signup') => (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
      <Card className="bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-primary flex items-center">
            {authType === 'login' ? <LogIn className="mr-2" /> : <UserPlus className="mr-2" />}
            {authType === 'login' ? 'Login to Submit Feedback' : 'Sign Up to Submit Feedback'}
          </CardTitle>
          <CardDescription>
            {authType === 'login' ? 'Access your feedback dashboard.' : 'Create an account to manage your feedback.'}
            <br/> (This is a demo, no real accounts are created.)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={(e) => handleAuthSubmit(e, authType)} className="space-y-4">
            <Input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              aria-label="Username"
              className="bg-background/50 focus:bg-background"
            />
            <Input
              type="password"
              placeholder="Password (demo only)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              aria-label="Password"
              className="bg-background/50 focus:bg-background"
            />
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
              {authType === 'login' ? 'Login' : 'Sign Up'}
            </Button>
          </form>
          <Flex justify="center" className="mt-6">
            <Button variant="link" onClick={() => setView(authType === 'login' ? 'signup' : 'login')}>
              {authType === 'login' ? 'Need an account? Sign Up' : 'Already have an account? Login'}
            </Button>
          </Flex>
        </CardContent>
      </Card>
    </motion.div>
  );

  const renderManageFeedback = () => (
    <Flex direction="col" className="w-full h-full space-y-8 pt-12 pb-8 md:pt-16">
      <Flex justify="between" align="center" className="w-full px-4">
        <Text as="h3" className="text-2xl md:text-3xl font-semibold text-primary">Welcome, {currentUser}!</Text>
        <Button variant="outline" onClick={handleLogout} className="border-accent text-accent hover:bg-accent hover:text-accent-foreground">
          <LogOut className="mr-2 h-4 w-4" /> Logout
        </Button>
      </Flex>

      <Card className="w-full max-w-2xl mx-auto bg-card/80 backdrop-blur-sm">
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

      <Box className="w-full max-w-3xl mx-auto space-y-4">
        <Text as="h4" className="text-xl md:text-2xl font-semibold text-primary flex items-center px-4"><MessageSquareText className="mr-2" /> Your Submitted Feedback</Text>
        {userFeedback.length === 0 ? (
          <Text className="text-muted-foreground px-4">You haven't submitted any feedback yet.</Text>
        ) : (
          <Box className="space-y-4 max-h-[calc(100vh-400px)] md:max-h-[calc(100vh-450px)] overflow-y-auto pr-2 pl-4 pb-4">
            {userFeedback.map(item => (
              <motion.div key={item.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{duration: 0.3}}>
                <Card className="bg-card/70">
                  <CardHeader>
                    <Flex justify="between" align="start">
                      <Box>
                        <CardTitle className="text-lg text-foreground">{item.title}</CardTitle>
                        <CardDescription className="text-xs text-muted-foreground">
                          Submitted: {new Date(item.timestamp).toLocaleString()}
                        </CardDescription>
                      </Box>
                      <Button variant="ghost" size="icon" onClick={() => handleDeleteFeedback(item.id)} aria-label="Delete feedback item" className="text-destructive hover:text-destructive/80 hover:bg-destructive/10">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </Flex>
                  </CardHeader>
                  <CardContent>
                    <Text className="text-sm text-foreground/90 whitespace-pre-wrap">{item.content}</Text>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </Box>
        )}
      </Box>
    </Flex>
  );

  return (
    <SectionWrapper id="feedback" className="bg-gradient-to-br from-background to-slate-900/60 overflow-y-auto">
      <Flex direction="col" align="center" justify="start" className="h-auto min-h-full w-full py-8">
        {!currentUser && view === 'login' && renderAuthForm('login')}
        {!currentUser && view === 'signup' && renderAuthForm('signup')}
        {currentUser && view === 'manageFeedback' && renderManageFeedback()}
      </Flex>
    </SectionWrapper>
  );
};

Feedback.displayName = 'FeedbackSection';
