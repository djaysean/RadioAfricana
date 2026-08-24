import {
  getCachedJson,
  setCachedJson,
} from './cache';

export type NowPlaying = {
  artist: string;
  title: string;
  picture: string | null;
};

type CachedNowPlaying = {
  data: NowPlaying;
  cachedAt: number;
};

const PLAYING_URL =
  'https://radioafricana.com/controllers/playing.php';

const PICTURE_BASE =
  'https://radioafricana.com/station/pictures/';

export const NOW_PLAYING_CACHE_KEY =
  'radioafricana.cache.nowPlaying';

export async function fetchNowPlaying(): Promise<NowPlaying> {
  const response = await fetch(PLAYING_URL);

  if (!response.ok) {
    throw new Error('Unable to fetch now playing information.');
  }

  const json = await response.json();

  if (!Array.isArray(json) || json.length === 0) {
    throw new Error('Invalid now playing response.');
  }

  const current = json[0];

  const data: NowPlaying = {
    artist: current.artist ?? '',
    title: current.title ?? '',
    picture:
      current.picture && current.picture.trim() !== ''
        ? `${PICTURE_BASE}${encodeURIComponent(current.picture)}`
        : null,
  };

  await setCachedJson<CachedNowPlaying>(
    NOW_PLAYING_CACHE_KEY,
    {
      data,
      cachedAt: Date.now(),
    },
  );

  return data;
}

export async function getCachedNowPlaying(): Promise<NowPlaying | null> {
  const cached =
    await getCachedJson<CachedNowPlaying>(
      NOW_PLAYING_CACHE_KEY,
    );

  if (
    !cached ||
    !cached.data ||
    typeof cached.data.artist !== 'string' ||
    typeof cached.data.title !== 'string'
  ) {
    return null;
  }

  return cached.data;
}