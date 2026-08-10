# Radio Africana Mobile

## Product Specification

---

# Overview

Radio Africana Mobile is the official Android application for Radio Africana.

The application is designed to provide a premium native experience that combines uninterrupted live radio streaming with editorial storytelling, promotional content and future community features.

Rather than reproducing the Radio Africana website, the application reimagines it as a modern mobile product inspired by platforms such as Spotify, BBC Sounds and Apple News.

The website remains the Content Management System (CMS), while the mobile application becomes the primary experience for listeners and readers.

---

# Product Vision

Create the definitive mobile experience for Radio Africana by combining live audio, editorial journalism and community engagement within a fast, reliable and beautifully designed native application.

Every interaction should feel intentional, modern and effortless.

---

# Product Principles

The application is guided by five core principles.

## 1. Listening Comes First

Live radio is the primary product.

Playback must be uninterrupted, persistent and available throughout the application.

---

## 2. Editorial Excellence

Stories are not secondary content.

The reading experience should feel comparable to a premium digital publication with strong typography, comfortable spacing and distraction-free layouts.

---

## 3. CMS Driven

Content should be managed almost entirely through WordPress.

The application should minimise hardcoded content and rely on live APIs wherever practical.

---

## 4. Native Experience

Although powered by WordPress, the application should never feel like a website wrapped inside a mobile application.

Navigation, playback and interaction should feel fully native.

---

## 5. Versioned Growth

Version 1 focuses on delivering a polished foundation.

New capabilities are introduced through future releases rather than shipping incomplete experiences.

---

# Product Architecture

The application follows a layered architecture.

```text
WordPress CMS
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

Each layer has a single responsibility, making the project easier to maintain and expand.

---

# Playback Architecture

Persistent playback is one of the core architectural features of the application.

Playback is managed globally through a shared Playback Provider rather than individual screens.

```text
App
 └── Navigation
      └── PlaybackProvider
              │
              ├── Home
              ├── Stories
              ├── Story Detail
              └── More
