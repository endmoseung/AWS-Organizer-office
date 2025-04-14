import * as React from "react"
import { cn } from "@/lib/utils"

export interface CalendarEventProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  status: "approved" | "waiting" | "past"
}

const statusColors = {
  approved: "bg-aws-success/20 border-aws-success text-aws-success",
  waiting: "bg-aws-warning/20 border-aws-warning text-aws-warning",
  past: "bg-gray-200 border-gray-400 text-gray-600",
}

const CalendarEvent = React.forwardRef<HTMLDivElement, CalendarEventProps>(
  ({ className, title, status, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "text-xs px-2 py-1 rounded-sm mb-1 truncate border-l-4",
          statusColors[status],
          className
        )}
        {...props}
      >
        {title}
      </div>
    )
  }
)
CalendarEvent.displayName = "CalendarEvent"

export { CalendarEvent }