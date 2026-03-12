import { ComponentProps, forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface TextProps extends ComponentProps<'p'> {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'muted' | 'primary';
}

const sizes: Record<string, string> = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
};

const variants: Record<string, string> = {
  default: 'text-gray-900 dark:text-white',
  muted: 'text-gray-600 dark:text-gray-400',
  primary: 'text-primary-600 dark:text-primary-400',
};

const Text = forwardRef<HTMLParagraphElement, TextProps>(
  ({ className, size = 'md', variant = 'default', children, ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={cn(sizes[size], variants[variant], className)}
        {...props}
      >
        {children}
      </p>
    );
  }
);

Text.displayName = 'Text';

export { Text };
