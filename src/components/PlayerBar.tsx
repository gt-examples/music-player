"use client";

import { usePlayer } from "@/context/PlayerContext";
import { formatTime } from "@/data";
import { useGT } from "gt-next/client";

export default function PlayerBar() {
  const t = useGT();
  const {
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    volume,
    shuffle,
    togglePlay,
    next,
    previous,
    seek,
    setVolume,
    toggleShuffle,
  } = usePlayer();

  if (!currentTrack) return null;

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-neutral-900/95 backdrop-blur-sm border-t border-neutral-800 z-20">
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center gap-4">
        {/* Track info */}
        <div className="flex items-center gap-3 min-w-0 w-56 flex-shrink-0">
          <img
            src={currentTrack.cover}
            alt=""
            className="w-10 h-10 rounded object-cover flex-shrink-0"
          />
          <div className="min-w-0">
            <p className="text-sm font-medium text-neutral-100 truncate">
              {currentTrack.title}
            </p>
            <p className="text-xs text-neutral-400 truncate">
              {currentTrack.artist}
            </p>
          </div>
        </div>

        {/* Controls + progress */}
        <div className="flex-1 flex flex-col items-center gap-1">
          <div className="flex items-center gap-3">
            {/* Shuffle */}
            <button
              onClick={toggleShuffle}
              className={`p-1 transition-colors ${shuffle ? "text-violet-400" : "text-neutral-500 hover:text-neutral-300"}`}
              title={t("Shuffle")}
              aria-label={t("Shuffle")}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="16 3 21 3 21 8" /><line x1="4" y1="20" x2="21" y2="3" />
                <polyline points="21 16 21 21 16 21" /><line x1="15" y1="15" x2="21" y2="21" />
                <line x1="4" y1="4" x2="9" y2="9" />
              </svg>
            </button>

            {/* Previous */}
            <button
              onClick={previous}
              className="p-1 text-neutral-400 hover:text-neutral-100 transition-colors"
              title={t("Previous")}
              aria-label={t("Previous")}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
              </svg>
            </button>

            {/* Play/Pause */}
            <button
              onClick={togglePlay}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-neutral-100 text-neutral-900 hover:bg-white transition-colors"
              title={isPlaying ? t("Pause") : t("Play")}
              aria-label={isPlaying ? t("Pause") : t("Play")}
            >
              {isPlaying ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" />
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>

            {/* Next */}
            <button
              onClick={next}
              className="p-1 text-neutral-400 hover:text-neutral-100 transition-colors"
              title={t("Skip")}
              aria-label={t("Skip")}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
              </svg>
            </button>
          </div>

          {/* Progress bar */}
          <div className="w-full max-w-md flex items-center gap-2">
            <span className="text-xs text-neutral-500 tabular-nums w-10 text-right">
              {formatTime(currentTime)}
            </span>
            <div
              className="flex-1 h-1 bg-neutral-800 rounded-full cursor-pointer group relative"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const ratio = (e.clientX - rect.left) / rect.width;
                seek(ratio * duration);
              }}
            >
              <div
                className="h-full bg-violet-500 rounded-full relative"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
            <span className="text-xs text-neutral-500 tabular-nums w-10">
              {formatTime(duration)}
            </span>
          </div>
        </div>

        {/* Volume */}
        <div className="hidden sm:flex items-center gap-2 w-32 flex-shrink-0">
          <button
            onClick={() => setVolume(volume > 0 ? 0 : 0.7)}
            className="p-1 text-neutral-400 hover:text-neutral-100 transition-colors"
            title={t("Volume")}
            aria-label={t("Volume")}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              {volume === 0 ? (
                <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
              ) : (
                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
              )}
            </svg>
          </button>
          <div
            className="flex-1 h-1 bg-neutral-800 rounded-full cursor-pointer"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
              setVolume(ratio);
            }}
          >
            <div
              className="h-full bg-neutral-400 rounded-full"
              style={{ width: `${volume * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
