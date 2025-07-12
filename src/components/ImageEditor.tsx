import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import saveAs from "file-saver";
import html2canvas from "html2canvas";
import { Check, Download } from "lucide-react";
import { useRef, useState } from "react";
import KrugMark from "./ui/KrugMark";
import Profile from "./ui/profile";

interface ImageEditorProps {
  eventTitle: string;
  speakerName: string;
  eventDate: Date;
  onClose: () => void;
}

// Sample locations
const LOCATIONS = [
  {
    value: "carrot",
    address:
      "서울특별시 서초구 강남대로 465 (교보타워) B동 11층 당근마켓 라운지",
  },
  { value: "musinsa", address: "무신사 성수" },
];

// Sample color palettes
const BACKGROUND_COLORS = [
  { value: "#232F3E", label: "AWS Blue" },
  { value: "#FF9900", label: "AWS Orange" },
  { value: "#1D8102", label: "AWS Green" },
  { value: "#D13212", label: "AWS Red" },
  { value: "#0073BB", label: "AWS Light Blue" },
  { value: "#212121", label: "Black" },
  { value: "#FFFFFF", label: "White" },
];

const TEXT_COLORS = [
  { value: "#FFFFFF", label: "White" },
  { value: "#232F3E", label: "AWS Blue" },
  { value: "#FF9900", label: "AWS Orange" },
  { value: "#212121", label: "Black" },
];

