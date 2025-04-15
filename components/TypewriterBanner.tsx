"use client";
import TypewriterText from "@/components/TypewriterText";
import { useIntroFinished } from "@/hooks/useIntroFinished";

export default function TypewriterBanner() {
  const introFinished = useIntroFinished();
  if (!introFinished) return null;
  return (
    <p className="text-nfi-pink font-semibold mb-3">
      <TypewriterText text="Repartiendo arte porque esa es mi cualidad ❤‍🔥" speed={40} />
    </p>
  );
}
