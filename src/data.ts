export type Album = {
  id: string;
  title: string;
  artist: string;
  tracks: Track[];
  released: Date;
  cover: string;
  color: string;
  genre: string;
};

export type Track = {
  title: string;
  duration: number; // seconds
};

export type Artist = {
  id: string;
  name: string;
  bio: string;
  avatar: string;
  genres: string[];
  listeners: number;
};

export const albums: Album[] = [
  {
    id: "midnight-frequencies",
    title: "Midnight Frequencies",
    artist: "Neon Pulse",
    genre: "Electronic",
    released: new Date("2024-03-15"),
    color: "bg-violet-500",
    cover: "https://images.unsplash.com/photo-1614149162883-504ce4d13909?w=400&h=400&fit=crop",
    tracks: [
      { title: "Dissolve", duration: 264 },
      { title: "Neon Rain", duration: 218 },
      { title: "Phase Shift", duration: 303 },
      { title: "Midnight Drive", duration: 245 },
      { title: "Frequency", duration: 192 },
      { title: "Echo Chamber", duration: 278 },
      { title: "Wavelength", duration: 231 },
      { title: "Digital Haze", duration: 199 },
      { title: "Pulse Width", duration: 312 },
      { title: "Static", duration: 257 },
      { title: "Afterglow", duration: 284 },
      { title: "Blackout", duration: 341 },
    ],
  },
  {
    id: "amber-roads",
    title: "Amber Roads",
    artist: "The Wayfarers",
    genre: "Indie Folk",
    released: new Date("2023-11-02"),
    color: "bg-amber-500",
    cover: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=400&fit=crop",
    tracks: [
      { title: "Amber Light", duration: 234 },
      { title: "Wanderer", duration: 198 },
      { title: "Dusty Trail", duration: 267 },
      { title: "Homebound", duration: 223 },
      { title: "Campfire Stories", duration: 289 },
      { title: "Old Highway", duration: 245 },
      { title: "River Crossing", duration: 211 },
      { title: "Golden Hour", duration: 256 },
      { title: "Driftwood", duration: 278 },
      { title: "Last Light", duration: 312 },
    ],
  },
  {
    id: "concrete-garden",
    title: "Concrete Garden",
    artist: "Mara Voss",
    genre: "Alternative",
    released: new Date("2024-06-21"),
    color: "bg-emerald-500",
    cover: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&h=400&fit=crop",
    tracks: [
      { title: "Bloom", duration: 198 },
      { title: "Overgrown", duration: 234 },
      { title: "Concrete Flowers", duration: 267 },
      { title: "Roots", duration: 189 },
      { title: "Greenhouse", duration: 256 },
      { title: "Wild Growth", duration: 223 },
      { title: "Canopy", duration: 278 },
      { title: "Moss", duration: 201 },
    ],
  },
  {
    id: "signal-lost",
    title: "Signal Lost",
    artist: "404",
    genre: "Post-Rock",
    released: new Date("2024-01-08"),
    color: "bg-rose-500",
    cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop",
    tracks: [
      { title: "Dead Air", duration: 345 },
      { title: "White Noise", duration: 267 },
      { title: "Transmission", duration: 298 },
      { title: "Lost Signal", duration: 312 },
      { title: "Interference", duration: 234 },
      { title: "Reconnect", duration: 278 },
      { title: "Broadcast", duration: 256 },
      { title: "Shortwave", duration: 289 },
      { title: "Frequency Drift", duration: 323 },
      { title: "Signal Found", duration: 267 },
      { title: "Clear Channel", duration: 234 },
      { title: "Sign Off", duration: 198 },
      { title: "Static Bloom", duration: 312 },
      { title: "Resonance", duration: 345 },
    ],
  },
  {
    id: "pale-light",
    title: "Pale Light",
    artist: "Sable",
    genre: "Dream Pop",
    released: new Date("2023-08-30"),
    color: "bg-sky-500",
    cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop",
    tracks: [
      { title: "Haze", duration: 234 },
      { title: "Moonwash", duration: 267 },
      { title: "Soft Focus", duration: 198 },
      { title: "Pale Morning", duration: 289 },
      { title: "Shimmer", duration: 223 },
      { title: "Glass", duration: 256 },
      { title: "Velvet", duration: 278 },
      { title: "Fading", duration: 312 },
      { title: "Luminance", duration: 201 },
    ],
  },
  {
    id: "iron-and-honey",
    title: "Iron & Honey",
    artist: "Blackthorn",
    genre: "Blues Rock",
    released: new Date("2024-09-12"),
    color: "bg-orange-500",
    cover: "https://images.unsplash.com/photo-1511735111819-9a3f7709049c?w=400&h=400&fit=crop",
    tracks: [
      { title: "Forge", duration: 234 },
      { title: "Rust Belt", duration: 267 },
      { title: "Sweet Sting", duration: 198 },
      { title: "Anvil", duration: 289 },
      { title: "Molten", duration: 223 },
      { title: "Ironworks", duration: 256 },
      { title: "Honey Trap", duration: 278 },
      { title: "Burnished", duration: 312 },
      { title: "Temper", duration: 201 },
      { title: "Alloy", duration: 245 },
      { title: "Smelt", duration: 189 },
    ],
  },
];

