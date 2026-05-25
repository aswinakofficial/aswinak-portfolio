import * as React from 'react'
import { Slot } from 'radix-ui'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-bold transition-all focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border-2 border-border cursor-pointer select-none',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground neo-shadow hover:-translate-x-0.5 hover:-translate-y-0.5 hover:neo-shadow-lg active:translate-x-0.5 active:translate-y-0.5 active:shadow-none',
        destructive:
          'bg-destructive text-destructive-foreground neo-shadow hover:-translate-x-0.5 hover:-translate-y-0.5 hover:neo-shadow-lg active:translate-x-0.5 active:translate-y-0.5 active:shadow-none',
        outline:
          'bg-background text-foreground neo-shadow hover:-translate-x-0.5 hover:-translate-y-0.5 hover:neo-shadow-lg hover:bg-accent hover:text-accent-foreground active:translate-x-0.5 active:translate-y-0.5 active:shadow-none',
        secondary:
          'bg-secondary text-secondary-foreground neo-shadow hover:-translate-x-0.5 hover:-translate-y-0.5 hover:neo-shadow-lg active:translate-x-0.5 active:translate-y-0.5 active:shadow-none',
        ghost:
          'border-transparent shadow-none hover:bg-accent hover:text-accent-foreground hover:border-border',
        link: 'border-transparent shadow-none text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-5 py-2',
        sm: 'h-8 px-3 text-xs',
        lg: 'h-12 px-8 text-base',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot.Root : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
