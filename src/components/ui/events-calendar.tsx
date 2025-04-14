import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker, DayClickEventHandler } from "react-day-picker";
import { format } from "date-fns";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { CalendarEvent } from "@/components/ui/calendar-event";

export interface Event {
  id: string;
  date: Date;
  title: string;
  status: "approved" | "waiting" | "past";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  metadata: any;
}

interface EventsCalendarProps {
  className?: string;
  classNames?: Record<string, string>;
  showOutsideDays?: boolean;
  events?: Event[];
  onDayClick?: DayClickEventHandler;
  onEventClick?: (event: Event) => void;
}

function EventsCalendarCell({
  day,
  events = [],
  onEventClick,
}: {
  day: Date;
  events: Event[];
  onEventClick?: (event: Event) => void;
}) {
  return (
    <div className="h-[80px] overflow-auto p-1">
      <div className="mb-1 text-xs font-semibold">{format(day, "d")}</div>
      {events.map((event) => (
        <CalendarEvent
          key={event.id}
          title={event.title}
          status={event.status}
          onClick={() => onEventClick?.(event)}
          className="transition-opacity cursor-pointer hover:opacity-80"
        />
      ))}
    </div>
  );
}

function EventsCalendar({
  className,
  classNames,
  showOutsideDays = true,
  events = [],
  onDayClick,
  onEventClick,
  ...props
}: EventsCalendarProps &
  Omit<
    React.ComponentProps<typeof DayPicker>,
    | "mode"
    | "selected"
    | "onSelect"
    | "className"
    | "classNames"
    | "showOutsideDays"
  >) {
  // Group events by day
  const eventsByDay = React.useMemo(() => {
    const grouped: Record<string, Event[]> = {};
    events.forEach((event) => {
      const dateKey = format(event.date, "yyyy-MM-dd");
      if (!grouped[dateKey]) {
        grouped[dateKey] = [];
      }
      grouped[dateKey].push(event);
    });
    return grouped;
  }, [events]);

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      onDayClick={onDayClick}
      classNames={{
        months: "flex flex-col sm:flex-row gap-2",
        month: "flex flex-col gap-4 w-full",
        caption:
          "flex justify-center pt-1 relative items-center w-full bg-secondary text-secondary-foreground mb-2",
        caption_label: "text-sm font-medium py-2",
        nav: "flex items-center gap-1",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "size-7 bg-transparent p-0 opacity-50 hover:opacity-100 text-secondary-foreground"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse",
        head_row: "flex bg-muted rounded-sm mb-1",
        head_cell:
          "text-muted-foreground rounded-md w-8 font-normal text-[0.8rem] flex-1 py-1.5 text-center",
        row: "flex w-full mb-1",
        cell: cn(
          "relative flex-1 border border-border p-0 text-center focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected])]:rounded-sm overflow-hidden"
        ),
        day: cn("h-full w-full p-0 font-normal aria-selected:opacity-100"),
        day_selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        day_today: "bg-accent text-accent-foreground",
        day_outside:
          "day-outside text-muted-foreground aria-selected:text-muted-foreground",
        day_disabled: "text-muted-foreground opacity-50",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ className, ...props }) => (
          <ChevronLeft className={cn("size-4", className)} {...props} />
        ),
        IconRight: ({ className, ...props }) => (
          <ChevronRight className={cn("size-4", className)} {...props} />
        ),
        Day: ({ date, ...props }) => {
          const dateKey = format(date, "yyyy-MM-dd");
          const dayEvents = eventsByDay[dateKey] || [];
          return (
            <div {...props} className="flex-1 w-full h-full">
              <EventsCalendarCell
                day={date}
                events={dayEvents}
                onEventClick={onEventClick}
              />
            </div>
          );
        },
      }}
      {...props}
    />
  );
}

export { EventsCalendar };
