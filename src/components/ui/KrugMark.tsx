import { useEffect, useRef } from 'react';
import { Canvg } from 'canvg';

const KrugMark = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const loadSvg = async () => {
      const response = await fetch('/krug-mark.svg');
      const svgText = await response.text();

      if (canvasRef.current) {
        const canvas = canvasRef.current;
        const ctx = canvasRef.current.getContext('2d');
        if (ctx) {
          // 고해상도를 위한 캔버스 크기 조정
          const scale = window.devicePixelRatio || 2; // 디바이스 픽셀 비율
          const width = 100; // 원하는 너비
          const height = 28; // 원하는 높이

          canvas.width = width * scale; // 실제 픽셀 크기
          canvas.height = height * scale + 20 * scale; // 텍스트 공간 추가
          canvas.style.width = `${width}px`; // CSS 크기
          canvas.style.height = `${height + 20}px`; // CSS 크기
          canvas.style.display = 'block'; // 블록 요소로 설정
          canvas.style.marginTop = '-10px'; // 마진 제거
          canvas.style.padding = '0'; // 패딩 제거
          ctx.scale(scale, scale); // 스케일링 적용

          // Canvg로 SVG 렌더링
          const v = await Canvg.from(ctx, svgText);
          v.render();
          ctx.font = '12px Arial'; // 텍스트 스타일 설정
          ctx.fillStyle = '#6c757d'; // 텍스트 색상 설정 (text-muted-foreground)
          ctx.fillText('#프론트엔드 소모임', 8, height + 18); // 텍스트 그리기
        }
      }
    };
    loadSvg();
  }, []);

  return (
    <figure className="flex items-center gap-2">
      <img
        className="md:w-12 w-8"
        src="/aws-logo.png"
        alt="AWS Logo"
        width={48}
        height={48}
      />
      <figcaption className="text-muted-foreground">
        <canvas
          className="block m-0 p-0"
          ref={canvasRef}></canvas>
      </figcaption>
    </figure>
  );
};

export default KrugMark;
