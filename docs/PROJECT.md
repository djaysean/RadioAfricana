# Radio Africana Mobile — Technical Project Documentation

## 1. Application Identity

**Application:** Radio Africana  
**Platform:** Android  
**Version:** `1.0.0`  
**Version Name:** `1.0`  
**Application ID:** `com.radioafricana.radio.africana`  
**Framework:** React Native  
**Language:** TypeScript / TSX  
**Content Platform:** WordPress

The current Android application is a release APK build of the Radio Africana mobile application.

---

## 2. Application Architecture

The application is organized into six principal layers:

```text
External Services
       │
       ▼
   src/services
       │
       ▼
 Application State
       │
       ├───────────────┐
       ▼               ▼
 Navigation        Playback
       │               │
       ▼               ▼
   Screens        Mini Player /
       │           Media Controls
       ▼
  Components
       │
       ▼
 Design Constants
```

The source tree supplied with the current project contains the following functional areas:

- `components`
- `constants`
- `navigation`
- `playback`
- `screens`
- `services`

---

## 3. Navigation

Navigation is implemented with React Navigation.

### Root navigation

The root stack contains:

- `Home`
- `StoryDetail`

The `Home` route contains the bottom-tab navigation.

### Bottom tabs

The bottom navigation contains:

- Home
- Stories
- More

### Story Detail

`StoryDetail` receives a Story `slug` as its navigation parameter.

The route definitions are centralized in:

```text
src/navigation/routes.ts
src/navigation/types.ts
```

---

## 4. Home Screen

The Home screen is implemented in:

```text
src/screens/Home/HomeScreen.tsx
```

The current Home composition is:

```text
Home
├── Radio Africana logo
├── LiveHero
├── BannerCarousel
├── LatestStory
└── MiniPlayer
```

The Home screen also supports pull-to-refresh.

Current Now Playing data is refreshed every five seconds while the Home screen is active.

---

## 5. Stories Screen

The Stories screen is implemented in:

```text
src/screens/Stories/StoriesScreen.tsx
```

Its current composition is:

```text
Stories
├── Radio Africana logo
├── StoriesHeader
├── Latest Stories heading
├── StoriesFeed
└── MiniPlayer
```

### StoriesHeader

Displays the editorial introduction:

**African Stories, Culture & Diaspora**

with supporting text describing African culture, history, travel, languages and diaspora life.

### StoriesFeed

`StoriesFeed.tsx` provides:

- Story list rendering
- Ten Stories per API page
- Infinite loading
- Pull-to-refresh
- Empty state
- Initial-load error handling
- Load-more error handling
- Retry controls
- Navigation to Story Detail

### StoryCard

Each Story card contains:

- Featured image
- Category
- Title
- Excerpt
- Read Story action

---

## 6. Story Detail

The Story Detail screen is implemented in:

```text
src/screens/Story/StoryScreen.tsx
```

The screen is composed from:

```text
StoryHero
StoryBody
StoryFooter
ContinueReading
MiniPlayer
```

### StoryHero

Provides:

- Back navigation
- Share action
- Featured image
- Category
- Story title
- Publication date

### StoryBody

Article HTML is rendered with `react-native-render-html`.

The current rendering configuration provides styling for:

- Paragraphs
- H2 headings
- H3 headings
- Strong text
- Italic text
- Unordered lists
- Ordered lists
- List items
- Blockquotes
- Links
- Images

The article uses the application's Inter and Lora font families.

### StoryFooter

Provides:

- Story-sharing prompt
- Share Story action

The native React Native `Share` API is used.

### ContinueReading

Loads the latest Stories and presents up to three Stories other than the current Story.

Selecting a Continue Reading item pushes another Story Detail route.

---

## 7. More Screen

The More screen is implemented in:

```text
src/screens/More/MoreScreen.tsx
```

The current menu contains:

```text
Contact Us
Meet the Team
Visit Website
Privacy Policy
Share App
App Version
```

The screen uses native Android/React Native linking and sharing behaviour.

The displayed application version is read directly from:

```text
package.json
```

The current displayed version is `1.0.0`.

---

## 8. Playback System

Playback is implemented through:

```text
src/playback/
├── index.ts
├── PlaybackContext.ts
└── PlaybackProvider.tsx
```

### PlaybackProvider

`PlaybackProvider` wraps the application's navigation tree.

This makes playback state available throughout the application.

The provider exposes:

```text
isPlaying
play()
pause()
toggle()
```

through `PlaybackContext`.

### Stream

The current live stream URL is:

```text
https://radioafricana.radioca.st/stream
```

### Player

The application uses `react-native-video` for the live stream player.

The player is configured for:

- Background playback
- Playback while inactive
- Android notification controls
- Live stream metadata
- Current artwork

