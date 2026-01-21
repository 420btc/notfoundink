'use client';

import { Button } from "@/components/ui/button"
import { Share2, Check, Copy } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

interface ShareButtonProps {
  title: string;
  text: string;
  url?: string;
}

export function ShareButton({ title, text, url }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const shareUrl = url || window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text,
          url: shareUrl,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      // Fallback to clipboard
      try {
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        toast.success("Enlace copiado al portapapeles");
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error("Failed to copy:", err);
        toast.error("No se pudo copiar el enlace");
      }
    }
  };

  return (
    <Button variant="ghost" size="icon" onClick={handleShare} title="Compartir">
      {copied ? <Check className="h-5 w-5 text-green-500" /> : <Share2 className="h-5 w-5" />}
    </Button>
  );
}
