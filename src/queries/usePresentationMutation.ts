import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export interface PresentationFormData {
  name: string;
  position: string;
  phone: string;
  presentationType: "lightning" | "main";
  keywords: string[];
  title: string;
  description: string;
  choice1: Date | null;
  choice2: Date | null;
  choice3: Date | null;
  image: FileList;
  agreeToTerms: boolean;
}

// API 호출 함수 (실제 API 엔드포인트로 교체 필요)
const submitPresentation = async (
  data: PresentationFormData
): Promise<void> => {
  // FormData 생성 (파일 업로드를 위해)
  const formData = new FormData();

  // 기본 필드들 추가
  formData.append("name", data.name);
  formData.append("position", data.position);
  formData.append("phone", data.phone);
  formData.append("presentationType", data.presentationType);
  formData.append("keywords", JSON.stringify(data.keywords));
  formData.append("title", data.title);
  formData.append("description", data.description);
  formData.append("choice1", data.choice1?.toISOString() || "");
  formData.append("choice2", data.choice2?.toISOString() || "");
  formData.append("choice3", data.choice3?.toISOString() || "");
  formData.append("agreeToTerms", data.agreeToTerms.toString());

  // 이미지 파일 추가
  if (data.image && data.image.length > 0) {
    formData.append("image", data.image[0]);
  }
  const response = await fetch("/api/presentations", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("발표 제출에 실패했습니다");
  }

  return response.json();
};

export const usePresentationMutation = () => {
  return useMutation({
    mutationFn: submitPresentation,
    onSuccess: () => {
      toast.success("폼이 성공적으로 제출되었습니다!");
    },
    onError: (error: Error) => {
      console.error("폼 제출 오류:", error);
      toast.error("폼 제출에 실패했습니다. 다시 시도해 주세요.");
    },
  });
};
