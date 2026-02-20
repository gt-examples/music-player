import type { Metadata } from "next";
import { Geist } from "next/font/google";
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
            <Header />
            <div className="pb-20">{children}</div>
            <PlayerBar />
          </PlayerProvider>
        </GTProvider>
      </body>
    </html>
  );
}
