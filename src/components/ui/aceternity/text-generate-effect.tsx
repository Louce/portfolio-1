
'use client';

import { useEffect, useRef } from 'react';
import { motion, stagger, useAnimate } from 'framer-motion';
import { cn } from '@/lib/utils';

interface TextGenerateEffectProps {
  words: string;
  className?: string;
  stagger?: number;
  delay?: number;
}

export const TextGenerateEffect = ({
  words,
  className,
  stagger: staggerTime = 0.2,
  delay = 0,
}: TextGenerateEffectProps) => {
  const [scope, animate] = useAnimate();
  const wordsArray = words.split(' ');
  const animationPlayedRef = useRef(false);

  useEffect(() => {
    if (animationPlayedRef.current) return;

    const timer = setTimeout(() => {
      animate(
        'span',
        {
          opacity: 1,
        },
        {
          duration: 2,
          delay: stagger(staggerTime, { startDelay: delay }),
        }
      );
      animationPlayedRef.current = true;
    }, delay * 1000); // Convert delay to milliseconds for setTimeout

    return () => clearTimeout(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animate, delay, staggerTime, scope]);

  const renderWords = () => {
    return (
      <motion.div ref={scope}>
        {wordsArray.map((word, idx) => {
          return (
            <motion.span
              key={word + idx}
              className="opacity-0" // Removed hardcoded text colors
            >
              {word}{' '}
            </motion.span>
          );
        })}
      </motion.div>
    );
  };

  return (
    <div className={cn('font-bold', className)}> {/* className prop (containing text-primary) is applied here */}
      <div className="mt-4">
        <div className="leading-snug tracking-wide"> {/* Removed hardcoded text colors, will inherit from parent */}
          {renderWords()}
        </div>
      </div>
    </div>
  );
};
