# Radio Africana Mobile

Radio Africana Mobile is the cross-platform React Native application for
Radio Africana, combining live radio playback, Now Playing information,
programme discovery, Radio Africana Stories, notifications, contact and
team utilities, and a Firestore-controlled live-video entry point.

## Current release status

**Stage: Client-approved test build / release preparation**

The current feature scope has been approved by the client and is now
feature-frozen for this release except for defect corrections,
production-readiness work, or explicit client change requests.

The latest standalone Android release/test APK has been built from the
current source, installed and verified on a physical device, and
supplied to the client. The Android media-notification regression has
also been verified on that standalone build: title, artist, and artwork
update automatically when the live radio track changes.

### Release path

1.  Documentation overhaul
2.  Source/repository audit
3.  Final QA
4.  App icon
5.  Splash/loading screen
6.  Store screenshots and metadata
7.  Android production configuration and AAB
8.  iOS production configuration and archive/TestFlight
9.  Production-device testing
10. Google Play and Apple App Store submission

The separate investigation into a more controllable
Spotify-style/direct-stream artist-video architecture is deferred to a
future update.

------------------------------------------------------------------------

## Product scope

The current application contains three primary areas:

-   **Home**
-   **Stories**
-   **More**

A persistent Mini Player sits above the bottom tab bar and provides
global radio playback controls while the user navigates through the
application.

Current feature scope includes:

-   Live radio playback
-   Global playback state
-   Now Playing metadata and artwork
-   Persistent Mini Player
-   Android media notification controls
-   Promotional banners
-   Recently Played
-   Up Next
-   Radio Africana Stories
-   Story Detail
-   Continue Reading
-   Native story sharing
-   Firebase push notifications
-   Programme subscriptions through Firebase topics
-   Subscribe to Shows
-   Native Contact Us
-   Native Meet the Team
-   Native Privacy Policy
-   Generic WordPress Page support
-   Visit Website
-   Share App
-   App version display
-   Firestore-controlled YouTube Live Video entry point

------------------------------------------------------------------------

## Technology stack

### Application

-   React Native 0.86.2
-   React 19.2.3
-   TypeScript
-   React Navigation 7
-   React Native Reanimated 4
-   React Native Gesture Handler
-   React Native Safe Area Context
-   React Native Screens
-   React Native SVG
-   React Native WebView
-   React Native Render HTML
-   Lucide React Native

### Media

-   `react-native-video` 6.19.2
-   `react-native-youtube-iframe` 2.4.1

### Firebase and notifications

-   `@react-native-firebase/app` 26.1.0
-   `@react-native-firebase/firestore` 26.1.0
-   `@react-native-firebase/messaging` 26.1.0
-   `@notifee/react-native` 9.1.8

### Build and development

-   Kotlin 2.1.20
-   Android compile/target SDK 36
-   NDK 27.1.12297006
-   Hermes enabled
-   React Native New Architecture enabled
-   `patch-package`
-   Jest
-   ESLint

------------------------------------------------------------------------

## Architecture at a glance

``` text
App.tsx
  │
  ▼
AppNavigator
  │
  ▼
PlaybackProvider
  │
  ├── Global react-native-video instance
  │
  └── SafeAreaProvider
        │
        └── AppShell
              ├── NavigationContainer
              │     └── BottomTabs
              │           ├── HomeStack
              │           ├── StoriesStack
              │           └── MoreStack
              │
              └── Global MiniPlayer
```

Application data and integrations are separated into `src/services`.

------------------------------------------------------------------------

## Application identity

  -------------------------------------------------------------------------------
  Property                            Current source value / state
  ----------------------------------- -------------------------------------------
  Application                         Radio Africana

  React Native                        0.86.2

  React                               19.2.3

  Android application ID              `com.radioafricana.radio.africana`

  Package version                     `1.0.0`

  Android version name                `1.0`

  Android version code                `1` in current source; must be reconciled
                                      during production versioning

  iOS marketing version               `1.0`

  iOS build number                    `1`

  Live radio stream                   `https://radioafricana.radioca.st/stream`

  WordPress API                       `https://radioafricana.com/wp-json`
  -------------------------------------------------------------------------------

The approved Android test APK used a higher Android version code during
client testing. The source value must therefore be reconciled
deliberately before production release.

------------------------------------------------------------------------

## Development setup

The project currently requires Node.js `>=22.11.0` according to
`package.json`.

Install dependencies:

``` bash
npm install
```

Start Metro:

``` bash
npm start
```

