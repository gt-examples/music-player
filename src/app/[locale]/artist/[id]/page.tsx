import { T, Var, Plural, DateTime, Num } from "gt-next";
import { getGT } from "gt-next/server";
import Link from "next/link";
import { notFound } from "next/navigation";
import { artists, albums, formatListeners } from "@/data";

export default async function ArtistPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const artist = artists.find((a) => a.id === id);
  if (!artist) notFound();

  const gt = await getGT();
  const artistAlbums = albums.filter((a) => a.artist === artist.name);

  return (
    <main className="max-w-6xl mx-auto px-6 py-10">
      {/* Artist header */}
      <div className="flex flex-col sm:flex-row items-start gap-8 mb-10">
        <img
          src={artist.avatar}
          alt=""
          className="w-32 h-32 rounded-full object-cover shadow-lg flex-shrink-0"
        />
        <div>
          <T>
            <p className="text-xs uppercase tracking-wider text-neutral-500 mb-2">
              Artist
            </p>
          </T>
          <h1 className="text-3xl font-bold text-neutral-100 mb-2">
            {artist.name}
          </h1>
          <T>
            <p className="text-sm text-neutral-400 mb-4 max-w-lg">
              <Var>{artist.bio}</Var>
            </p>
            <div className="flex items-center gap-4 text-sm text-neutral-500">
              <span>
                <Var>{formatListeners(artist.listeners)}</Var> listeners
              </span>
              <span className="text-neutral-600">·</span>
              <span>
                <Plural
                  n={artistAlbums.length}
                  one={<><Num>{1}</Num> album</>}
                >
                  <Num>{artistAlbums.length}</Num> albums
                </Plural>
              </span>
            </div>
          </T>
          <div className="flex flex-wrap gap-2 mt-4">
            {artist.genres.map((g) => (
              <T key={g}>
                <span className="px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-xs text-neutral-400">
                  <Var>{g}</Var>
                </span>
              </T>
            ))}
          </div>
        </div>
      </div>

      {/* Discography */}
      <section>
        <h2 className="text-lg font-semibold text-neutral-100 mb-6">
          {gt("Discography")}
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
          {artistAlbums.map((album) => (
            <T key={album.id}>
              <Link href={`/album/${album.id}`} className="block group">
                <div className="rounded-lg bg-neutral-900 border border-neutral-800 overflow-hidden hover:border-neutral-700 transition-colors">
                  <div className="aspect-square relative overflow-hidden">
                    <img
                      src={album.cover}
                      alt=""
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-3">
                    <h3 className="font-semibold text-neutral-100 text-sm mb-1">
                      <Var>{album.title}</Var>
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-neutral-500">
                      <DateTime options={{ year: "numeric" }}>
                        {album.released}
                      </DateTime>
                      <span className="text-neutral-600">·</span>
                      <Plural
                        n={album.tracks.length}
                        one={<><Num>{1}</Num> track</>}
                      >
                        <Num>{album.tracks.length}</Num> tracks
                      </Plural>
                    </div>
                  </div>
                </div>
              </Link>
            </T>
          ))}
        </div>
      </section>

      <div className="mt-8">
        <Link
          href="/artists"
          className="text-sm text-neutral-400 hover:text-neutral-200 transition-colors"
        >
          {gt("Back to artists")}
        </Link>
      </div>
    </main>
  );
}
