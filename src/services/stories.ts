import {decode} from 'he';

import {api} from './api';

export type Story = {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  image: string;
  slug: string;
};

export type StoryDetail = {
  id: string;
  slug: string;
  title: string;
  content: string;
  category: string;
  image: string;
  publishedAt: string;
  link: string;
};

type WPPost = {
  id: number;
  slug: string;
  date: string;
  link: string;

  title: {
    rendered: string;
  };

  excerpt: {
    rendered: string;
  };

  content: {
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

function cleanExcerpt(
  html: string,
): string {
  return decode(
    html
      .replace(/<[^>]*>/g, '')
      .replace(/&nbsp;/g, ' ')
      .trim(),
  );
}

function getCategory(
  post: WPPost,
): string {
  return (
    post._embedded?.['wp:term']?.[0]?.[0]
      ?.name ?? 'Stories'
  );
}

function getImage(
  post: WPPost,
): string {
  return (
    post._embedded?.[
      'wp:featuredmedia'
    ]?.[0]?.source_url ?? ''
  );
}

function mapStory(
  post: WPPost,
): Story {
  return {
    id: String(post.id),

    title: decode(
      post.title.rendered,
    ),

    excerpt: cleanExcerpt(
      post.excerpt.rendered,
    ),

    slug: post.slug,

    category: getCategory(post),

    image: getImage(post),
  };
}

function mapStoryDetail(
  post: WPPost,
): StoryDetail {
  return {
    id: String(post.id),

    slug: post.slug,

    title: decode(
      post.title.rendered,
    ),

    content: decode(
      post.content.rendered,
    ),

    category: getCategory(post),

    image: getImage(post),

    publishedAt: post.date,

    link: post.link,
  };
}

export async function fetchLatestStories(
  page: number = 1,
): Promise<Story[]> {
  const posts =
    await api.get<WPPost[]>(
      `/wp/v2/posts?_embed&per_page=${STORIES_PER_PAGE}&page=${page}`,
    );

  return posts.map(mapStory);
}

export async function fetchLatestStory(): Promise<Story> {
  const stories =
    await fetchLatestStories(1);

  if (stories.length === 0) {
    throw new Error(
      'No stories available.',
    );
  }

  return stories[0];
}

export async function fetchStoryBySlug(
  slug: string,
): Promise<StoryDetail> {
  const posts =
    await api.get<WPPost[]>(
      `/wp/v2/posts?_embed&slug=${encodeURIComponent(
        slug,
      )}`,
    );

  if (posts.length === 0) {
    throw new Error(
      'Story not found.',
    );
  }

  return mapStoryDetail(
    posts[0],
  );
}