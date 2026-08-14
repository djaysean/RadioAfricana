import {Routes} from './routes';

export type StoryStackParamList = {
  [Routes.STORY_DETAIL]: {
    slug: string;
  };
};

export type HomeStackParamList = {
  [Routes.HOME]: undefined;

  [Routes.STORY_DETAIL]: {
    slug: string;
  };
};

export type StoriesStackParamList = {
  [Routes.STORIES]: undefined;

  [Routes.STORY_DETAIL]: {
    slug: string;
  };
};

export type MoreStackParamList = {
  [Routes.MORE]: undefined;

  [Routes.SUBSCRIBE_TO_SHOWS]: undefined;

  [Routes.PAGE]: {
    slug: string;
  };
};