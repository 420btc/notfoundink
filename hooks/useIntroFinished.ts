"use client";
import { useEffect, useState } from "react";

/**
 * Returns true if the intro animation is finished (after 3s), false otherwise.
 */
export function useIntroFinished(delay = 3000) {
  const [finished, setFinished] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setFinished(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);
  return finished;
}