export const artists: Artist[] = [
  {
    id: "neon-pulse",
    name: "Neon Pulse",
    bio: "Electronic duo from Berlin blending analog synths with modern production. Their atmospheric soundscapes have defined the new wave of European electronic music since 2019.",
    avatar: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=200&h=200&fit=crop",
    genres: ["Electronic", "Synthwave", "Ambient"],
    listeners: 842000,
  },
  {
    id: "the-wayfarers",
    name: "The Wayfarers",
    bio: "Four-piece indie folk band from Portland, Oregon. Known for their intimate storytelling and warm acoustic arrangements that evoke the feeling of long road trips through the American West.",
    avatar: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=200&h=200&fit=crop",
    genres: ["Indie Folk", "Americana", "Acoustic"],
    listeners: 523000,
  },
  {
    id: "mara-voss",
    name: "Mara Voss",
    bio: "Solo artist and multi-instrumentalist from Melbourne. Her genre-defying work combines alternative rock with experimental textures, drawing inspiration from urban landscapes and natural growth.",
    avatar: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=200&h=200&fit=crop",
    genres: ["Alternative", "Experimental", "Art Rock"],
    listeners: 367000,
  },
  {
    id: "404",
    name: "404",
    bio: "Post-rock collective from Reykjavik. Their expansive, cinematic compositions build from silence to towering crescendos, exploring themes of connection and disconnection in the digital age.",
    avatar: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=200&h=200&fit=crop",
    genres: ["Post-Rock", "Ambient", "Experimental"],
    listeners: 289000,
  },
  {
    id: "sable",
    name: "Sable",
    bio: "Dream pop project led by vocalist and producer Elise Kang from Seoul. Layered vocals and shimmering guitars create a lush, ethereal world that blurs the line between waking and sleep.",
    avatar: "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=200&h=200&fit=crop",
    genres: ["Dream Pop", "Shoegaze", "Ethereal"],
    listeners: 412000,
  },
  {
    id: "blackthorn",
    name: "Blackthorn",
    bio: "Blues rock trio from Nashville. Raw, gritty, and deeply rooted in tradition while pushing the genre forward with modern production and fearless experimentation.",
    avatar: "https://images.unsplash.com/photo-1501612780327-45045538702b?w=200&h=200&fit=crop",
    genres: ["Blues Rock", "Southern Rock", "Hard Rock"],
    listeners: 198000,
  },
];

export const playlists = [
  {
    id: "late-night-drive",
    name: "Late Night Drive",
    description: "Atmospheric tracks for midnight journeys through the city.",
    trackCount: 24,
    cover: "https://images.unsplash.com/photo-1494783367193-149034c05e8f?w=400&h=400&fit=crop",
  },
  {
    id: "morning-acoustic",
    name: "Morning Acoustic",
    description: "Gentle folk and acoustic tracks to start the day right.",
    trackCount: 18,
    cover: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=400&h=400&fit=crop",
  },
  {
    id: "deep-focus",
    name: "Deep Focus",
    description: "Instrumental post-rock and ambient for uninterrupted concentration.",
    trackCount: 32,
    cover: "https://images.unsplash.com/photo-1483412033650-1015ddeb83d1?w=400&h=400&fit=crop",
  },
  {
    id: "high-energy",
    name: "High Energy",
    description: "Upbeat rock and electronic tracks to power through any task.",
    trackCount: 20,
    cover: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&h=400&fit=crop",
  },
];

export function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function formatListeners(n: number): string {
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000) return `${(n / 1000).toFixed(0)}K`;
  return n.toString();
}
