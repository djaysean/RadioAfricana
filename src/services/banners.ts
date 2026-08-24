import {api} from './api';

import {
  getCachedJson,
  setCachedJson,
} from './cache';

export type Banner = {
  id: number;
  image: string;
  alt: string;
  title: string;
  subtitle: string;
  button: string;
  link: string;
  hasLink: boolean;
};

type CachedBanners = {
  data: Banner[];
  cachedAt: number;
};

export const BANNERS_CACHE_KEY =
  'radioafricana.cache.banners';

export async function fetchBanners(): Promise<Banner[]> {
  const data =
    await api.get<Banner[]>(
      '/radioafricana/v1/banners',
    );

  await setCachedJson<CachedBanners>(
    BANNERS_CACHE_KEY,
    {
      data,
      cachedAt: Date.now(),
    },
  );

  return data;
}

export async function getCachedBanners(): Promise<
  Banner[] | null
> {
  const cached =
    await getCachedJson<CachedBanners>(
      BANNERS_CACHE_KEY,
    );

  if (
    !cached ||
    !Array.isArray(cached.data)
  ) {
    return null;
  }

  return cached.data;
}