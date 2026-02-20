import { T, Var, Plural, Num } from "gt-next";
import { getGT } from "gt-next/server";
import Link from "next/link";
import { playlists } from "@/data";

export default async function PlaylistsPage() {
  const gt = await getGT();

  return (
    <main className="max-w-6xl mx-auto px-6 py-10">
      <T>
        <h1 className="text-2xl font-bold text-neutral-100 mb-2">Playlists</h1>
        <p className="text-neutral-400 mb-8">
          Curated collections for every mood and moment.
        </p>
      </T>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {playlists.map((pl) => (
          <T key={pl.id}>
            <Link href={`/playlist/${pl.id}`} className="block group">
              <div className="rounded-lg bg-neutral-900 border border-neutral-800 overflow-hidden hover:border-neutral-700 transition-colors">
                <div className="aspect-[2/1] relative overflow-hidden">
                  <img
                    src={pl.cover}
                    alt=""
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <h3 className="font-semibold text-neutral-100 text-lg mb-1">
                      <Var>{pl.name}</Var>
                    </h3>
                    <span className="text-xs text-neutral-300">
                      <Plural
                        n={pl.trackCount}
                        one={<><Num>{1}</Num> track</>}
                      >
                        <Num>{pl.trackCount}</Num> tracks
                      </Plural>
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-sm text-neutral-400">
                    <Var>{pl.description}</Var>
                  </p>
                </div>
              </div>
            </Link>
          </T>
        ))}
      </div>
    </main>
  );
}
