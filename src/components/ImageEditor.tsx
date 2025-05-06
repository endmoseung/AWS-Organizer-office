import React, { useState } from "react";
import { 
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Download, Check } from "lucide-react";

interface ImageEditorProps {
  eventTitle: string;
  speakerName: string;
  eventDate: Date;
  onClose: () => void;
}

// Sample locations
const LOCATIONS = [
  { value: "carrot", label: "당근 마켓" },
  { value: "musinsa", label: "무신사 성수" },
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
  onClose 
}: ImageEditorProps) {
  const [title, setTitle] = useState(eventTitle);
  const [speaker, setSpeaker] = useState(speakerName);
  const [location, setLocation] = useState(LOCATIONS[0].value);
  const [bgColor, setBgColor] = useState(BACKGROUND_COLORS[0].value);
  const [titleColor, setTitleColor] = useState(TEXT_COLORS[0].value);
  const [speakerColor, setSpeakerColor] = useState(TEXT_COLORS[0].value);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('ko-KR', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      weekday: 'long',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const downloadImage = () => {
    // In a real implementation, this would generate and download the image
    alert("이미지가 생성되어 다운로드되었습니다.");
  };
  
  const locationLabel = LOCATIONS.find(loc => loc.value === location)?.label || "";

  return (
    <Card className="max-w-5xl mx-auto shadow-aws-card">
      <CardHeader className="bg-secondary text-secondary-foreground">
        <CardTitle>커버 이미지 에디터</CardTitle>
        <CardDescription className="text-secondary-foreground/80">
          밋업 홍보용 이미지를 만들어보세요
        </CardDescription>
      </CardHeader>
      
      <CardContent className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Preview Panel */}
          <div>
            <h3 className="text-lg font-semibold mb-4">미리보기</h3>
            <div 
              className="aspect-video rounded-sm overflow-hidden relative mb-4"
              style={{ backgroundColor: bgColor }}
            >
              {/* Template Preview */}
              <div className="absolute inset-0 p-8 flex flex-col justify-between">
                <div className="space-y-2">
                  <div 
                    className="text-2xl font-bold break-words max-w-[90%]"
                    style={{ color: titleColor }}
                  >
                    {title}
                  </div>
                  <div 
                    className="text-xl"
                    style={{ color: speakerColor }}
                  >
                    {speaker}
                  </div>
                </div>
                
                <div className="flex flex-col gap-1" style={{ color: speakerColor }}>
                  <div className="text-sm">{formatDate(eventDate)}</div>
                  <div className="text-sm">{locationLabel}</div>
                  <div className="text-sm">AWS Meetup</div>
                </div>
              </div>
            </div>
            
            <Button 
              onClick={downloadImage}
              className="w-full flex items-center justify-center gap-2"
            >
              <Download size={18} />
              이미지 다운로드
            </Button>
          </div>
          
          {/* Editor Controls */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold mb-4">편집</h3>
            
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="title">제목</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="발표 제목을 입력하세요"
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
                      <SelectItem key={loc.value} value={loc.value}>
                        {loc.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid gap-2">
                <Label>배경 색상</Label>
                <div className="flex flex-wrap gap-2">
                  {BACKGROUND_COLORS.map((color) => (
                    <button
                      key={color.value}
                      onClick={() => setBgColor(color.value)}
                      className="w-8 h-8 rounded-full flex items-center justify-center border"
                      style={{ backgroundColor: color.value }}
                      title={color.label}
                    >
                      {bgColor === color.value && (
                        <Check 
                          size={14} 
                          className="text-white drop-shadow-lg"
                        />
                      )}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="grid gap-2">
                <Label>제목 색상</Label>
                <div className="flex flex-wrap gap-2">
                  {TEXT_COLORS.map((color) => (
                    <button
                      key={color.value}
                      onClick={() => setTitleColor(color.value)}
                      className="w-8 h-8 rounded-full flex items-center justify-center border"
                      style={{ backgroundColor: color.value }}
                      title={color.label}
                    >
                      {titleColor === color.value && (
                        <Check 
                          size={14} 
                          className={`${color.value === "#FFFFFF" ? "text-black" : "text-white"} drop-shadow-lg`}
                        />
                      )}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="grid gap-2">
                <Label>텍스트 색상</Label>
                <div className="flex flex-wrap gap-2">
                  {TEXT_COLORS.map((color) => (
                    <button
                      key={color.value}
                      onClick={() => setSpeakerColor(color.value)}
                      className="w-8 h-8 rounded-full flex items-center justify-center border"
                      style={{ backgroundColor: color.value }}
                      title={color.label}
                    >
                      {speakerColor === color.value && (
                        <Check 
                          size={14} 
                          className={`${color.value === "#FFFFFF" ? "text-black" : "text-white"} drop-shadow-lg`}
                        />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-end border-t p-4 gap-2">
        <Button variant="outline" onClick={onClose}>
          취소
        </Button>
        <Button onClick={downloadImage}>
          저장 및 다운로드
        </Button>
      </CardFooter>
    </Card>
  );
}