Run the Android development build:

``` bash
npm run android
```

Run the iOS development build on macOS:

``` bash
npm run ios
```

Run lint:

``` bash
npm run lint
```

Run tests:

``` bash
npm test
```

The project uses `patch-package` through the `postinstall` script.

### Standalone Android test build

For the current project workflow, the Android Gradle project is entered
directly before running Gradle:

``` powershell
cd android
.\gradlew assembleRelease
```

The resulting APK is generated under:

``` text
android/app/build/outputs/apk/release/app-release.apk
```

The current release/test APK is a standalone build and does not depend
on Metro.

------------------------------------------------------------------------

## Navigation

Primary navigation:

``` text
Home
Stories
More
```

Home stack:

``` text
Home
├── LiveVideo
└── StoryDetail
```

Stories stack:

``` text
Stories
└── StoryDetail
```

More stack:

``` text
More
├── SubscribeToShows
├── ContactUs
├── MeetTheTeam
├── PrivacyPolicy
└── Page
```

Route names are centralized in `src/navigation/routes.ts`, with route
types in `src/navigation/types.ts`.

------------------------------------------------------------------------

## Playback

Global playback is implemented in:

``` text
src/playback/
├── PlaybackContext.ts
├── PlaybackProvider.tsx
└── index.ts
```

The provider exposes:

``` text
isPlaying
nowPlaying
play()
pause()
toggle()
```

The radio stream is:

``` text
https://radioafricana.radioca.st/stream
```

Playback uses `react-native-video` with background/inactive playback and
Android media controls.

The player is visually hidden because the application's Mini Player and
Home controls provide the visible playback interface.

------------------------------------------------------------------------

## Android media notification

The Android notification uses the native `react-native-video`
media-session implementation.

A project patch is maintained at:

``` text
patches/react-native-video+6.19.2.patch
```

The patch adds dynamic handling of ICY metadata from the Radio Africana
stream.

The live stream has been confirmed to provide ICY metadata. The
implementation dynamically extracts:

-   artist
-   title
-   picture

from the stream's ICY metadata and constructs artwork URLs using:

``` text
https://radioafricana.com/station/pictures/
```

The resulting metadata is pushed into Android `MediaMetadata` and the
notification is refreshed.

### Verified behaviour

The implementation has been tested on a physical device while the app is
backgrounded.

When the station changes tracks:

-   the notification song title changes;
-   the artist changes;
-   the artwork changes;

without reopening the app or manually reconnecting the stream.

The same behaviour was verified again on the standalone Android
release/test APK that was supplied to the client.

------------------------------------------------------------------------

## Now Playing

Implemented through the playback metadata service.

Endpoint:

``` text
https://radioafricana.com/controllers/playing.php
```

Artwork base:

``` text
https://radioafricana.com/station/pictures/
```

The application model contains:

``` text
artist
title
picture
```

The playback provider refreshes Now Playing periodically while mounted.

Now Playing feeds the Live Hero, Mini Player and playback metadata.

------------------------------------------------------------------------

## Home

Implemented in:

``` text
src/screens/Home/HomeScreen.tsx
```

Current composition:

``` text
Home
├── Radio Africana header
├── Promotional Banner Carousel
├── Live Hero
├── Recently Played
└── Latest Story
```

Home supports pull-to-refresh.

### Promotional banners

``` text
src/components/banners/
src/services/banners.ts
```

Endpoint:

``` text
https://radioafricana.com/wp-json/radioafricana/v1/banners
```

### Recently Played

``` text
src/services/recentlyPlayed.ts
```

Endpoint:

``` text
https://radioafricana.com/controllers/recentlyplayed.php
```

The Home section displays up to five recent tracks.

### Up Next

``` text
src/services/upNext.ts
```

Endpoint:

``` text
https://radioafricana.com/controllers/queuesong.php
```

The UI polls periodically for the next track.

------------------------------------------------------------------------

## Live Video

The approved Live Video implementation is Firestore-controlled and
YouTube-based.

Firestore document:

``` text
liveStream/youtube
```

Expected field:

``` text
link: string
```

Data flow:

``` text
Firestore
   ↓
Home subscription
   ↓
LiveHero
   ↓
WATCH LIVE
   ↓
LiveVideo route
   ↓
LiveVideoScreen
   ↓
YouTube player
```

Supported YouTube URL forms include standard watch URLs, `youtu.be`
URLs, embed URLs and Shorts URLs.

When entering the Live Video screen, the application pauses the radio if
it was playing. On return, the radio resumes only when it was playing
before the video screen was opened.

