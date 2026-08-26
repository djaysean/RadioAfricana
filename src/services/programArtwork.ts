export type ProgramArtwork = {
  id: string;
  name: string;
  slug: string;
  image: string;
};

type WordPressFeaturedMedia = {
  source_url?: unknown;
};

type WordPressShow = {
  id?: unknown;
  slug?: unknown;
  status?: unknown;
  title?: {
    rendered?: unknown;
  };
  featured_media?: unknown;
  _embedded?: {
    'wp:featuredmedia'?: WordPressFeaturedMedia[];
  };
};

const WORDPRESS_SHOWS_API =
  'https://radioafricana.com/wp-json/wp/v2/shows';

const WORDPRESS_PER_PAGE = 100;

function stripHtml(
  value: string,
): string {
  return value
    .replace(
      /<[^>]*>/g,
      ' ',
    )
    .replace(
      /&nbsp;/gi,
      ' ',
    )
    .replace(
      /&amp;/gi,
      '&',
    )
    .replace(
      /&quot;/gi,
      '"',
    )
    .replace(
      /&#039;/gi,
      "'",
    )
    .trim();
}

function getShowName(
  show: WordPressShow,
): string {
  const title =
    show.title?.rendered;

  return typeof title === 'string'
    ? stripHtml(title)
    : '';
}

function getShowImage(
  show: WordPressShow,
): string {
  const media =
    show._embedded?.[
      'wp:featuredmedia'
    ]?.[0];

  const sourceUrl =
    media?.source_url;

  return typeof sourceUrl === 'string'
    ? sourceUrl.trim()
    : '';
}

export async function fetchProgramArtwork(): Promise<
  ProgramArtwork[]
> {
  const response =
    await fetch(
      `${WORDPRESS_SHOWS_API}?status=publish&per_page=${WORDPRESS_PER_PAGE}&_embed`,
      {
        method: 'GET',
        headers: {
          Accept:
            'application/json',
        },
      },
    );

  if (!response.ok) {
    throw new Error(
      `Unable to fetch Radio Africana shows: ${response.status} ${response.statusText}`,
    );
  }

  const data =
    (await response.json()) as unknown;

  if (
    !Array.isArray(data)
  ) {
    throw new Error(
      'Invalid Radio Africana WordPress shows response.',
    );
  }

  const seenImages =
    new Set<string>();

  const artwork: ProgramArtwork[] =
    [];

  for (const item of data) {
    const show =
      item as WordPressShow;

    const id =
      typeof show.id === 'number' ||
      typeof show.id === 'string'
        ? String(show.id)
        : '';

    const slug =
      typeof show.slug === 'string'
        ? show.slug.trim()
        : '';

    const name =
      getShowName(show);

    const image =
      getShowImage(show);

    if (
      !id ||
      !name ||
      !slug ||
      !image
    ) {
      continue;
    }

    if (
      seenImages.has(image)
    ) {
      continue;
    }

    seenImages.add(image);

    artwork.push({
      id,
      name,
      slug,
      image,
    });
  }

  return artwork;
}