```

This architecture allows:

- uninterrupted playback
- shared playback state
- persistent Mini Player
- cross-screen navigation while listening
- future lock-screen and notification controls

Playback architecture is implemented. Final verification of background playback, lock-screen behaviour, resume behaviour, buffering and recovery remains part of Release 0.9.7.

---

# Application Structure

## Home

Purpose:

Primary listening experience.

Responsibilities:

- LiveHero
- Live radio controls
- Dynamic Now Playing
- Dynamic album artwork
- Banner Carousel
- Featured Story
- Latest Stories
- Persistent Mini Player
- Pull-to-refresh

Home is also the primary location for promotional banner content and the main live listening experience.

---

## Stories

Purpose:

Editorial discovery.

Responsibilities:

- Stories feed
- Pull to refresh
- Infinite scrolling
- Continue Reading
- Persistent Mini Player

The Stories experience uses the WordPress content platform and is designed around a premium editorial presentation.

---

## Story Detail

Purpose:

Premium reading experience.

Responsibilities:

- Story rendering
- Native sharing
- Continue Reading
- Persistent Mini Player

Editorial display typography uses Lora, while interface and supporting text use Inter through the shared typography system.

---

## More

Purpose:

Application information and utilities.

Responsibilities:

- Contact
- Meet the Team
- Website
- Privacy Policy
- Terms & Conditions
- Share App
- Version Information
- Pull-to-refresh
- Persistent Mini Player

The More screen is part of the Version 1 application structure and follows the same application-wide visual and typography system as Home and Stories.

---

# Backend Architecture

The application relies on two API layers.

## WordPress REST API

Provides:

- Stories
- Categories
- Media
- Content

---

## Custom Radio Africana REST API

Provides:

- Now Playing
- Banner Carousel
- Additional application endpoints
- Future mobile-specific services

The backend remains CMS-driven wherever practical, with application-specific functionality exposed through the custom Radio Africana REST API.

---

# Notifications Architecture

Firebase Cloud Messaging is integrated into the Android application.

The application is connected to the existing Radio Africana Firebase project and has been verified through Firebase Console test notifications.

The current implementation supports:

- Firebase Cloud Messaging
- Android Firebase application registration
- FCM token generation
- Firebase Console test delivery

The client's existing Firebase notification workflow remains available.

Stories-specific article publication notifications are intentionally not part of the current implementation. If required later, editorial notification automation can be introduced as a separate feature.

---

# Design System

The application follows an editorial-first design system.

Visual consistency takes priority over screen-specific styling.

Every reusable component should inherit its appearance from the shared design system.

Typography, spacing and hierarchy are designed to maximise readability.

---

## Typography Architecture

The application uses two primary font families:

### Lora

Used for editorial display typography, including:

- Story titles
- Major editorial headings
- Premium reading experiences
- Prominent editorial content

### Inter

Used for interface typography, including:

- Body copy
- Metadata
- Buttons
- Navigation
- Labels
- Forms
- Status indicators

### AppText

`AppText` is the shared typography component used to render application interface text.

It consumes the central typography definitions and provides consistent typography variants across reusable components and screens.

Components should use `AppText` rather than directly styling React Native's native `Text` component whenever the text belongs to the application interface.

The application-wide typography consistency migration has been completed and verified across the primary application experience.

A repository-wide audit confirmed that the only remaining direct React Native `Text` implementation under `src/` is the intentional implementation inside `AppText.tsx`.

The Story reader retains its dedicated Inter and Lora typography configuration for editorial content.

---

# UI Consistency

Release 0.9.6 completed the application-wide UI consistency pass.

The completed work includes:

- Shared typography across Home
- Shared typography across Stories
- Shared typography across More
- Main player typography
- Mini Player typography
- Header consistency
- Navigation typography
- Banner presentation consistency
- Pull-to-refresh on Home
- Pull-to-refresh on More
- Story Detail typography
- Continue Reading typography
- Story Footer typography
- Story Hero typography
- Story Body interface typography

The application was visually verified across:

- Home
- Stories
- Story Detail
- More

The goal is for the entire application to present one consistent Radio Africana visual identity from launch through listening, navigation and editorial reading.

---

# Technology Stack

## Mobile

- React Native
- TypeScript
- React Navigation
- react-native-video
- React Native Firebase

## Backend

- WordPress
- Elementor
- Custom REST API
- Pro.Radio Theme
- Pro.Radio Child Theme

## Services

- Firebase Cloud Messaging
- Firebase Console
- WordPress REST API
- Radio Africana custom REST services

---

# Version 1 Scope

Version 1 includes:

## Listening

- Persistent playback
- Mini Player
- Dynamic metadata
- Album artwork
- Background playback

---

## Reading

- Stories
- Story Detail
- Native sharing
- Continue Reading
- Pull-to-refresh on Stories
- Infinite scrolling

---

## Content

- CMS-driven banners
- Clickable promotional banners
- Featured Story
- Latest Stories

---

## Application

- Home
- Stories
- More
- Firebase notifications
- Production Android release

---

# Current Development Status

## Completed

### Release 0.9.5 — Firebase & Typography Foundation

Completed:

- Firebase Cloud Messaging integration
- Existing Radio Africana Firebase project connection
- FCM token generation
- Firebase Console notification testing
- Shared `AppText` typography foundation
- Inter and Lora typography integration
- Shared component typography migration

---

### Release 0.9.6 — App-Wide UI Consistency

Completed:

- Application-wide typography migration
- Home typography verification
- More typography migration
- Main Player typography verification
- Mini Player typography verification
- Header consistency verification
- Navigation typography verification
- Banner presentation verification
- Home pull-to-refresh
- More pull-to-refresh
- Final Stories UI verification
- Story Detail typography migration
- Continue Reading typography migration
- Story Hero typography migration
- Story Footer typography migration
- Story Body interface typography migration
- Repository-wide native `Text` audit

Release 0.9.6 has been implemented and visually verified.

---

# Current Development Milestone

## Release 0.9.7 — Network & Playback Verification

The next development milestone focuses on verifying existing network-dependent functionality under stable network conditions.

### Stories

- Verify Stories loading.
- Verify Story pagination.
- Verify pull-to-refresh.
- Verify Story Detail loading.
- Verify Continue Reading.
- Verify native sharing.

### Banners

- Verify CMS-driven banner loading.
- Verify banner carousel behaviour.
- Verify clickable banners.
- Verify non-clickable banners.
- Verify loading and error states.

### Live Radio

- Verify radio stream connection.
- Verify Now Playing metadata.
- Verify dynamic artwork.
- Verify persistent playback.
- Verify Mini Player.
- Verify playback across navigation.
- Verify background playback.
- Verify lock-screen behaviour.
- Verify resume after background.
- Verify buffering behaviour.
- Verify playback recovery.

### Network Resilience

- Verify loading states.
- Verify friendly error states.
- Verify retry behaviour.
- Verify offline behaviour.
- Confirm temporary network failures do not expose technical errors to users.

No unnecessary changes will be made to networking or playback services until the existing behaviour has been tested under a reliable network connection.

---

# Future Development

The following features are intentionally outside Version 1.

- Programme Schedule
- Search
- Bookmarks
- Podcasts
- Presenter Profiles
- Events
- Dark Mode
- Sleep Timer
- Offline Reading

---

# Engineering Principles

The project follows these engineering principles.

- Reusable components before reusable screens.
- Shared services before duplicated logic.
- CMS before hardcoded content.
- Stable releases before rapid expansion.
- Every visible feature must function correctly.
- Documentation evolves alongside the application.
- Existing client workflows should be preserved wherever practical.
- New functionality should not be introduced unless it is required by the current product scope.
- Completed releases must be documented and committed before the next milestone begins.

---

# Release Strategy

The project is developed through small, controlled releases.

Each release should be:

1. Implemented.
2. Tested.
3. Documented.
4. Committed.
5. Pushed to the repository.

Completed milestones:

- Release 0.1 — Foundation
- Release 0.2 — Project Architecture
- Release 0.3 — Live Radio Foundation
- Release 0.4 — Premium Home Experience
- Release 0.5 — Live Content Platform
- Release 0.6 — Editorial Platform
- Release 0.7 — Design System & Reader Experience
- Release 0.8 — Persistent Playback Architecture
- Release 0.9 — More Screen
- Release 0.9.5 — Firebase & Typography Foundation
- Release 0.9.6 — App-Wide UI Consistency

The current development milestone is:

**Release 0.9.7 — Network & Playback Verification**

---

# Success Criteria

Version 1 will be considered complete when:

- Live radio functions reliably under stable network conditions.
- Playback continues across navigation.
- Background playback has been verified.
- Lock-screen behaviour has been verified.
- Playback recovery has been verified.
- Stories provide a premium reading experience.
- Stories function reliably under stable network conditions.
- Banner content loads reliably.
- Every visible feature is fully functional.
- Firebase notifications are operational.
- The application uses a consistent visual and typography system.
- Home and More provide appropriate pull-to-refresh behaviour.
- Network failure and offline behaviour provide appropriate user feedback.
- The application is production-ready for Google Play.