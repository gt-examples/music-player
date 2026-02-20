"use client";

import { usePlayer } from "@/context/PlayerContext";
import { formatTime, type QueueTrack } from "@/data";

export default function TrackRow({
  track,
  index,
  queue,
}: {
  track: QueueTrack;
  index: number;
  queue: QueueTrack[];
}) {
  const { play, currentTrack, isPlaying } = usePlayer();
  const isActive =
    currentTrack?.albumId === track.albumId &&
    currentTrack?.trackIndex === track.trackIndex;

  return (
    <div
      onClick={() => play(queue, index)}
      className={`grid grid-cols-[auto_1fr_auto] gap-4 px-4 py-3 hover:bg-neutral-900/50 transition-colors group items-center cursor-pointer ${isActive ? "bg-neutral-900/30" : ""}`}
    >
      <span className="text-sm tabular-nums w-6 text-right">
        {isActive && isPlaying ? (
          <span className="text-violet-400">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="inline">
              <rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" />
            </svg>
          </span>
        ) : isActive ? (
          <span className="text-violet-400">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="inline">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        ) : (
          <span className="text-neutral-500">{track.trackIndex + 1}</span>
        )}
      </span>
      <span
        className={`text-sm truncate ${isActive ? "text-violet-400 font-medium" : "text-neutral-200 group-hover:text-neutral-100"}`}
      >
        {track.title}
      </span>
      <span className="text-sm text-neutral-500 tabular-nums">
        {formatTime(track.duration)}
      </span>
    </div>
  );
}
