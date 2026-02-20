import { T, Var, Plural, Num } from "gt-next";
import { getGT } from "gt-next/server";
import Link from "next/link";
import { notFound } from "next/navigation";
import { playlists, albums, formatTime } from "@/data";

export default async function PlaylistPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const playlist = playlists.find((p) => p.id === id);
  if (!playlist) notFound();

  const gt = await getGT();

  // Generate a deterministic set of tracks from available albums
  const allTracks = albums.flatMap((a) =>
    a.tracks.map((t) => ({ ...t, artist: a.artist, albumId: a.id }))
  );
  const playlistTracks = allTracks.slice(0, playlist.trackCount);

  return (
    <main className="max-w-6xl mx-auto px-6 py-10">
      {/* Playlist header */}
      <div className="flex flex-col sm:flex-row gap-8 mb-10">
        <img
          src={playlist.cover}
          alt=""
          className="w-48 h-48 sm:w-56 sm:h-56 rounded-lg object-cover shadow-lg flex-shrink-0"
        />
        <div className="flex flex-col justify-end">
          <T>
            <p className="text-xs uppercase tracking-wider text-neutral-500 mb-2">
              Playlist
            </p>
          </T>
          <T>
            <h1 className="text-3xl font-bold text-neutral-100 mb-2">
              <Var>{playlist.name}</Var>
            </h1>
            <p className="text-sm text-neutral-400 mb-4 max-w-lg">
              <Var>{playlist.description}</Var>
            </p>
            <span className="text-sm text-neutral-500">
              <Plural
                n={playlist.trackCount}
                one={<><Num>{1}</Num> track</>}
              >
                <Num>{playlist.trackCount}</Num> tracks
              </Plural>
            </span>
          </T>
        </div>
      </div>

      {/* Track list */}
      <div className="border border-neutral-800 rounded-lg overflow-hidden">
        <div className="grid grid-cols-[auto_1fr_1fr_auto] gap-4 px-4 py-2 text-xs text-neutral-500 uppercase tracking-wider border-b border-neutral-800">
          <span>#</span>
          <span>{gt("Title")}</span>
          <span>{gt("Artist")}</span>
          <span>{gt("Duration")}</span>
        </div>
        {playlistTracks.map((track, i) => (
          <T key={i}>
            <div className="grid grid-cols-[auto_1fr_1fr_auto] gap-4 px-4 py-3 hover:bg-neutral-900/50 transition-colors group items-center">
              <span className="text-sm text-neutral-500 tabular-nums w-6 text-right">
                <Var>{i + 1}</Var>
              </span>
              <span className="text-sm text-neutral-200 group-hover:text-neutral-100 truncate">
                <Var>{track.title}</Var>
              </span>
              <span className="text-sm text-neutral-400 truncate">
                <Var>{track.artist}</Var>
              </span>
              <span className="text-sm text-neutral-500 tabular-nums">
                <Var>{formatTime(track.duration)}</Var>
              </span>
            </div>
          </T>
        ))}
      </div>

      <div className="mt-8">
        <Link
          href="/playlists"
          className="text-sm text-neutral-400 hover:text-neutral-200 transition-colors"
        >
          {gt("Back to playlists")}
        </Link>
      </div>
    </main>
  );
}
