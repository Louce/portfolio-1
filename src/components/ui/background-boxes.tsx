
'use client';
import React, { useRef, useEffect, useState, useCallback } from 'react';
import { cn } from '@/lib/utils';

const ROWS = 20; // Reverted to 20
const COLS = 20; // Reverted to 20
const CELL_SIZE = 30; // Size of each cell in pixels
const MAX_DISTANCE_INTERACTION = 150; // Max distance for mouse influence for interaction
const STATIC_OPACITY = 0.1; // Opacity for static, non-hovered cells
const BORDER_COLOR_STATIC = 'hsl(var(--border) / 0.2)'; // Slightly visible border for static state
const BORDER_COLOR_ACTIVE = 'hsl(var(--primary) / 0.5)'; // Border color for cells near cursor

interface CellState {
  id: number;
  scale: number;
  opacity: number;
  borderColor: string;
}

interface BoxesCoreProps {
  className?: string;
  isActive: boolean; // Controls animation and event listeners
}

export const BoxesCore: React.FC<BoxesCoreProps> = React.memo(({ className, isActive }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const mousePositionRef = useRef<{ x: number; y: number } | null>(null);

  const [cells, setCells] = useState<CellState[]>(() =>
    Array.from({ length: ROWS * COLS }).map((_, i) => ({
      id: i,
      scale: 1,
      opacity: STATIC_OPACITY,
      borderColor: BORDER_COLOR_STATIC,
    }))
  );

  const resetCellsToStatic = useCallback(() => {
    setCells(prevCells =>
      prevCells.map(cell => ({
        ...cell,
        scale: 1,
        opacity: STATIC_OPACITY,
        borderColor: BORDER_COLOR_STATIC,
      }))
    );
  }, []);

  const animateBoxes = useCallback(() => {
    if (!containerRef.current || !mousePositionRef.current || !isActive) {
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
        let newOpacity = STATIC_OPACITY;
        let newBorderColor = BORDER_COLOR_STATIC;

        if (distance < MAX_DISTANCE_INTERACTION) {
          const distanceFactor = 1 - distance / MAX_DISTANCE_INTERACTION;
          newScale = 1 + 0.2 * distanceFactor; // Max scale 1.2
          newOpacity = STATIC_OPACITY + (1 - STATIC_OPACITY) * distanceFactor; // Max opacity 1
          newBorderColor = BORDER_COLOR_ACTIVE;
        }

        const lerpFactor = 0.1;
        return {
          ...cell,
          scale: cell.scale + (newScale - cell.scale) * lerpFactor,
          opacity: cell.opacity + (newOpacity - cell.opacity) * lerpFactor,
          borderColor: newBorderColor, // Instant change for border color or lerp if desired
        };
      })
    );

    animationFrameRef.current = requestAnimationFrame(animateBoxes);
  }, [isActive]);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mousePositionRef.current = { x: event.clientX, y: event.clientY };
    };

    const currentContainer = containerRef.current;

    if (isActive && currentContainer) {
      mousePositionRef.current = null; 
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
      resetCellsToStatic();
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (currentContainer) {
        currentContainer.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, [isActive, animateBoxes, resetCellsToStatic]);

  const gridContainerStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: `repeat(${COLS}, ${CELL_SIZE}px)`,
    gridTemplateRows: `repeat(${ROWS}, ${CELL_SIZE}px)`,
    width: COLS * CELL_SIZE,
    height: ROWS * CELL_SIZE,
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  };

  return (
    <div
      ref={containerRef}
      style={{
        transform: `translate(-40%,-60%) skewX(-48deg) skewY(14deg) scale(0.675) rotate(0deg) translateZ(0)`,
      }}
      className={cn(
        "absolute inset-0 z-0", // Ensures it tries to fill parent before transform
        className
      )}
    >
      <div style={gridContainerStyle}>
        {cells.map(cell => (
          <div
            key={cell.id}
            className="transition-transform,opacity duration-100 ease-out" // Faster transition for smoother lerp effect
            style={{
              border: `1px solid ${cell.borderColor}`,
              opacity: cell.opacity,
              transform: `scale(${cell.scale})`,
              transition: 'border-color 0.2s ease-out, opacity 0.1s ease-out, transform 0.1s ease-out' // Added transition property
            }}
          />
        ))}
      </div>
    </div>
  );
});

BoxesCore.displayName = 'BoxesCore';

export const Boxes = BoxesCore;
    