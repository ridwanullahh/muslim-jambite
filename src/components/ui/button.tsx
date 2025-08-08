import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 relative overflow-hidden group",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-brand-primary to-brand-accent text-white hover:shadow-2xl hover:shadow-brand-primary/25 hover:-translate-y-1 rounded-2xl",
        destructive:
          "bg-gradient-to-r from-red-500 to-red-600 text-white hover:shadow-2xl hover:shadow-red-500/25 hover:-translate-y-1 rounded-2xl",
        outline:
          "border-2 border-brand-primary/20 bg-transparent text-brand-primary hover:bg-brand-primary hover:text-white hover:border-brand-primary hover:shadow-xl rounded-2xl",
        secondary:
          "bg-white/90 backdrop-blur-sm text-gray-900 border-2 border-gray-200 hover:border-brand-primary hover:shadow-xl hover:-translate-y-1 rounded-2xl",
        ghost: "bg-transparent text-brand-primary hover:bg-brand-primary/10 hover:text-brand-primary rounded-2xl",
        link: "text-brand-primary underline-offset-4 hover:underline bg-transparent",
        glass: "bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 hover:shadow-xl rounded-2xl",
        gradient: "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-2xl hover:shadow-purple-500/25 hover:-translate-y-1 rounded-2xl",
      },
      size: {
        default: "h-12 px-6 py-3 text-sm",
        sm: "h-10 px-4 py-2 text-sm rounded-xl",
        lg: "h-14 px-8 py-4 text-base rounded-2xl",
        xl: "h-16 px-10 py-5 text-lg rounded-3xl",
        icon: "h-12 w-12 rounded-2xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {/* Shimmer effect for gradient buttons */}
        {(variant === "default" || variant === "gradient") && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
        )}

        {/* Ripple effect container */}
        <div className="relative z-10 flex items-center justify-center gap-2">
          {children}
        </div>

        {/* Glow effect for primary buttons */}
        {variant === "default" && (
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-brand-primary to-brand-accent opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300" />
        )}
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
