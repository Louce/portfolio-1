
'use client';

import React, { useState, useEffect, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { SectionWrapper } from '@/components/layout';
import { Flex, Text, Box } from '@/components/primitives';
import { Button, Input, Textarea, Card, CardContent, CardHeader, CardTitle, CardDescription, Badge, AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, Avatar, AvatarFallback, AvatarImage } from '@/components/ui';
import { UserPlus, LogIn, LogOut, MessageSquarePlus, MessageSquareText, Trash2, Sparkles, Loader2, AlertTriangle } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import { reviewFeedback, type ReviewFeedbackOutput } from '@/ai/flows/review-feedback-flow';

interface FeedbackItem {
  id: string;
  title: string; 
  content: string;
  submitter: string;
  timestamp: number;
}

type ViewState = 'login' | 'signup' | 'manageFeedback';

const LOCAL_STORAGE_KEYS = {
  LOGGED_IN_USER: 'kineticfolio_loggedInUser_feedback',
  USERS_FEEDBACK: 'kineticfolio_usersFeedback', 
  AI_ANALYSIS: 'kineticfolio_ai_analysis',
};

export const Feedback: React.FC = () => {
  const { toast } = useToast();
  const [isMounted, setIsMounted] = useState(false);
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [view, setView] = useState<ViewState>('login');

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState(''); 

  const [feedbackTitle, setFeedbackTitle] = useState('');
  const [feedbackContent, setFeedbackContent] = useState('');
  const [userFeedback, setUserFeedback] = useState<FeedbackItem[]>([]);

  const [analyzingId, setAnalyzingId] = useState<string | null>(null);
  const [analysisResults, setAnalysisResults] = useState<Record<string, ReviewFeedbackOutput>>({});
  const [feedbackToDelete, setFeedbackToDelete] = useState<string | null>(null);

  useEffect(() => {
    setIsMounted(true);
    const storedUser = localStorage.getItem(LOCAL_STORAGE_KEYS.LOGGED_IN_USER);
    if (storedUser) {
      setCurrentUser(storedUser);
      setView('manageFeedback');
      const storedAnalysis = localStorage.getItem(LOCAL_STORAGE_KEYS.AI_ANALYSIS);
      if (storedAnalysis) {
        setAnalysisResults(JSON.parse(storedAnalysis));
      }
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
      title: feedbackTitle.trim() || "General Feedback", 
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

  const confirmDeleteFeedback = () => {
    if (!currentUser || !feedbackToDelete) return;
    
    const allUsersFeedback = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.USERS_FEEDBACK) || '{}');
    let currentUserSpecificFeedback = allUsersFeedback[currentUser] || [];
    const updatedFeedback = currentUserSpecificFeedback.filter((item: FeedbackItem) => item.id !== feedbackToDelete);
    allUsersFeedback[currentUser] = updatedFeedback;

    localStorage.setItem(LOCAL_STORAGE_KEYS.USERS_FEEDBACK, JSON.stringify(allUsersFeedback));
    setUserFeedback(updatedFeedback);
    toast({ title: 'Feedback Deleted', description: 'The feedback item has been removed.' });

    const newAnalysisResults = { ...analysisResults };
    delete newAnalysisResults[feedbackToDelete];
    setAnalysisResults(newAnalysisResults);
    localStorage.setItem(LOCAL_STORAGE_KEYS.AI_ANALYSIS, JSON.stringify(newAnalysisResults));
    setFeedbackToDelete(null);
  };
  
  const handleAiReview = async (item: FeedbackItem) => {
    if (analyzingId) return;

    setAnalyzingId(item.id);
    try {
      const result = await reviewFeedback({ feedbackText: item.content });
      const newResults = { ...analysisResults, [item.id]: result };
      setAnalysisResults(newResults);
      localStorage.setItem(LOCAL_STORAGE_KEYS.AI_ANALYSIS, JSON.stringify(newResults));
      toast({ title: "AI Analysis Complete", description: "Review generated successfully." });
    } catch (error) {
      console.error("AI analysis failed:", error);
      toast({ title: "AI Analysis Failed", description: "Could not get a response from the AI. Please try again.", variant: 'destructive' });
    } finally {
      setAnalyzingId(null);
    }
  };

  if (!isMounted) {
    return (
      <SectionWrapper id="feedback" className="bg-transparent">
        <Flex align="center" justify="center" className="h-full">
          <Text>Loading Feedback Section...</Text>
        </Flex>
      </SectionWrapper>
    );
  }

  const renderAuthForm = (authType: 'login' | 'signup') => (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
      <Card className="bg-card/70 backdrop-blur-md border border-border/30">
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

  const renderAnalysis = (analysis: ReviewFeedbackOutput) => {
    const sentimentVariant = {
      Positive: 'success',
      Neutral: 'secondary',
      Negative: 'destructive',
    }[analysis.sentiment] || 'default';
  
    return (
      <motion.div 
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 'auto' }}
        className="mt-4 border-t border-border/20 pt-4"
      >
        <Flex justify="between" align="center" className="mb-3">
          <Text as="h5" className="text-base font-semibold text-primary flex items-center"><Sparkles className="mr-2 h-4 w-4" />AI Review</Text>
          <Badge variant={sentimentVariant as any}>{analysis.sentiment}</Badge>
        </Flex>
        <Box className="space-y-2 text-sm">
          <Box>
            <Text as="p" className="font-medium text-foreground/80">Summary:</Text>
            <Text as="p" className="text-foreground/70">{analysis.summary}</Text>
          </Box>
          <Box>
            <Text as="p" className="font-medium text-foreground/80">Suggested Action:</Text>
            <Text as="p" className="text-foreground/70">{analysis.suggestedAction}</Text>
          </Box>
        </Box>
      </motion.div>
    );
  };

  const renderManageFeedback = () => (
    <AlertDialog onOpenChange={(open) => !open && setFeedbackToDelete(null)}>
      <Flex direction="col" className="w-full h-full space-y-8 pt-12 pb-8 md:pt-16">
        <Flex justify="between" align="center" className="w-full px-4">
          <Flex align="center" gap={3}>
            <Avatar>
              <AvatarImage src={`https://api.dicebear.com/8.x/bottts-neutral/svg?seed=${currentUser}`} alt={currentUser || 'User'} />
              <AvatarFallback>{currentUser?.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <Text as="h3" className="text-2xl md:text-3xl font-semibold text-primary">Welcome, {currentUser}!</Text>
          </Flex>
          <Button variant="outline" onClick={handleLogout} className="border-accent text-accent hover:bg-accent hover:text-accent-foreground">
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

        <Box className="w-full max-w-3xl mx-auto space-y-4">
          <Text as="h4" className="text-xl md:text-2xl font-semibold text-primary flex items-center px-4"><MessageSquareText className="mr-2" /> Your Submitted Feedback</Text>
          {userFeedback.length === 0 ? (
            <Text className="text-muted-foreground px-4">You haven't submitted any feedback yet.</Text>
          ) : (
            <Box className="space-y-4 max-h-[calc(100vh-400px)] md:max-h-[calc(100vh-450px)] overflow-y-auto pr-2 pl-4 pb-4">
              {userFeedback.map(item => (
                <motion.div key={item.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{duration: 0.3}}>
                  <Card className="bg-card/60 backdrop-blur-sm border border-border/20 overflow-hidden">
                    <CardContent className="p-4">
                      <Flex justify="between" align="start" className="mb-2">
                        <Box>
                          <CardTitle className="text-lg text-foreground">{item.title}</CardTitle>
                          <CardDescription className="text-xs text-muted-foreground">
                            Submitted: {new Date(item.timestamp).toLocaleString()}
                          </CardDescription>
                        </Box>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="icon" onClick={() => setFeedbackToDelete(item.id)} aria-label="Delete feedback item" className="text-destructive hover:text-destructive/80 hover:bg-destructive/10">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                      </Flex>
                      <Text className="text-sm text-foreground/90 whitespace-pre-wrap">{item.content}</Text>
                      {analysisResults[item.id] ? (
                        renderAnalysis(analysisResults[item.id])
                      ) : (
                        <Flex justify="end" className="mt-4">
                          <Button 
                            variant="outline"
                            size="sm"
                            onClick={() => handleAiReview(item)} 
                            disabled={!!analyzingId}
                            className="text-primary border-primary/50 hover:bg-primary/10 hover:text-primary"
                          >
                            {analyzingId === item.id ? (
                               <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                              <Sparkles className="mr-2 h-4 w-4" />
                            )}
                            AI Review
                          </Button>
                        </Flex>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </Box>
          )}
        </Box>
      </Flex>
       <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2"><AlertTriangle className="text-destructive" />Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            feedback from your browser's local storage.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setFeedbackToDelete(null)}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={confirmDeleteFeedback} className="bg-destructive hover:bg-destructive/90">Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );

  return (
    <SectionWrapper id="feedback" className="bg-transparent">
      <Flex direction="col" align="center" justify="start" className="h-auto min-h-full w-full py-8">
        {!currentUser && view === 'login' && renderAuthForm('login')}
        {!currentUser && view === 'signup' && renderAuthForm('signup')}
        {currentUser && view === 'manageFeedback' && renderManageFeedback()}
      </Flex>
    </SectionWrapper>
  );
};

Feedback.displayName = 'FeedbackSection';
