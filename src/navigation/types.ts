/**
 * Radio Africana Mobile
 * Release 0.6
 *
 * Root navigation parameter definitions.
 */

import { Routes } from './routes';

export type RootStackParamList = {
  [Routes.HOME]: undefined;

  [Routes.STORIES]: undefined;

  [Routes.STORY_DETAIL]: {
    id: number;
    slug: string;
  };

  [Routes.MORE]: undefined;
};

export type RootRouteName = keyof RootStackParamList;