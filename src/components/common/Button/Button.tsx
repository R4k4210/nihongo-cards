'use client';

import { SButton } from './Button.styles';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  small?: boolean;
  children: React.ReactNode;
}

export function Button({ variant = 'primary', small, children, ...props }: ButtonProps) {
  return (
    <SButton $variant={variant} $small={small} {...props}>
      {children}
    </SButton>
  );
}
