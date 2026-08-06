export const Routes = {
  HOME: 'Home',
  STORIES: 'Stories',
  STORY_DETAIL: 'StoryDetail',
  MORE: 'More',
} as const;

export type RouteName =
  (typeof Routes)[keyof typeof Routes];