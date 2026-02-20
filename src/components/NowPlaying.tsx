import { T, Var } from "gt-next";
import { getGT } from "gt-next/server";
import { formatTime } from "@/data";

const nowPlaying = {
  title: "Dissolve",
  artist: "Neon Pulse",
  album: "Midnight Frequencies",
  currentTime: 142,
  duration: 264,
  cover: "https://images.unsplash.com/photo-1614149162883-504ce4d13909?w=80&h=80&fit=crop",
};

export default async function NowPlaying() {
  const gt = await getGT();

  return (
    <T>
      <div className="fixed bottom-0 left-0 right-0 bg-neutral-900/95 backdrop-blur-sm border-t border-neutral-800 z-20">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4 min-w-0">
            <img
              src={nowPlaying.cover}
              alt=""
              className="w-10 h-10 rounded object-cover flex-shrink-0"
            />
            <div className="min-w-0">
              <p className="text-sm font-medium text-neutral-100 truncate">
                <Var>{nowPlaying.title}</Var>
              </p>
              <p className="text-xs text-neutral-400 truncate">
                <Var>{nowPlaying.artist}</Var> — <Var>{nowPlaying.album}</Var>
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-3">
              <span className="text-xs text-neutral-500 tabular-nums">
                <Var>{formatTime(nowPlaying.currentTime)}</Var>
              </span>
              <div className="w-48 h-1 bg-neutral-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-violet-500 rounded-full"
                  style={{
                    width: `${(nowPlaying.currentTime / nowPlaying.duration) * 100}%`,
                  }}
                />
              </div>
              <span className="text-xs text-neutral-500 tabular-nums">
                <Var>{formatTime(nowPlaying.duration)}</Var>
              </span>
            </div>
            <span className="text-xs text-neutral-500"><Var>{gt("Now playing")}</Var></span>
          </div>
        </div>
      </div>
    </T>
  );
}
