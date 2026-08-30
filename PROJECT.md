# Radio Africana Mobile — Technical Documentation

## Overview

Radio Africana Mobile is a React Native application for Android and iOS. It brings live radio, programme information, editorial content, notifications, subscriptions and selected Radio Africana website services together in one mobile experience.

This document is the technical reference for maintaining and extending the application.

## Technology Stack

- React Native 0.86.2
- React 19
- TypeScript
- Hermes
- React Native New Architecture
- React Navigation 7
- React Native Reanimated 4
- React Native Gesture Handler
- React Native Safe Area Context
- React Native Screens
- React Native SVG
- React Native WebView
- React Native Render HTML
- Lucide React Native
- react-native-video 6.19.2
- react-native-youtube-iframe 2.4.1
- Firebase
- Notifee

Android is configured with compile SDK 36, target SDK 36, minimum SDK 24, Kotlin 2.1.20 and NDK 27.1.12297006.

## Application Structure

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

`App.tsx` is the application entry point.

The native platform projects are contained in `android/` and `ios/`.

## Navigation

The primary navigation consists of three tabs:

- Home
- Stories
- More

### Home

The Home experience includes live radio, promotional content, Now Playing, Recently Played, Up Next and access to Live Video and stories.

### Stories

The Stories section provides the Radio Africana editorial feed and individual story views.

### More

The More section provides:

- Subscribe to Shows
- Contact Us
- Meet the Team
- Privacy Policy
- Website pages
- Visit Website
- Share App
- App version

## Playback

Radio playback is managed globally rather than by individual screens.

Primary files:

```text
src/playback/PlaybackContext.ts
src/playback/PlaybackProvider.tsx
src/playback/index.ts
```

The playback context provides:

```text
isPlaying
nowPlaying
play()
pause()
toggle()
```

The playback system supports live stream playback, pause and resume, persistent playback across navigation, Mini Player controls, Now Playing metadata, artwork, background playback, Android media controls and playback recovery.

The Mini Player is mounted at application level so it remains available while navigating.

## Now Playing

Now Playing information is supplied by Radio Africana's broadcast metadata services.

The application uses the current metadata to update:

- Artist
- Track title
- Artwork

Android media notifications are updated with the current track information.

## Android Media Playback

Android playback uses `react-native-video` with the Android Media3 stack.

A maintained patch is included for the installed version:

```text
patches/react-native-video+6.19.2.patch
```

The patch is applied through the project's `patch-package` workflow.

Changes to the media dependency should be tested against background playback, media controls and navigation.

## Live Video

Live Video is controlled through Firebase Firestore.

Configuration document:

```text
liveStream/youtube
```

Configuration field:

```text
link
```

A valid YouTube link makes the Live Video entry available in the application.

When Live Video is opened:

1. Active radio playback is paused.
2. The YouTube player is displayed.
3. Radio playback resumes when the user returns if it was playing before the video screen was opened.

### Android

Android uses:

```text
@react-native-firebase/firestore
```

with a realtime listener for the Live Video configuration.

### iOS

iOS uses the Firestore REST API for this feature and periodically checks the configuration.

The two implementations provide the same application behaviour while using platform-appropriate integration methods.

## Stories

Story content is supplied by the Radio Africana WordPress content system.

Relevant areas include:

```text
src/screens/Stories/
src/screens/Story/
src/services/stories.ts
src/components/stories/
```

The story system supports feeds, pagination, featured images, categories, publication dates, HTML content, story details, Continue Reading and native sharing.

## Programme Subscriptions

Programme information and artwork are supplied through Radio Africana's content services.

Relevant files include:

```text
src/screens/Subscribe/SubscribeToShowsScreen.tsx
src/services/programs.ts
src/services/programArtwork.ts
src/services/notifications.ts
```

Programme subscriptions use Firebase Cloud Messaging topics.

## Notifications

Push notifications use Firebase Cloud Messaging with Notifee for notification presentation.

The implementation covers:

- Notification permissions
- FCM token registration
- Token refresh
- Foreground messages
- Background messages
- Notification interaction
- Programme topic subscriptions

Android foreground playback notifications use:

```text
ID: radio-africana-foreground
Name: Radio Africana
```

## External Services

| Service | Purpose |
|---|---|
| Radio Africana WordPress API | Stories, pages and website content |
| Radio Africana broadcast/controller services | Live stream metadata and programme information |
| RadioCast | Live radio stream |
| Radio Africana Dashboard API | Programme information |
| Firebase Firestore | Live Video configuration |
| Firebase Cloud Messaging | Notifications and programme subscriptions |
| Notifee | Android notifications |
| YouTube | Live Video playback |
| Contact Form 7 REST API | Contact submissions |

Service integrations are implemented primarily under:

```text
src/services/
```

## Design System

Shared visual constants are maintained in:

```text
src/constants/colors.ts
src/constants/typography.ts
```

Bundled fonts include:

```text
Inter-Regular
Inter-Medium
Inter-SemiBold
Lora-Regular
Lora-Bold
```

Reusable interface components are located under:

```text
src/components/
```

## Android

The Android project is located in:

```text
android/
```

Current Android release configuration:

```text
versionName "6.0.0"
versionCode 601
```

The production Android application is distributed as an Android App Bundle.

Build command:

```powershell
cd android
.\gradlew bundleRelease
```

Output:

```text
android/app/build/outputs/bundle/release/app-release.aab
```

Release signing credentials are kept outside the source repository.

## iOS

The iOS project is located in:

```text
ios/
```

Development and release builds use the standard React Native and Xcode workflow for the configured project.

Native changes should remain within the iOS project rather than generated build directories.

## Development Setup

Install dependencies:

```bash
npm install
```

Start Metro:

```bash
npm start
```

Run Android:

```bash
npm run android
```

Run iOS:

```bash
npm run ios
```

Installing dependencies applies the project's maintained `patch-package` changes.

## Testing

Run tests:

```bash
npm test
```

Run linting:

```bash
npm run lint
```

Before a release, verify the principal application flows, including playback, background audio, Now Playing, Mini Player, notifications, programme subscriptions, Stories, Live Video and navigation.

## Repository Hygiene

The repository should contain source code and project configuration required to build and maintain the application.

The following should remain outside version control:

```text
node_modules/
android/app/build/
ios/build/
*.jks
*.keystore
.env
```

Private signing credentials, passwords, service-account keys and other secrets must never be committed.

## Versioning

Android release versions are maintained in:

```text
android/app/build.gradle
```

Current release:

```text
6.0.0
```

Android version code:

```text
601
```

Future Android releases must use a higher `versionCode`.

## Maintenance

When making changes:

1. Preserve existing service contracts unless an integration is intentionally being changed.
2. Update dependency patches when their target dependency changes.
3. Keep secrets and release credentials outside source control.
4. Test media playback and notifications after native or dependency changes.
5. Update this document when the architecture or major integrations change.

## Ownership

Radio Africana Mobile is proprietary software developed for Radio Africana.

Copyright © Radio Africana. All rights reserved.
