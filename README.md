# Radio Africana Mobile

Radio Africana Mobile is the Android application for Radio Africana, combining live radio playback with the Radio Africana Stories experience.

## Current Application

| Property | Value |
|---|---|
| Application | Radio Africana |
| Platform | Android |
| Version | `1.0.0` |
| Version Name | `1.0` |
| Application ID | `com.radioafricana.radio.africana` |
| Source Language | TypeScript / TSX |
| Framework | React Native |
| Content Platform | WordPress |
| Live Stream | Radio Africana stream service |

The current Android build has been packaged as a release APK and independently installed and tested on a physical Android device.

## What the App Does

Radio Africana Mobile provides three main areas:

- **Home** — live radio and content discovery
- **Stories** — Radio Africana editorial content
- **More** — application and Radio Africana links

A persistent Mini Player keeps the live radio controls available throughout the main application experience.

---

## Home

The Home screen contains:

- Radio Africana logo
- Live radio hero
- Current artist and track title
- Current track artwork
- Play control
- Promotional banner carousel
- Latest Story
- Persistent Mini Player
- Pull-to-refresh

The live information is retrieved from the Radio Africana service and refreshed while the application is active.

---

## Live Radio

Live radio is the central application experience.

The playback system provides:

- Live stream playback
- Play
- Pause
- Toggle playback
- Persistent playback across navigation
- Background playback
- Playback while the device is inactive
- Android media notification controls
- Current artist metadata
- Current track metadata
- Current artwork
- Stream recovery after a temporary network interruption

The playback state is shared globally through the application playback provider.

---

## Stories

The Stories section is connected directly to the Radio Africana WordPress content system.

It provides:

- Latest Stories
- Story categories
- Featured images
- Story excerpts
- Story Detail pages
- Pull-to-refresh
- Paginated loading
- Empty-state handling
- Retry handling
- Continue Reading
- Native Story sharing

Story content is retrieved through the WordPress REST API.

### Story Detail

A Story Detail page contains:

- Back navigation
- Share action
- Featured image
- Category
- Story title
- Publication date
- Full article content
- Rich HTML rendering
- Share Story action
- Continue Reading
- Persistent Mini Player

---

## Promotional Banners

The Home screen includes a remotely managed promotional banner carousel.

Each banner can contain:

- Image
- Alternative text
- Title
- Subtitle
- Button text
- Destination link
- Link availability state

Banner data is supplied by the Radio Africana API.

---

## Notifications

Radio Africana Mobile uses Firebase Cloud Messaging for push notifications.

The current notification implementation supports:

- Foreground notifications
- Background notifications
- Notifications received while the application is closed
- Notification interaction that opens the application

Foreground Android notification presentation is handled through Notifee.

---

## More

The More screen provides:

- Contact Us
- Meet the Team
- Visit Website
- Privacy Policy
- Share App
- App Version

The current application version displayed by the app is `1.0.0`.

---

## Content and Services

The application connects to Radio Africana's existing web and service infrastructure.

### WordPress

The WordPress REST API provides:

- Stories
- Story content
- Categories
- Featured media

### Radio Africana Services

Application services provide:

- Current Now Playing information
- Current track artwork
- Promotional banners

The application consumes these services directly rather than maintaining a separate local editorial catalogue.

---

## Navigation

The primary application navigation is:

```text
Home
Stories
More
```

Story Detail is presented as a separate navigation screen from the Stories area.

Playback remains available independently of the currently displayed navigation area.

---

## Design

The interface uses Radio Africana's visual language with:

- Gold brand accent
- White surfaces
- Dark primary text
- Editorial typography
- Rounded cards
- Clear spacing
- Native Android touch interactions

The application uses:

- **Lora** for editorial display typography
- **Inter** for interface and body typography

Typography and visual constants are centralized in the application design constants.

---

## Source Structure

The current application source is organized as follows:

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

The source tree above reflects the supplied current `src` directory.

---

## Development

Install project dependencies:

```bash
npm install
```

Start the React Native development server:

```bash
npx react-native start
```

Run the Android development application:

```bash
npx react-native run-android
```

The Android project is contained in the `android/` directory.

---

## Android Build

The current Android release APK is generated from the Android project.

The application package identity is:

```text
com.radioafricana.radio.africana
```

The current application version is:

```text
1.0.0
```

The release APK has been installed directly on a physical Android device and tested independently of the React Native development server.

---

## Project Root

The current project contains the Android and iOS platform projects, application source, assets, WordPress-related project material, native patches and standard React Native configuration files.

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

This documentation describes the application as it currently exists.
