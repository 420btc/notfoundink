"use client";
import React, { useRef, useState } from "react";

interface LupaMagnifierProps {
  src: string;
  alt?: string;
  className?: string;
  lensSize?: number;
  zoomLevel?: number;
}

export const LupaMagnifier: React.FC<LupaMagnifierProps> = ({
  src,
  alt = "",
  className = "",
  lensSize = 120,
  zoomLevel = 2,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);
  const [mouse, setMouse] = useState({ lensLeft: 0, lensTop: 0, bgX: 0, bgY: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const lensLeft = x - lensSize / 2;
    const lensTop = y - lensSize / 2;
    const bgX = x * zoomLevel - lensSize / 2;
    const bgY = y * zoomLevel - lensSize / 2;
    setMouse({ lensLeft, lensTop, bgX, bgY });
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full ${className}`}
      style={{ display: "block", cursor: "zoom-in" }}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      onMouseMove={handleMouseMove}
    >
      <img
        src={src}
        alt={alt}
        className="object-contain w-full h-full rounded-xl"
        draggable={false}
        style={{ pointerEvents: "none", userSelect: "none" }}
      />
      {show && containerRef.current && (
        <div
          style={{
            position: "absolute",
            left: `${mouse.lensLeft}px`,
            top: `${mouse.lensTop}px`,
            width: lensSize,
            height: lensSize,
            borderRadius: "50%",
            pointerEvents: "none",
            zIndex: 10,
            border: "4px solid #ec407a99",
            boxShadow: "0 0 0 2px #fff, 0 0 16px 4px #ec407a55",
            backgroundImage: `url(${src})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: `${containerRef.current.offsetWidth * zoomLevel}px ${containerRef.current.offsetHeight * zoomLevel}px`,
            backgroundPosition: `-${mouse.bgX}px -${mouse.bgY}px`,
          }}
        />
      )}
    </div>
  );
};
