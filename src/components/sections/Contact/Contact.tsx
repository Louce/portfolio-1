
'use client';

import React from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';
import { SectionWrapper } from '@/components/layout';
import { Flex, Text, Box } from '@/components/primitives';
import { SectionTitle } from '@/components/common'; // Updated import
import { Button, Input, Textarea, Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui';
import { useToast } from "@/components/ui/use-toast";
import { GitHubIcon, LinkedInIcon } from '@/components/icons';
import { Mail, Send } from 'lucide-react';

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export const Contact: React.FC = () => {
  const { toast } = useToast();
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });

  const onSubmit: SubmitHandler<ContactFormValues> = async (data) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast({ title: "Message Sent!", description: "Thanks for reaching out, Dendi. I'll get back to you soon." });
    form.reset();
  };

  const socialLinks = [
    { name: 'GitHub', icon: GitHubIcon, url: 'https://github.com/Louce', ariaLabel: 'View Dendi Rivaldi\'s GitHub profile' },
    { name: 'LinkedIn', icon: LinkedInIcon, url: 'https://www.linkedin.com/in/dendyrivaldi/', ariaLabel: 'Connect with Dendi Rivaldi on LinkedIn' },
    { name: 'Email', icon: Mail, url: 'mailto:rivaldydendy459@gmail.com', ariaLabel: 'Send an email to Dendi Rivaldi' },
  ];

  return (
    <SectionWrapper id="contact" className="bg-transparent">
      <Flex direction="col" align="center" justify="center" className="h-full w-full space-y-8 md:space-y-10">
        <SectionTitle>Get In Touch</SectionTitle>
        <Text variant="lead" className="text-center max-w-xl text-foreground/80 font-body mt-[-0.5rem] md:mt-[-0.75rem]">
          Have a project in mind, a question, or just want to connect? Feel free to reach out.
        </Text>

        <Box className="w-full max-w-lg p-6 md:p-8 bg-card/70 backdrop-blur-md border border-border/30 rounded-xl shadow-2xl">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground/90">Name</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Your Name" 
                        {...field} 
                        className="bg-background/50 focus:bg-background focus:ring-2 focus:ring-accent focus:border-accent/70 transition-all duration-200 ease-out text-sm" 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground/90">Email</FormLabel>
                    <FormControl>
                      <Input 
                        type="email" 
                        placeholder="your.email@example.com" 
                        {...field} 
                        className="bg-background/50 focus:bg-background focus:ring-2 focus:ring-accent focus:border-accent/70 transition-all duration-200 ease-out text-sm"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground/90">Message</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Let's talk about..." 
                        {...field} 
                        className="bg-background/50 focus:bg-background focus:ring-2 focus:ring-accent focus:border-accent/70 transition-all duration-200 ease-out min-h-[120px] text-sm"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button 
                type="submit" 
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold shadow-md"
                disabled={form.formState.isSubmitting}
                aria-label="Send message"
              >
                {form.formState.isSubmitting ? 'Sending...' : <>Send Message <Send className="ml-2 h-4 w-4" /></>}
              </Button>
            </form>
          </Form>
        </Box>

        <Flex justify="center" gap="1.5rem" className="mt-6 md:mt-8">
          {socialLinks.map((link, index) => (
            <motion.a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.ariaLabel}
              className="text-foreground/70 hover:text-primary transition-colors duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 * index }}
              whileHover={{ scale: 1.1, y: -2 }}
            >
              <link.icon className="w-8 h-8 md:w-10 md:h-10" />
            </motion.a>
          ))}
        </Flex>
      </Flex>
    </SectionWrapper>
  );
};

Contact.displayName = 'ContactSection';
