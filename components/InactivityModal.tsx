"use client";
import { useEffect, useRef, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const INACTIVITY_TIMEOUT = 213000; // 3min 33s in ms

export default function InactivityModal() {
  const [open, setOpen] = useState(false);
  const timer = useRef<NodeJS.Timeout | null>(null);

  // Reset inactivity timer on mouse move
  useEffect(() => {
    const resetTimer = () => {
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setOpen(true), INACTIVITY_TIMEOUT);
    };
    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("mousedown", resetTimer);
    window.addEventListener("keydown", resetTimer);
    resetTimer();
    return () => {
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("mousedown", resetTimer);
      window.removeEventListener("keydown", resetTimer);
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  const handleClose = () => setOpen(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-md mx-auto bg-gradient-to-br from-nfi-yellow/90 via-nfi-pink/80 to-nfi-blue/90 border-4 border-nfi-pink shadow-xl text-center rounded-2xl p-8 animate-fade-in">
        <div className="flex flex-col items-center justify-center gap-4">
          <span className="text-4xl animate-float-medium">🖌️</span>
          <h2 className="font-cartoon text-2xl md:text-3xl text-white drop-shadow-glow">Eh, ¡tú! Sí, tú...</h2>
          <p className="text-lg text-white font-semibold leading-snug">
            ¿Te quedaste pensando?<br/>
            <span className="text-nfi-yellow">Pues ve a <Link href='/pedidos' className='underline hover:text-nfi-pink'>Pedidos</Link> y pide un dibujo a Anamari</span> <br/>
            ¡Flipa con su arte, antes de quedarte ahí pensando!
          </p>
          <Button onClick={handleClose} className="mx-auto mt-4 bg-nfi-pink text-white font-bold rounded-full px-8 py-2 text-base shadow-lg hover:bg-nfi-yellow hover:text-nfi-blue transition-all">
            Cerrar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
