import { Link } from "react-router-dom";
import { ROUTE_PATH } from "../../constants/route";
import { Button } from "../../components/ui/button";

export function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
      <h1 className="mb-8 text-4xl font-bold">AWS Organizer</h1>

      <p className="mb-12 max-w-lg text-lg text-muted-foreground">
        AWS 오거나이저를 위한 발표 및 이벤트 관리 종합 플랫폼입니다.
      </p>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="flex flex-col items-center p-6 text-center rounded-lg border shadow-sm bg-card border-border">
          <h2 className="mb-2 text-xl font-semibold">발표 신청 폼</h2>
          <p className="mb-6 text-muted-foreground">발표를 신청해요.</p>
          <Link to={ROUTE_PATH.PRESENT_FORM}>
            <Button size="lg">신청하기</Button>
          </Link>
        </div>

        <div className="flex flex-col items-center p-6 text-center rounded-lg border shadow-sm bg-card border-border">
          <h2 className="mb-2 text-xl font-semibold">이미지 편집기</h2>
          <p className="mb-6 text-muted-foreground">
            발표 커버 이미지를 생성하고 편집해요.
          </p>
          <Link to={ROUTE_PATH.IMAGE_EDITOR}>
            <Button size="lg">편집기 열기</Button>
          </Link>
        </div>

        <div className="flex flex-col items-center p-6 text-center rounded-lg border shadow-sm bg-card border-border">
          <h2 className="mb-2 text-xl font-semibold">발표</h2>
          <p className="mb-6 text-muted-foreground">
            발표 신청을 검토하고 관리해요.
          </p>
          <Link to={ROUTE_PATH.MANAGEMENT}>
            <Button size="lg">확인하기</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
