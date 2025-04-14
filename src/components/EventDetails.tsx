import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { format } from "date-fns";

type Preference = {
  date: Date;
  order: 1 | 2 | 3; // 1지망, 2지망, 3지망
};

interface EventDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  event: {
    id: string;
    title: string;
    speakerName: string;
    speakerAffiliation: string;
    description: string;
    preferences: Preference[];
    status: "waiting" | "approved" | "rejected";
  } | null;
  onApprove: (eventId: string, preferenceIndex: number) => void;
  onReject: (eventId: string) => void;
  onEditCover: () => void;
  onEditSchedule: () => void;
}

const statusLabels = {
  waiting: "대기 중",
  approved: "승인됨",
  rejected: "거절됨",
};

const statusVariants = {
  waiting: "waiting",
  approved: "approved",
  rejected: "rejected",
} as const;

export function EventDetails({
  isOpen,
  onClose,
  event,
  onApprove,
  onReject,
  onEditCover,
  onEditSchedule,
}: EventDetailsProps) {
  if (!event) return null;

  const isApproved = event.status === "approved";

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{event.title}</DialogTitle>
          <DialogDescription>
            발표자: {event.speakerName} ({event.speakerAffiliation})
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 my-4">
          <div className="flex items-center gap-2">
            <Badge variant={statusVariants[event.status]}>
              {statusLabels[event.status]}
            </Badge>
          </div>

          <Card>
            <CardContent className="pt-4">
              <h3 className="text-sm font-semibold mb-2">세션 내용</h3>
              <p className="text-sm text-muted-foreground whitespace-pre-line">
                {event.description}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-4">
              <h3 className="text-sm font-semibold mb-2">희망 날짜</h3>
              <ul className="space-y-2">
                {event.preferences.map((pref, index) => (
                  <li key={index} className="flex justify-between items-center">
                    <span className="text-sm">
                      {format(pref.date, "yyyy년 MM월 dd일")} ({pref.order}지망)
                    </span>
                    {event.status === "waiting" && (
                      <Button
                        variant="success"
                        size="sm"
                        onClick={() => onApprove(event.id, index)}
                      >
                        이 날짜로 승인
                      </Button>
                    )}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        <DialogFooter className="flex justify-between items-center">
          <div className="flex gap-2">
            {isApproved && (
              <>
                <Button onClick={onEditCover} variant="secondary" size="sm">
                  커버 이미지 생성
                </Button>
                <Button onClick={onEditSchedule} variant="secondary" size="sm">
                  일정 수정
                </Button>
              </>
            )}
          </div>
          <div className="flex gap-2">
            {event.status === "waiting" && (
              <>
                <Button onClick={() => onReject(event.id)} variant="destructive">
                  거절
                </Button>
              </>
            )}
            <Button onClick={onClose} variant="outline">
              닫기
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}