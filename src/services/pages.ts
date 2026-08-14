import {decode} from 'he';

import {api} from './api';

export type WordPressPage = {
  id: string;
  slug: string;
  title: string;
  content: string;
  link: string;
};

type WPPage = {
  id: number;
  slug: string;
  link: string;

  title: {
    rendered: string;
  };

  content: {
    rendered: string;
  };
};

function mapPage(
  page: WPPage,
): WordPressPage {
  return {
    id: String(page.id),

    slug: page.slug,

    title: decode(
      page.title.rendered,
    ),

    content: decode(
      page.content.rendered,
    ),

    link: page.link,
  };
}

export async function fetchPageBySlug(
  slug: string,
): Promise<WordPressPage> {
  const pages =
    await api.get<WPPage[]>(
      `/wp/v2/pages?slug=${encodeURIComponent(
        slug,
      )}`,
    );

  if (pages.length === 0) {
    throw new Error(
      `WordPress page not found: ${slug}`,
    );
  }

  return mapPage(pages[0]);
}