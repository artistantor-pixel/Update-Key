import React from 'react';
import { cn } from './Button';

export const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'rounded-xl p-6 glass transition-all hover:border-primary/50 hover:shadow-[0_0_15px_rgba(0,174,239,0.1)]',
        className
      )}
      {...props}
    />
  )
);
Card.displayName = 'Card';
