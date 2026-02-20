import { T, Var, Plural, DateTime, Num } from "gt-next";
import { getGT } from "gt-next/server";
import Link from "next/link";
import { notFound } from "next/navigation";
import { albums, formatTime, type QueueTrack } from "@/data";
import AlbumTrackList from "@/components/AlbumTrackList";

export default async function AlbumPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const album = albums.find((a) => a.id === id);
  if (!album) notFound();

  const gt = await getGT();
  const totalDuration = album.tracks.reduce((sum, t) => sum + t.duration, 0);
  const totalMinutes = Math.floor(totalDuration / 60);

  // Build queue for this album
  const queue: QueueTrack[] = album.tracks.map((track, i) => ({
    ...track,
    artist: album.artist,
    album: album.title,
    cover: album.cover,
    albumId: album.id,
    trackIndex: i,
  }));

  return (
    <main className="max-w-6xl mx-auto px-6 py-10">
      {/* Album header */}
      <div className="flex flex-col sm:flex-row gap-8 mb-10">
        <img
          src={album.cover}
          alt=""
          className="w-48 h-48 sm:w-56 sm:h-56 rounded-lg object-cover shadow-lg flex-shrink-0"
        />
        <div className="flex flex-col justify-end">
          <T>
            <p className="text-xs uppercase tracking-wider text-neutral-500 mb-2">
              Album
            </p>
          </T>
          <h1 className="text-3xl font-bold text-neutral-100 mb-2">
            {album.title}
          </h1>
          <T>
            <div className="flex items-center gap-2 text-sm text-neutral-400 mb-4">
              <span className="font-medium text-neutral-200">
                <Var>{album.artist}</Var>
              </span>
              <span className="text-neutral-600">·</span>
              <span>
                <DateTime options={{ year: "numeric" }}>
                  {album.released}
                </DateTime>
              </span>
              <span className="text-neutral-600">·</span>
              <span>
                <Plural
                  n={album.tracks.length}
                  one={<><Num>{1}</Num> track</>}
                >
                  <Num>{album.tracks.length}</Num> tracks
                </Plural>
              </span>
              <span className="text-neutral-600">·</span>
              <span>
                <Plural
                  n={totalMinutes}
                  one={<><Num>{1}</Num> minute</>}
                >
                  <Num>{totalMinutes}</Num> minutes
                </Plural>
              </span>
            </div>
          </T>
          <T>
            <span className="inline-block px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-xs text-neutral-400">
              <Var>{album.genre}</Var>
            </span>
          </T>
        </div>
      </div>

      {/* Track list */}
      <div className="border border-neutral-800 rounded-lg overflow-hidden">
        <div className="grid grid-cols-[auto_1fr_auto] gap-4 px-4 py-2 text-xs text-neutral-500 uppercase tracking-wider border-b border-neutral-800">
          <span>#</span>
          <span>{gt("Title")}</span>
          <span>{gt("Duration")}</span>
        </div>
        <AlbumTrackList tracks={queue} />
      </div>

      <div className="mt-8">
        <Link
          href="/browse"
          className="text-sm text-neutral-400 hover:text-neutral-200 transition-colors"
        >
          {gt("Back to browse")}
        </Link>
      </div>
    </main>
  );
}
