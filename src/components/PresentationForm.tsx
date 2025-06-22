import { addDays } from "date-fns";
import { useState } from "react";
import { useForm } from "react-hook-form";
import ErrorMessage from "./ErrorMessage";
import { Button } from "./ui/button";
import { DatePicker } from "./ui/DatePicker";
import { usePresentationMutation, type PresentationFormData } from "../queries/usePresentationMutation";

// 폼에서 사용 가능한 키워드
const availableKeywords = [
  "AWS",
  "클라우드 컴퓨팅",
  "DevOps",
  "프론트엔드",
  "백엔드",
  "모바일",
];

export function PresentationForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<PresentationFormData>();
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);
  
  // TanStack Query mutation 사용
  const presentationMutation = usePresentationMutation();

  const today = new Date();
  const twoWeeksFromNow = addDays(today, 14);
  const twoMonthsFromNow = addDays(today, 60);

  const watchChoice1 = watch("choice1");
  const watchChoice2 = watch("choice2");
  const watchChoice3 = watch("choice3");

  const onSubmit = async (data: PresentationFormData) => {
    // 키워드 데이터 업데이트
    const formDataWithKeywords = {
      ...data,
      keywords: selectedKeywords,
    };

    presentationMutation.mutate(formDataWithKeywords, {
      onSuccess: () => {
        // 폼 초기화
        reset();
        setSelectedKeywords([]);
      },
    });
  };

  const handleKeywordChange = (keyword: string) => {
    setSelectedKeywords((prev) => {
      // 이미 선택된 경우 제거
      if (prev.includes(keyword)) {
        return prev.filter((k) => k !== keyword);
      }

      // 3개 이상 추가하려고 하면 방지
      if (prev.length >= 3) {
        return prev;
      }

      // 새 키워드 추가
      return [...prev, keyword];
    });

    // 폼 값 업데이트
    setValue("keywords", selectedKeywords);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto space-y-8 max-w-2xl"
    >
      <div className="space-y-6">
        <h2 className="pb-2 text-xl font-semibold border-b">기본 정보</h2>

        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block mb-1 text-sm font-medium">
              이름 <span className="text-destructive">*</span>
            </label>
            <input
              id="name"
              placeholder="이름을 입력하세요"
              className="p-2 w-full rounded-md border border-input bg-background"
              {...register("name", { required: "이름은 필수입니다" })}
            />
            <ErrorMessage error={errors.name?.message} />
          </div>

          <div>
            <label
              htmlFor="position"
              className="block mb-1 text-sm font-medium"
            >
              직책 <span className="text-destructive">*</span>
            </label>
            <input
              id="position"
              placeholder="직책을 입력하세요"
              className="p-2 w-full rounded-md border border-input bg-background"
              {...register("position", { required: "직책은 필수입니다" })}
            />
            <p className="mt-1 text-xs text-muted-foreground">
              귀하의 직책 (학생, 프리랜서, 구직자 등)
            </p>
            <ErrorMessage error={errors.position?.message} />
          </div>

          <div>
            <label htmlFor="phone" className="block mb-1 text-sm font-medium">
              전화번호 <span className="text-destructive">*</span>
            </label>
            <input
              id="phone"
              type="tel"
              placeholder="전화번호를 입력하세요"
              className="p-2 w-full rounded-md border border-input bg-background"
              {...register("phone", {
                required: "전화번호는 필수입니다",
                pattern: {
                  value: /^\d{3}-\d{3,4}-\d{4}$/,
                  message: "전화번호 형식: 010-1234-5678",
                },
              })}
            />
            <p className="mt-1 text-xs text-muted-foreground">
              일정 조율을 위해 연락드리겠습니다.
            </p>
            <ErrorMessage error={errors.phone?.message} />
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="pb-2 text-xl font-semibold border-b">발표 정보</h2>

        <div className="space-y-4">
          <div>
            <label
              htmlFor="presentationType"
              className="block mb-1 text-sm font-medium"
            >
              발표 유형 <span className="text-destructive">*</span>
            </label>
            <select
              id="presentationType"
              className="p-2 w-full rounded-md border border-input bg-background"
              {...register("presentationType", {
                required: "발표 유형은 필수입니다",
              })}
            >
              <option value="">발표 유형을 선택하세요</option>
              <option value="lightning">라이트닝 토크</option>
              <option value="main">메인 발표</option>
            </select>
            <ErrorMessage error={errors.presentationType?.message} />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">
              키워드 <span className="text-destructive">*</span> (최대 3개 선택)
            </label>
            <div className="flex flex-wrap gap-2 mt-2">
              {availableKeywords.map((keyword) => (
                <button
                  key={keyword}
                  type="button"
                  className={`px-3 py-1 text-sm rounded-full transition-colors ${
                    selectedKeywords.includes(keyword)
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
                  onClick={() => handleKeywordChange(keyword)}
                >
                  {keyword}
                </button>
              ))}
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              발표와 가장 가까운 주제를 선택하세요 (최대 3개)
            </p>
            <ErrorMessage error={errors.keywords?.message} />
          </div>

          <div>
            <label htmlFor="title" className="block mb-1 text-sm font-medium">
              제목 <span className="text-destructive">*</span>
            </label>
            <input
              id="title"
              placeholder="발표 제목을 입력하세요"
              className="p-2 w-full rounded-md border border-input bg-background"
              {...register("title", { required: "제목은 필수입니다" })}
            />
            <ErrorMessage error={errors.title?.message} />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block mb-1 text-sm font-medium"
            >
              설명 <span className="text-destructive">*</span>
            </label>
            <textarea
              id="description"
              placeholder="발표 내용을 자세히 설명해 주세요"
              className="p-2 w-full rounded-md border border-input bg-background min-h-32"
              {...register("description", {
                required: "설명은 필수입니다",
                minLength: {
                  value: 20,
                  message: "설명은 최소 20자 이상이어야 합니다",
                },
              })}
            />
            <ErrorMessage error={errors.description?.message} />
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-medium">
              선호 날짜 <span className="text-destructive">*</span>
            </label>
            <p className="text-xs text-muted-foreground">
              발표를 위한 3개의 선호 날짜를 선택해 주세요. 가능한 한 귀하의
              선호도에 맞춰 조정하겠습니다.
            </p>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div>
                <p className="mb-1 text-sm font-medium">첫 번째 선택</p>
                <DatePicker
                  value={watchChoice1}
                  onChange={(date) => setValue("choice1", date)}
                  minDate={twoWeeksFromNow}
                  maxDate={twoMonthsFromNow}
                />
                <ErrorMessage error={errors.choice1?.message} />
              </div>

              <div>
                <p className="mb-1 text-sm font-medium">두 번째 선택</p>
                <DatePicker
                  value={watchChoice2}
                  onChange={(date) => setValue("choice2", date)}
                  minDate={twoWeeksFromNow}
                  maxDate={twoMonthsFromNow}
                />
                <ErrorMessage error={errors.choice2?.message} />
              </div>

              <div>
                <p className="mb-1 text-sm font-medium">세 번째 선택</p>
                <DatePicker
                  value={watchChoice3}
                  onChange={(date) => setValue("choice3", date)}
                  minDate={twoWeeksFromNow}
                  maxDate={twoMonthsFromNow}
                />
                <ErrorMessage error={errors.choice3?.message} />
              </div>
            </div>
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">
              커버 이미지 <span className="text-destructive">*</span>
            </label>
            <input
              type="file"
              className="p-2 w-full rounded-md border border-input bg-background"
              accept=".jpg,.jpeg,.png"
              {...register("image", { required: "커버 이미지는 필수입니다" })}
            />
            <p className="mt-1 text-xs text-muted-foreground">
              귀하를 가장 잘 나타내는 이미지를 업로드하세요 (최대 5MB)
            </p>
            <ErrorMessage error={errors.image?.message} />
          </div>

          <div className="flex items-start space-x-2">
            <input
              id="agreeToTerms"
              type="checkbox"
              className="mt-1"
              {...register("agreeToTerms", {
                required: "약관에 동의해야 합니다",
              })}
            />
            <label htmlFor="agreeToTerms" className="text-sm">
              이 발표 조율을 목적으로 개인정보 처리에 동의합니다.
            </label>
          </div>
          <ErrorMessage error={errors.agreeToTerms?.message} />
        </div>
      </div>

      <Button
        type="submit"
        className="w-full"
        size="lg"
        disabled={presentationMutation.isPending}
      >
        {presentationMutation.isPending ? "제출 중..." : "발표 제출하기"}
      </Button>
    </form>
  );
}
