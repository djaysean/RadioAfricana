import { api } from './api';

export type Story = {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  image: string;
  slug: string;
};

type WPPost = {
  id: number;
  slug: string;
  title: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
    }>;
    'wp:term'?: Array<
      Array<{
        name: string;
      }>
    >;
  };
};

const STORIES_PER_PAGE = 10;

function stripHtml(html: string) {
  return html
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&#8230;/g, '...')
    .trim();
}

function mapStory(post: WPPost): Story {
  return {
    id: String(post.id),
    title: post.title.rendered,
    excerpt: stripHtml(post.excerpt.rendered),
    slug: post.slug,

    category:
      post._embedded?.['wp:term']?.[0]?.[0]?.name ??
      'Stories',

    image:
      post._embedded?.['wp:featuredmedia']?.[0]
        ?.source_url ?? '',
  };
}

export async function fetchLatestStories(
  page: number = 1,
): Promise<Story[]> {
  const posts = await api.get<WPPost[]>(
    `/wp/v2/posts?_embed&per_page=${STORIES_PER_PAGE}&page=${page}`,
  );

  return posts.map(mapStory);
}

export async function fetchLatestStory(): Promise<Story> {
  const stories = await fetchLatestStories(1);

  return stories[0];
}