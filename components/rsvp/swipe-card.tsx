"use client";

import { useCallback, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import { Heart, PartyPopper, X } from "lucide-react";
import { rsvpSectionContent } from "@/data/sections";

const rsvpIcons = { heart: Heart, x: X, "party-popper": PartyPopper } as const;

export type RsvpDecision = "yes" | "no";

const SWIPE_THRESHOLD_PX = 110;

interface SwipeCardProps {
  onDecide: (decision: RsvpDecision) => void;
}

export function SwipeCard({ onDecide }: SwipeCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const drag = useRef({ startX: 0, startY: 0, dragging: false });
  const [isExiting, setIsExiting] = useState<RsvpDecision | null>(null);
  const HeartIcon = rsvpIcons[rsvpSectionContent.icons.heart];
  const NoIcon = rsvpIcons[rsvpSectionContent.icons.no];

  const setTransform = useCallback((dx: number, animated: boolean) => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transition = animated ? "transform 0.35s cubic-bezier(0.22, 1, 0.36, 1)" : "";
    const rotation = animated || isExiting ? 0 : dx / 18;
    card.style.transform = `translateX(${dx}px) rotate(${rotation}deg)`;
  }, [isExiting]);

  const finish = useCallback(
    (decision: RsvpDecision) => {
      if (isExiting) return;
      setIsExiting(decision);
      const card = cardRef.current;
      if (card) {
        const flyX = decision === "yes" ? 520 : -520;
        card.style.transition = "transform 0.4s ease-in, opacity 0.4s ease-in";
        card.style.transform = `translateX(${flyX}px) rotate(${decision === "yes" ? 20 : -20}deg)`;
        card.style.opacity = "0";
      }
      window.setTimeout(() => onDecide(decision), 380);
    },
    [isExiting, onDecide]
  );

  function handlePointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    if (isExiting) return;
    cardRef.current?.setPointerCapture(event.pointerId);
    drag.current = {
      startX: event.clientX,
      startY: event.clientY,
      dragging: true
    };
    setTransform(0, false);
  }

  function handlePointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    if (!drag.current.dragging || isExiting) return;

    const dx = event.clientX - drag.current.startX;

    // Aplicamos el movimiento directamente reflejando la posición actual del dedo.
    // Al usar touch-none en el div, el navegador ya no interfiere con el eje horizontal.
    setTransform(dx, false);
  }

  function handlePointerUp(event: ReactPointerEvent<HTMLDivElement>) {
    if (!drag.current.dragging || isExiting) return;
    drag.current.dragging = false;

    const dx = event.clientX - drag.current.startX;

    // Si supera el umbral hacia la derecha o izquierda, toma la decisión.
    // Si se queda corto (incluso si fue y vino), vuelve suavemente al centro.
    if (Math.abs(dx) > SWIPE_THRESHOLD_PX) {
      finish(dx > 0 ? "yes" : "no");
    } else {
      setTransform(0, true);
    }
  }

  return (
    <div className="mx-auto max-w-sm">
      <div
        ref={cardRef}
        role="group"
        aria-label={rsvpSectionContent.cardAriaLabel}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        // Cambiamos touch-pan-y por touch-none para evitar bloqueos del navegador al cambiar de dirección
        className="bg-card border-border relative touch-none cursor-grab rounded-3xl border p-10 text-center shadow-xl shadow-black/10 select-none active:cursor-grabbing"
      >
        <span className="bg-accent text-primary mx-auto flex size-20 items-center justify-center rounded-full">
          <HeartIcon className="size-9" aria-hidden fill="currentColor" />
        </span>
        <h3 className="font-display mt-6 text-2xl text-foreground">{rsvpSectionContent.cardTitle}</h3>
        <p className="text-muted-foreground mt-2 text-sm">{rsvpSectionContent.cardInstruction}</p>
      </div>

      <div className="mt-8 flex items-center justify-center gap-6">
        <button
          type="button"
          onClick={() => finish("no")}
          disabled={!!isExiting}
          aria-label={rsvpSectionContent.noLabel}
          className="border-border text-muted-foreground bg-card hover:bg-muted flex size-14 items-center justify-center rounded-full border-2 shadow-md transition-colors disabled:opacity-50"
        >
          <NoIcon className="size-6" />
        </button>
        <button
          type="button"
          onClick={() => finish("yes")}
          disabled={!!isExiting}
          aria-label={rsvpSectionContent.yesLabel}
          className="bg-primary text-primary-foreground shadow-primary/30 flex size-16 items-center justify-center rounded-full shadow-lg transition-transform hover:scale-105 disabled:opacity-50"
        >
          <HeartIcon className="size-7" fill="currentColor" />
        </button>
      </div>
    </div>
  );
}