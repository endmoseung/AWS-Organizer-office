import { useState } from "react";
import { Button } from "./ui/button";

// For demonstration purposes
interface PresentationItem {
  id: string;
  name: string;
  position: string;
  title: string;
  description: string;
  date: string;
  status: "pending" | "approved" | "completed";
  preferenceRank: 1 | 2 | 3;
  type: "lightning" | "main";
}

// Mock data function to generate sample presentations
const generateMockPresentations = (): PresentationItem[] => {
  return [
    {
      id: "1",
      name: "Jane Kim",
      position: "AWS Developer",
      title: "Serverless Applications with AWS Lambda",
      description:
        "An introduction to building serverless applications using AWS Lambda and related services. We'll cover the basics of Lambda functions, API Gateway integration, and best practices for production deployments.",
      date: "2025-04-25",
      status: "approved",
      preferenceRank: 1,
      type: "main",
    },
    {
      id: "2",
      name: "Min Park",
      position: "DevOps Engineer",
      title: "CI/CD Pipelines with AWS CodePipeline",
      description:
        "This presentation covers how to build robust CI/CD pipelines using AWS CodePipeline, CodeBuild, and CodeDeploy. We'll demonstrate a complete workflow from code commit to production deployment.",
      date: "2025-04-25",
      status: "pending",
      preferenceRank: 2,
      type: "lightning",
    },
    {
      id: "3",
      name: "Jun Lee",
      position: "Solution Architect",
      title: "Cost Optimization Strategies for AWS",
      description:
        "Learn effective strategies for optimizing costs on AWS. We'll explore rightsizing instances, leveraging spot instances, and using AWS Cost Explorer to identify optimization opportunities.",
      date: "2025-04-30",
      status: "pending",
      preferenceRank: 1,
      type: "main",
    },
    {
      id: "4",
      name: "Soo Yoon",
      position: "Frontend Developer",
      title: "Building Interactive UIs with Amplify",
      description:
        "A deep dive into AWS Amplify for frontend developers. We'll cover authentication, API integration, and deployment of React applications using Amplify's comprehensive toolset.",
      date: "2025-05-05",
      status: "approved",
      preferenceRank: 1,
      type: "main",
    },
    {
      id: "5",
      name: "Hyun Kim",
      position: "Data Engineer",
      title: "Real-time Data Processing with Kinesis",
      description:
        "An exploration of real-time data processing architectures using AWS Kinesis. We'll demonstrate building a scalable data pipeline for analytics and monitoring applications.",
      date: "2025-05-12",
      status: "completed",
      preferenceRank: 3,
      type: "lightning",
    },
  ];
};

interface CalendarDayProps {
  day: number;
  month: number;
  year: number;
  presentations: PresentationItem[];
  isCurrentMonth: boolean;
  onDayClick: (date: string, presentations: PresentationItem[]) => void;
}

function CalendarDay({
  day,
  month,
  year,
  presentations,
  isCurrentMonth,
  onDayClick,
}: CalendarDayProps) {
  const dateString = `${year}-${String(month + 1).padStart(2, "0")}-${String(
    day
  ).padStart(2, "0")}`;
  const dayPresentations = presentations.filter((p) => p.date === dateString);

  const handleClick = () => {
    onDayClick(dateString, dayPresentations);
  };

  return (
    <div
      className={`min-h-24 border border-border p-1 ${
        isCurrentMonth ? "bg-background" : "bg-muted/20"
      }`}
      onClick={handleClick}
    >
      <div className="mb-1 text-sm font-medium">{day}</div>
      <div className="space-y-1">
        {dayPresentations.map((presentation) => (
          <div
            key={presentation.id}
            className={`text-xs p-1 rounded truncate ${
              presentation.status === "approved"
                ? "bg-green-100 dark:bg-green-900/30 border-l-4 border-green-500"
                : presentation.status === "pending"
                ? "bg-yellow-100 dark:bg-yellow-900/30 border-l-4 border-yellow-500"
                : "bg-gray-100 dark:bg-gray-800/50 border-l-4 border-gray-500"
            }`}
          >
            {presentation.name} (
            {presentation.preferenceRank === 1
              ? "1st"
              : presentation.preferenceRank === 2
              ? "2nd"
              : "3rd"}
            )
          </div>
        ))}
      </div>
    </div>
  );
}

