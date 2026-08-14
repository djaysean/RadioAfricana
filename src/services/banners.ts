import {api} from './api';

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

export async function fetchBanners(): Promise<Banner[]> {
  return api.get<Banner[]>(
    '/radioafricana/v1/banners',
  );
}