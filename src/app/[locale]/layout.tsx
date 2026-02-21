import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { T } from "gt-next";
import { GTProvider } from "gt-next";
import { getGT } from "gt-next/server";
import Header from "@/components/Header";
import PlayerBar from "@/components/PlayerBar";
import { PlayerProvider } from "@/context/PlayerContext";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const locales = ["en", "es", "fr", "ja", "zh"];
const baseUrl = "https://music-player.generaltranslation.dev";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const gt = await getGT();

  const title = gt("Music Player | General Translation");
  const description = gt(
    "A music library demo showcasing internationalization with gt-next. Browse albums, artists, and playlists in multiple languages."
  );

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: baseUrl,
      siteName: "General Translation",
      type: "website",
      locale,
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
    alternates: {
      canonical: baseUrl,
      languages: Object.fromEntries(locales.map((l) => [l, `/${l}`])),
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  return (
    <html lang={locale}>
      <body
        className={`${geistSans.variable} font-[family-name:var(--font-geist-sans)] bg-neutral-950 text-neutral-100 min-h-screen antialiased`}
      >
        <GTProvider>
          <PlayerProvider>
            <T>
              <div className="bg-neutral-900 border-b border-neutral-800 text-center py-2 px-4 text-xs text-neutral-400">
                This is a demo app built with{" "}
                <a
                  href="https://generaltranslation.com"
                  className="underline hover:text-neutral-200"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  General Translation
                </a>{" "}
                to showcase internationalization. Not a real product.
              </div>
            </T>
            <Header />
            <div className="pb-32">{children}</div>
            <T>
              <footer className="border-t border-neutral-800 py-8 px-6 text-center text-xs text-neutral-500">
                <p className="mb-2">
                  Built with{" "}
                  <a href="https://generaltranslation.com" className="underline hover:text-neutral-300" target="_blank" rel="noopener noreferrer">General Translation</a>,{" "}
                  <a href="https://nextjs.org" className="underline hover:text-neutral-300" target="_blank" rel="noopener noreferrer">Next.js</a>, and{" "}
                  <a href="https://tailwindcss.com" className="underline hover:text-neutral-300" target="_blank" rel="noopener noreferrer">Tailwind CSS</a>.
                </p>
                <p>
                  Audio samples from{" "}
                  <a href="https://www.soundhelix.com" className="underline hover:text-neutral-300" target="_blank" rel="noopener noreferrer">SoundHelix</a>.
                  Photos from{" "}
                  <a href="https://unsplash.com" className="underline hover:text-neutral-300" target="_blank" rel="noopener noreferrer">Unsplash</a>.
                </p>
              </footer>
            </T>
            <PlayerBar />
          </PlayerProvider>
        </GTProvider>
      </body>
    </html>
  );
}
