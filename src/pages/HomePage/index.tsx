import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ROUTE_PATH } from "@/constants/route";

export function HomePage() {
  const navigate = useNavigate();

  const navigateToForm = () => {
    navigate(ROUTE_PATH.PRESENT_FORM);
  };

  const navigateToManagement = () => {
    navigate(ROUTE_PATH.MANAGEMENT);
  };

  return (
    <div className="container p-4 mx-auto max-w-7xl">
      <div className="mb-10 text-center">
        <h1 className="mb-2 text-3xl font-bold text-aws-blue">
          AWS 밋업 오거나이저
        </h1>
        <p className="text-lg text-aws-text-gray">
          쉽고 효율적인 밋업 발표 관리 플랫폼
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="shadow-aws-card">
          <CardHeader className="text-white bg-aws-blue">
            <CardTitle>발표 신청</CardTitle>
            <CardDescription className="text-white/80">
              밋업에서 발표하고 싶으신가요?
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <p className="mb-4 text-sm">
              여러분의 지식과 경험을 AWS 커뮤니티와 공유하세요. 밋업 발표는
              클라우드 경험을 공유하고 네트워킹할 수 있는 좋은 기회입니다.
            </p>
            <ul className="mb-6 space-y-2 text-sm">
              <li className="flex items-start">
                <span className="mr-2 text-aws-orange">•</span>
                <span>메인 발표 (40분) 또는 라이트닝 토크 (10분)</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-aws-orange">•</span>
                <span>AWS 관련 기술, 프로젝트, 경험 공유</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-aws-orange">•</span>
                <span>발표자에게는 소정의 기념품이 제공됩니다</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter className="p-4 border-t">
            <Button onClick={navigateToForm} className="w-full">
              발표 신청하기
            </Button>
          </CardFooter>
        </Card>

        <Card className="shadow-aws-card">
          <CardHeader className="bg-aws-orange text-aws-blue">
            <CardTitle>오거나이저 관리</CardTitle>
            <CardDescription className="text-aws-blue/80">
              밋업 오거나이저이신가요?
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <p className="mb-4 text-sm">
              발표 신청을 검토하고 일정을 효율적으로 관리할 수 있습니다. 캘린더
              뷰에서 한눈에 일정을 파악하고 관리하세요.
            </p>
            <ul className="mb-6 space-y-2 text-sm">
              <li className="flex items-start">
                <span className="mr-2 text-aws-blue">•</span>
                <span>발표 신청 검토 및 승인/거절</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-aws-blue">•</span>
                <span>캘린더 기반 일정 관리</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-aws-blue">•</span>
                <span>밋업 이미지 에디터 기능</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter className="p-4 border-t">
            <Button
              onClick={navigateToManagement}
              variant="secondary"
              className="w-full"
            >
              관리 페이지 이동
            </Button>
          </CardFooter>
        </Card>

        <Card className="shadow-aws-card">
          <CardHeader className="bg-aws-light-gray text-aws-blue">
            <CardTitle>자주 묻는 질문</CardTitle>
            <CardDescription className="text-aws-blue/80">
              밋업에 대해 더 알고 싶으신가요?
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div>
                <h3 className="mb-1 text-sm font-semibold">
                  밋업은 어디서 열리나요?
                </h3>
                <p className="text-xs text-muted-foreground">
                  서울 성수동 일대의 공간에서 매월 진행됩니다. 자세한 위치는
                  승인된 발표자에게 개별 안내됩니다.
                </p>
              </div>

              <div>
                <h3 className="mb-1 text-sm font-semibold">
                  누구나 참여할 수 있나요?
                </h3>
                <p className="text-xs text-muted-foreground">
                  네, AWS에 관심 있는 모든 분들이 참여하실 수 있습니다. 발표자
                  및 참가자 모두 환영합니다.
                </p>
              </div>

              <div>
                <h3 className="mb-1 text-sm font-semibold">
                  발표 주제는 어떻게 선정되나요?
                </h3>
                <p className="text-xs text-muted-foreground">
                  AWS 서비스, 아키텍처, 사례 연구 등 AWS 관련 모든 주제가
                  가능합니다. 오거나이저 검토 후 승인됩니다.
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="p-4 border-t">
            <Button variant="outline" className="w-full">
              자세히 알아보기
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
