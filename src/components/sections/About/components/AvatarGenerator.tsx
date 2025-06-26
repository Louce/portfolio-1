'use client';

import React, { useState, useTransition } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { generateAvatar } from '@/ai/flows/generate-avatar-flow';
import { Box, Text } from '@/components/primitives';
import { Button, Skeleton } from '@/components/ui';
import { Wand2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const initialImage = {
  url: "https://images.unsplash.com/photo-1504257432389-52343af06ae3?q=80&w=1974&auto=format&fit=crop",
  aiHint: "developer portrait",
  style: "photography"
};

export const AvatarGenerator: React.FC = () => {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [image, setImage] = useState(initialImage);

  const handleGenerate = () => {
    startTransition(async () => {
      try {
        const result = await generateAvatar({});
        setImage({
          url: result.imageUrl,
          aiHint: `developer portrait ${result.style}`,
          style: result.style
        });
        toast({ title: "Avatar Regenerated!", description: `New style: ${result.style}` });
      } catch (error) {
        console.error("Avatar generation failed:", error);
        toast({
          title: "Generation Failed",
          description: "Could not generate a new avatar. Please try again later.",
          variant: "destructive",
        });
      }
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, x: -50, rotate: -3 }}
      whileInView={{ opacity: 1, scale: 1, x: 0, rotate: 0 }}
      viewport={{ once: false, amount: 0.25 }}
      transition={{ type: "spring", stiffness: 100, damping: 18, duration: 0.7, delay: 0.1 }}
      className="w-full max-w-md lg:w-2/5 relative"
    >
      <Box className="relative aspect-square rounded-xl overflow-hidden shadow-2xl group bg-card/80 backdrop-blur-lg border border-white/10">
        <AnimatePresence>
          <motion.div
            key={image.url}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <Image
              src={image.url}
              alt={`AI-generated portrait in a ${image.style} style`}
              data-ai-hint={image.aiHint}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 40vw"
              style={{ objectFit: 'cover' }}
            />
          </motion.div>
        </AnimatePresence>

        {isPending && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 z-10"
          >
            <Skeleton className="w-full h-full" />
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <Text className="text-primary-foreground font-semibold">Generating...</Text>
            </div>
          </motion.div>
        )}
        <Box className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
      </Box>

      <motion.div
        className="absolute -bottom-4 -right-4 z-20"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          onClick={handleGenerate}
          disabled={isPending}
          size="lg"
          className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-full shadow-lg h-14 w-14 p-0"
          aria-label="Generate new avatar style"
        >
          <Wand2 className="h-6 w-6" />
        </Button>
      </motion.div>
    </motion.div>
  );
};

AvatarGenerator.displayName = "AvatarGenerator";
