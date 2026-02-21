# Music Player

A music library and player demo showcasing internationalization with gt-next. Browse albums, discover artists, and explore curated playlists — all fully translated.

**[Live Demo](https://music-player.generaltranslation.dev)** | **[General Translation Docs](https://generaltranslation.com/docs)**

## About

This app simulates a streaming music player with albums, artists, playlists, and a functional audio player bar. Every piece of UI text is internationalized using General Translation's gt-next library, demonstrating how a realistic music app can support multiple languages with minimal effort.

## GT Features Used

- `<T>` — JSX translation with wide wrapping
- `<Var>` — Dynamic values inside translated blocks
- `<Plural>` — Pluralization (track counts, album counts, minutes)
- `<Num>` — Locale-aware number formatting
- `<DateTime>` — Locale-aware date formatting
- `<LocaleSelector>` — Built-in language picker
- `getGT` / `useGT` — Server and client string translations
- `loadTranslations` — Local translation file loading

## Getting Started

```bash
git clone https://github.com/gt-examples/music-player.git
cd music-player
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Built With

- [Next.js](https://nextjs.org)
- [General Translation](https://generaltranslation.com) (gt-next)
- [Tailwind CSS](https://tailwindcss.com)
