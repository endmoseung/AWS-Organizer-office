import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function PageLayout({ children }: { children: ReactNode }) {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen">
      <header className="py-4 text-white shadow-md bg-aws-blue">
        <div className="container flex items-center justify-between px-4 mx-auto">
          <Link to="/" className="text-xl font-bold text-aws-orange">
            AWS 밋업 오거나이저
          </Link>

          <nav className="hidden space-x-1 md:flex">
            <Button
              asChild
              variant={location.pathname === "/" ? "default" : "ghost"}
              className="text-white"
              size="sm"
            >
              <Link to="/">홈</Link>
            </Button>

            <Button
              asChild
              variant={location.pathname === "/form" ? "default" : "ghost"}
              className="text-white"
              size="sm"
            >
              <Link to="/form">발표 신청</Link>
            </Button>

            <Button
              asChild
              variant={
                location.pathname === "/management" ? "default" : "ghost"
              }
              className="text-white"
              size="sm"
            >
              <Link to="/management">관리</Link>
            </Button>
          </nav>
        </div>
      </header>

      <main className="flex-grow pb-10">{children}</main>

      <footer className="py-6 mt-auto text-white bg-aws-blue">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col items-center justify-between md:flex-row">
            <div className="mb-4 md:mb-0">
              <p className="text-sm opacity-80">
                © {new Date().getFullYear()} AWS 밋업 오거나이저
              </p>
            </div>

            <div className="flex space-x-4">
              <a
                href="#"
                className="text-sm text-white transition-colors hover:text-aws-orange"
              >
                개인정보처리방침
              </a>
              <a
                href="#"
                className="text-sm text-white transition-colors hover:text-aws-orange"
              >
                이용약관
              </a>
              <a
                href="#"
                className="text-sm text-white transition-colors hover:text-aws-orange"
              >
                문의하기
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
