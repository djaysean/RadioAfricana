# Radio Africana Mobile — Project Specification

## 1. Product Identity

**Product:** Radio Africana Mobile  
**Platform:** Android  
**Application ID:** `com.radioafricana.radio.africana`  
**Application Version:** `1.0.0`  
**Android Version Name:** `1.0`  
**Current Android Version Code:** `1`  
**React Native:** `0.86.2`  
**Status:** Feature-complete Version 1.0 client-test candidate

Radio Africana Mobile is the official Android application for Radio Africana. It combines persistent live radio playback with a CMS-driven editorial Stories experience and promotional content.

The application is designed as a native listening and reading experience while the Radio Africana website remains the primary editorial content management system.

---

## 2. Current State

The application is feature-complete for the Version 1.0 scope.

The current build has passed manual functional and production QA covering:

- Home
- Stories
- Story Detail
- More
- Banner behaviour
- Live playback
- Persistent playback
- Cross-screen playback
- Background playback
- Lock-screen playback
- Dynamic Now Playing information
- Dynamic artwork
- Network recovery
- Firebase notifications
- General UI consistency
- Stability during normal use

The immediate next deliverable is an installable **client-test APK**.

The public Google Play release follows client approval and is a separate production-signing/AAB process.

---

## 3. Product Principles

### Listening Comes First

Live radio is the primary product experience. Playback should remain persistent while users navigate through the application and should behave correctly in the Android background.

### Editorial Quality

Stories are treated as a first-class editorial experience rather than a simple feed of web links.

### CMS Driven

Editorial content and promotional data should come from the Radio Africana website and services wherever practical.

### Native Android Experience

Navigation, media controls, sharing, notifications and interaction should feel appropriate to a native Android application.

### Controlled Scope

Version 1.0 is deliberately focused. Future capabilities are not treated as unfinished Version 1 work.

---

## 4. Application Architecture

The application follows a layered architecture:

```text
External Content / Services
        │
        ▼
      REST APIs
        │
        ▼
    Shared Services
        │
        ▼
   Application State
        │
        ▼
     Navigation
        │
        ▼
      Screens
        │
        ▼
Reusable Components
```

### Major application layers

#### `src/services`

Responsible for communication with external systems and application-level services, including:

- WordPress content
- Now Playing
- Firebase notifications

#### `src/playback`

Responsible for global playback state and playback provider/context.

#### `src/navigation`

Defines the application's navigation structure.

#### `src/screens`

Contains the main application screens and Story Detail experience.

#### `src/components`

Contains reusable UI components such as:

- LiveHero
- MiniPlayer
- Story components
- Banner components
- Shared UI elements

#### `src/constants`

Contains centralized application constants and design tokens.

#### `src/types`

Contains shared TypeScript types.

---

## 5. Navigation

The primary navigation areas are:

```text
Home
Stories
More
```

Story Detail is reached from Stories.

Playback is global and does not belong exclusively to a single screen.

The persistent Mini Player provides access to the current listening state while users navigate through the application.

---

## 6. Home Screen

Home is the primary listening and discovery screen.

### Responsibilities

- Establish the live radio experience immediately
- Present current Now Playing information
- Provide playback controls
- Display current artwork
- Surface promotional banners
- Surface the Featured Story
- Surface Latest Stories
- Maintain the Mini Player

### Main content

```text
Home
 ├── LiveHero
 ├── Banner Carousel
 ├── Featured Story
 ├── Latest Stories
 └── Mini Player
```

---

## 7. Stories Screen

Stories is the editorial discovery surface.

### Supported behaviour

- CMS-driven Story feed
- Pull-to-refresh
- Infinite scrolling
- Story navigation
- Story loading/error states
- Continued playback through navigation
- Native sharing from Story Detail

The screen does not require the radio to stop while users browse.

### Offline/error behaviour

When the network is unavailable, Stories presents a user-facing error state rather than crashing or exposing an unhandled technical exception.

Verified example:

> Unable to load Stories  
> We couldn't load the latest stories right now. Please try again

---

## 8. Story Detail

