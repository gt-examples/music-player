"use client";

import {
  createContext,
  useContext,
  useRef,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";
import { type QueueTrack } from "@/data";

type PlayerState = {
  queue: QueueTrack[];
  currentIndex: number;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  shuffle: boolean;
};

type PlayerContextType = PlayerState & {
  play: (queue: QueueTrack[], index: number) => void;
  togglePlay: () => void;
  next: () => void;
  previous: () => void;
  seek: (time: number) => void;
  setVolume: (v: number) => void;
  toggleShuffle: () => void;
  currentTrack: QueueTrack | null;
};

const PlayerContext = createContext<PlayerContextType | null>(null);

export function usePlayer() {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error("usePlayer must be used within PlayerProvider");
  return ctx;
}

export function PlayerProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [state, setState] = useState<PlayerState>({
    queue: [],
    currentIndex: 0,
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    volume: 0.7,
    shuffle: false,
  });

  // Initialize audio element once
  useEffect(() => {
    const audio = new Audio();
    audio.volume = 0.7;
    audioRef.current = audio;

    audio.addEventListener("timeupdate", () => {
      setState((s) => ({ ...s, currentTime: audio.currentTime }));
    });
    audio.addEventListener("loadedmetadata", () => {
      setState((s) => ({ ...s, duration: audio.duration }));
    });
    audio.addEventListener("ended", () => {
      // Auto-advance
      setState((prev) => {
        const nextIndex = getNextIndex(prev);
        if (nextIndex !== null) {
          loadAndPlay(audio, prev.queue[nextIndex].audioUrl);
          return { ...prev, currentIndex: nextIndex, currentTime: 0 };
        }
        return { ...prev, isPlaying: false };
      });
    });

    return () => {
      audio.pause();
      audio.src = "";
    };
  }, []);

  function getNextIndex(s: PlayerState): number | null {
    if (s.queue.length === 0) return null;
    if (s.shuffle) {
      if (s.queue.length === 1) return 0;
      let next: number;
      do {
        next = Math.floor(Math.random() * s.queue.length);
      } while (next === s.currentIndex);
      return next;
    }
    const next = s.currentIndex + 1;
    return next < s.queue.length ? next : 0;
  }

  function loadAndPlay(audio: HTMLAudioElement, url: string) {
    audio.src = url;
    audio.play().catch(() => {});
  }

  const play = useCallback((queue: QueueTrack[], index: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    loadAndPlay(audio, queue[index].audioUrl);
    setState((s) => ({
      ...s,
      queue,
      currentIndex: index,
      isPlaying: true,
      currentTime: 0,
    }));
  }, []);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || !audio.src) return;
    if (audio.paused) {
      audio.play().catch(() => {});
      setState((s) => ({ ...s, isPlaying: true }));
    } else {
      audio.pause();
      setState((s) => ({ ...s, isPlaying: false }));
    }
  }, []);

  const next = useCallback(() => {
    setState((prev) => {
      const nextIdx = getNextIndex(prev);
      if (nextIdx !== null && audioRef.current) {
        loadAndPlay(audioRef.current, prev.queue[nextIdx].audioUrl);
        return { ...prev, currentIndex: nextIdx, isPlaying: true, currentTime: 0 };
      }
      return prev;
    });
  }, []);

  const previous = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    // If more than 3 seconds in, restart current track
    if (audio.currentTime > 3) {
      audio.currentTime = 0;
      return;
    }
    setState((prev) => {
      const prevIdx = prev.shuffle
        ? Math.floor(Math.random() * prev.queue.length)
        : prev.currentIndex > 0
          ? prev.currentIndex - 1
          : prev.queue.length - 1;
      loadAndPlay(audio, prev.queue[prevIdx].audioUrl);
      return { ...prev, currentIndex: prevIdx, isPlaying: true, currentTime: 0 };
    });
  }, []);

  const seek = useCallback((time: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = time;
    setState((s) => ({ ...s, currentTime: time }));
  }, []);

  const setVolume = useCallback((v: number) => {
    const audio = audioRef.current;
    if (audio) audio.volume = v;
    setState((s) => ({ ...s, volume: v }));
  }, []);

  const toggleShuffle = useCallback(() => {
    setState((s) => ({ ...s, shuffle: !s.shuffle }));
  }, []);

  const currentTrack =
    state.queue.length > 0 ? state.queue[state.currentIndex] : null;

  return (
    <PlayerContext.Provider
      value={{
        ...state,
        play,
        togglePlay,
        next,
        previous,
        seek,
        setVolume,
        toggleShuffle,
        currentTrack,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}
