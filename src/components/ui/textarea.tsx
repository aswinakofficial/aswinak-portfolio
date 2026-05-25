import * as React from 'react'
import { cn } from '@/lib/utils'

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          'flex min-h-[100px] w-full border-2 border-input bg-background px-3 py-2 text-sm font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-primary focus-visible:-translate-x-0.5 focus-visible:-translate-y-0.5 focus-visible:neo-shadow transition-all disabled:cursor-not-allowed disabled:opacity-50 resize-none',
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = 'Textarea'

export { Textarea }
