export const Routes = {
  HOME: 'Home',
  STORIES: 'Stories',
  STORY_DETAIL: 'StoryDetail',
  MORE: 'More',
  SUBSCRIBE_TO_SHOWS: 'SubscribeToShows',
} as const;

export type RouteName =
  (typeof Routes)[keyof typeof Routes];