# Radio Africana Mobile — Technical Project Documentation

## 1. Purpose

This document is the technical source of truth for the Radio Africana Mobile application.

It records the current architecture, integrations, platform-specific implementation, caching, playback, release configuration, verified behaviour, and remaining production-readiness work.

The project is currently at the **6.0.0 release-candidate stage**.

Feature development is frozen except for:

- genuine defects;
- production-readiness requirements;
- explicit client requests.

This document should describe the repository as it actually exists.

---

# 2. Current Release State

## 2.1 Application Identity

| Property | Current State |
|---|---|
| Product | Radio Africana |
| React Native | 0.86.2 |
| React | 19.2.3 |
| Android namespace | `com.radioafricana` |
| Android application ID | `com.radioafricana.radio.africana` |
| Android version | 6.0.0 |
| Android version code | 600 |
| iOS product | RadioAfricana |
| iOS marketing version | 6.0.0 |
| iOS build | 16 |
| iOS bundle identifier | `com.radioafricana.radaf` |
| Minimum iOS | 15.1 |
| Live stream | `https://radioafricana.radioca.st/stream` |

## 2.2 Verified RC State

The current release candidate has been verified on Android and iOS.

Verified:

- Android standalone release build runs without Metro;
- iOS release build runs without Metro;
- startup caching works;
- banners are available from cached startup state;
- Live Hero artwork is available from cached startup state;
- Now Playing data/artwork is cached;
- Android media notification metadata updates dynamically;
- iOS launch background is white;
- startup experience is effectively immediate;
- functional QA has passed.

No artificial multi-second splash delay is used.

---

# 3. Application Architecture

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

Global Mini Player is mounted above navigation content.
```

Application responsibilities are separated into:

```text
src/components/
src/constants/
src/navigation/
src/playback/
src/screens/
src/services/
```

---

# 4. Navigation

Primary tabs:

```text
Home
Stories
More
```

Home stack:

```text
Home
├── LiveVideo
└── StoryDetail
```

Stories stack:

```text
Stories
└── StoryDetail
```

More stack:

```text
More
├── SubscribeToShows
├── ContactUs
├── MeetTheTeam
├── PrivacyPolicy
└── Page
```

Navigation definitions live under:

```text
src/navigation/
```

The Mini Player is global and remains available across navigation.

The current More screen does **not** contain a Terms & Conditions item.

---

# 5. Playback Architecture

Primary files:

```text
src/playback/PlaybackContext.ts
src/playback/PlaybackProvider.tsx
src/playback/index.ts
```

Global state includes:

```text
isPlaying
nowPlaying
playerKey
```

Public context:

```text
isPlaying
nowPlaying
play()
pause()
toggle()
```

Stream:

```text
https://radioafricana.radioca.st/stream
```

The provider owns the global media player.

The application uses `react-native-video`.

The visible playback experience is provided by the application's UI while the underlying media component handles the actual radio stream.

When Live Video is entered:

```text
Radio playing
    ↓
Pause radio
    ↓
Open Live Video
```

On return:

```text
Live Video exits
    ↓
If radio was playing before entry
    ↓
Resume radio
```

---

# 6. Startup Cache Architecture

## 6.1 Service

```text
src/services/cache.ts
```

Dependency:

```text
@react-native-async-storage/async-storage@3.1.1
```

The cache exists to provide fast startup from recently available content while allowing remote services to refresh the application state.

## 6.2 Startup Flow

```text
Application launch
      ↓
Read cached state
      ↓
Render cached content
      ↓
Remote refresh
      ↓
Persist refreshed state
```

Verified cached content includes:

- banners;
- Live Hero artwork;
- Now Playing information/artwork.

## 6.3 Release Result

The Android standalone release and iOS release build both demonstrated the intended startup behaviour.

The app opens quickly and cached content is already available.

Because this behaviour is already fast, no artificial splash delay was introduced.

---

# 7. Now Playing

Service:

```text
src/services/nowPlaying.ts
```

Endpoint:

```text
https://radioafricana.com/controllers/playing.php
```

Model:

```text
artist
title
picture
```

Now Playing data feeds:

```text
Live Hero
Mini Player
Playback metadata
Startup cache
```

Artwork is resolved from the Radio Africana station picture directory.

---

# 8. Android Media Notification

## 8.1 Dependency

```text
react-native-video@6.19.2
```

Source-controlled patch:

```text
patches/react-native-video+6.19.2.patch
```

## 8.2 Metadata

The Radio Africana stream provides ICY metadata.

The implementation dynamically extracts:

```text
artist
title
picture
```

No track-specific artist/title/artwork values are hardcoded.

## 8.3 Flow

```text
Radio stream
    ↓
