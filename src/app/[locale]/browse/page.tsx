import { T, Var, Plural, DateTime, Num } from "gt-next";
import { getGT } from "gt-next/server";
import Link from "next/link";
import { albums } from "@/data";

export default async function BrowsePage() {
  const gt = await getGT();

  const genres = [...new Set(albums.map((a) => a.genre))];

  return (
    <main className="max-w-6xl mx-auto px-6 py-10">
      <T>
        <h1 className="text-2xl font-bold text-neutral-100 mb-2">Browse</h1>
        <p className="text-neutral-400 mb-8">
          Explore the full catalog of albums across every genre.
        </p>
      </T>

      {/* Genre filter chips */}
      <div className="flex flex-wrap gap-2 mb-8">
        {genres.map((genre) => (
          <T key={genre}>
            <span className="px-3 py-1.5 rounded-full bg-neutral-900 border border-neutral-800 text-sm text-neutral-300">
              <Var>{genre}</Var>
            </span>
          </T>
        ))}
      </div>

      {/* All albums grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
        {albums.map((album) => (
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
                  <h3 className="font-semibold text-neutral-100 text-sm mb-1 truncate">
                    <Var>{album.title}</Var>
                  </h3>
                  <p className="text-xs text-neutral-400 mb-2">
                    <Var>{album.artist}</Var>
                  </p>
                  <div className="flex items-center justify-between text-xs text-neutral-500">
                    <span>
                      <Plural
                        n={album.tracks.length}
                        one={<><Num>{1}</Num> track</>}
                      >
                        <Num>{album.tracks.length}</Num> tracks
                      </Plural>
                    </span>
                    <span>
                      <DateTime options={{ year: "numeric", month: "short" }}>
                        {album.released}
                      </DateTime>
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </T>
        ))}
      </div>
    </main>
  );
}