Story Detail provides the reading experience for individual Stories.

### Supported behaviour

- Story title and editorial content
- HTML rendering
- Media/content supplied through the CMS
- Continue Reading
- Native sharing
- Persistent Mini Player
- Normal back navigation

The screen is intended to feel like a native editorial reader rather than an embedded website.

---

## 9. More Screen

The current More screen contains exactly these application items:

1. Contact Us
2. Meet the Team
3. Visit Website
4. Privacy Policy
5. Share App
6. App Version

There is **no Terms & Conditions item** in the application.

The displayed version is sourced from the root `package.json`, allowing the UI to remain aligned with the application package version.

Current displayed version:

```text
App Version 1.0.0
```

---

## 10. Live Playback Architecture

Playback is global.

```text
Application
   │
   ▼
Navigation
   │
   ▼
PlaybackProvider
   │
   ├── Home
   ├── Stories
   ├── Story Detail
   └── More
```

The shared playback context exposes:

- `isPlaying`
- `play`
- `pause`
- `toggle`

The provider hosts the hidden `react-native-video` player.

### Playback engine

The Android implementation uses:

- `react-native-video` `6.19.2`
- Android ExoPlayer / Media3
- Android playback service support

### Playback requirements verified

- Play
- Pause
- Toggle
- Persistent playback
- Cross-screen playback
- Background playback
- Lock-screen controls
- Android media notification
- Dynamic metadata
- Dynamic artwork
- Recovery after network interruption

---

## 11. Playback Network Recovery

A failed stream player cannot simply be unpaused after a network interruption because the underlying player instance may have already entered an error state.

The current application therefore recreates the player instance when playback is explicitly resumed after failure.

### Verified behaviour

```text
Radio playing
      │
      ▼
Network interruption
      │
      ▼
Player loses stream
      │
      ▼
Network restored
      │
      ▼
User presses Play
      │
      ▼
Fresh player instance
      │
      ▼
Stream reconnects
      │
      ▼
Audio resumes
```

This has been tested successfully.

The recovery implementation is deliberately contained in the application playback layer and does not alter the working native notification metadata architecture.

---

## 12. Now Playing Architecture

Now Playing data comes from the Radio Africana service.

The current data model provides:

- `artist`
- `title`
- `picture`

The data is consumed by the application for:

- LiveHero
- Mini Player
- playback metadata
- artwork

The Android media layer also receives metadata through the `react-native-video` Media3 integration.

### Background metadata limitation

The application polls Now Playing from React Native JavaScript.

When Android suspends the JavaScript runtime while the application is fully backgrounded, polling may temporarily stop. Consequently, the Android notification can display the previous track until the application becomes active again.

This does not interrupt the audio stream.

It is a known future enhancement rather than a Version 1.0 release blocker.

---

## 13. Android Media Notification

The Android playback implementation uses Media3 metadata and artwork.

Current notification metadata includes:

- Track title
- Artist
- Description
- Artwork

The notification artwork is sourced from the current Now Playing artwork.

The current implementation has been manually verified to display the correct artist, title and artwork when the application is active and metadata has refreshed.

The notification can retain stale Now Playing information during prolonged full-background operation because of the JavaScript polling limitation documented above.

---

## 14. Notifications

Firebase Cloud Messaging is the transport mechanism.

### Dependencies

- `@react-native-firebase/app` `26.1.0`
- `@react-native-firebase/messaging` `26.1.0`
- `@notifee/react-native` `9.1.8`

### Notification architecture

```text
FCM
 │
 ▼
React Native Firebase Messaging
 │
 ├── Foreground
 │      │
 │      ▼
 │   Notifee
 │      │
 │      ▼
 │ Android notification
 │
 └── Background / Terminated
        │
        ▼
     Existing Android /
     Firebase notification path
```

### Verified states

#### Foreground

FCM messages received while the application is active are displayed using Notifee.

#### Background

Messages arrive through the existing Firebase/Android path.

#### Terminated

Messages arrive while the application is closed.

#### Tap

Tapping the notification opens the application correctly.

