import type { Metadata } from "next";
import { GTProvider } from "gt-next";
import { getGT } from "gt-next/server";
import { getLocale } from "gt-next/server";
import "../globals.css";

const locales = ["en", "es", "fr", "ja", "zh"];
const baseUrl = "https://music-player.generaltranslation.dev";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const gt = await getGT();

  const title = gt("Music Player — General Translation");
  const description = gt(
    "A music library demo showcasing internationalization with gt-next. Browse albums, tracks, and genres in multiple languages."
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
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: baseUrl,
      languages: Object.fromEntries(locales.map((l) => [l, `${baseUrl}/${l}`])),
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
      <body className="bg-neutral-950 text-neutral-100 min-h-screen antialiased">
        <GTProvider>{children}</GTProvider>
      </body>
    </html>
  );
}
