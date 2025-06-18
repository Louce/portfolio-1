"use client";
import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children: ReactNode;
  showRadialGradient?: boolean;
  containerClassName?: string; 
}

export const AuroraBackground = ({
  className,
  children,
  showRadialGradient = true,
  containerClassName,
  ...props
}: AuroraBackgroundProps) => {
  return (
    <div
      className={cn(
        "relative flex flex-col h-full w-full items-center justify-center bg-background text-foreground transition-bg",
        className
      )}
      {...props}
    >
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div
          className={cn(
            `
            [--white-gradient:repeating-linear-gradient(100deg,hsl(var(--foreground))_0%,hsl(var(--foreground))_7%,transparent_10%,transparent_12%,hsl(var(--foreground))_16%)]
            [--dark-gradient:repeating-linear-gradient(100deg,hsl(var(--background))_0%,hsl(var(--background))_7%,transparent_10%,transparent_12%,hsl(var(--background))_16%)]
            [--aurora:repeating-linear-gradient(100deg,hsl(var(--primary))_10%,hsl(var(--accent))_15%,hsl(var(--primary))_20%,hsl(var(--accent))_25%,hsl(var(--primary))_30%)]
            [background-image:var(--dark-gradient),var(--aurora)]
            dark:[background-image:var(--dark-gradient),var(--aurora)]
            [background-size:300%,_200%]
            [background-position:50%_50%,50%_50%]
            filter_blur-[10px] 
            after:content-[""]_after:fixed_after:inset-0_after:[background-image:var(--dark-gradient),var(--aurora)]_after:dark:[background-image:var(--dark-gradient),var(--aurora)]
            after:-z-10_after:transform_after:blur-2xl_after:opacity-95_after:[background-size:200%,_100%]
            animate-aurora_text-inherit`, 
            showRadialGradient &&
              `[mask-image:radial-gradient(ellipse_at_center_center,black_10%,transparent_70%)]`
          )}
        ></div>
      </div>
      <div className={cn("relative z-10 flex flex-col items-center justify-center h-full w-full", containerClassName)}>
        {children}
      </div>
    </div>
  );
};
