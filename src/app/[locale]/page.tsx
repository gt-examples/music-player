import { T, Var, Plural, DateTime, Num } from "gt-next";
import { getGT } from "gt-next/server";
import Link from "next/link";
import { albums, playlists } from "@/data";

function GenreChip({ children }: { children: string }) {
  return (
    <span className="px-3 py-1.5 rounded-full bg-neutral-900 border border-neutral-800 text-sm text-neutral-300 hover:border-neutral-600 hover:text-neutral-100 transition-colors cursor-pointer">
      {children}
    </span>
  );
}

function AlbumCard({
  id,
  title,
  artist,
  tracks,
  released,
  cover,
}: {
  id: string;
  title: string;
  artist: string;
  tracks: number;
  released: Date;
  cover: string;
}) {
  return (
    <T>
      <Link href={`/album/${id}`} className="block group">
        <div className="rounded-lg bg-neutral-900 border border-neutral-800 overflow-hidden hover:border-neutral-700 transition-colors">
          <div className="aspect-square relative overflow-hidden">
            <img
              src={cover}
              alt=""
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
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
      </Link>
    </T>
  );
}

function PlaylistCard({
  id,
  name,
  description,
  trackCount,
  cover,
}: {
  id: string;
  name: string;
  description: string;
  trackCount: number;
  cover: string;
}) {
  return (
    <T>
      <Link href={`/playlist/${id}`} className="block group">
        <div className="flex gap-4 p-4 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-neutral-700 transition-colors">
          <img
            src={cover}
            alt=""
            className="w-16 h-16 rounded object-cover flex-shrink-0"
          />
          <div className="min-w-0">
            <h3 className="font-semibold text-neutral-100 text-sm mb-1">
              <Var>{name}</Var>
            </h3>
            <p className="text-xs text-neutral-400 mb-2 line-clamp-1">
              <Var>{description}</Var>
            </p>
            <span className="text-xs text-neutral-500">
              <Plural
                n={trackCount}
                one={
                  <>
                    <Num>{1}</Num> track
                  </>
                }
              >
                <Num>{trackCount}</Num> tracks
              </Plural>
            </span>
          </div>
        </div>
      </Link>
    </T>
  );
}

export default async function Home() {
  const gt = await getGT();

  return (
    <main className="max-w-6xl mx-auto px-6 py-10">
      {/* Hero */}
      <section className="mb-12">
        <T>
          <h1 className="text-3xl font-bold text-neutral-100 mb-2">
            Your music, every language
          </h1>
          <p className="text-neutral-400 max-w-xl">
            Browse your library, discover new artists, and explore playlists — all fully translated with General Translation.
          </p>
        </T>
      </section>

      {/* Genres */}
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

      {/* Albums */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-neutral-100">
            {gt("Library")}
          </h2>
          <Link
            href="/browse"
            className="text-sm text-neutral-400 hover:text-neutral-200 transition-colors"
          >
            {gt("View all")}
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-5">
          {albums.slice(0, 6).map((album) => (
            <AlbumCard
              key={album.id}
              id={album.id}
              title={album.title}
              artist={album.artist}
              tracks={album.tracks.length}
              released={album.released}
              cover={album.cover}
            />
          ))}
        </div>
      </section>

      {/* Playlists */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-neutral-100">
            {gt("Playlists")}
          </h2>
          <Link
            href="/playlists"
            className="text-sm text-neutral-400 hover:text-neutral-200 transition-colors"
          >
            {gt("View all")}
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {playlists.map((pl) => (
            <PlaylistCard key={pl.id} {...pl} />
          ))}
        </div>
      </section>
    </main>
  );
}
