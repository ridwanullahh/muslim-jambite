import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps extends React.ComponentProps<"input"> {
  variant?: "default" | "modern" | "floating" | "glass"
  label?: string
  error?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, variant = "default", label, error, ...props }, ref) => {
    const [focused, setFocused] = React.useState(false)
    const [hasValue, setHasValue] = React.useState(false)

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setFocused(true)
      props.onFocus?.(e)
    }

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setFocused(false)
      setHasValue(e.target.value !== "")
      props.onBlur?.(e)
    }

    const variants = {
      default: "flex h-12 w-full rounded-2xl border-2 border-gray-200 bg-white px-4 py-3 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 focus-visible:border-brand-primary disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300 hover:border-brand-primary/50",
      modern: "flex h-14 w-full rounded-3xl border-2 border-gray-200 bg-white/80 backdrop-blur-sm px-6 py-4 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 focus-visible:border-brand-primary focus-visible:shadow-xl disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300 hover:border-brand-primary/50",
      glass: "flex h-12 w-full rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md px-4 py-3 text-sm text-white placeholder:text-white/70 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:border-white/50 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300",
      floating: "flex h-14 w-full rounded-2xl border-2 border-gray-200 bg-white px-4 pt-6 pb-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 focus-visible:border-brand-primary disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300"
    }

    if (variant === "floating" && label) {
      return (
        <div className="relative">
          <input
            type={type}
            className={cn(variants[variant], error && "border-red-500 focus-visible:ring-red-500", className)}
            ref={ref}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder=""
            {...props}
          />
          <label
            className={cn(
              "absolute left-4 transition-all duration-300 pointer-events-none text-muted-foreground",
              focused || hasValue || props.value
                ? "top-2 text-xs font-medium text-brand-primary"
                : "top-1/2 -translate-y-1/2 text-sm"
            )}
          >
            {label}
          </label>
          {error && (
            <p className="mt-2 text-sm text-red-500 font-medium animate-fade-in-up">{error}</p>
          )}
        </div>
      )
    }

    return (
      <div className="space-y-2">
        {label && (
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {label}
          </label>
        )}
        <input
          type={type}
          className={cn(variants[variant], error && "border-red-500 focus-visible:ring-red-500", className)}
          ref={ref}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
        />
        {error && (
          <p className="text-sm text-red-500 font-medium animate-fade-in-up">{error}</p>
        )}
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
