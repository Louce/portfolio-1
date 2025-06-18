"use client";
import { useEffect } from "react";
import { motion, stagger, useAnimate } from "framer-motion";
import { cn } from "@/lib/utils";

export const TextGenerateEffect = ({
  words,
  className,
  filter = true,
  duration = 0.5,
  stagger: staggerAmount = 0.02,
  delay = 0,
}: {
  words: string;
  className?: string;
  filter?: boolean;
  duration?: number;
  stagger?: number;
  delay?: number;
}) => {
  const [scope, animate] = useAnimate();
  let wordsArray = words.split(" ");

  useEffect(() => {
    if (scope.current) {
      animate(
        "span",
        {
          opacity: 1,
          filter: filter ? "blur(0px)" : "none",
        },
        {
          duration: duration,
          delay: stagger(staggerAmount, { startDelay: delay }),
        }
      );
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scope.current]); 

  const renderWords = () => {
    return (
      <motion.div ref={scope}>
        {wordsArray.map((word, idx) => {
          return (
            <motion.span
              key={word + idx}
              className="opacity-0" 
              style={{
                filter: filter ? "blur(10px)" : "none",
                display: "inline-block", 
              }}
            >
              {word}{idx !== wordsArray.length - 1 ? "\u00A0" : ""}
            </motion.span>
          );
        })}
      </motion.div>
    );
  };

  return (
    <div className={cn(className)}> 
        {renderWords()}
    </div>
  );
};