export function Calendar() {
  const [presentations] = useState<PresentationItem[]>(
    generateMockPresentations()
  );
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedPresentations, setSelectedPresentations] = useState<
    PresentationItem[]
  >([]);
  const [
    viewingPresentation,
    setViewingPresentation,
  ] = useState<PresentationItem | null>(null);

  // Current date information
  const currentDate = new Date();
  const [displayMonth, setDisplayMonth] = useState(currentDate.getMonth());
  const [displayYear, setDisplayYear] = useState(currentDate.getFullYear());

  // Generate days for the current month view
  const generateCalendarDays = () => {
    const firstDayOfMonth = new Date(displayYear, displayMonth, 1);
    const lastDayOfMonth = new Date(displayYear, displayMonth + 1, 0);
    const daysInMonth = lastDayOfMonth.getDate();

    const dayOfWeekForFirstDay = firstDayOfMonth.getDay();
    const daysFromPrevMonth = dayOfWeekForFirstDay;

    const prevMonthLastDay = new Date(displayYear, displayMonth, 0).getDate();

    const days = [];

    // Previous month days
    for (let i = daysFromPrevMonth - 1; i >= 0; i--) {
      const prevDay = prevMonthLastDay - i;
      days.push({
        day: prevDay,
        month: displayMonth - 1 < 0 ? 11 : displayMonth - 1,
        year: displayMonth - 1 < 0 ? displayYear - 1 : displayYear,
        isCurrentMonth: false,
      });
    }

    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        day: i,
        month: displayMonth,
        year: displayYear,
        isCurrentMonth: true,
      });
    }

    // Next month days
    const remainingCells = 42 - days.length; // 6 rows of 7 days
    for (let i = 1; i <= remainingCells; i++) {
      days.push({
        day: i,
        month: displayMonth + 1 > 11 ? 0 : displayMonth + 1,
        year: displayMonth + 1 > 11 ? displayYear + 1 : displayYear,
        isCurrentMonth: false,
      });
    }

    return days;
  };

  const calendarDays = generateCalendarDays();

  const weekdays = ["일", "월", "화", "수", "목", "금", "토"];
  const monthNames = [
    "1월",
    "2월",
    "3월",
    "4월",
    "5월",
    "6월",
    "7월",
    "8월",
    "9월",
    "10월",
    "11월",
    "12월",
  ];

  const handlePrevMonth = () => {
    if (displayMonth === 0) {
      setDisplayMonth(11);
      setDisplayYear(displayYear - 1);
    } else {
      setDisplayMonth(displayMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (displayMonth === 11) {
      setDisplayMonth(0);
      setDisplayYear(displayYear + 1);
    } else {
      setDisplayMonth(displayMonth + 1);
    }
  };

  const handleDayClick = (
    date: string,
    presentationsForDay: PresentationItem[]
  ) => {
    setSelectedDate(date);
    setSelectedPresentations(presentationsForDay);
    setViewingPresentation(null);
  };

  const handlePresentationClick = (presentation: PresentationItem) => {
    setViewingPresentation(presentation);
  };

  const handleApprove = () => {
    // In a real implementation, this would make an API call to update the presentation status
    alert(`Presentation "${viewingPresentation?.title}" approved!`);
    setViewingPresentation(null);
  };

  const handleReject = () => {
    // In a real implementation, this would make an API call to update the presentation status
    alert(`Presentation "${viewingPresentation?.title}" rejected!`);
    setViewingPresentation(null);
  };

  const handleGenerateCover = () => {
    // In a real implementation, this would open the image editor with the selected presentation
    alert("Opening image editor for cover generation");
  };

  const handleEditSchedule = () => {
    // In a real implementation, this would open a modal to edit the schedule
    alert("Opening schedule editor");
  };

  return (
    <div className="flex flex-col gap-6 lg:flex-row">
      {/* Calendar View */}
      <div className="flex-1">
        <div className="overflow-hidden rounded-lg border shadow-sm bg-card border-border">
          {/* Calendar Header */}
          <div className="flex justify-between items-center p-4 border-b border-border">
            <h2 className="text-xl font-semibold">
              {monthNames[displayMonth]} {displayYear}
            </h2>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" onClick={handlePrevMonth}>
                이전
              </Button>
              <Button variant="outline" size="sm" onClick={handleNextMonth}>
                다음
              </Button>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7">
            {/* Weekday Headers */}
            {weekdays.map((day) => (
              <div
                key={day}
                className="p-2 text-sm font-medium text-center border-b border-border"
              >
                {day}
              </div>
            ))}

            {/* Calendar Days */}
            {calendarDays.map((day, index) => (
              <CalendarDay
                key={index}
                day={day.day}
                month={day.month}
                year={day.year}
                isCurrentMonth={day.isCurrentMonth}
                presentations={presentations}
                onDayClick={handleDayClick}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Presentation List & Details */}
      <div className="flex flex-col w-full lg:w-96">
        {selectedDate ? (
          <div className="overflow-hidden rounded-lg border shadow-sm bg-card border-border">
            <div className="p-4 border-b border-border">
              <h2 className="text-lg font-semibold">
                Presentations for {selectedDate}
              </h2>
              <p className="text-sm text-muted-foreground">
                {selectedPresentations.length} submissions found
              </p>
            </div>

            <div className="divide-y divide-border">
              {selectedPresentations.length > 0 ? (
                selectedPresentations.map((presentation) => (
                  <div
                    key={presentation.id}
                    className="p-4 transition-colors cursor-pointer hover:bg-muted/30"
                    onClick={() => handlePresentationClick(presentation)}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-medium">
                        {presentation.name}{" "}
                        <span className="text-muted-foreground">
                          ({presentation.position})
                        </span>
                      </h3>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          presentation.status === "approved"
                            ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                            : presentation.status === "pending"
                            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
                            : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
                        }`}
                      >
                        {presentation.status.charAt(0).toUpperCase() +
                          presentation.status.slice(1)}
                      </span>
                    </div>
                    <h4 className="mb-1 text-sm font-medium line-clamp-2">
                      {presentation.title}
                    </h4>
                    <p className="mb-2 text-sm text-muted-foreground line-clamp-3">
                      {presentation.description}
                    </p>
                    <p className="text-xs">
                      Preferred date: {presentation.date} (
                      {presentation.preferenceRank === 1
                        ? "1st choice"
                        : presentation.preferenceRank === 2
                        ? "2nd choice"
                        : "3rd choice"}
                      )
                    </p>
                  </div>
                ))
              ) : (
                <div className="p-6 text-center text-muted-foreground">
                  해당 날짜에 발표가 없어요.
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center p-6 h-full text-center rounded-lg border shadow-sm bg-card border-border">
            <p className="text-muted-foreground">
              날짜를 선택하여 발표를 확인해요.
            </p>
          </div>
        )}

        {/* Presentation Details Modal */}
        {viewingPresentation && (
          <div className="flex fixed inset-0 z-50 justify-center items-center p-4 bg-background/80">
            <div className="bg-card rounded-lg border border-border shadow-lg w-full max-w-2xl max-h-[90vh] overflow-auto">
              <div className="p-6 border-b border-border">
                <h2 className="mb-1 text-xl font-semibold">
                  {viewingPresentation.title}
                </h2>
                <p className="text-sm text-muted-foreground">
                  By {viewingPresentation.name} ({viewingPresentation.position})
                </p>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <h3 className="mb-1 text-sm font-medium text-muted-foreground">
                    Description
                  </h3>
                  <p>{viewingPresentation.description}</p>
                </div>

                <div>
                  <h3 className="mb-1 text-sm font-medium text-muted-foreground">
                    Presentation Type
                  </h3>
                  <p className="capitalize">
                    {viewingPresentation.type} Presentation
                  </p>
                </div>

                <div>
                  <h3 className="mb-1 text-sm font-medium text-muted-foreground">
                    Preferred Date
                  </h3>
                  <p>
                    {viewingPresentation.date} (
                    {viewingPresentation.preferenceRank === 1
                      ? "1st choice"
                      : viewingPresentation.preferenceRank === 2
                      ? "2nd choice"
                      : "3rd choice"}
                    )
                  </p>
                </div>

                <div>
                  <h3 className="mb-1 text-sm font-medium text-muted-foreground">
                    Status
                  </h3>
                  <p className="capitalize">{viewingPresentation.status}</p>
                </div>
              </div>

              <div className="flex sticky bottom-0 gap-2 justify-end p-4 border-t border-border bg-card">
                {viewingPresentation.status === "approved" &&
                  viewingPresentation.type === "main" && (
                    <>
                      <Button variant="outline" onClick={handleEditSchedule}>
                        Edit Schedule
                      </Button>
                      <Button onClick={handleGenerateCover}>
                        Generate Cover
                      </Button>
                    </>
                  )}

                {viewingPresentation.status === "pending" && (
                  <>
                    <Button
                      variant="outline"
                      onClick={() => setViewingPresentation(null)}
                    >
                      Cancel
                    </Button>
                    <Button variant="destructive" onClick={handleReject}>
                      Reject
                    </Button>
                    <Button onClick={handleApprove}>Approve</Button>
                  </>
                )}

                {(viewingPresentation.status === "approved" &&
                  viewingPresentation.type !== "main") ||
                viewingPresentation.status === "completed" ? (
                  <Button
                    variant="outline"
                    onClick={() => setViewingPresentation(null)}
                  >
                    Close
                  </Button>
                ) : null}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
