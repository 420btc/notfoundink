"use client";
import { useEffect, useRef, useState } from "react";

import type { ReactNode, ElementType } from "react";

interface TypewriterOnViewProps {
  text: string;
  speed?: number;
  className?: string;
  as?: ElementType;
  children?: ReactNode;
}

export default function TypewriterOnView({ text, speed = 40, className = '', as = 'p', children }: TypewriterOnViewProps) {
  const [visible, setVisible] = useState(false);
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);
  const ref = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100 && rect.bottom > 0) {
        setVisible(true);
      }
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!visible || done) return;
    if (displayed.length < text.length) {
      const timeout = setTimeout(() => {
        setDisplayed(text.slice(0, displayed.length + 1));
      }, speed);
      return () => clearTimeout(timeout);
    } else {
      setDone(true);
    }
  }, [visible, displayed, text, speed, done]);

  const Tag = as as any;
  return (
    <Tag ref={ref} className={className}>
      {displayed}
      {children}
      <span className="inline-block w-2 animate-pulse text-nfi-pink">{!done && visible && "|"}</span>
    </Tag>
  );
}