The current approved implementation does not depend on guaranteed
YouTube autoplay or application-forced native fullscreen. These remain
constrained by the embedded YouTube player/environment.

A future direct/native video architecture may be investigated
separately.

------------------------------------------------------------------------

## Stories

Primary areas:

``` text
src/screens/Stories/
src/screens/Story/
src/services/stories.ts
src/components/stories/
```

Stories are WordPress-driven and support:

-   feed
-   pagination
-   Story Detail
-   featured images
-   categories
-   published dates
-   HTML content rendering
-   Continue Reading
-   native sharing

WordPress posts are retrieved with `_embed` so featured media and
taxonomy data can be resolved.

------------------------------------------------------------------------

## Subscribe to Shows

Implemented through:

``` text
src/screens/Subscribe/SubscribeToShowsScreen.tsx
src/services/programs.ts
src/services/programArtwork.ts
src/services/notifications.ts
```

Programme API:

``` text
https://radio-africana-dashboard.vercel.app/api/programs
```

Artwork API:

``` text
https://radioafricana.com/controllers/programs.php
```

The screen provides programme information, artwork and Firebase topic
subscription controls.

------------------------------------------------------------------------

## Push notifications

Notifications use:

-   `@react-native-firebase/messaging`
-   `@notifee/react-native`

The application handles Android notification permission, FCM token
retrieval and refresh, foreground messages, and the foreground
notification channel:

``` text
ID: radio-africana-foreground
Name: Radio Africana
```

Programme subscriptions use Firebase topics.

iOS Firebase/APNs release configuration remains part of the
production-readiness work.

------------------------------------------------------------------------

## More

The More section currently includes:

-   Subscribe to Shows
-   Contact Us
-   Meet the Team
-   Privacy Policy
-   Generic WordPress pages
-   Website action
-   Share App
-   App version display

The current More screen does not contain a Terms & Conditions item.

------------------------------------------------------------------------

## External services

  -----------------------------------------------------------------------
  Service                             Purpose
  ----------------------------------- -----------------------------------
  Radio Africana WordPress REST API   Banners, Stories, Pages, Members

  Radio Africana controller endpoints Now Playing, Recently Played, Up
                                      Next, programme artwork

  RadioCast stream                    Live radio

  Radio Africana Dashboard API        Programme data

  Firebase Firestore                  Live Video configuration

  Firebase Cloud Messaging            Push notifications and programme
                                      topics

  Notifee                             Android foreground notifications

  YouTube                             Live Video playback

  Contact Form 7 REST API             Contact submissions
  -----------------------------------------------------------------------

------------------------------------------------------------------------

## Design system

Central constants:

``` text
src/constants/colors.ts
src/constants/typography.ts
```

Brand palette:

``` text
Gold           #D4AF37
White          #FFFFFF
Primary text   #111111
Secondary text #666666
Border         #E5E5E5
Divider        #EFEFEF
Live           #D32F2F
```

Bundled fonts:

``` text
Inter-Regular
Inter-Medium
Inter-SemiBold
Lora-Regular
Lora-Bold
```

------------------------------------------------------------------------

## Source structure

``` text
RadioAfricana/
├── android/
├── assets/
├── ios/
├── patches/
├── src/
├── wordpress/
├── __tests__/
├── App.tsx
├── app.json
├── babel.config.js
├── Gemfile
├── index.js
├── jest.config.js
├── metro.config.js
├── package.json
├── package-lock.json
├── react-native.config.js
├── tsconfig.json
├── README.md
└── PROJECT.md
```

Generated/dependency directories such as `node_modules` and platform
build output are not application source.

------------------------------------------------------------------------

## Release preparation

Before production release, the following must be completed deliberately:

-   source/repository audit
-   final QA
-   production app icon
-   production splash/loading treatment
-   store screenshots
-   store metadata
-   Android production signing
-   Android version reconciliation
-   Android production AAB
-   iOS production bundle identifier
-   iOS signing/team configuration
-   iOS Firebase/APNs configuration if required
-   iOS archive/TestFlight build
-   production-device testing
-   store submission

The current source is not yet production-signing ready.

------------------------------------------------------------------------

## Release boundary

The client-approved functionality is the baseline for this release.

No new feature work should enter the release unless it is required to
correct a defect, satisfy production-readiness requirements, or
implement an explicit client change request.

The following remains deferred:

**Spotify-style artist video / direct video-stream architecture.**

That work should be designed and tested separately from this release.
