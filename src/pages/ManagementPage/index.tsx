import { EventDetails } from "@/components/EventDetails";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Event, EventsCalendar } from "@/components/ui/events-calendar";
import { format } from "date-fns";
import { useState } from "react";

// Mock data for demonstration purposes
const MOCK_EVENTS: Event[] = [
  {
    id: "1",
    date: new Date(2025, 3, 15),
    title: "홍길동 (주식회사)",
    status: "waiting",
    metadata: {
      speakerName: "홍길동",
      speakerAffiliation: "주식회사",
      description:
        "클라우드 네이티브 애플리케이션 개발에 대한 인사이트를 공유하고자 합니다. AWS 서비스를 활용한 확장 가능한 아키텍처 설계와 데브옵스 프랙티스에 대해 다룰 예정입니다.",
      preferences: [
        { date: new Date(2025, 3, 15), order: 1 },
        { date: new Date(2025, 3, 20), order: 2 },
        { date: new Date(2025, 3, 25), order: 3 },
      ],
    },
  },
  {
    id: "2",
    date: new Date(2025, 3, 15),
    title: "김철수 (테크놀로지)",
    status: "approved",
    metadata: {
      speakerName: "김철수",
      speakerAffiliation: "테크놀로지",
      description:
        "서버리스 아키텍처를 활용한 빠른 프로토타이핑 방법에 대해 발표합니다. AWS Lambda와 API Gateway를 이용한 실전 예제를 시연할 예정입니다.",
      preferences: [
        { date: new Date(2025, 3, 15), order: 1 },
        { date: new Date(2025, 3, 18), order: 2 },
        { date: new Date(2025, 3, 22), order: 3 },
      ],
    },
  },
  {
    id: "3",
    date: new Date(2025, 3, 10),
    title: "이영희 (스타트업)",
    status: "past",
    metadata: {
      speakerName: "이영희",
      speakerAffiliation: "스타트업",
      description:
        "스타트업에서 AWS 비용 최적화하기: 실제 사례와 팁을 공유합니다. 성장 단계별로 달라지는 클라우드 전략과 예산 관리 방법에 대해 이야기할 예정입니다.",
      preferences: [
        { date: new Date(2025, 3, 10), order: 1 },
        { date: new Date(2025, 3, 12), order: 2 },
        { date: new Date(2025, 3, 17), order: 3 },
      ],
    },
  },
  {
    id: "4",
    date: new Date(2025, 3, 20),
    title: "박민수 (클라우드)",
    status: "waiting",
    metadata: {
      speakerName: "박민수",
      speakerAffiliation: "클라우드",
      description:
        "컨테이너 오케스트레이션의 미래: ECS와 EKS 비교 분석. 각 서비스의 장단점과 사용 사례에 대해 깊이 있게 살펴봅니다.",
      preferences: [
        { date: new Date(2025, 3, 20), order: 1 },
        { date: new Date(2025, 3, 25), order: 2 },
        { date: new Date(2025, 3, 27), order: 3 },
      ],
    },
  },
];

export default function ManagementPage() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedEvent, setSelectedEvent] = useState<any | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [events, setEvents] = useState<Event[]>(MOCK_EVENTS);

  // Filter events for the selected date
  const dateEvents = selectedDate
    ? events.filter(
        (event) =>
          format(event.date, "yyyy-MM-dd") ===
          format(selectedDate, "yyyy-MM-dd")
      )
    : [];

  const handleDayClick = (day: Date) => {
    setSelectedDate(day);
  };

  const handleEventClick = (event: Event) => {
    setSelectedEvent({
      id: event.id,
      title: event.title,
      speakerName: event.metadata.speakerName,
      speakerAffiliation: event.metadata.speakerAffiliation,
      description: event.metadata.description,
      preferences: event.metadata.preferences,
      status: event.status,
    });
    setDialogOpen(true);
  };

  const handleApprove = (eventId: string) => {
    // In a real app, this would call an API to update the event status
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === eventId ? { ...event, status: "approved" as const } : event
      )
    );
    setDialogOpen(false);
  };

  const handleReject = (eventId: string) => {
    // In a real app, this would call an API to update the event status
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === eventId ? { ...event, status: "past" as const } : event
      )
    );
    setDialogOpen(false);
  };

  const handleEditCover = () => {
    // In a real app, this would open the image editor
    alert("Cover image editor would open here");
    setDialogOpen(false);
  };

  const handleEditSchedule = () => {
    // In a real app, this would open the schedule editor
    alert("Schedule editor would open here");
    setDialogOpen(false);
  };

  return (
    <div className="container p-4 mx-auto max-w-7xl">
      <div className="flex flex-col gap-6">
        <Card>
          <CardHeader className="bg-secondary text-secondary-foreground">
            <CardTitle>밋업 발표 관리</CardTitle>
            <CardDescription className="text-secondary-foreground/80">
              신청된 발표와 일정을 관리하세요
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4">
            <EventsCalendar
              events={events}
              onDayClick={handleDayClick}
              onEventClick={handleEventClick}
            />
          </CardContent>
        </Card>

        {selectedDate && (
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">
                  {format(selectedDate, "yyyy년 MM월 dd일")} 신청 목록
                </CardTitle>
                <Badge variant={dateEvents.length > 0 ? "info" : "outline"}>
                  {dateEvents.length}개 신청
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              {dateEvents.length === 0 ? (
                <p className="py-8 text-center text-muted-foreground">
                  이 날짜에 신청된 발표가 없습니다.
                </p>
              ) : (
                <div className="space-y-2">
                  {dateEvents.map((event) => (
                    <Card
                      key={event.id}
                      className="transition-colors cursor-pointer hover:bg-accent/30"
                    >
                      <CardContent
                        className="flex items-start justify-between p-4"
                        onClick={() => handleEventClick(event)}
                      >
                        <div>
                          <h3 className="font-medium">
                            {event.metadata.speakerName} (
                            {event.metadata.speakerAffiliation})
                          </h3>
                          <p className="max-w-md text-sm truncate">
                            {event.title}
                          </p>
                          <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
                            {event.metadata.description}
                          </p>
                          <p className="mt-1 text-xs">
                            희망 날짜: {format(event.date, "MM월 dd일")} (1지망)
                          </p>
                        </div>
                        <Badge
                          variant={statusVariants[event.status]}
                          className="mt-1 ml-4"
                        >
                          {statusLabels[event.status]}
                        </Badge>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        )}

        <EventDetails
          isOpen={dialogOpen}
          onClose={() => setDialogOpen(false)}
          event={selectedEvent}
          onApprove={handleApprove}
          onReject={handleReject}
          onEditCover={handleEditCover}
          onEditSchedule={handleEditSchedule}
        />
      </div>
    </div>
  );
}

// Map status to badge variants
const statusVariants = {
  waiting: "waiting" as const,
  approved: "approved" as const,
  past: "past" as const,
};

// Map status to Korean labels
const statusLabels = {
  waiting: "대기 중",
  approved: "승인됨",
  past: "지남",
};
