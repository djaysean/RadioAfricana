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

function stripHtml(html: string) {
  return html
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&#8230;/g, '...')
    .trim();
}

export async function fetchFeaturedStory(): Promise<Story> {
  const posts = await api.get<WPPost[]>(
    '/posts?_embed&per_page=1'
  );

  const post = posts[0];

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