# Radio Africana Mobile --- Technical Project Documentation

## 1. Document purpose

This document is the technical source of truth for the Radio Africana
Mobile application.

It describes the current implementation, architecture, integrations,
native configuration, release state, verified fixes, and known
production-readiness work.

The project has moved from feature development into release preparation.
The client-approved standalone Android test build is the current
functional baseline.

This document should describe the repository as it exists, not preserve
obsolete development uncertainty as if it were current behaviour.

------------------------------------------------------------------------

# 2. Current project state

**Stage: Client-approved test build / release preparation**

The current feature scope is approved and feature-frozen except for:

-   defect corrections;
-   production-readiness requirements;
-   or explicit client change requests.

The latest standalone Android release/test APK has been:

-   built successfully;
-   installed on a physical test device;
-   verified without Metro;
-   verified for the Android media-notification fix;
-   and supplied to the client.

The verified notification behaviour is:

``` text
Radio stream
    ↓
ICY metadata
    ↓
artist / title / picture parsed dynamically
    ↓
Android MediaMetadata
    ↓
notification refresh
    ↓
title + artist + artwork update when track changes
```

The separate Spotify-style/direct-stream artist-video investigation is
deferred.

------------------------------------------------------------------------

# 3. Application identity and versioning

  ------------------------------------------------------------------------
  Property                            Current source state
  ----------------------------------- ------------------------------------
  Product                             Radio Africana

  React Native                        0.86.2

  React                               19.2.3

  TypeScript                          `^5.8.3`

  Android namespace                   `com.radioafricana`

  Android application ID              `com.radioafricana.radio.africana`

  package.json version                `1.0.0`

  Android versionName                 `1.0`

  Android versionCode                 `1` in current source

  iOS product name                    RadioAfricana

  iOS marketing version               `1.0`

  iOS build number                    `1`

  Minimum iOS target                  15.1

  iOS bundle identifier               React Native template-style
                                      placeholder in current source
  ------------------------------------------------------------------------

The approved Android client APK used a higher Android version code
during testing. This discrepancy must be reconciled intentionally before
production release.

The version shown in the More screen is read from `package.json`.

------------------------------------------------------------------------

# 4. Technology stack

## Application

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

## Media

-   `react-native-video` 6.19.2
-   `react-native-youtube-iframe` 2.4.1

## Firebase and notifications

-   `@react-native-firebase/app` 26.1.0
-   `@react-native-firebase/firestore` 26.1.0
-   `@react-native-firebase/messaging` 26.1.0
-   `@notifee/react-native` 9.1.8

## Build and tooling

-   Kotlin 2.1.20
-   Android compile/target SDK 36
-   NDK 27.1.12297006
-   Hermes enabled
-   React Native New Architecture enabled
-   `patch-package`
-   Jest
-   ESLint

------------------------------------------------------------------------

# 5. System architecture

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

Application data and external integrations are separated into
`src/services`.

------------------------------------------------------------------------

# 6. Application shell

`src/navigation/index.tsx` provides the application shell.

`PlaybackProvider` wraps the application so radio playback remains
global.

`SafeAreaProvider` supplies safe-area information to the navigation
shell and Mini Player.

The Mini Player is rendered outside `NavigationContainer` and positioned
above the bottom tab bar using the tab-bar height and bottom safe-area
inset.

------------------------------------------------------------------------

# 7. Navigation

Implemented in:

``` text
src/navigation/index.tsx
src/navigation/BottomTabs.tsx
src/navigation/routes.ts
src/navigation/types.ts
```

Primary tabs:

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

Route parameter:

``` text
Story Detail → slug
Page → slug
Live Video → videoUrl
```

------------------------------------------------------------------------

# 8. Playback architecture

Primary files:

``` text
src/playback/PlaybackContext.ts
src/playback/PlaybackProvider.tsx
src/playback/index.ts
```

The provider owns the global playback state:

``` text
isPlaying
nowPlaying
playerKey
```

The public context exposes:

``` text
isPlaying
nowPlaying
play()
pause()
toggle()
```

## Stream

``` text
https://radioafricana.radioca.st/stream
```

The hidden `react-native-video` component is configured for
background/inactive playback and Android media notification controls.

## Player recreation

`play()` increments `playerKey`, causing the Video component to be
recreated. This is the current stream start/recovery mechanism.

A stream error sets `isPlaying` to false.

## Live Video handoff

The Live Video screen records whether the radio was playing before
entry.