The working background/terminated path was intentionally not replaced merely to implement foreground presentation.

---

## 15. Backend and Content Architecture

### WordPress REST API

WordPress is the editorial CMS.

It supplies content such as:

- Stories
- Categories
- Media
- Editorial data

### Radio Africana REST services

Custom services provide mobile-specific information such as:

- Now Playing
- Current artwork
- Promotional banners

### Content principle

The application should consume live CMS/service data rather than maintain duplicate editorial data locally.

---

## 16. Promotional Banners

The Home screen includes a CMS-driven promotional banner carousel.

Supported behaviour:

- Remote banner loading
- Multiple banners
- Swipe/rotation interaction
- Clickable promotional links
- Network-dependent content loading

When the network is unavailable, remote banners that have not loaded cannot appear and links that require the network cannot open. The application remains stable.

---

## 17. Design System

The application uses centralized design tokens and shared typography rather than isolated styling decisions.

### Brand direction

- Gold accents
- White surfaces
- Dark text
- Editorial contrast
- Clean card surfaces
- Rounded containers
- Native Android touch interaction

### Typography

`AppText` is the shared text rendering component.

The type system uses:

- **Inter** for interface typography
- **Lora** for editorial display typography

### Design tokens

The project centralizes values for:

- Colours
- Typography
- Spacing
- Radius
- Shadows

The design system is intentionally implemented through reusable constants/components rather than maintained as a separate runtime subsystem.

---

## 18. Error and Network Behaviour

The application has been manually tested under network interruption.

### Stories

Offline loading presents a controlled user-facing error state.

### Banners

Network-dependent banners fail gracefully without crashing the application.

### General content

A temporary network failure may produce a network request error during refresh. Once connectivity is restored, content pages can load normally again.

### Playback

Playback has explicit recovery behaviour and successfully reconnects after the network is restored when the user presses Play.

---

## 19. Current Dependencies

Important runtime dependencies include:

```text
react-native             0.86.2
react                     19.2.3
react-native-video        6.19.2
@react-native-firebase/app       26.1.0
@react-native-firebase/messaging 26.1.0
@notifee/react-native     9.1.8
```

Other core dependencies include:

- React Navigation
- React Native Gesture Handler
- React Native Reanimated
- React Native Render HTML
- React Native Safe Area Context
- React Native Screens
- React Native SVG
- React Native Worklets
- Lucide React Native

The project uses `patch-package` for the existing `react-native-video` Android patching arrangement.

---

## 20. Android Configuration

### Application identity

```text
applicationId: com.radioafricana.radio.africana
```

This exactly matches the client's existing production Google Play application.

### Current development/release-candidate values

```text
versionName: 1.0
versionCode: 1
```

The root `package.json` version is:

```text
1.0.0
```

### Important production-release requirement

Because the existing Play Store application already has releases, the current `versionCode` of `1` cannot simply be assumed to be the final upload value.

Before production AAB generation:

1. Confirm the current Play Console version code.
2. Set a higher Android version code.
3. Confirm Google Play App Signing.
4. Confirm the appropriate upload-key arrangement.
5. Configure a proper release signing configuration.

The current development configuration must not be treated as the final production signing configuration.

---

## 21. Google Play Identity

The client already has an existing production Radio Africana application in Google Play Console.

Confirmed package:

```text
com.radioafricana.radio.africana
```

The new application is therefore intended to be an **update to the existing Play Store application**, not a new Play Store listing.

No new Play Console application should be created for Version 1.0.

---

## 22. Release Artifacts

Two Android artifacts are relevant to the remaining release process.

### Client-test APK

The next immediate artifact is an installable APK.

Purpose:

- Install directly on the developer device
- Send to the client
- Perform final real-device/client QA
- Confirm the candidate independently of Metro/development tooling

The APK is a testing artifact.

### Production AAB

After client approval, produce a properly signed Android App Bundle.

Purpose:

- Upload to the existing Google Play application
- Use the production signing configuration
- Publish Version 1.0 through Google Play

The APK and AAB serve different purposes and should not be treated as interchangeable.

