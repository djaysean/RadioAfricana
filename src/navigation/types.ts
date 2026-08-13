import {Routes} from './routes';

export type RootStackParamList = {
  [Routes.HOME]: undefined;

  [Routes.STORIES]: undefined;

  [Routes.STORY_DETAIL]: {
    slug: string;
  };

  [Routes.MORE]: undefined;

  [Routes.SUBSCRIBE_TO_SHOWS]: undefined;
};

export type RootRouteName =
  keyof RootStackParamList;