export type NowPlaying = {
  artist: string;
  title: string;
  picture: string | null;
};

const PLAYING_URL =
  'https://radioafricana.com/controllers/playing.php';

const PICTURE_BASE =
  'https://radioafricana.com/station/pictures/';

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

  return {
    artist: current.artist ?? '',
    title: current.title ?? '',
    picture:
      current.picture && current.picture.trim() !== ''
        ? `${PICTURE_BASE}${encodeURIComponent(current.picture)}`
        : null,
  };
}