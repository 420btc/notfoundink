"use client";
import React, { useRef } from "react";
import Link from "next/link";

interface ParallaxImageButtonProps {
  children: React.ReactNode;
  linkOutside?: string;
  className?: string;
  href?: string;
}

export const ParallaxImageButton: React.FC<ParallaxImageButtonProps> = ({ 
  children, 
  linkOutside, 
  className = "",
  href = "#"
}) => {
  const ref = useRef<HTMLDivElement>(null);

  // Parallax solo en desktop con efecto más notorio
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    console.log("Mouse move event triggered");
    const div = ref.current;
    if (!div) return;
    const { left, top, width, height } = div.getBoundingClientRect();
    const x = ((e.clientX - left) / width - 0.5) * 40; // Mayor inclinación
    const y = ((e.clientY - top) / height - 0.5) * 40;
    div.style.transform = `perspective(800px) rotateY(${-x}deg) rotateX(${y}deg) scale(1.1)`;
    div.style.boxShadow = `0 0 25px 8px rgba(0, 255, 208, 0.8), 0 0 15px 4px rgba(255, 0, 230, 0.8)`;
    div.style.zIndex = "50";
  };

  const handleMouseLeave = () => {
    if (ref.current) {
      ref.current.style.transform = "rotateY(0deg) rotateX(0deg) scale(1)";
      ref.current.style.boxShadow = "none";
      ref.current.style.zIndex = "auto";
    }
  };

  const buttonContent = (
    <div
      ref={ref}
      className={`inline-block transition-all duration-200 will-change-transform rounded-lg px-4 py-2 font-bold bg-gradient-to-r from-nfi-yellow via-nfi-pink to-nfi-blue text-white cursor-pointer ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ overflow: 'visible' }}
    >
      {children}
    </div>
  );

  // Si hay un enlace externo, usar <a> en lugar de Link
  if (linkOutside) {
    return (
      <a href={linkOutside} target="_blank" rel="noopener noreferrer">
        {buttonContent}
      </a>
    );
  }

  // De lo contrario, usar Link para navegación interna
  return <Link href={href}>{buttonContent}</Link>;
};
