"use client";

import TrackRow from "./TrackRow";
import { type QueueTrack } from "@/data";

export default function AlbumTrackList({ tracks }: { tracks: QueueTrack[] }) {
  return (
    <>
      {tracks.map((track, i) => (
        <TrackRow key={i} track={track} index={i} queue={tracks} />
      ))}
    </>
  );
}
