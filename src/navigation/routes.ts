/**
 * Radio Africana Mobile
 * Release 0.6
 *
 * Central application route names.
 * Every screen and navigation action should reference
 * these constants instead of hardcoded strings.
 */

export const Routes = {
  HOME: 'Home',
  STORIES: 'Stories',
  STORY_DETAIL: 'StoryDetail',
  MORE: 'More',
} as const;

export type RouteName = (typeof Routes)[keyof typeof Routes];