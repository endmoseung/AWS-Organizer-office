import { ReactNode } from "react";
import { Sidebar } from "../components/Sidebar";

export function PageLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-auto pl-64">
        <div className="container mx-auto p-6">{children}</div>
      </main>
    </div>
  );
}
