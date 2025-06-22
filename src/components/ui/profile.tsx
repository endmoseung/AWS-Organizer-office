import React, { useRef, useEffect, useState, useLayoutEffect } from 'react';

interface ProfileImageCanvasProps {
  src: string;
  alt?: string;
  className?: string; // canvas 요소 자체에 적용될 클래스 (예: "w-full h-full")
}

const Profile: React.FC<ProfileImageCanvasProps> = ({ src, className }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [canvasSize, setCanvasSize] = useState<{
    width: number;
    height: number;
  }>({ width: 0, height: 0 });

  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      if (canvas.offsetWidth > 0 && canvas.offsetHeight > 0) {
        if (
          canvasSize.width !== canvas.offsetWidth ||
          canvasSize.height !== canvas.offsetHeight
        ) {
          setCanvasSize({
            width: canvas.offsetWidth,
            height: canvas.offsetHeight,
          });
        }
      } else {
        console.warn(
          "[ProfileImageCanvas] Canvas dimensions are 0. Ensure it's visible and has size."
        );
      }
    }
  }, [className]);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas || canvasSize.width === 0 || canvasSize.height === 0) {
      return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.error('[ProfileImageCanvas] Failed to get 2D context');
      return;
    }

    const logicalDisplaySize = Math.min(canvasSize.width, canvasSize.height);

    const dpr = window.devicePixelRatio || 1; // HiDPI 지원
    // 캔버스 드로잉 버퍼 크기 설정
    canvas.width = logicalDisplaySize * dpr;
    canvas.height = logicalDisplaySize * dpr;

    // 컨텍스트 스케일링 (이후 모든 드로잉 연산은 logicalDisplaySize 기준)
    ctx.scale(dpr, dpr);

    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = () => {
      // 이전 그림 클리어
      ctx.clearRect(0, 0, logicalDisplaySize, logicalDisplaySize);

      const imgAspect = img.naturalWidth / img.naturalHeight;
      let sx = 0,
        sy = 0,
        sWidth = img.naturalWidth,
        sHeight = img.naturalHeight;

      if (imgAspect > 1) {
        // 이미지가 대상(정사각형)보다 가로로 넓을 때
        sWidth = img.naturalHeight;
        sx = (img.naturalWidth - sWidth) / 2;
      } else if (imgAspect < 1) {
        // 이미지가 대상(정사각형)보다 세로로 길 때
        sHeight = img.naturalWidth;
        sy = (img.naturalHeight - sHeight) / 2;
      }

      ctx.beginPath();
      ctx.arc(
        logicalDisplaySize / 2,
        logicalDisplaySize / 2,
        logicalDisplaySize / 2,
        0,
        Math.PI * 2,
        true
      );
      ctx.clip();

      ctx.drawImage(
        img,
        sx,
        sy,
        sWidth,
        sHeight,
        0,
        0,
        logicalDisplaySize,
        logicalDisplaySize
      );
    };
    img.onerror = () => {
      console.error(`[ProfileImageCanvas] Failed to load image: ${src}`);
      // 오류 시 대체 placeholder 그리기 (선택 사항)
      ctx.clearRect(0, 0, logicalDisplaySize, logicalDisplaySize);
      ctx.fillStyle = '#e0e0e0'; // 연한 회색 배경
      ctx.beginPath();
      ctx.arc(
        logicalDisplaySize / 2,
        logicalDisplaySize / 2,
        logicalDisplaySize / 2,
        0,
        Math.PI * 2,
        true
      );
      ctx.fill();
      ctx.fillStyle = '#a0a0a0';
      ctx.font = `${Math.max(10, logicalDisplaySize / 8)}px Arial`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('Error', logicalDisplaySize / 2, logicalDisplaySize / 2);
    };
    img.src = src;
  }, [src, canvasSize]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
    />
  );
};

export default Profile;
