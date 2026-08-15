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

  [Routes.LIVE_VIDEO]: {
    videoUrl: string;
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

  [Routes.CONTACT_US]: undefined;

  [Routes.MEET_THE_TEAM]: undefined;

  [Routes.PRIVACY_POLICY]: undefined;

  [Routes.PAGE]: {
    slug: string;
  };
};