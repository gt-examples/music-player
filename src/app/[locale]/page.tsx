import { T, Var, Plural, DateTime, Num, LocaleSelector } from "gt-next";
import { getGT } from "gt-next/server";

const albums = [
  {
    title: "Midnight Frequencies",
    artist: "Neon Pulse",
    tracks: 12,
    released: new Date("2024-03-15"),
    color: "bg-violet-500",
  },
  {
    title: "Amber Roads",
    artist: "The Wayfarers",
    tracks: 10,
    released: new Date("2023-11-02"),
    color: "bg-amber-500",
  },
  {
    title: "Concrete Garden",
    artist: "Mara Voss",
    tracks: 8,
    released: new Date("2024-06-21"),
    color: "bg-emerald-500",
  },
  {
    title: "Signal Lost",
    artist: "404",
    tracks: 14,
    released: new Date("2024-01-08"),
    color: "bg-rose-500",
  },
  {
    title: "Pale Light",
    artist: "Sable",
    tracks: 9,
    released: new Date("2023-08-30"),
    color: "bg-sky-500",
  },
  {
    title: "Iron & Honey",
    artist: "Blackthorn",
    tracks: 11,
    released: new Date("2024-09-12"),
    color: "bg-orange-500",
  },
];

const nowPlaying = {
  title: "Dissolve",
  artist: "Neon Pulse",
  album: "Midnight Frequencies",
  currentTime: 142,
  duration: 264,
};

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function GenreChip({ children }: { children: string }) {
  return (
    <span className="px-3 py-1.5 rounded-full bg-neutral-900 border border-neutral-800 text-sm text-neutral-300 hover:border-neutral-600 hover:text-neutral-100 transition-colors cursor-pointer">
      {children}
    </span>
  );
}

function AlbumCard({
  title,
  artist,
  tracks,
  released,
  color,
}: {
  title: string;
  artist: string;
  tracks: number;
  released: Date;
  color: string;
}) {
  return (
    <T>
      <div className="group rounded-lg bg-neutral-900 border border-neutral-800 overflow-hidden hover:border-neutral-700 transition-colors cursor-pointer">
        <div
          className={`aspect-square ${color} opacity-20 group-hover:opacity-30 transition-opacity relative`}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              className="text-neutral-100 opacity-40"
            >
              <circle cx="12" cy="12" r="10" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-neutral-100 text-sm mb-1">
            <Var>{title}</Var>
          </h3>
          <p className="text-sm text-neutral-400 mb-3">
            <Var>{artist}</Var>
          </p>
          <div className="flex items-center justify-between text-xs text-neutral-500">
            <span>
              <Plural
                n={tracks}
                one={
                  <>
                    <Num>{1}</Num> track
                  </>
                }
              >
                <Num>{tracks}</Num> tracks
              </Plural>
            </span>
            <span>
              <DateTime options={{ year: "numeric", month: "short" }}>
                {released}
              </DateTime>
            </span>
          </div>
        </div>
      </div>
    </T>
  );
}

export default async function Home() {
  const gt = await getGT();

  return (
    <div className="min-h-screen bg-neutral-950 font-sans text-neutral-200 pb-24">
      {/* Header */}
      <header className="border-b border-neutral-800 bg-neutral-950 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <a
              href="https://generaltranslation.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-neutral-400 hover:text-neutral-200 transition-colors"
            >
              General Translation
            </a>
            <span className="text-neutral-700">/</span>
            <h1 className="text-sm font-semibold text-neutral-100">
              {gt("Music Player")}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/gt-examples/music-player"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-neutral-200 transition-colors"
              aria-label="View on GitHub"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </a>
            <LocaleSelector />
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10">
        {/* Genre Categories */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-neutral-100 mb-4">
            {gt("Genres")}
          </h2>
          <div className="flex flex-wrap gap-2">
            <T><GenreChip>Electronic</GenreChip></T>
            <T><GenreChip>Indie Folk</GenreChip></T>
            <T><GenreChip>Alternative</GenreChip></T>
            <T><GenreChip>Post-Rock</GenreChip></T>
            <T><GenreChip>Dream Pop</GenreChip></T>
            <T><GenreChip>Blues Rock</GenreChip></T>
            <T><GenreChip>Jazz</GenreChip></T>
            <T><GenreChip>Classical</GenreChip></T>
          </div>
        </section>

        {/* Albums Grid */}
        <section>
          <h2 className="text-lg font-semibold text-neutral-100 mb-6">
            {gt("Library")}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {albums.map((album) => (
              <AlbumCard key={album.title} {...album} />
            ))}
          </div>
        </section>
      </main>

      {/* Now Playing Bar */}
      <T>
        <div className="fixed bottom-0 left-0 right-0 bg-neutral-900 border-t border-neutral-800 z-20">
          <div className="max-w-5xl mx-auto px-6 py-3 flex items-center justify-between">
            <div className="flex items-center gap-4 min-w-0">
              <div className="w-10 h-10 rounded bg-violet-500 opacity-30 flex-shrink-0 flex items-center justify-center">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="text-neutral-100 opacity-60"
                >
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              </div>
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
              <span className="text-xs text-neutral-500">Now playing</span>
            </div>
          </div>
        </div>
      </T>
    </div>
  );
}
