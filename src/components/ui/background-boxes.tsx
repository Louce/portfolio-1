// src/components/ui/background-boxes.tsx
'use client';
import React, { useRef, useEffect, useState, useCallback } from 'react';
import { cn } from '@/lib/utils';

const ROWS = 15; // Reduced from 20
const COLS = 15; // Reduced from 20
const CELL_SIZE = 30; // Size of each cell in pixels
const MAX_DISTANCE = 150; // Max distance for mouse influence

interface BoxesCoreProps {
  className?: string;
  isActive: boolean; // New prop to control animation and event listeners
}

export const BoxesCore: React.FC<BoxesCoreProps> = React.memo(({ className, isActive }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const mousePositionRef = useRef<{ x: number; y: number } | null>(null);

  // Initialize cells state once
  const [cells, setCells] = useState(() => 
    Array.from({ length: ROWS * COLS }).map((_, i) => ({
      id: i,
      scale: 1,
      opacity: 0.3, // Initial static opacity
      colorOpacity: 0, // Opacity for the colored highlight
    }))
  );

  const animateBoxes = useCallback(() => {
    if (!containerRef.current || !mousePositionRef.current) {
      animationFrameRef.current = requestAnimationFrame(animateBoxes);
      return;
    }

    const rect = containerRef.current.getBoundingClientRect();
    const mouseX = mousePositionRef.current.x - rect.left;
    const mouseY = mousePositionRef.current.y - rect.top;

    setCells(prevCells => 
      prevCells.map((cell, i) => {
        const row = Math.floor(i / COLS);
        const col = i % COLS;
        const cellCenterX = col * CELL_SIZE + CELL_SIZE / 2;
        const cellCenterY = row * CELL_SIZE + CELL_SIZE / 2;

        const distance = Math.sqrt(
          (cellCenterX - mouseX) ** 2 + (cellCenterY - mouseY) ** 2
        );

        let newScale = 1;
        let newOpacity = 0.3;
        let newColorOpacity = 0;

        if (distance < MAX_DISTANCE) {
          const distanceFactor = 1 - distance / MAX_DISTANCE; // 1 when close, 0 when far
          newScale = 1 + 0.3 * distanceFactor; // Max scale 1.3
          newOpacity = 0.3 + 0.7 * distanceFactor; // Max opacity 1
          newColorOpacity = distanceFactor; // Max color opacity 1
        }
        
        // Basic lerping for smoother transitions (optional, can be adjusted)
        const lerpFactor = 0.1;
        return {
          ...cell,
          scale: cell.scale + (newScale - cell.scale) * lerpFactor,
          opacity: cell.opacity + (newOpacity - cell.opacity) * lerpFactor,
          colorOpacity: cell.colorOpacity + (newColorOpacity - cell.colorOpacity) * lerpFactor,
        };
      })
    );

    animationFrameRef.current = requestAnimationFrame(animateBoxes);
  }, []);


  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mousePositionRef.current = { x: event.clientX, y: event.clientY };
    };
    
    const currentContainer = containerRef.current;

    if (isActive && currentContainer) {
      mousePositionRef.current = null; // Reset mouse position on activate
      currentContainer.addEventListener('mousemove', handleMouseMove);
      animationFrameRef.current = requestAnimationFrame(animateBoxes);
    } else {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      if (currentContainer) {
        currentContainer.removeEventListener('mousemove', handleMouseMove);
      }
      // Reset cells to static state when not active
      setCells(prevCells => prevCells.map(cell => ({ ...cell, scale: 1, opacity: 0.3, colorOpacity: 0 })));
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (currentContainer) {
        currentContainer.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, [isActive, animateBoxes]);

  const gridContainerStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: `repeat(${COLS}, ${CELL_SIZE}px)`,
    gridTemplateRows: `repeat(${ROWS}, ${CELL_SIZE}px)`,
    width: COLS * CELL_SIZE,
    height: ROWS * CELL_SIZE,
    position: 'absolute', // Center the grid within the transformed container
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  };
  
  const getRandomColor = useCallback(() => {
    const colors = [
      "hsl(var(--primary))",
      "hsl(var(--accent))",
      "hsl(var(--primary) / 0.7)",
      "hsl(var(--accent) / 0.7)",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }, []);


  return (
    <div
      ref={containerRef}
      style={{
        transform: `translate(-40%,-60%) skewX(-48deg) skewY(14deg) scale(0.675) rotate(0deg) translateZ(0)`,
      }}
      className={cn(
        "absolute inset-0 z-0", // Simplified positioning for the transformed container
        className
      )}
    >
      <div style={gridContainerStyle}>
        {cells.map(cell => (
          <div
            key={cell.id}
            className="border border-foreground/10 transition-transform,opacity duration-200 ease-out"
            style={{
              // Opacity is for the border, scale for the size
              opacity: cell.opacity,
              transform: `scale(${cell.scale})`,
              // Apply a subtle background color highlight that fades in based on colorOpacity
              backgroundColor: `hsla(var(--primary-hsl), ${cell.colorOpacity * 0.3})`, // Example: use primary with variable alpha
            }}
          >
            {/* Optional: Add an inner element for more complex color effects if needed */}
          </div>
        ))}
      </div>
    </div>
  );
});

BoxesCore.displayName = 'BoxesCore';

export const Boxes = BoxesCore; // Simplified export
