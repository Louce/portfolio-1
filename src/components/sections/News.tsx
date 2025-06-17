
'use client';

import React, { useState, useEffect, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { SectionWrapper } from '@/components/layout';
import { Flex, Text, Box } from '@/components/primitives';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { UserPlus, LogIn, LogOut, PlusCircle, Newspaper, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface NewsItem {
  id: string;
  title: string;
  content: string;
  author: string;
  timestamp: number;
}

type ViewState = 'login' | 'signup' | 'manageNews';

const LOCAL_STORAGE_KEYS = {
  LOGGED_IN_USER: 'kineticfolio_loggedInUser',
  USERS_NEWS: 'kineticfolio_usersNews', // Stores an object like { username: NewsItem[] }
};

export const News: React.FC = () => {
  const { toast } = useToast();
  const [isMounted, setIsMounted] = useState(false);
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [view, setView] = useState<ViewState>('login');

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState(''); // Note: Password is not stored or validated securely.

  const [newsTitle, setNewsTitle] = useState('');
  const [newsContent, setNewsContent] = useState('');
  const [userNews, setUserNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    setIsMounted(true);
    const storedUser = localStorage.getItem(LOCAL_STORAGE_KEYS.LOGGED_IN_USER);
    if (storedUser) {
      setCurrentUser(storedUser);
      setView('manageNews');
    }
  }, []);

  useEffect(() => {
    if (currentUser && isMounted) {
      const allUsersNews = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.USERS_NEWS) || '{}');
      setUserNews(allUsersNews[currentUser] || []);
    } else {
      setUserNews([]);
    }
  }, [currentUser, isMounted]);

  const handleAuthSubmit = (e: FormEvent, authType: 'login' | 'signup') => {
    e.preventDefault();
    if (!username.trim()) {
      toast({ title: 'Error', description: 'Username cannot be empty.', variant: 'destructive' });
      return;
    }
    // In a real app, you'd validate password, hash it for signup, check against db for login.
    // For this demo, we just set the user.
    setCurrentUser(username);
    localStorage.setItem(LOCAL_STORAGE_KEYS.LOGGED_IN_USER, username);
    setView('manageNews');
    setUsername('');
    setPassword('');
    // Toast for success is now handled by the specific view rendering, to avoid double toasts
    // if already on manageNews view due to localStorage.
    if (authType === 'login') {
      toast({ title: 'Logged In', description: `Welcome back, ${username}!`});
    } else {
      toast({ title: 'Signed Up', description: `Welcome, ${username}!`});
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem(LOCAL_STORAGE_KEYS.LOGGED_IN_USER);
    setView('login');
    toast({ title: 'Logged Out', description: 'You have been successfully logged out.' });
  };

  const handleAddNews = (e: FormEvent) => {
    e.preventDefault();
    if (!newsTitle.trim() || !newsContent.trim() || !currentUser) return;

    const newNewsItem: NewsItem = {
      id: Date.now().toString(),
      title: newsTitle,
      content: newsContent,
      author: currentUser,
      timestamp: Date.now(),
    };

    const allUsersNews = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.USERS_NEWS) || '{}');
    const currentUserSpecificNews = allUsersNews[currentUser] || [];
    const updatedNews = [newNewsItem, ...currentUserSpecificNews];
    allUsersNews[currentUser] = updatedNews;

    localStorage.setItem(LOCAL_STORAGE_KEYS.USERS_NEWS, JSON.stringify(allUsersNews));
    setUserNews(updatedNews);
    setNewsTitle('');
    setNewsContent('');
    toast({ title: 'News Added', description: 'Your news item has been published.' });
  };

  const handleDeleteNews = (newsId: string) => {
    if (!currentUser) return;
    
    const allUsersNews = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.USERS_NEWS) || '{}');
    let currentUserSpecificNews = allUsersNews[currentUser] || [];
    const updatedNews = currentUserSpecificNews.filter((item: NewsItem) => item.id !== newsId);
    allUsersNews[currentUser] = updatedNews;

    localStorage.setItem(LOCAL_STORAGE_KEYS.USERS_NEWS, JSON.stringify(allUsersNews));
    setUserNews(updatedNews);
    toast({ title: 'News Deleted', description: 'The news item has been removed.' });
  };
  
  if (!isMounted) {
    return (
      <SectionWrapper id="news" className="bg-gradient-to-br from-background to-slate-900/60">
        <Flex align="center" justify="center" className="h-full">
          <Text>Loading News Section...</Text>
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
            {authType === 'login' ? 'Login' : 'Sign Up'}
          </CardTitle>
          <CardDescription>
            {authType === 'login' ? 'Access your news dashboard.' : 'Create an account to manage your news.'}
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

  const renderManageNews = () => (
    <Flex direction="col" className="w-full h-full space-y-8 pt-12 pb-8 md:pt-16">
      <Flex justify="between" align="center" className="w-full px-4">
        <Text as="h3" className="text-2xl md:text-3xl font-semibold text-primary">Welcome, {currentUser}!</Text>
        <Button variant="outline" onClick={handleLogout} className="border-accent text-accent hover:bg-accent hover:text-accent-foreground">
          <LogOut className="mr-2 h-4 w-4" /> Logout
        </Button>
      </Flex>

      <Card className="w-full max-w-2xl mx-auto bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-xl text-primary flex items-center"><PlusCircle className="mr-2" /> Add New News Item</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddNews} className="space-y-4">
            <Input
              type="text"
              placeholder="News Title"
              value={newsTitle}
              onChange={(e) => setNewsTitle(e.target.value)}
              className="bg-background/50 focus:bg-background"
              aria-label="News Title"
            />
            <Textarea
              placeholder="News Content..."
              value={newsContent}
              onChange={(e) => setNewsContent(e.target.value)}
              className="min-h-[100px] bg-background/50 focus:bg-background"
              aria-label="News Content"
            />
            <Button type="submit" className="bg-accent hover:bg-accent/90 text-accent-foreground">Publish News</Button>
          </form>
        </CardContent>
      </Card>

      <Box className="w-full max-w-3xl mx-auto space-y-4">
        <Text as="h4" className="text-xl md:text-2xl font-semibold text-primary flex items-center px-4"><Newspaper className="mr-2" /> Your News Items</Text>
        {userNews.length === 0 ? (
          <Text className="text-muted-foreground px-4">You haven't added any news yet.</Text>
        ) : (
          <Box className="space-y-4 max-h-[calc(100vh-400px)] md:max-h-[calc(100vh-450px)] overflow-y-auto pr-2 pl-4 pb-4">
            {userNews.map(item => (
              <motion.div key={item.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{duration: 0.3}}>
                <Card className="bg-card/70">
                  <CardHeader>
                    <Flex justify="between" align="start">
                      <Box>
                        <CardTitle className="text-lg text-foreground">{item.title}</CardTitle>
                        <CardDescription className="text-xs text-muted-foreground">
                          {new Date(item.timestamp).toLocaleString()}
                        </CardDescription>
                      </Box>
                      <Button variant="ghost" size="icon" onClick={() => handleDeleteNews(item.id)} aria-label="Delete news item" className="text-destructive hover:text-destructive/80 hover:bg-destructive/10">
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
    <SectionWrapper id="news" className="bg-gradient-to-br from-background to-slate-900/60 overflow-y-auto">
      <Flex direction="col" align="center" justify="center" className="h-auto min-h-full w-full py-8">
        {!currentUser && view === 'login' && renderAuthForm('login')}
        {!currentUser && view === 'signup' && renderAuthForm('signup')}
        {currentUser && view === 'manageNews' && renderManageNews()}
      </Flex>
    </SectionWrapper>
  );
};

News.displayName = 'NewsSection';