On entry:

``` text
radio playing
    ↓
pause radio
    ↓
open video
```

On leaving:

``` text
video screen loses focus
    ↓
if radio was playing before entry
    ↓
resume radio
```

This prevents radio audio from playing underneath the video while
preserving the previous playback state.

------------------------------------------------------------------------

# 9. Now Playing architecture

Service:

``` text
src/services/nowPlaying.ts
```

Endpoint:

``` text
https://radioafricana.com/controllers/playing.php
```

Artwork base:

``` text
https://radioafricana.com/station/pictures/
```

Model:

``` text
artist
title
picture
```

The playback provider refreshes Now Playing periodically while mounted.

Now Playing feeds:

-   Live Hero
-   Mini Player
-   playback metadata

------------------------------------------------------------------------

# 10. Android media notification architecture

This is a verified native fix and must be preserved.

Package:

``` text
react-native-video@6.19.2
```

Native files involved:

``` text
node_modules/react-native-video/android/src/main/java/com/brentvatne/exoplayer/ReactExoplayerView.java
node_modules/react-native-video/android/src/main/java/com/brentvatne/exoplayer/VideoPlaybackService.kt
```

The repository-preserved modification is:

``` text
patches/react-native-video+6.19.2.patch
```

## Stream metadata

The Radio Africana stream endpoint is:

``` text
https://radioafricana.radioca.st/stream
```

The stream was confirmed to provide ICY metadata.

The implementation dynamically parses the ICY `StreamUrl` and extracts:

``` text
artist
title
picture
```

Artwork is constructed using:

``` text
https://radioafricana.com/station/pictures/
```

No track-specific artist, title, or artwork filename is hardcoded.

## Metadata flow

``` text
ICY metadata arrives
       ↓
StreamUrl parsed
       ↓
artist extracted
title extracted
picture extracted
       ↓
artwork URL constructed
       ↓
MediaMetadata updated
       ↓
notification refreshed
```

## Verification

The fix was first verified during a background development test and then
verified again on the standalone Android release/test APK.

The decisive physical-device test showed that when the station changed
tracks while the app remained backgrounded:

-   song title changed;
-   artist changed;
-   artwork changed.

No app reopen, manual reconnect, or notification interaction was
required.

The same standalone APK was supplied to the client.

------------------------------------------------------------------------

# 11. Mini Player

Implemented in:

``` text
src/components/MiniPlayer.tsx
```

Mounted globally by the navigation shell.

Displays:

-   current track title;
-   artist;
-   live/ready state;
-   Up Next;
-   playback control.

The artist treatment is intentionally stronger than surrounding
metadata.

The Up Next label uses the gold accent and semibold treatment.

------------------------------------------------------------------------

# 12. Home architecture

Implemented in:

``` text
src/screens/Home/HomeScreen.tsx
```

Composition:

``` text
Home
├── RadioHeader
├── BannerCarousel
├── LiveHero
├── RecentlyPlayedSection
└── LatestStory
```

Pull-to-refresh increments a refresh key so remote Home sections can be
refreshed together.

------------------------------------------------------------------------

# 13. Promotional banners

Files:

``` text
src/components/banners/BannerCard.tsx
src/components/banners/BannerCarousel.tsx
src/services/banners.ts
```

Endpoint:

``` text
https://radioafricana.com/wp-json/radioafricana/v1/banners
```

Banner model:

``` text
id
image
alt
title
subtitle
button
link
hasLink
```

------------------------------------------------------------------------

# 14. Live Hero

File:

``` text
src/components/LiveHero.tsx
```

The Live Hero displays the current artwork with the animated Now Playing
treatment.

If a Firestore live-video link is available, it renders the WATCH LIVE
control.

The button navigates to:

``` text
Routes.LIVE_VIDEO
```

with:

``` text
videoUrl: string
```

The Live Hero is an entry point only; it does not itself play video.

------------------------------------------------------------------------

# 15. Firestore Live Video architecture

Service:

``` text
src/services/liveVideo.ts
```

Firestore document:

``` text
liveStream/youtube
```

Expected field:

``` text
link: string
```

The service validates that `link` is a non-empty string and exposes:

``` text
{
  platform: 'youtube',
  link: string
}
```

## Data flow

``` text
Firestore
liveStream/youtube
        │
        ▼
subscribeToLiveVideo()
        │
        ▼
HomeScreen
        │
        ▼
LiveHero
        │
        ▼
LiveVideo route
        │
        ▼
LiveVideoScreen
```

