# Radio Africana Mobile

Radio Africana Mobile is the React Native application for Radio Africana, providing live radio playback, Now Playing information, programme discovery, Stories, live-video access, notifications, and related station services.

This repository represents the current **6.0.0 release-candidate codebase**.

Feature development is effectively frozen. Further changes should be limited to genuine defects, production-readiness requirements, or explicit client requests.

---

## Current Release State

| Area | Current State |
|---|---|
| React Native | 0.86.2 |
| React | 19.2.3 |
| Android application ID | `com.radioafricana.radio.africana` |
| Android version | 6.0.0 |
| Android release | Standalone `app-release.apk` verified without Metro |
| iOS version | 6.0.0 |
| iOS build | 16 |
| iOS bundle identifier | `com.radioafricana.radaf` |
| Minimum iOS | 15.1 |
| iOS distribution | Signed App Store build through Codemagic |
| Startup caching | Verified on Android and iOS |
| iOS splash | White launch background verified |
| Android media notification | Dynamic title, artist and artwork verified |
| Functional QA | Current RC verified |

The Android release candidate has been tested on a physical device without Metro.

The iOS release candidate has been built through Codemagic and verified through the physical-device/TestFlight workflow.

---

## Core Features

- Live Radio playback
- Global Mini Player
- Now Playing metadata and artwork
- Recently Played
- Up Next
- Promotional banners
- Live Hero
- Firestore-controlled WATCH LIVE availability
- Embedded YouTube Live Video
- Stories and Story Detail
- Subscribe to Shows
- Programme artwork
- Firebase topic notifications
- Contact Us
- Meet the Team
- Privacy Policy
- Website and sharing actions
- Startup/content caching

---

## Technology Stack

### Application

- React Native 0.86.2
- React 19.2.3
- TypeScript
- React Navigation 7
- React Native Reanimated 4
- React Native Gesture Handler
- React Native Safe Area Context
- React Native Screens
- React Native SVG
- React Native WebView
- React Native Render HTML
- Lucide React Native

### Media

- `react-native-video` 6.19.2
- `react-native-youtube-iframe` 2.4.1

### Firebase and Notifications

- `@react-native-firebase/app` 26.3.2
- `@react-native-firebase/firestore` 26.3.2
- `@react-native-firebase/messaging` 26.3.2
- `@notifee/react-native` 9.1.8
- `@react-native-async-storage/async-storage` 3.1.1

### Build and Quality Tooling

- Kotlin 2.1.20
- Android compile/target SDK 36
- NDK 27.1.12297006
- Hermes
- React Native New Architecture
- Jest
- ESLint
- `patch-package`

---

## Architecture

```text
App.tsx
  │
  ▼
Application / Navigation Shell
  │
  ├── PlaybackProvider
  │     └── Global react-native-video instance
  │
  └── SafeAreaProvider
        │
        └── NavigationContainer
              └── BottomTabs
                    ├── Home
                    ├── Stories
                    └── More

Global Mini Player sits above the navigation content.
Application services are separated under src/services/.
```

### Main source structure

```text
src/
├── components/
│   ├── banners/
│   ├── common/
│   ├── stories/
│   ├── ui/
│   ├── LiveHero.tsx
│   └── MiniPlayer.tsx
├── constants/
├── navigation/
├── playback/
├── screens/
└── services/
```

Important services include:

```text
src/services/
├── banners.ts
├── cache.ts
├── liveVideo.ts
├── nowPlaying.ts
├── recentlyPlayed.ts
├── upNext.ts
├── programs.ts
├── programArtwork.ts
├── notifications.ts
├── stories.ts
├── pages.ts
└── members.ts
```

---

## Navigation

Primary navigation:

```text
Home
Stories
More
```

Home:

```text
Home
├── LiveVideo
└── StoryDetail
```

Stories:

```text
Stories
└── StoryDetail
```

More:

```text
More
├── SubscribeToShows
├── ContactUs
├── MeetTheTeam
├── PrivacyPolicy
└── Page
```

The current More screen does **not** contain a Terms & Conditions item.

---

## Playback

Global playback lives in:

```text
src/playback/
├── PlaybackContext.ts
├── PlaybackProvider.tsx
└── index.ts
```

The provider exposes:

```text
isPlaying
nowPlaying
play()
pause()
toggle()
```

Radio stream:

```text
https://radioafricana.radioca.st/stream
```

The application uses `react-native-video` for stream playback and the Android media integration.

The Mini Player and Home controls provide the visible playback interface.

When Live Video is entered, radio playback is paused. On return, the previous playback state is restored where appropriate.

---

## Startup Caching

Caching is implemented through:

```text
src/services/cache.ts
```

using:

```text
@react-native-async-storage/async-storage
```

The purpose of the cache is to make recently available startup content immediately usable while remote services refresh.

The release startup flow is:

```text
Application launch
      ↓
Read cached state
      ↓
Render available content
      ↓
Refresh remote services
      ↓
Persist updated state
```

Verified startup-sensitive content includes:

- banners;
- Live Hero artwork;
- Now Playing data/artwork.

The caching behaviour has been verified on both Android and iOS release builds.

No artificial multi-second splash delay was added. The standalone builds already provide an effectively immediate startup experience.

---

## Android Media Notification

The Android notification implementation uses the native `react-native-video` media-session path.

