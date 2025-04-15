"use client";
import React, { useEffect, useState } from "react";

interface TypewriterTextProps {
  text: string;
  speed?: number; // ms per character
  className?: string;
  onDone?: () => void;
}

const TypewriterText: React.FC<TypewriterTextProps> = ({ text, speed = 40, className, onDone }) => {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (done) return;
    if (displayed.length < text.length) {
      const timeout = setTimeout(() => {
        setDisplayed(text.slice(0, displayed.length + 1));
      }, speed);
      return () => clearTimeout(timeout);
    } else {
      setDone(true);
      if (typeof onDone === 'function') {
        onDone();
      }
    }
  }, [displayed, text, speed, done, onDone]);

  return (
    <span className={className}>
      {displayed}
      <span className="inline-block w-2 animate-pulse text-nfi-pink">
        {!done && "|"}
      </span>
    </span>
  );
};

export default TypewriterText;