## Current approved behaviour

``` text
WATCH LIVE
    ↓
Radio pauses immediately
    ↓
YouTube player loads
    ↓
User starts video using YouTube Play
    ↓
Video plays
    ↓
User returns
    ↓
Radio resumes if it was playing before entry
```

The application extracts YouTube IDs from:

``` text
https://www.youtube.com/watch?v=ID
https://youtu.be/ID
https://www.youtube.com/embed/ID
https://www.youtube.com/shorts/ID
```

## Autoplay/fullscreen boundary

The current implementation requests autoplay and configures the Android
WebView for media playback, but the approved product behaviour does not
depend on autoplay being granted.

The application does not claim guaranteed externally forced YouTube
native fullscreen.

The current release therefore treats YouTube's own Play control and
embedded-player behaviour as the supported implementation boundary.

## Deferred architecture

A future direct/native video-stream architecture may be investigated if
guaranteed autoplay, fullscreen control, or deeper player integration
becomes a product requirement.

The reported old-app raw-YouTube-ID approach is also a future
investigation, not part of the current release.

------------------------------------------------------------------------

# 16. Recently Played

Service:

``` text
src/services/recentlyPlayed.ts
```

Endpoint:

``` text
https://radioafricana.com/controllers/recentlyplayed.php
```

The service parses the response, limits it to five tracks, and resolves
artwork from the Radio Africana station picture directory.

------------------------------------------------------------------------

# 17. Up Next

Service:

``` text
src/services/upNext.ts
```

Endpoint:

``` text
https://radioafricana.com/controllers/queuesong.php
```

The UI polls periodically and displays the next track when available.

------------------------------------------------------------------------

# 18. Stories architecture

Primary areas:

``` text
src/services/stories.ts
src/screens/Stories/StoriesScreen.tsx
src/screens/Story/StoryScreen.tsx
src/components/stories/
src/screens/Story/components/
```

WordPress posts are retrieved through the common API service using
`_embed`.

The application maps:

``` text
id
slug
title
excerpt
category
image
publishedAt
link
```

Story Detail renders WordPress HTML through the project's HTML rendering
components and provides Continue Reading and native sharing.

------------------------------------------------------------------------

# 19. WordPress pages

`src/services/pages.ts` retrieves WordPress pages by slug.

Endpoint pattern:

``` text
/wp/v2/pages?slug={slug}
```

`PageScreen` is the generic page renderer.

The following More destinations are native rather than generic WordPress
pages:

``` text
Contact Us
Meet the Team
Privacy Policy
```

------------------------------------------------------------------------

# 20. Meet the Team

Files:

``` text
src/services/members.ts
src/screens/MeetTheTeam/MeetTheTeamScreen.tsx
```

Endpoint:

``` text
/wp/v2/members?_embed&per_page=6&page={page}
```

Five members are displayed per page, with one additional record
requested to determine whether another page exists.

Role resolution:

1.  inspect embedded WordPress terms;
2.  if needed, inspect the public member profile;
3.  resolve known labels such as Presenter, Producer and DJ;
4.  fall back to `Radio Africana Team`.

------------------------------------------------------------------------

# 21. Subscribe to Shows

Files:

``` text
src/screens/Subscribe/SubscribeToShowsScreen.tsx
src/services/programs.ts
src/services/programArtwork.ts
src/services/notifications.ts
```

Programme endpoint:

``` text
https://radio-africana-dashboard.vercel.app/api/programs
```

Artwork endpoint:

``` text
https://radioafricana.com/controllers/programs.php
```

Programmes are sorted and displayed with schedule information, artwork
and Firebase topic subscription controls.

The current artwork presentation uses a continuous horizontal artwork
treatment.

------------------------------------------------------------------------

# 22. Notification architecture

Application notification services use:

``` text
@react-native-firebase/messaging
@notifee/react-native
```

The application handles:

-   Android 13+ notification permission;
-   FCM token retrieval;
-   token refresh;
-   foreground messages;
-   foreground Android channel creation;
-   Firebase topic subscription/unsubscription.

Foreground Android channel:

``` text
ID: radio-africana-foreground
Name: Radio Africana
Importance: DEFAULT
```

The current source is configured for Android Firebase.

iOS Firebase configuration and APNs release setup remain production
tasks.

------------------------------------------------------------------------

# 23. Contact Us

File:

``` text
src/screens/ContactUs/ContactUsScreen.tsx
```