export default function ImageEditor({
  eventTitle = "AWS 밋업: 클라우드 네이티브 애플리케이션 개발",
  speakerName = "홍길동",
  eventDate = new Date(),
  onClose,
}: ImageEditorProps) {
  const [title, setTitle] = useState(eventTitle);
  const [speaker, setSpeaker] = useState(speakerName);
  const [location, setLocation] = useState(LOCATIONS[0].value);
  const [bgColor, setBgColor] = useState(BACKGROUND_COLORS[0].value);
  const [titleColor, setTitleColor] = useState(TEXT_COLORS[0].value); // 제목 색상 상태
  const [pickerColor, setPickerColor] = useState(TEXT_COLORS[0].value); // 컬러 피커 상태

  const [speakerColor, setSpeakerColor] = useState(TEXT_COLORS[0].value);
  const [speakerColorPicker, setSpeakerColorPicker] = useState(
    TEXT_COLORS[0].value
  );

  const divRef = useRef<HTMLDivElement>(null);

  // 2. 다운로드 버튼 클릭 시 실행될 함수
  const handleDownload = async () => {
    if (!divRef.current) return;

    try {
      const div = divRef.current;
      const canvas = await html2canvas(div, {
        scale: 2,
        allowTaint: true,
        useCORS: true,
      }).then((canvas) => {
        canvas.toBlob((blob) => {
          if (blob !== null) {
            saveAs(blob, "result.png");
          }
        });
      });
      return canvas;
    } catch (error) {
      console.error("Error converting div to image:", error);
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "long",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const locationLabel =
    LOCATIONS.find((loc) => loc.value === location).address || "";

  return (
    <Card className="mx-auto max-w-5xl shadow-aws-card">
      <CardHeader className="bg-secondary text-secondary-foreground">
        <CardTitle>커버 이미지 에디터</CardTitle>
        <CardDescription className="pb-2 text-secondary-foreground/80">
          밋업 홍보용 이미지를 만들어보세요
        </CardDescription>
      </CardHeader>

      <CardContent className="p-1">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div>
            <h3 className="mb-4 text-lg font-semibold">미리보기</h3>
            <div
              ref={divRef}
              className="overflow-hidden relative mb-4 rounded-sm aspect-video"
              style={{ backgroundColor: bgColor }}
            >
              <div className="flex inset-0 flex-col justify-between p-5 h-full">
                <div className="space-y-1 md:space-y-2">
                  <div
                    className="text-md md:text-2xl font-bold break-words max-w-[90%] w-48 md:w-3xl"
                    style={{ color: titleColor }}
                  >
                    {title}
                  </div>
                  <div
                    className="text-sm md:text-lg font-semibold break-words max-w-[90%] w-48 md:w-3xl"
                    style={{ color: speakerColor }}
                  >
                    {speaker}
                  </div>
                  <div
                    className="flex flex-col gap-1"
                    style={{ color: speakerColor }}
                  >
                    <time className="text-xs">{formatDate(eventDate)}</time>
                    <div className="w-48 text-xs md:w-52">{locationLabel}</div>
                  </div>
                </div>
                <KrugMark />
                <Profile
                  src="https://avatars.githubusercontent.com/u/102910?v=4"
                  className="absolute right-4 bottom-4 w-32 h-32 rounded-full md:bottom-6 md:right-6"
                />
              </div>
            </div>

            {/* <Button
              onClick={() => {
                if (divRef.current) {
                  divRef.current.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                  });
                  handleDownload();
                }
              }}
              className="flex gap-2 justify-center items-center w-full">
             
              이미지 다운로드
            </Button> */}
          </div>

          <div className="space-y-6">
            <h3 className="mb-4 text-lg font-semibold">편집하기</h3>

            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="title">제목</Label>
                <Input
                  id="title"
                  type="text"
                  className="p-2 w-full rounded-md border border-input bg-background"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="speaker">발표자</Label>
                <Input
                  id="speaker"
                  value={speaker}
                  onChange={(e) => setSpeaker(e.target.value)}
                  placeholder="발표자 이름을 입력하세요"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="location">장소</Label>
                <Select onValueChange={setLocation} value={location}>
                  <SelectTrigger id="location">
                    <SelectValue placeholder="장소를 선택하세요" />
                  </SelectTrigger>
                  <SelectContent>
                    {LOCATIONS.map((loc) => (
                      <SelectItem
                        className="text-xs"
                        key={loc.value}
                        value={loc.value}
                      >
                        {loc.address}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label>배경 색상</Label>
                <div className="flex flex-wrap gap-2">
                  <input
                    id="bgColorPicker"
                    type="color"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="p-0 w-16 h-10 rounded"
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <Label>제목 색상 선택하기</Label>
                <p className="text-xs text-aws-orange">
                  빠른 선택 버튼 외에 다양한 색상을 선택 할 수 있습니다.
                </p>

                <div className="text-xs text-muted-foreground">
                  [빠른 색상 선택]
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setTitleColor("#212121")} // 퀵 버튼 클릭 시 제목 색상만 변경
                    className="flex justify-center items-center w-6 h-6 rounded-full border"
                    style={{ backgroundColor: "#212121" }}
                    title="Black"
                  >
                    {titleColor === "#212121" && (
                      <Check size={12} className="text-white drop-shadow-lg" />
                    )}
                  </button>

                  <button
                    onClick={() => setTitleColor("#FFFFFF")} // 퀵 버튼 클릭 시 제목 색상만 변경
                    className="flex justify-center items-center w-6 h-6 rounded-full border"
                    style={{ backgroundColor: "#FFFFFF" }}
                    title="White"
                  >
                    {titleColor === "#FFFFFF" && (
                      <Check size={12} className="text-black drop-shadow-lg" />
                    )}
                  </button>
                </div>
                <div className="text-xs text-muted-foreground">
                  [그 외 색상 선택]
                </div>
                <input
                  type="color"
                  value={pickerColor}
                  onChange={(e) => {
                    setPickerColor(e.target.value);
                    setTitleColor(e.target.value);
                  }}
                  className="p-0 w-16 h-10 rounded"
                  title="Custom Color Picker"
                />
              </div>

              <div className="grid gap-2">
                <Label>텍스트 색상</Label>
                <div className="text-xs text-muted-foreground">
                  [빠른 색상 선택]
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setSpeakerColor("#FFFFFF")}
                    className="flex justify-center items-center w-6 h-6 rounded-full border"
                    style={{ backgroundColor: "#FFFFFF" }}
                    title="White"
                  >
                    {speakerColor === "#FFFFFF" && (
                      <Check size={14} className="text-black drop-shadow-lg" />
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setSpeakerColor("#212121")} // 퀵 버튼 클릭 시 텍스트 색상만 변경
                    className="flex justify-center items-center w-6 h-6 rounded-full border"
                    style={{ backgroundColor: "#212121" }}
                    title="Black"
                  >
                    {speakerColor === "#212121" && (
                      <Check size={14} className="text-white drop-shadow-lg" />
                    )}
                  </button>
                </div>

                <div className="text-xs text-muted-foreground">
                  [그 외 색상 선택]
                </div>
                <input
                  type="color"
                  value={speakerColorPicker}
                  onChange={(e) => {
                    setSpeakerColorPicker(e.target.value);
                    setSpeakerColor(e.target.value);
                  }}
                  className="p-0 w-16 h-10 rounded"
                  title="Custom Color Picker"
                />
              </div>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex gap-2 justify-end p-4 border-t">
        <Button type="button" variant="outline" onClick={onClose}>
          취소
        </Button>
        <Button type="button" onClick={handleDownload}>
          <Download size={18} />
          저장 및 다운로드
        </Button>
      </CardFooter>
    </Card>
  );
}
