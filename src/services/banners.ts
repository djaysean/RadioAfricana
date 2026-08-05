import { api } from './api';

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

type WPBanner = {
  id: number;
  image: string;
  alt: string;
  title: string;
  subtitle: string;
  button: string;
  link: string;
  hasLink: boolean;
};

export async function fetchBanners(): Promise<Banner[]> {
  const banners = await api.get<WPBanner[]>(
    '/radioafricana/v1/banners'
  );

  return banners.map((banner) => ({
    id: banner.id,
    image: banner.image,
    alt: banner.alt,
    title: banner.title,
    subtitle: banner.subtitle,
    button: banner.button,
    link: banner.link,
    hasLink: banner.hasLink,
  }));
}