The screen implements native validation and submits multipart form data
to the Contact Form 7 REST API.

Endpoint pattern:

``` text
https://radioafricana.com/wp-json/contact-form-7/v1/contact-forms/{CONTACT_FORM_ID}/feedback
```

The implementation handles validation, success responses, spam/server
responses and failure states.

------------------------------------------------------------------------

# 24. Privacy Policy

File:

``` text
src/screens/PrivacyPolicy/PrivacyPolicyScreen.tsx
```

The policy is rendered natively.

The policy copy should receive a content/legal review during final QA
and should not be silently changed as part of a technical documentation
update.

------------------------------------------------------------------------

# 25. More screen

The current More screen contains:

``` text
Subscribe to Shows
Contact Us
Meet the Team
Privacy Policy
Page
Website
Share App
Version display
```

There is no Terms & Conditions item in the current More screen.

------------------------------------------------------------------------

# 26. Design system

Constants:

``` text
src/constants/colors.ts
src/constants/typography.ts
```

## Colours

``` text
Gold           #D4AF37
White          #FFFFFF
Black          #111111
Text           #111111
Text secondary #666666
Border         #E5E5E5
Divider        #EFEFEF
Live           #D32F2F
```

## Fonts

``` text
Inter-Regular
Inter-Medium
Inter-SemiBold
Lora-Regular
Lora-Bold
```

Typography variants include:

``` text
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

------------------------------------------------------------------------

# 27. Source tree

``` text
RadioAfricana/
├── android/
├── assets/
├── ios/
├── patches/
├── src/
│   ├── components/
│   │   ├── banners/
│   │   ├── common/
│   │   ├── stories/
│   │   ├── ui/
│   │   ├── LiveHero.tsx
│   │   └── MiniPlayer.tsx
│   ├── constants/
│   ├── navigation/
│   ├── playback/
│   ├── screens/
│   └── services/
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

Generated/dependency directories such as `node_modules`, Gradle build
output and Xcode build output are not source architecture.

------------------------------------------------------------------------

# 28. Android configuration

Current source configuration:

``` text
compileSdkVersion 36
targetSdkVersion 36
minSdkVersion 24
NDK 27.1.12297006
Kotlin 2.1.20
Hermes enabled
New Architecture enabled
```

Android application ID:

``` text
com.radioafricana.radio.africana
```

## Current release-readiness items

### Production signing

The current release configuration uses the debug signing configuration.
A production keystore and release signing configuration must be
established before Google Play release.

### Versioning

Current source:

``` text
versionCode 1
versionName "1.0"
```

The approved client test APK used a higher version code. The final
production version must be selected deliberately.

### Application label

The Android source currently contains a test-oriented application label:

``` text
RA (Test App)
```

This must be replaced with the final production-facing name before
release.

### Release minification

R8/ProGuard minification is currently disabled for release. This should
be treated as an explicit production decision rather than changed
automatically.

------------------------------------------------------------------------

# 29. iOS configuration

Current source values include:

``` text
Minimum iOS: 15.1
Marketing version: 1.0
Build number: 1
```

## Current release-readiness items

### Bundle identifier

The Xcode project currently uses the React Native template-style bundle
identifier:

``` text
org.reactjs.native.example.$(PRODUCT_NAME:rfc1034identifier)
```

This must be replaced with the actual Radio Africana App Store bundle
identifier.

### Signing

Production Apple signing/team configuration is not yet established in
the current source.

### Firebase

Android Firebase configuration exists. iOS Firebase configuration and
APNs setup must be added and verified if iOS notifications are required.

### App icon

The iOS AppIcon asset catalog requires production artwork.

### Launch screen

The current launch screen remains a template-style treatment and must be
replaced with the approved Radio Africana production splash/loading
design.

### Orientation

The current iPhone configuration declares portrait orientation. iPad
configuration includes portrait and landscape orientations. This should
be reviewed against final product requirements.

------------------------------------------------------------------------

# 30. Dependencies and patch-package

The project uses:

``` text
patches/react-native-video+6.19.2.patch
```

`patch-package` is run through the `postinstall` script.

The patch is part of the source-controlled implementation and must be
applied successfully after a clean dependency installation.

A clean-install audit is required before production release.

------------------------------------------------------------------------

# 31. Logging and error handling

The application contains `console.error` calls in service and screen
error paths.

The final audit should classify:

-   legitimate production error reporting;
-   development-only diagnostic logging;
-   potentially sensitive data;
-   noisy logging that should be removed.