The player is visually hidden because playback is controlled through the application's own interface and Mini Player.

---

## 9. Playback Recovery

The playback provider maintains a player key.

Starting playback creates a fresh player instance, and resuming playback after a failed stream therefore establishes a new player instance.

Current behaviour:

```text
Play
 ↓
Stream player
 ↓
Network interruption
 ↓
Playback error
 ↓
Playback state stops
 ↓
Network restored
 ↓
Play
 ↓
Fresh player instance
 ↓
Stream reconnects
```

This provides the application's tested network-recovery behaviour.

---

## 10. Now Playing

Now Playing is implemented in:

```text
src/services/nowPlaying.ts
```

The service retrieves data from:

```text
https://radioafricana.com/controllers/playing.php
```

Artwork is resolved from:

```text
https://radioafricana.com/station/pictures/
```

The application data model is:

```text
NowPlaying
├── artist
├── title
└── picture
```

Now Playing information is used by:

- LiveHero
- MiniPlayer
- PlaybackProvider
- Android media metadata

The application refreshes Now Playing data every five seconds in the active playback/application views.

---

## 11. Mini Player

The Mini Player is implemented in:

```text
src/components/MiniPlayer.tsx
```

It receives:

- Current title
- Current artist
- Current artwork

It exposes the playback toggle through the global playback context.

The Mini Player is present on:

- Home
- Stories
- Story Detail
- More

---

## 12. Android Media Notification

The Android playback notification is provided through the `react-native-video` media integration.

The player supplies:

- Track title
- Artist
- Description
- Artwork

The notification provides Android media controls for the live stream.

The current application build has been tested with the notification artwork, artist and title presentation.

---

## 13. Firebase Notifications

Push notifications are implemented in:

```text
src/services/notifications.ts
```

The application uses:

- React Native Firebase Messaging
- Notifee for foreground Android notification presentation

### Permission

On Android 13 and above, the application requests:

```text
POST_NOTIFICATIONS
```

### Foreground channel

The application creates the Android channel:

```text
radio-africana-foreground
```

with the channel name:

```text
Radio Africana
```

### Foreground notification

When an FCM message arrives while the application is active:

1. React Native Firebase Messaging receives the message.
2. The foreground notification handler extracts the notification title and body.
3. Notifee displays the Android notification.

### Token handling

The notification service retrieves the FCM token and listens for token refresh events.

---

## 14. WordPress API

The shared API client is:

```text
src/services/api.ts
```

The WordPress API base URL is:

```text
https://radioafricana.com/wp-json
```

The client performs standard GET requests and throws an error for non-successful HTTP responses.

---

## 15. Stories API

Story services are implemented in:

```text
src/services/stories.ts
```

### Story model

```text
Story
├── id
├── title
├── excerpt
├── category
├── image
└── slug
```

### Story Detail model

```text
StoryDetail
├── id
├── slug
├── title
├── content
├── category
├── image
├── publishedAt
└── link
```

### Endpoints

Latest Stories:

```text
/wp/v2/posts?_embed&per_page=10&page={page}
```

Story Detail:

```text
/wp/v2/posts?_embed&slug={slug}
```

WordPress embedded featured media and taxonomy data are mapped into the application's Story models.

---

## 16. Banner API

Banner services are implemented in:

```text
src/services/banners.ts
```

The endpoint is:

```text
/radioafricana/v1/banners
```

The Banner model contains:

```text
id
image
alt
title
subtitle
button
link
hasLink
```

The Home BannerCarousel retrieves and displays this data.

---

## 17. Banner Behaviour

The BannerCarousel provides:

- Remote banner loading
- Horizontal scrolling
- Active banner tracking
- Link handling
- Loading state
- Error state
- Retry

The BannerCard renders the supplied image, title, subtitle and button information.

---

## 18. Design Constants

Design constants are located in:

```text
src/constants/
├── colors.ts
├── index.ts
├── radius.ts
├── shadows.ts
├── spacing.ts
└── typography.ts
```

### Colours

The current palette includes:

- Gold: `#D4AF37`
- White: `#FFFFFF`
- Black/Text: `#111111`
- Secondary text: `#666666`
- Border: `#E5E5E5`
- Divider: `#EFEFEF`
- Live status: `#D32F2F`

### Spacing

The spacing scale is:

```text
xxs   4
xs    8
sm    12
md    16
lg    24
xl    32
xxl   40
xxxl  48
hero  64
```

### Radius

The radius scale is:

```text
none  0
sm    8
md    12
lg    16
xl    24
round 999
```

### Typography

The application defines:

```text
display
heading1
heading2
heading3
body
bodySmall
label
meta
button
```

Font families:

```text
Lora-Bold
Lora-Regular
Inter-Regular
Inter-Medium
Inter-SemiBold
```