ICY metadata
    ↓
StreamUrl parsing
    ↓
artist / title / picture
    ↓
MediaMetadata
    ↓
Android notification refresh
```

## 8.4 Verification

The standalone Android release was tested on a physical device.

During background playback:

- title changed correctly;
- artist changed correctly;
- artwork changed correctly.

The notification remained synchronized without reopening the application.

This is a verified release feature.

---

# 9. Promotional Banners

Files:

```text
src/components/banners/BannerCard.tsx
src/components/banners/BannerCarousel.tsx
src/services/banners.ts
```

Endpoint:

```text
https://radioafricana.com/wp-json/radioafricana/v1/banners
```

Model:

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

Banner state participates in startup caching.

---

# 10. Live Hero

File:

```text
src/components/LiveHero.tsx
```

The Live Hero displays current station artwork and the animated Now Playing treatment.

WATCH LIVE is displayed when a valid Firestore YouTube link exists.

The Live Hero is an entry point to Live Video and does not itself play video.

---

# 11. Firestore Live Video

## 11.1 Data Model

Document:

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

## 11.2 Platform Difference

Android uses native:

```text
@react-native-firebase/firestore
```

iOS uses the established Firestore REST/polling path.

This difference exists because the native iOS Firestore path previously caused an issue. The REST implementation is therefore intentional.

Do not rewrite Android to REST merely for platform symmetry.

Do not remove the Firestore dependency while Android continues to use it.

## 11.3 Lifecycle

```text
WATCH LIVE
    ↓
Pause radio
    ↓
Live Video screen
    ↓
YouTube player
    ↓
Return
    ↓