The project does not currently use an application-wide logging
abstraction.

Native diagnostic logging used during the notification investigation
should not be treated as a reason to introduce permanent verbose logging
unless required.

------------------------------------------------------------------------

# 32. Testing and quality tooling

Available scripts:

``` text
npm run lint
npm test
npm run android
npm run ios
npm start
```

Jest is configured and the project contains:

``` text
__tests__/App.test.tsx
```

Final QA must include linting and tests from a clean dependency state.

------------------------------------------------------------------------

# 33. Repository and Git state

The repository is a Git working tree on:

``` text
main
```

The verified Android notification fix has been committed and pushed to:

``` text
origin/main
```

The fix is preserved in:

``` text
patches/react-native-video+6.19.2.patch
```

Documentation work is intentionally handled separately from the verified
notification-fix checkpoint.

Repository hygiene should keep generated build output, dependency
directories and diagnostic artifacts out of source control unless a file
is deliberately part of the project.

------------------------------------------------------------------------

# 34. Standalone Android test build

The current standalone Android release/test APK was produced with:

``` powershell
cd android
.\gradlew assembleRelease
```

Build result:

``` text
BUILD SUCCESSFUL
```

The resulting APK was installed on a physical device and verified.

The APK supplied to the client is the same standalone test artifact used
for the device verification.

This test build is not yet the final Google Play production AAB.

------------------------------------------------------------------------

# 35. Production release sequence

## Android

``` text
Documentation
      ↓
Source / repository audit
      ↓
Final QA
      ↓
Production icon
      ↓
Production splash
      ↓
Store screenshots + metadata
      ↓
Production signing
      ↓
Version reconciliation
      ↓
AAB
      ↓
Production-device testing
      ↓
Google Play submission
```

## iOS

``` text
Documentation
      ↓
Source / repository audit
      ↓
Final QA
      ↓
Production icon
      ↓
Production splash
      ↓
Bundle identifier
      ↓
Signing / team
      ↓
Firebase / APNs if required
      ↓
Archive
      ↓
TestFlight
      ↓
Production-device testing
      ↓
App Store submission
```

------------------------------------------------------------------------

# 36. Final QA matrix

## Playback

-   Start radio
-   Pause radio
-   Resume radio
-   Stream recovery
-   Background playback
-   Lock-screen/media controls
-   Now Playing metadata
-   Artwork
-   Mini Player
-   Up Next

## Home

-   Banners
-   Live Hero
-   WATCH LIVE visibility
-   Recently Played
-   Latest Story
-   Pull-to-refresh

## Android notification

-   Correct initial title
-   Correct initial artist
-   Correct initial artwork
-   Background playback
-   Track-change title update
-   Track-change artist update
-   Track-change artwork update
-   Notification remains synchronized without reopening the app

## Live Video

-   Firestore document exists
-   Valid YouTube URL loads
-   Missing/invalid link produces unavailable state
-   Radio pauses on entry
-   YouTube Play works
-   Return to Home resumes radio when appropriate
-   Previously paused radio does not resume unexpectedly
-   YouTube autoplay/fullscreen limitations remain within the documented
    product boundary

## Stories

-   Feed
-   Pagination
-   Story Detail
-   Images
-   Content rendering
-   Continue Reading
-   Sharing

## More

-   Subscribe to Shows
-   Topic subscription/unsubscription
-   Contact Us
-   Meet the Team
-   Privacy Policy
-   Website
-   Share App
-   Version display

## Release

-   Android standalone build works without Metro
-   iOS TestFlight build works without development server
-   No development-only identity remains
-   App icon is correct
-   Splash/loading screen is correct
-   Store metadata is correct
-   Production signing is correct

------------------------------------------------------------------------

# 37. Release boundary

The client-approved build is the functional baseline.

No new feature should enter this release after approval unless it is:

-   a defect correction;
-   a production-readiness requirement;
-   or an explicit client change request.

The following remains deferred:

**Spotify-style artist video / direct video-stream architecture.**

That work should be designed as a separate future update.

------------------------------------------------------------------------

# 38. Documentation maintenance rule

Update this document when:

-   architecture changes;
-   routes change;
-   external endpoints change;
-   Firebase structure changes;
-   playback architecture changes;
-   notification architecture changes;
-   production configuration changes;
-   release version changes;
-   or a new supported feature is introduced.

Styling-only changes do not require a full architectural update unless
they change documented behaviour.
