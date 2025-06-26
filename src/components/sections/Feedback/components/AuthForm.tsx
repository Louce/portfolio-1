'use client';

import React, { useState, FormEvent } from 'react';
import { Button, Input, Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui';
import { Flex } from '@/components/primitives';
import { UserPlus, LogIn } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

/**
 * Props for the AuthForm component.
 */
interface AuthFormProps {
  /** The current authentication mode, either 'login' or 'signup'. */
  authType: 'login' | 'signup';
  /** 
   * Callback function to execute when the form is submitted.
   * @param {string} username - The username entered by the user.
   * @param {'login' | 'signup'} type - The type of authentication action.
   */
  onAuthSubmit: (username: string, type: 'login' | 'signup') => void;
  /** Callback function to switch between login and signup modes. */
  onSwitchMode: () => void;
}

/**
 * A component that provides a user interface for login and signup.
 * This is a **mock authentication form**; no real accounts or passwords are handled.
 * Its purpose is to demonstrate UI state management and to allow users to "log in"
 * to access the feedback submission feature.
 *
 * @param {AuthFormProps} props - The properties for the component.
 * @returns {React.ReactElement} The authentication form component.
 */
export const AuthForm: React.FC<AuthFormProps> = ({ authType, onAuthSubmit, onSwitchMode }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!username.trim()) {
      toast({ title: 'Error', description: 'Username cannot be empty.', variant: 'destructive' });
      return;
    }
    onAuthSubmit(username, authType);
    setUsername('');
    setPassword('');
  };

  return (
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
        <form onSubmit={handleSubmit} className="space-y-4">
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
          <Button type="submit" className="w-full bg-primary hover:bg-primary/90" aria-label={authType === 'login' ? 'Submit login form' : 'Submit sign up form'}>
            {authType === 'login' ? 'Login' : 'Sign Up'}
          </Button>
        </form>
        <Flex justify="center" className="mt-6">
          <Button variant="link" onClick={onSwitchMode}>
            {authType === 'login' ? 'Need an account? Sign Up' : 'Already have an account? Login'}
          </Button>
        </Flex>
      </CardContent>
    </Card>
  );
};
