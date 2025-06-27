'use client';

import React from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';
import { SectionWrapper } from '@/components/layout';
import { Flex, Text, Box } from '@/components/primitives';
import { SectionTitle } from '@/components/common';
import { Button, Input, Textarea, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui';
import { useToast } from "@/components/ui/use-toast";
import { Send } from 'lucide-react';

/**
 * Defines the validation schema for the contact form using Zod.
 * This ensures that form data is valid before submission, providing a robust
 * and user-friendly validation experience integrated with React Hook Form.
 */
const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  inquiryType: z.enum(["general", "project", "collaboration", "job"], {
    required_error: "Please select a reason for your inquiry."
  }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

/**
 * The "Get In Touch" section, serving as the primary call-to-action for the portfolio.
 * It features a fully-validated contact form built with React Hook Form and Zod.
 * This section is designed to be the final step in the user's journey, making it easy
 * for potential clients or employers to reach out. Social links are intentionally omitted
 * here to keep the focus on the form, as they are already present in the global footer.
 *
 * @returns {React.ReactElement} The Contact section component.
 */
export const Contact: React.FC = () => {
  const { toast } = useToast();
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      inquiryType: 'general',
      message: '',
    },
  });

  /**
   * Handles form submission.
   * In a real application, this would send the data to a backend endpoint. Here,
   * it simulates an API call and displays a success toast message upon completion.
   * @param {ContactFormValues} data - The validated form data.
   */
  const onSubmit: SubmitHandler<ContactFormValues> = async (data) => {
    console.log("Form submitted with data:", data);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast({ title: "Message Sent!", description: "Thanks for reaching out. I'll get back to you soon." });
    form.reset();
  };

  return (
    <SectionWrapper id="contact" className="bg-transparent">
      <div className="absolute inset-0 z-0 bg-grid-pattern masked-radial-gradient"></div>
      <Flex direction="col" align="center" justify="center" className="h-full w-full space-y-8 md:space-y-10 relative z-10">
        <SectionTitle>Get In Touch</SectionTitle>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Text variant="lead" className="text-center max-w-xl text-foreground/80 font-body mt-[-0.5rem] md:mt-[-0.75rem]">
            Have a project in mind, a question, or just want to connect? Feel free to reach out using the form below.
          </Text>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full max-w-lg"
        >
          <Box className="p-6 md:p-8 bg-card/70 backdrop-blur-md border border-border/30 rounded-xl shadow-2xl">
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
                          aria-label="Your Name"
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
                          aria-label="Your Email Address"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="inquiryType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Reason for Inquiry</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger aria-label="Reason for Inquiry" className="bg-background/50 focus:bg-background focus:ring-2 focus:ring-accent focus:border-accent/70 transition-all duration-200 ease-out text-sm">
                            <SelectValue placeholder="Select a reason" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="general">General Question</SelectItem>
                          <SelectItem value="project">Project Proposal</SelectItem>
                          <SelectItem value="collaboration">Collaboration</SelectItem>
                          <SelectItem value="job">Job Opportunity</SelectItem>
                        </SelectContent>
                      </Select>
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
                          aria-label="Your Message"
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
        </motion.div>
      </Flex>
    </SectionWrapper>
  );
};

Contact.displayName = 'ContactSection';
