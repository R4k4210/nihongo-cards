'use client';

import { useEffect } from 'react';
import { SModal, SModalTitle, SOverlay } from './Modal.styles';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <SOverlay onClick={(e) => e.target === e.currentTarget && onClose()} role='dialog' aria-modal='true'>
      <SModal>
        <SModalTitle>{title}</SModalTitle>
        {children}
      </SModal>
    </SOverlay>
  );
}
