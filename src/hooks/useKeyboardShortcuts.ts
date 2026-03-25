'use client';

import { useEffect } from 'react';

interface ShortcutHandlers {
  onCtrlEnter?: () => void;
  onSpace?: () => void;
  onArrowRight?: () => void;
  onArrowLeft?: () => void;
  onEscape?: () => void;
}

export function useKeyboardShortcuts(handlers: ShortcutHandlers) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'Enter') {
        handlers.onCtrlEnter?.();
        return;
      }

      if (e.key === ' ' && handlers.onSpace) {
        e.preventDefault();
        handlers.onSpace();
        return;
      }

      if (e.key === 'ArrowRight') {
        handlers.onArrowRight?.();
        return;
      }

      if (e.key === 'ArrowLeft') {
        handlers.onArrowLeft?.();
        return;
      }

      if (e.key === 'Escape') {
        handlers.onEscape?.();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handlers]);
}
