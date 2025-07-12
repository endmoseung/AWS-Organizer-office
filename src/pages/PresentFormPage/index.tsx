import { Toaster } from "react-hot-toast";
import { PresentationForm } from "../../components/PresentationForm";

export function PresentFormPage() {
  return (
    <div className="mx-auto max-w-4xl">
      <Toaster position="top-right" />

      <header className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">발표 제출 양식</h1>
        <p className="text-muted-foreground">
          발표 제안서를 제출하려면 아래 양식을 작성해 주세요.
        </p>
      </header>

      <PresentationForm />
    </div>
  );
}
