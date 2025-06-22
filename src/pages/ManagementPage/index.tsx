import { Calendar } from "../../components/Calendar";

export function ManagementPage() {
  return (
    <div className="max-w-6xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Presentation Management</h1>
        <p className="text-muted-foreground">
          Review and manage presentation submissions using the calendar view.
        </p>
      </header>

      <Calendar />
    </div>
  );
}