Resume radio if appropriate
```

The current product does not depend on guaranteed external YouTube autoplay or forced native fullscreen.

---

# 12. Recently Played

Service:

```text
src/services/recentlyPlayed.ts
```

Endpoint:

```text
https://radioafricana.com/controllers/recentlyplayed.php
```

The service retrieves recent station tracks and resolves their artwork.

---

# 13. Up Next

Service:

```text
src/services/upNext.ts
```

Endpoint:

```text
https://radioafricana.com/controllers/queuesong.php
```

The service polls for upcoming track information.

The Up Next UI uses the approved gold/bold visual treatment.

---

# 14. Stories

Primary areas:

```text
src/services/stories.ts
src/screens/Stories/
src/screens/Story/
src/components/stories/
```

Stories are retrieved through the Radio Africana WordPress API.

Mapped fields include:

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

Story Detail renders WordPress HTML and supports external reading/sharing.

---

# 15. WordPress Pages

Service:

```text
src/services/pages.ts
```

Pages are retrieved by slug.

Generic rendering is handled by the Page screen.

Native More destinations include:

```text
Contact Us
Meet the Team
Privacy Policy
```

---

# 16. Meet the Team

Files:

```text
src/services/members.ts
src/screens/MeetTheTeam/
```

Member data is retrieved from the WordPress member API.

Role resolution uses available member/term information and falls back to the Radio Africana Team label where necessary.

---

# 17. Subscribe to Shows

Files:

```text
src/screens/Subscribe/SubscribeToShowsScreen.tsx
src/services/programs.ts
src/services/programArtwork.ts
src/services/notifications.ts
```

Programme data is retrieved from the Radio Africana Dashboard API.

Programme artwork is retrieved through the station artwork endpoint.

The screen provides:

- programme names;
- schedules;
- artwork;
- Firebase topic subscription controls.

Programme names use the approved stronger/bold presentation.

---

# 18. Notifications

Packages:

```text
@react-native-firebase/messaging
@notifee/react-native
```

The notification system handles the application's Firebase topic and notification requirements.

Android foreground channel:

```text
ID: radio-africana-foreground
Name: Radio Africana
Importance: DEFAULT
```

The Android media notification path is handled separately by the media-session implementation described in Section 8.

---

# 19. Contact Us

File:

```text
src/screens/ContactUs/ContactUsScreen.tsx
```

The screen validates input and submits through the Radio Africana Contact Form 7 REST endpoint.

Success and error responses are handled by the screen.

---

# 20. Privacy Policy

File:

```text
src/screens/PrivacyPolicy/PrivacyPolicyScreen.tsx
```

The privacy policy is rendered natively.

Legal/content changes should be treated separately from technical documentation changes.

---

# 21. Design System

Constants:

```text
src/constants/colors.ts
src/constants/typography.ts
```

Palette:

```text
Gold           #D4AF37
White          #FFFFFF
Black/Text     #111111
Secondary      #666666
Border         #E5E5E5
Divider        #EFEFEF
Live           #D32F2F
```

Fonts:

```text
Inter-Regular
Inter-Medium
Inter-SemiBold
Lora-Regular
Lora-Bold
```

Current UI refinements include:

- stronger artist-name treatment in the Mini Player;
- gold/bold Up Next treatment;
- stronger programme-name treatment in Subscribe to Shows.

---

# 22. Android Configuration

Current configuration:

```text
compileSdk: 36
targetSdk: 36
minSdk: 24
NDK: 27.1.12297006
Kotlin: 2.1.20
Hermes: enabled
New Architecture: enabled
```

Application ID:

```text
com.radioafricana.radio.africana
```

Version:

```text
versionName: 6.0.0
versionCode: 600
```

## Release Signing

The current release configuration uses the project's debug signing configuration.

This is acceptable for the private/client test APK.

It is not the final Google Play production signing arrangement.

Before Play Store submission:

- configure the production keystore;
- configure release signing;
- keep credentials outside source control;
- produce the final signed AAB.

## Release Minification

Release minification is currently disabled.

Any future decision to enable R8/ProGuard must be deliberate and followed by release validation.

---

# 23. iOS Configuration

Current verified release state:

```text
Marketing version: 6.0.0
Build: 16
Bundle identifier: com.radioafricana.radaf
Minimum iOS: 15.1
Distribution: App Store
```

Build 16 was successfully produced through Codemagic and uploaded to App Store Connect.

## Launch Screen

The iOS launch screen was corrected so that the launch background is white and visually continuous with the Radio Africana logo.

The correction was verified in the release build.

---

# 24. Codemagic

iOS builds are produced through Codemagic because local development is performed on Windows.

The relevant configured workflow is the iOS App Store workflow.

The release process includes:

```text
Repository
   ↓
npm ci
   ↓
CocoaPods installation
   ↓
Signing/profile setup
   ↓
Xcode archive
   ↓
IPA
   ↓
