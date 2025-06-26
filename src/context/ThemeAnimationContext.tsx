
'use client';

import React, { createContext, useContext } from 'react';

/**
 * Defines the shape of the context data.
 */
interface ThemeAnimationContextType {
  /** A function to trigger the theme change animation, accepting the mouse event to determine the animation's origin. */
  triggerThemeAnimation: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /** A boolean indicating if the theme transition animation is currently in progress. */
  isAnimating: boolean;
}

/**
 * Creates the React Context for theme animation.
 * It is initialized with a default value, including a placeholder function and a default state.
 */
export const ThemeAnimationContext = createContext<ThemeAnimationContextType>({
  triggerThemeAnimation: () => console.warn('ThemeAnimationContext not yet initialized'),
  isAnimating: false,
});

/**
 * A custom hook that provides a convenient way for components to access the theme animation context.
 * It simplifies the process of consuming the context and includes an error check to ensure
 * it is used within a component tree wrapped by the context provider.
 *
 * @returns {ThemeAnimationContextType} The context value, including the trigger function and animation state.
 * @throws {Error} Throws an error if the hook is used outside of a ThemeAnimationContext.Provider.
 */
export const useThemeAnimation = (): ThemeAnimationContextType => {
  const context = useContext(ThemeAnimationContext);
  if (context === undefined) {
    throw new Error('useThemeAnimation must be used within a ThemeAnimationContext.Provider');
  }
  return context;
};