---

## 23. Current Release Path

The remaining release path is:

```text
Feature-complete application
          │
          ▼
Final documentation
          │
          ▼
Client-test APK
          │
          ▼
Developer device verification
          │
          ▼
Client testing
          │
          ▼
Client approval
          │
          ▼
Play version-code confirmation
          │
          ▼
Signing / upload-key configuration
          │
          ▼
Store assets + Play Console information
          │
          ▼
Signed production AAB
          │
          ▼
Existing Play Store application
          │
          ▼
Version 1.0 release
```

---

## 24. Release Scope

Version 1.0 contains:

### Listening

- Live Radio
- Persistent playback
- Cross-screen playback
- Mini Player
- Dynamic Now Playing
- Dynamic artwork
- Background playback
- Lock-screen controls
- Network recovery

### Editorial

- Stories
- Story Detail
- HTML rendering
- Continue Reading
- Native sharing

### Content

- Featured Story
- Latest Stories
- CMS-driven banners
- Clickable promotional banners

### Application

- More screen
- Firebase notifications
- Foreground notification presentation
- Android media notification
- Version information

---

## 25. Explicitly Out of Scope for Version 1

The following are future product opportunities and are not Version 1 blockers:

- Programme Schedule
- Search
- Bookmarks
- Podcasts
- Presenter Profiles
- Events
- Dark Mode
- Sleep Timer
- Offline Reading
- Advanced notification routing
- Native background Now Playing synchronization
- Other future community features

---

## 26. QA Record

The current build has passed manual testing of:

### Navigation

- Home
- Stories
- Story Detail
- More
- Back navigation
- Story navigation

### Playback

- Start
- Pause
- Toggle
- Cross-screen playback
- Background playback
- Lock-screen controls
- Resume
- Network interruption
- Network recovery

### Content

- Stories loading
- Story Detail
- Pull-to-refresh
- Infinite scrolling
- Banner behaviour
- Featured Story
- Latest Stories

### Notifications

- Foreground
- Background
- Terminated
- Notification tap

### Production QA

- General navigation
- Scrolling
- UI consistency
- Text readability
- Tap targets
- No observed crashes
- No observed blocking freezes
- Stable playback while navigating

---

## 27. Known Limitations

Only the following known limitation is intentionally carried into the Version 1 candidate:

### Background Now Playing notification freshness

The JavaScript Now Playing polling loop can be suspended while the application is fully backgrounded. The Android notification can therefore temporarily retain the previous track's metadata/artwork.

**Impact:** notification metadata can become stale.

**Impact on playback:** none. The live audio continues.

**Classification:** future enhancement, not a Version 1 release blocker.

No Terms & Conditions feature, screen or menu item is part of the current product and should not be documented as such.

---

## 28. Documentation Policy

This project no longer maintains separate active documents for:

- Release history
- Changelog
- Roadmap
- Version 1 checklist
- Standalone design system

Those documents were useful during development but are now consolidated.

The authoritative documentation is:

```text
README.md
docs/PROJECT.md
```

Git history remains the historical record of development and implementation changes.

Future changes should update these documents when they materially alter the product, architecture, dependencies, release process or known limitations.

---

## 29. Definition of Final Release

The application becomes a public Version 1.0 release only after all of the following are true:

- Client-test APK generated
- APK installed and verified
- Client testing completed
- Client approval received
- Existing Play version code confirmed
- Production signing configuration confirmed
- Store screenshots and graphics prepared
- Play Store listing information completed
- Signed production AAB generated
- AAB accepted by Google Play
- Existing Radio Africana Play Store application updated

Until those steps are complete, the codebase is the **Version 1.0 client-test/release candidate**.

---

## 30. Final Product Statement

Radio Africana Mobile Version 1.0 is the native Android listening and editorial application for Radio Africana.

Its Version 1 foundation is intentionally focused:

**listen → discover → read → share → stay connected.**

The current objective is no longer feature expansion. It is controlled delivery of the completed application through client testing and, after approval, the existing Radio Africana Google Play application.
