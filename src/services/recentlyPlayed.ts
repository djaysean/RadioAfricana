export type RecentlyPlayed = {
  id: string;
  songId: string;
  artist: string;
  title: string;
  picture: string | null;
};

const RECENTLY_PLAYED_URL =
  'https://radioafricana.com/controllers/recentlyplayed.php';

const PICTURE_BASE =
  'https://radioafricana.com/station/pictures/';

const MAX_RECENT_TRACKS = 5;

export async function fetchRecentlyPlayed(): Promise<
  RecentlyPlayed[]
> {
  const response = await fetch(
    RECENTLY_PLAYED_URL,
  );

  if (!response.ok) {
    throw new Error(
      'Unable to fetch recently played songs.',
    );
  }

  const json = await response.json();

  if (!Array.isArray(json)) {
    throw new Error(
      'Invalid recently played response.',
    );
  }

  return json
    .slice(0, MAX_RECENT_TRACKS)
    .map(item => ({
      id: String(item.ID ?? ''),
      songId: String(item.songID ?? ''),
      artist: item.artist ?? '',
      title: item.title ?? '',
      picture:
        item.picture &&
        item.picture.trim() !== ''
          ? `${PICTURE_BASE}${encodeURIComponent(
              item.picture,
            )}`
          : null,
    }));
}