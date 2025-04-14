import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-sm px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "border-border text-foreground",
        success: "border-transparent bg-aws-success text-white hover:bg-aws-success/80",
        warning: "border-transparent bg-aws-warning text-black hover:bg-aws-warning/80",
        error: "border-transparent bg-aws-error text-white hover:bg-aws-error/80",
        info: "border-transparent bg-aws-info text-white hover:bg-aws-info/80",
        waiting: "border-transparent bg-aws-warning/20 text-aws-warning border border-aws-warning/30",
        approved: "border-transparent bg-aws-success/20 text-aws-success border border-aws-success/30",
        rejected: "border-transparent bg-aws-error/20 text-aws-error border border-aws-error/30",
        past: "border-transparent bg-gray-200 text-gray-600 border border-gray-300",
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