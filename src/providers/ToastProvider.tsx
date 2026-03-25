'use client';

import { Toaster } from 'react-hot-toast';

export function ToastProvider() {
  return (
    <Toaster
      position='bottom-right'
      toastOptions={{
        duration: 3000,
        style: {
          background: '#22222e',
          color: '#f1faee',
          border: '1px solid #2e2e3e',
          borderRadius: '10px',
          fontSize: '0.9rem',
        },
        success: {
          style: { borderLeft: '3px solid #06d6a0' },
        },
        error: {
          style: { borderLeft: '3px solid #e63946' },
        },
      }}
    />
  );
}
