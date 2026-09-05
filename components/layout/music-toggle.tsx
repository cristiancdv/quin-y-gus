"use client";

import { useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Floating bottom-right button that toggles background music, matching the
 * reference design. Starts muted/paused by default — autoplaying audio
 * without a gesture is both bad UX and blocked by most browsers anyway.
 *
 * No track ships with this base project: drop a file at
 * `public/audio/song.mp3` (see README) and this will just work. Until
 * then the button is inert and fails silently instead of throwing.
 */
export function MusicToggle() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  function toggle() {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      return;
    }

    audio
      .play()
      .then(() => setIsPlaying(true))
      .catch(() => {
        // No audio file configured yet, or the browser blocked playback.
        setIsPlaying(false);
      });
  }

  return (
    <>
      <audio ref={audioRef} src="/audio/song.mp3" loop preload="none" />
      <button
        type="button"
        onClick={toggle}
        aria-pressed={isPlaying}
        aria-label={isPlaying ? "Pausar música de fondo" : "Reproducir música de fondo"}
        className={cn(
          "fixed right-5 bottom-5 z-40 flex size-12 items-center justify-center rounded-full",
          "bg-card text-foreground border-border border shadow-lg shadow-black/10",
          "hover:bg-muted transition-colors",
          "focus-visible:ring-ring focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
        )}
      >
        {isPlaying ? <Volume2 className="size-5" /> : <VolumeX className="size-5" />}
      </button>
    </>
  );
}