---

## 19. Shared Components

### LiveHero

Displays the current live track information and playback action.

### MiniPlayer

Provides persistent current-track information and playback toggle.

### BannerCard

Displays a single promotional banner.

### BannerCarousel

Loads and presents the promotional banner collection.

### StoryCard

Displays a Story preview.

### LatestStory

Loads the latest Story and presents it on Home.

### LatestStories

Provides a latest-story collection component.

### StoriesHeader

Provides the editorial heading and introductory copy.

### SectionHeader

Provides a reusable title/subtitle section header.

### AppText

Provides the centralized application typography variants.

---

## 20. Current Source Tree

The supplied `src` directory contains:

```text
src/
├── components/
│   ├── banners/
│   │   ├── BannerCard.tsx
│   │   └── BannerCarousel.tsx
│   ├── common/
│   │   └── SectionHeader.tsx
│   ├── stories/
│   │   ├── LatestStories.tsx
│   │   ├── LatestStory.tsx
│   │   ├── StoriesFeed.tsx
│   │   ├── StoriesHeader.tsx
│   │   └── StoryCard.tsx
│   ├── ui/
│   │   └── AppText.tsx
│   ├── LiveHero.tsx
│   └── MiniPlayer.tsx
├── constants/
│   ├── colors.ts
│   ├── index.ts
│   ├── radius.ts
│   ├── shadows.ts
│   ├── spacing.ts
│   └── typography.ts
├── navigation/
│   ├── BottomTabs.tsx
│   ├── index.tsx
│   ├── routes.ts
│   └── types.ts
├── playback/
│   ├── index.ts
│   ├── PlaybackContext.ts
│   └── PlaybackProvider.tsx
├── screens/
│   ├── Home/
│   │   └── HomeScreen.tsx
│   ├── More/
│   │   └── MoreScreen.tsx
│   ├── Stories/
│   │   └── StoriesScreen.tsx
│   └── Story/
│       ├── components/
│       │   ├── ContinueReading.tsx
│       │   ├── ContinueReadingCard.tsx
│       │   ├── StoryBody.tsx
│       │   ├── StoryFooter.tsx
│       │   └── StoryHero.tsx
│       └── StoryScreen.tsx
├── services/
│   ├── api.ts
│   ├── banners.ts
│   ├── notifications.ts
│   ├── nowPlaying.ts
│   └── stories.ts
└── types/
```

---

## 21. Project Root

The supplied project tree contains:

```text
RadioAfricana/
├── __tests__/
├── .bundle/
├── android/
├── assets/
├── docs/
├── ios/
├── node_modules/
├── patches/
├── src/
├── wordpress/
├── .eslintrc.js
├── .gitignore
├── .prettierrc.js
├── .watchmanconfig
├── app.json
├── App.tsx
├── babel.config.js
├── Gemfile
├── index.js
├── jest.config.js
├── metro.config.js
├── package-lock.json
├── package.json
├── react-native.config.js
├── README.md
└── tsconfig.json
```

---

## 22. Application Data Flow

### Stories

```text
WordPress
   │
   ▼
REST API
   │
   ▼
src/services/api.ts
   │
   ▼
src/services/stories.ts
   │
   ▼
StoriesFeed / StoryScreen
   │
   ▼
StoryCard / StoryBody
```

### Now Playing

```text
Radio Africana service
   │
   ▼
nowPlaying.ts
   │
   ├── Home
   ├── Stories
   ├── Story Detail
   ├── More
   └── PlaybackProvider
```

### Banners

```text
Radio Africana WordPress service
   │
   ▼
banners.ts
   │
   ▼
BannerCarousel
   │
   ▼
BannerCard
```

### Playback

```text
PlaybackProvider
      │
      ▼
react-native-video
      │
      ▼
Radio Africana live stream
      │
      ├── Android background playback
      └── Android media controls
```

---

## 23. Current Android Release

The application is currently version:

```text
1.0.0
```

with Android version name:

```text
1.0
```

and application ID:

```text
com.radioafricana.radio.africana
```

The release APK has been built successfully and installed directly on a physical Android device.

The installed APK was tested without the phone remaining connected to the development computer and without relying on the React Native development server.

The tested release build operates as a standalone Android application.

---

## 24. Current Functional State

The current application provides a working implementation of:

- Home
- Live Radio
- Global Playback
- Mini Player
- Now Playing
- Android media controls
- Stories
- Story Detail
- Continue Reading
- Native sharing
- Promotional banners
- Firebase push notifications
- Foreground notification presentation
- Background notification delivery
- Closed-app notification delivery
- More
- WordPress content integration
- Radio Africana service integration
- Network-aware content loading
- Playback recovery after network interruption

This document records the current application architecture and implementation state.
