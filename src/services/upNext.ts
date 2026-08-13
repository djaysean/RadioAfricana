export type UpNext = {
  artist: string;
  title: string;
  picture: string | null;
};

const UP_NEXT_URL =
  'https://radioafricana.com/controllers/queuesong.php';

const PICTURE_BASE =
  'https://radioafricana.com/station/pictures/';

export async function fetchUpNext(): Promise<UpNext | null> {
  const response = await fetch(UP_NEXT_URL);

  if (!response.ok) {
    throw new Error('Unable to fetch the next song.');
  }

  const json = await response.json();

  if (!Array.isArray(json) || json.length === 0) {
    return null;
  }

  const next = json[0];

  return {
    artist: next.artist ?? '',
    title: next.title ?? '',
    picture:
      next.picture && next.picture.trim() !== ''
        ? `${PICTURE_BASE}${encodeURIComponent(next.picture)}`
        : null,
  };
}