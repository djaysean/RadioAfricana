# Radio Africana Mobile

**Official Android application for Radio Africana**

![Platform](https://img.shields.io/badge/Platform-Android-green)
![React Native](https://img.shields.io/badge/React%20Native-0.86.2-blue)
![Version](https://img.shields.io/badge/Version-1.0.0-gold)
![Status](https://img.shields.io/badge/Status-Client%20Test%20Candidate-gold)

## 1. Project Status

Radio Africana Mobile is the native Android application for Radio Africana, combining live African radio with an editorial Stories experience and CMS-driven promotional content.

The application is **feature-complete for Version 1.0.0** and has passed the current functional and production QA performed on the development build.

The project is now moving from application development into the release process:

1. Final documentation consolidation
2. Client-test APK generation
3. Local installation and verification
4. Client testing and approval
5. Google Play release preparation
6. Signed production AAB
7. Existing Google Play application update

The application is **not yet considered publicly released**. The client-test build and production Play release remain separate steps.

### Current Version Identity

| Item | Current value |
|---|---|
| Application version | `1.0.0` |
| Android version name | `1.0` |
| Current Android version code | `1` |
| Android application ID | `com.radioafricana.radio.africana` |
| Platform | Android |
| React Native | `0.86.2` |
| TypeScript | Yes |
| Play Console application | Existing Radio Africana production app |

**Important:** the existing production Play Console application already uses `com.radioafricana.radio.africana`. The final production `versionCode` must be higher than the version currently published on Google Play; the current project value of `1` is therefore a development/release-candidate value until the existing Play version code is confirmed.

---

## 2. Product

Radio Africana Mobile provides three primary experiences:

### Live Radio

The application is first and foremost a persistent live radio player.

Users can:

- Start and stop the live stream
- Keep playback active while navigating between screens
- Continue playback while the app is backgrounded
- Use Android media/lock-screen controls
- See the current track metadata and artwork
- Use the persistent Mini Player throughout the application
- Recover playback after a temporary network interruption

### Stories

The Stories experience provides the editorial side of Radio Africana.

Users can:

- Browse published Stories
- Pull to refresh
- Load additional Stories
- Open individual Story Detail pages
- Read CMS-provided article content
- Continue reading from Story Detail
- Share Stories through the native Android share mechanism

### More

The More screen provides application and service links:

- Contact Us
- Meet the Team
- Visit Website
- Privacy Policy
- Share App
- App Version

There is **no Terms & Conditions item** in the current application.

---

## 3. Current Feature Set

### Home

The Home screen combines listening and editorial discovery:

- Radio Africana branding
- LiveHero
- Live radio controls
- Dynamic Now Playing information
- Dynamic artwork
- Promotional banner carousel
- Featured Story
- Latest Stories
- Persistent Mini Player

### Playback

Playback is globally managed and persists across navigation.

Current verified behaviour includes:

- Live streaming
- Play / Pause
- Cross-screen playback
- Persistent Mini Player
- Background playback
- Android media notification controls
- Lock-screen controls
- Dynamic track title
- Dynamic artist
- Dynamic artwork
- Playback recovery after temporary network interruption

### Stories

- CMS-driven Stories feed
- Pull-to-refresh
- Infinite scrolling
- Story Detail
- HTML article rendering
- Continue Reading
- Native sharing

### Promotional Content

- CMS-driven banners
- Clickable promotional banners
- Banner carousel
- Network-dependent banner loading

### Notifications

Firebase Cloud Messaging is integrated.

Current verified notification behaviour:

- Foreground notification presentation
- Background notification delivery
- Terminated-app notification delivery
- Notification tap opens the application
- Existing Firebase background/terminated delivery remains intact

Foreground notification presentation uses Notifee.

Firebase remains the message-delivery layer; Notifee is used for foreground Android notification presentation.

---

## 4. Content and Backend Architecture

The mobile application does not maintain the editorial catalogue independently.

### WordPress

The Radio Africana WordPress site acts as the primary editorial CMS and provides REST API content for:

- Stories
- Categories
- Media
- Editorial content used by the mobile application

### Radio Africana Services

Custom Radio Africana endpoints provide application-specific data such as:

- Now Playing
- Current artwork
- Promotional banners
- Other mobile-specific service data

### Application Flow

```text
WordPress / Radio Africana Services
                │
                ▼
           REST APIs
                │
                ▼
        Shared API Services
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

---

## 5. Playback Architecture

Playback is managed globally through:

```text
PlaybackProvider
      │
      ├── Home
      ├── Stories
      ├── Story Detail
      └── More
```

The provider owns shared playback state and exposes play, pause and toggle behaviour through the playback context.

The actual Android player uses `react-native-video` and its ExoPlayer/Media3 integration.

The Android playback service is responsible for background media behaviour and Android media notification integration.

### Network Recovery

The application recreates the player instance when playback is explicitly resumed after a playback failure. This allows the radio stream to establish a fresh connection after a temporary network interruption.

Verified scenario:

```text
Playing
   ↓
Network interrupted
   ↓
Playback fails
   ↓
Network restored
   ↓
User presses Play
   ↓
Fresh player instance
   ↓
Stream reconnects
   ↓
Audio resumes
```

This behaviour has been manually verified.

---

## 6. Now Playing

Now Playing information is retrieved from the Radio Africana service and used by the application for:

- Artist
- Track title
- Artwork

The same information is used by the playback layer for Android media metadata.

### Known Limitation

Now Playing polling is performed from the React Native JavaScript layer.

Android can suspend JavaScript execution while the application is fully backgrounded. As a result, the Android media notification may retain the previous track's metadata/artwork until the application becomes active again.

This does **not** stop the radio stream. Audio playback continues.

This is a known future enhancement, not a Version 1.0 functional blocker.

---

## 7. Notifications Architecture

```text
Firebase Cloud Messaging
          │
          ▼
React Native Firebase Messaging
          │
     ┌────┴────┐
     │         │
Foreground   Background /
     │       Terminated
     ▼         │
  Notifee     ▼
     │     Android / FCM
     ▼         │
Android        ▼
notification  Android
             notification
```

Responsibilities are deliberately separated:

- **Firebase Cloud Messaging:** message delivery
- **React Native Firebase Messaging:** React Native FCM integration
- **Notifee:** foreground Android notification presentation

The working background and terminated-app notification path is not unnecessarily replaced by the foreground implementation.

---

## 8. Navigation

The application uses React Navigation.

The primary application areas are:

- Home
- Stories
- More

Story Detail is opened from the Stories experience.

Playback is global, so navigation between these areas does not inherently stop the radio.

---

## 9. Design System

The interface uses centralized design constants and shared UI components.

The design direction is based on:

- Radio Africana branding
- White and dark text surfaces
- Gold brand accents
- Clear hierarchy
- Editorial typography
- Native Android interaction patterns

Typography is centralized through the shared `AppText` component.

Current type direction:

- **Inter** for interface/UI typography
- **Lora** for editorial display typography

Design tokens are maintained through the project's constants and shared UI architecture rather than duplicated screen-by-screen.

---

## 10. Project Structure

The main application structure is:

```text
RadioAfricana/
├── android/
├── assets/
├── docs/
│   └── PROJECT.md
├── patches/
├── src/
│   ├── components/
│   ├── constants/
│   ├── navigation/
│   ├── playback/
│   ├── screens/
│   ├── services/
│   └── types/
├── package.json
├── package-lock.json
└── README.md
```

The current documentation set intentionally contains only:

```text
README.md
docs/PROJECT.md
```

Historical release, roadmap, checklist and design-system documents are not maintained as separate active documentation files. Git history remains the record of implementation history.

---

## 11. Technology Stack

### Application

- React Native `0.86.2`
- React `19.2.3`
- TypeScript
- React Navigation `7.x`
- `react-native-video` `6.19.2`
- React Native Firebase App `26.1.0`
- React Native Firebase Messaging `26.1.0`
- Notifee `9.1.8`
- React Native Gesture Handler
- React Native Reanimated
- React Native Render HTML
- React Native Safe Area Context
- React Native Screens
- React Native SVG
- React Native Worklets

### Backend / Content

- WordPress REST API
- Custom Radio Africana REST API
- Radio Africana website/CMS

### Android

- Android SDK configuration currently targets/compiles against SDK 36
- Android application ID: `com.radioafricana.radio.africana`
- Media playback: ExoPlayer / AndroidX Media3 through `react-native-video`

---

## 12. Development

Install dependencies:

```bash
npm install
```

Start Metro:

```bash
npx react-native start
```

Reset Metro cache when required:

```bash
npx react-native start --reset-cache
```

Run the Android development build:

```bash
npx react-native run-android
```

Native dependency, Firebase, Android configuration or native source changes require a fresh Android build.

---

## 13. Release Process

The application follows this release path from the current state.

### Stage 1 — Client Test APK

Generate an installable Android APK.

The APK is intended for:

- Developer device testing
- Client device testing
- Final functional confirmation before Play Store submission

The APK is **not** the Google Play production artifact.

### Stage 2 — Client Approval

The client tests the APK.

If issues are discovered:

```text
Issue
  ↓
Fix
  ↓
Rebuild APK
  ↓
Retest
```

The production release does not proceed until the client approves the candidate.

### Stage 3 — Google Play Preparation

The existing production Play Console application is used.

Confirmed application ID:

```text
com.radioafricana.radio.africana
```

Before production release:

- Confirm the existing Play version code
- Set a higher Android `versionCode`
- Confirm Google Play App Signing / upload-key arrangement
- Prepare the production signing configuration
- Prepare store assets
- Prepare screenshots
- Confirm privacy policy
- Complete required Play Console declarations
- Confirm target API requirements

### Stage 4 — Production AAB

Generate a properly signed Android App Bundle:

```text
.aab
```

The AAB is the production Google Play artifact.

The existing Play application must be updated rather than creating a second Radio Africana listing.

---

## 14. Testing Status

The following areas have been manually verified on the current build:

- Home
- Stories
- Story Detail
- More
- Promotional banners
- Live radio
- Persistent playback
- Cross-screen playback
- Background playback
- Lock-screen playback
- Resume behaviour
- Network recovery
- Dynamic Now Playing
- Dynamic artwork
- Firebase foreground notifications
- Firebase background notifications
- Firebase terminated-app notifications
- Notification tap handling
- General production QA
- UI consistency
- Stability during normal navigation

The current build is therefore considered **feature-complete and suitable for creation of the client-test APK**.

---

## 15. Release Readiness

### Complete

- Application architecture
- Core UI
- Live radio
- Persistent playback
- Stories
- Story Detail
- More
- CMS integration
- Now Playing
- Artwork
- Background playback
- Playback recovery
- Firebase notifications
- Foreground notification presentation
- Production QA
- Version 1.0.0 application versioning
- Existing Play application identity confirmed

### Remaining before public release

- Generate client-test APK
- Install and verify APK independently
- Send APK to client
- Client testing and approval
- Confirm existing Play version code
- Configure/confirm release signing
- Prepare final store screenshots and graphics
- Complete Play Console release information
- Generate signed production AAB
- Submit/update the existing Play Store application

---

## 16. Scope Boundary

Version 1.0 is intentionally focused on the core Radio Africana experience.

Features not included in the current release include:

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
- Background-native Now Playing synchronization

These are future product opportunities, not unfinished Version 1.0 requirements.

---

## 17. Project Completion Definition

Radio Africana Mobile Version 1.0 is considered publicly released only when:

1. The client has approved the final test build.
2. A valid production signing configuration is confirmed.
3. A signed AAB is generated.
4. The AAB is accepted by Google Play Console.
5. The existing Radio Africana Play Store application is updated successfully.

Until then, the application is a **Version 1.0 client-test/release candidate**, not a publicly released product.

---

**Radio Africana Mobile — Version 1.0.0**

Copyright © Radio Africana. All rights reserved.