App Store Connect
```

The current successful release artifact:

```text
RadioAfricana.ipa
```

was uploaded as:

```text
Version: 6.0.0
Build: 16
Bundle ID: com.radioafricana.radaf
```

A new iOS build should only be triggered when it has a defined testing or release purpose.

---

# 25. Dependencies

Important current versions include:

```text
@react-native-async-storage/async-storage 3.1.1
@notifee/react-native 9.1.8
@react-native-firebase/app 26.3.2
@react-native-firebase/firestore 26.3.2
@react-native-firebase/messaging 26.3.2
react-native-video 6.19.2
react-native-youtube-iframe 2.4.1
```

The project uses:

```text
patch-package
```

through the `postinstall` script.

The source-controlled `react-native-video` patch must continue to apply successfully after clean installation.

---

# 26. Testing and Quality

Commands:

```text
npx tsc --noEmit
npm run lint
npm test -- --runInBand
```

Current RC result:

```text
TypeScript: PASS
ESLint: PASS
Jest: PASS
```

Jest currently contains:

```text
__tests__/App.test.tsx
```

The tests are a sanity check, not a substitute for physical-device QA.

---

# 27. Standalone Android Build

From:

```text
C:\Projects\RadioAfricana\android
```

run:

```powershell
.\gradlew.bat app:assembleRelease --no-daemon
```

Artifact:

```text
android/app/build/outputs/apk/release/app-release.apk
```

The release APK contains the JavaScript bundle and does not require Metro.

The standalone Android release has been physically tested and is suitable for private/client testing.

It is not the final Google Play AAB.

---

# 28. iOS Release Build

The iOS release is produced through Codemagic.

Current RC:

```text
6.0.0
Build 16
com.radioafricana.radaf
```

The signed IPA successfully reached App Store Connect.

The iOS release was physically tested for:

- startup;
- caching;
- splash;
- normal application operation.

---

# 29. Release Boundary

The current functionality is feature-frozen.

New feature work should not enter the release unless it is:

- a defect correction;
- a production-readiness requirement;
- an explicit client request.

Deferred future architecture:

```text
Spotify-style artist video /
direct video-stream architecture
```

This should be treated as a separate future project/update.

---

# 30. Production Readiness

The functional RC is complete.

Remaining production work is operational rather than feature development.

## Android

- production signing;
- final AAB;
- store identity/assets;
- Google Play metadata;
- Data Safety information;
- final production-device verification.

## iOS

- final App Store metadata;
- final screenshots/assets;
- final production-device verification;
- App Store review/privacy information.

## Both

- final dependency audit;
- native patch audit;
- repository hygiene;
- release notes;
- final production build selection.

---

# 31. Repository Hygiene

Generated output should not be treated as source.

Keep the repository free from:

```text
node_modules/
Gradle build output
Xcode build output
temporary logs
crash dumps
diagnostic artifacts
```

Intentional source-controlled native patches remain part of the project.

Before final release:

```powershell
git status
```

must be clean.

---

# 32. Final QA Status

## Playback

- [x] Start radio
- [x] Pause/resume
- [x] Now Playing
- [x] Artwork
- [x] Mini Player
- [x] Up Next
- [x] Background/lock playback
- [x] Android media notification metadata

## Home

- [x] Banners
- [x] Live Hero
- [x] Cached startup content
- [x] Recently Played
- [x] Latest Story
- [x] Pull-to-refresh

## Live Video

- [x] Firestore-controlled availability
- [x] WATCH LIVE lifecycle
- [x] Radio pause/resume lifecycle
- [x] YouTube launch
- [x] Empty-link/unavailable state

## Stories

- [x] Stories feed
- [x] Story Detail
- [x] Content rendering
- [x] External reading/sharing

## More

- [x] Subscribe to Shows
- [x] Programme artwork
- [x] Topic subscription
- [x] Contact Us
- [x] Meet the Team
- [x] Privacy Policy
- [x] Website/share actions

## Release

- [x] Android standalone build tested without Metro
- [x] iOS release build tested without Metro
- [x] iOS white splash verified
- [x] Android startup caching verified
- [x] iOS startup caching verified
- [x] TypeScript passed
- [x] ESLint passed
- [x] Jest passed

The remaining work is production-store preparation rather than unresolved application functionality.

---

# 33. Release Milestone — 6.0.0 RC

The 6.0.0 release represents the transition from feature development into release preparation.

Major completed work includes:

- global radio playback;
- Now Playing;
- Android dynamic media notification metadata;
- Firestore-controlled Live Video;
- platform-specific iOS Live Video access;
- Stories;
- Subscribe to Shows;
- programme artwork;
- promotional banners;
- startup caching;
- cached Now Playing/Live Hero state;
- iOS white splash background;
- standalone Android release validation;
- iOS Codemagic/TestFlight validation.

The current RC has been verified on both platforms.

---

# 34. Documentation Maintenance

Update this document when:

- architecture changes;
- service endpoints change;
- Firestore structure changes;
- playback behaviour changes;
- notification architecture changes;
- platform configuration changes;
- version/build changes;
- supported features change;
- production release procedures change.

Do not preserve obsolete development states as current configuration.

When a functional area is proven and frozen, document the verified behaviour and move to the next release criterion.
