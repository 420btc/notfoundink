"use client";
import React, { useRef } from "react";

interface ParallaxImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  className?: string;
}

export const ParallaxImage: React.FC<ParallaxImageProps> = ({ className = "", style, width, height, ...props }) => {
  // Ignorar el prop 'fill' si viene de Next.js
  const { fill, ...rest } = props as any;
  const ref = useRef<HTMLDivElement>(null);

  // Parallax solo en desktop
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (window.innerWidth < 768) return; // Solo desktop
    const div = ref.current;
    if (!div) return;
    const { left, top, width, height } = div.getBoundingClientRect();
    const x = ((e.clientX - left) / width - 0.5) * 60;
    const y = ((e.clientY - top) / height - 0.5) * 60;
    div.style.transform = `rotateY(${-x}deg) rotateX(${y}deg) scale(1.08)`;
    div.style.boxShadow = `0 0 32px 8px #00ffd0cc, 0 0 24px 4px #ff00e6cc, 0 0 12px 2px #ffe600cc, 0 0 24px 4px #00c6ffcc`;
    div.style.zIndex = "20";
  };

  const handleMouseLeave = () => {
    if (ref.current) {
      ref.current.style.transform = "rotateY(0deg) rotateX(0deg) scale(1)";
      ref.current.style.boxShadow = "none";
      ref.current.style.zIndex = "auto";
    }
  };

  return (
    <div
      ref={ref}
      className={`transition-transform duration-300 will-change-transform ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 600, overflow: 'visible' }}
    >
      <img
        {...rest}
        style={{ width: '100%', height: '100%', ...style }}
        className={`w-full h-full object-cover rounded-xl ${className}`}
      />
    </div>
  );
};

