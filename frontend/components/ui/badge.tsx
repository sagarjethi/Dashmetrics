import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center border-2 border-black px-2.5 py-0.5 text-xs font-bold transition-all duration-200 shadow-neo-sm",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:shadow-neo",
        secondary:
          "bg-secondary text-secondary-foreground hover:shadow-neo",
        destructive:
          "bg-destructive text-destructive-foreground hover:shadow-neo",
        outline: "text-foreground bg-background",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
