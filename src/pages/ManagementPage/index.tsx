import { Calendar } from "../../components/Calendar";

export function ManagementPage() {
  return (
    <div className="mx-auto max-w-6xl">
      <header className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">발표 관리</h1>
        <p className="text-muted-foreground">
          달력으로 발표 신청을 검토하고 관리해요.
        </p>
      </header>

      <Calendar />
    </div>
  );
}
