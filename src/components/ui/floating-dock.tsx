// @ts-nocheck // TODO: FIXME: MAW PoC
"use client";
import { cn } from "@/lib/utils";
import {
  IconLayoutNavbarCollapse,
  IconX,
  IconHome,
  IconUser,
  IconCode,
  IconLayers,
  IconMail,
  IconMessageSquare,
} from "@tabler/icons-react";
import {
  AnimatePresence,
  MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

import React, { useRef, useState } from "react";

export interface FloatingDockItem {
  title: string;
  icon: React.ReactNode;
  href?: string;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
  isActive?: boolean;
}

export const FloatingDock = ({
  items,
  desktopClassName,
  mobileClassName,
}: {
  items: FloatingDockItem[];
  desktopClassName?: string;
  mobileClassName?: string;
}) => {
  return (
    <>
      <FloatingDockDesktop items={items} className={desktopClassName} />
      <FloatingDockMobile items={items} className={mobileClassName} />
    </>
  );
};

const FloatingDockMobile = ({
  items,
  className,
}: {
  items: FloatingDockItem[];
  className?: string;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={cn(
        "fixed bottom-4 right-4 z-[60] flex flex-col items-end gap-2 md:hidden",
        className,
      )}
    >
      <AnimatePresence>
        {open && (
          <motion.div
            layoutId="nav-mobile"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95, transition: { duration: 0.2 } }}
            className="mb-0 flex flex-col items-end gap-2 rounded-xl p-2 bg-card/80 dark:bg-neutral-800/80 backdrop-blur-md border border-border/50 shadow-lg"
          >
            {items.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: 20 }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                exit={{
                  opacity: 0,
                  x: 20,
                  transition: {
                    delay: idx * 0.03,
                  },
                }}
                transition={{ delay: (items.length - 1 - idx) * 0.03, ease: "easeOut", duration: 0.2 }}
              >
                <a
                  href={item.href || "#"}
                  key={item.title}
                  onClick={(e) => {
                    if (item.onClick) {
                      e.preventDefault();
                      item.onClick(e);
                    }
                    setOpen(false); // Close the mobile menu on click
                  }}
                  className={cn(
                    "flex h-12 w-12 items-center justify-center rounded-full transition-colors duration-200 text-foreground/80",
                    item.isActive ? "bg-primary text-primary-foreground" : "bg-secondary/80 hover:bg-accent hover:text-accent-foreground"
                  )}
                  aria-label={item.title}
                >
                  <div className="h-6 w-6">{item.icon}</div>
                </a>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={() => setOpen(!open)}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-card/80 dark:bg-neutral-800/80 backdrop-blur-md border border-border/50 shadow-lg text-foreground/80 hover:text-primary transition-colors"
        aria-label={open ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={open}
      >
        {open ? (
          <IconX className="h-6 w-6" />
        ) : (
          <IconLayoutNavbarCollapse className="h-6 w-6" />
        )}
      </button>
    </div>
  );
};

const FloatingDockDesktop = ({
  items,
  className,
}: {
  items: FloatingDockItem[];
  className?: string;
}) => {
  let mouseY = useMotionValue(Infinity);
  return (
    <motion.div
      onMouseMove={(e) => mouseY.set(e.pageY)}
      onMouseLeave={() => mouseY.set(Infinity)}
      className={cn(
        "mx-auto hidden h-auto flex-col items-center gap-3 rounded-full py-3 px-2 md:flex bg-card/80 backdrop-blur-md border border-border/50 shadow-xl",
        className,
      )}
    >
      {items.map((item) => (
        <IconContainer mouseY={mouseY} key={item.title} {...item} />
      ))}
    </motion.div>
  );
};

function IconContainer({
  mouseY,
  title,
  icon,
  href,
  onClick,
  isActive,
}: {
  mouseY: MotionValue;
} & FloatingDockItem) {
  let ref = useRef<HTMLDivElement>(null);

  let distance = useTransform(mouseY, (val) => {
    let bounds = ref.current?.getBoundingClientRect() ?? { y: 0, height: 0 };
    return val - bounds.y - bounds.height / 2;
  });

  // Icon size: default 24px (w-6 in Tailwind), expanded 32px (w-8)
  // Container size: default 40px (w-10), expanded 56px (w-14)
  // Max interaction distance for scaling: 100px
  const baseSize = 40; // Base container size in px
  const expandedSize = 56; // Expanded container size in px
  const baseIconSize = 24; // Base icon size in px
  const expandedIconSize = 32; // Expanded icon size in px
  const interactionDistance = 100;


  let widthTransform = useTransform(distance, [-interactionDistance, 0, interactionDistance], [baseSize, expandedSize, baseSize]);
  let heightTransform = useTransform(distance, [-interactionDistance, 0, interactionDistance], [baseSize, expandedSize, baseSize]);

  let widthTransformIcon = useTransform(distance, [-interactionDistance, 0, interactionDistance], [baseIconSize, expandedIconSize, baseIconSize]);
  let heightTransformIcon = useTransform(distance, [-interactionDistance, 0, interactionDistance], [baseIconSize, expandedIconSize, baseIconSize]);


  let width = useSpring(widthTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  let height = useSpring(heightTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  let widthIcon = useSpring(widthTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  let heightIcon = useSpring(heightTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={href || "#"}
      onClick={(e) => {
        if (onClick) {
          e.preventDefault();
          onClick(e);
        }
      }}
      aria-label={title}
      className="block group" // Added group here for tooltip
    >
      <motion.div
        ref={ref}
        style={{ width, height }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={cn(
          "relative flex aspect-square items-center justify-center rounded-full transition-colors duration-200",
          isActive ? "bg-primary text-primary-foreground" : "bg-secondary/60 hover:bg-primary/20 text-foreground/70 hover:text-primary"
        )}
      >
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, x: 10, y: "-50%" }}
              animate={{ opacity: 1, x: 0, y: "-50%" }}
              exit={{ opacity: 0, x: 5, y: "-50%" }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute right-full top-1/2 mr-3 w-fit whitespace-nowrap rounded-md px-2 py-1 text-xs bg-popover text-popover-foreground border border-border shadow-md"
            >
              {title}
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div
          style={{ width: widthIcon, height: heightIcon }}
          className="flex items-center justify-center"
        >
          {icon}
        </motion.div>
      </motion.div>
    </a>
  );
}

// Default Icon Components (can be replaced by user via props)
FloatingDock.defaultItems = [
  { title: "Home", icon: <IconHome className="w-full h-full" />, href: "#hero" },
  { title: "About", icon: <IconUser className="w-full h-full" />, href: "#about" },
  { title: "Skills", icon: <IconCode className="w-full h-full" />, href: "#skills" },
  { title: "Projects", icon: <IconLayers className="w-full h-full" />, href: "#projects" },
  { title: "Contact", icon: <IconMail className="w-full h-full" />, href: "#contact" },
  { title: "Feedback", icon: <IconMessageSquare className="w-full h-full" />, href: "#feedback" },
];
