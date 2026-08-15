export type ProgramArtwork = {
  id: string;
  image: string;
};

type ProgramArtworkResponse = Record<
  string,
  string
>;

const PROGRAM_ARTWORK_API =
  'https://radioafricana.com/controllers/programs.php';

const PROGRAM_ARTWORK_BASE =
  'https://radioafricana.com/station/pictures/';

export async function fetchProgramArtwork(): Promise<
  ProgramArtwork[]
> {
  const response = await fetch(
    PROGRAM_ARTWORK_API,
  );

  if (!response.ok) {
    throw new Error(
      `Unable to fetch Radio Africana programme artwork: ${response.status} ${response.statusText}`,
    );
  }

  const data =
    (await response.json()) as ProgramArtworkResponse;

  if (
    !data ||
    typeof data !== 'object' ||
    Array.isArray(data)
  ) {
    throw new Error(
      'Invalid Radio Africana programme artwork response.',
    );
  }

  const seen = new Set<string>();

  return Object.entries(data)
    .filter(
      ([, filename]) =>
        typeof filename === 'string' &&
        filename.trim().length > 0,
    )
    .map(([id, filename]) => ({
      id,
      image:
        PROGRAM_ARTWORK_BASE +
        encodeURIComponent(
          filename.trim(),
        ),
    }))
    .filter(item => {
      if (seen.has(item.image)) {
        return false;
      }

      seen.add(item.image);
      return true;
    });
}