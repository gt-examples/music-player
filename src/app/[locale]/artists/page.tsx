import { T, Var, Num } from "gt-next";
import { getGT } from "gt-next/server";
import Link from "next/link";
import { artists, albums, formatListeners } from "@/data";

export default async function ArtistsPage() {
  const gt = await getGT();

  return (
    <main className="max-w-6xl mx-auto px-6 py-10">
      <T>
        <h1 className="text-2xl font-bold text-neutral-100 mb-2">Artists</h1>
        <p className="text-neutral-400 mb-8">
          Meet the artists behind the music in your library.
        </p>
      </T>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {artists.map((artist) => {
          const artistAlbums = albums.filter((a) => a.artist === artist.name);
          return (
            <Link key={artist.id} href={`/artist/${artist.id}`} className="block group">
                <div className="rounded-lg bg-neutral-900 border border-neutral-800 p-6 hover:border-neutral-700 transition-colors">
                  <T>
                    <div className="flex items-center gap-4 mb-4">
                      <img
                        src={artist.avatar}
                        alt=""
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="font-semibold text-neutral-100">
                          <Var>{artist.name}</Var>
                        </h3>
                        <p className="text-xs text-neutral-500">
                          <Var>{formatListeners(artist.listeners)}</Var> listeners
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-neutral-400 line-clamp-2 mb-3">
                      <Var>{artist.bio}</Var>
                    </p>
                  </T>
                  <div className="flex flex-wrap gap-1.5">
                    {artist.genres.map((g) => (
                      <T key={g}>
                        <span className="px-2 py-0.5 rounded-full bg-neutral-800 text-xs text-neutral-400">
                          <Var>{g}</Var>
                        </span>
                      </T>
                    ))}
                  </div>
                </div>
              </Link>
          );
        })}
      </div>
    </main>
  );
}