The project maintains:

```text
patches/react-native-video+6.19.2.patch
```

The Radio Africana stream provides ICY metadata.

The implementation dynamically extracts:

```text
artist
title
picture
```

and updates the Android media notification.

Flow:

```text
Radio stream
    ↓
ICY metadata
    ↓
artist / title / picture
    ↓
MediaMetadata
    ↓
Android notification refresh
```

Track changes were verified while the application remained backgrounded.

No application reopen was required to refresh the notification.

---

## Live Hero

File:

```text
src/components/LiveHero.tsx
```

The Live Hero displays current station artwork and the animated Now Playing treatment.

When a valid Firestore YouTube link exists, WATCH LIVE becomes available.

The Live Hero is the entry point to the Live Video screen; it does not itself play the video.

---

## Live Video

Firestore document:

```text
liveStream/youtube
```

Field:

```text
link: string
```

Behaviour:

```text
Empty/unavailable link
        ↓
WATCH LIVE unavailable

Valid YouTube URL
        ↓
WATCH LIVE available
```

The application pauses radio playback when entering Live Video and restores it where appropriate when returning.

Android uses native Firebase Firestore integration.

iOS uses the established REST/polling implementation.

This platform difference is intentional and should not be removed merely for symmetry.

---

## Stories

Stories are retrieved through the Radio Africana WordPress API.

Primary areas:

```text
src/services/stories.ts
src/screens/Stories/
src/screens/Story/
src/components/stories/
```

Story data includes:

```text
id
slug
title
excerpt
category
image
publishedAt
link
```

Story Detail renders WordPress HTML and supports external reading/sharing actions.

---

## Subscribe to Shows

Primary files:

```text
src/screens/Subscribe/SubscribeToShowsScreen.tsx
src/services/programs.ts
src/services/programArtwork.ts
src/services/notifications.ts
```

The screen provides:

- programme names;
- schedules;
- artwork;
- Firebase topic subscription controls.

Programme artwork uses the continuous horizontal presentation implemented for the release.

---

## External Services

| Service | Purpose |
|---|---|
| RadioCast | Live radio stream |
| Radio Africana controllers | Now Playing, Recently Played, Up Next and programme artwork |
| Radio Africana WordPress API | Stories, pages, members and banners |
| Radio Africana Dashboard API | Programme data |
| Firebase Firestore | Live Video configuration |
| Firebase Cloud Messaging | Push notifications and topics |
| Notifee | Android notification handling |
| YouTube | Live Video playback |
| Contact Form 7 REST API | Contact submissions |

---

## Design System

Central constants:

```text
src/constants/colors.ts
src/constants/typography.ts
```

Brand palette:

```text
Gold           #D4AF37
White          #FFFFFF
Primary text   #111111
Secondary      #666666
Border         #E5E5E5
Divider        #EFEFEF
Live           #D32F2F
```

Bundled fonts:

```text
Inter-Regular
Inter-Medium
Inter-SemiBold
Lora-Regular
Lora-Bold
```

---

## Development Setup

The project requires Node.js:

```text
>=22.11.0
```

Install dependencies:

```bash
npm install
```

Start Metro:

```bash
npm start
```

Run Android development:

```bash
npm run android
```

Run lint:

```bash
npm run lint
```

Run tests:

```bash
npm test
```

Run TypeScript validation:

```bash
npx tsc --noEmit
```

The project uses `patch-package` through the `postinstall` script.

---

## Standalone Android Release Build

Enter the Android project:

```powershell
cd android
```

Build:

```powershell
.\gradlew.bat app:assembleRelease --no-daemon
```

Output:

```text
android/app/build/outputs/apk/release/app-release.apk
```

This release APK contains the React Native bundle and does **not** require Metro.

It is suitable for physical-device/client testing.

The current test APK is not the final Google Play production AAB.

---

## iOS Release Builds

iOS release builds are produced through Codemagic.

The current App Store distribution build is:

```text
Version: 6.0.0
Build: 16
Bundle ID: com.radioafricana.radaf
Minimum iOS: 15.1
```

Build 16 was successfully produced and uploaded to App Store Connect.

---

## Quality Checks

Before committing substantive application changes:

```bash
npx tsc --noEmit
npm run lint
npm test -- --runInBand
```

The current release-candidate work passed all three checks.

---

## Release Boundary

The current client-approved functionality is the baseline for this release.

Do not introduce new feature work unless it is:

- a defect correction;
- required for production readiness; or
- explicitly requested by the client.

Deferred future work:

**Spotify-style artist-video / direct video-stream architecture.**

That work should be designed and tested separately from this release.

---

## Production Release

The functional release candidate is complete.

Remaining production-store work includes:

### Android

- production signing;
- final production AAB;
- final store assets;
- Google Play metadata;
- Data Safety information;
- final production-device verification.

### iOS

- final App Store metadata;
- final store assets/screenshots;
- final production-device verification;
- App Store review/privacy information.

### Both

- final dependency audit;
- patch audit;
- repository hygiene;
- release notes;
- final production build selection.

These are production-release tasks and should not be confused with unfinished application functionality.

---

## Documentation

`README.md` provides the project overview and operational entry point.

`PROJECT.md` is the detailed technical source of truth.

Documentation should always describe the actual repository and verified application behaviour rather than preserve obsolete development states.
