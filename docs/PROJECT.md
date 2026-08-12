# Radio Africana Mobile

## Product Specification

### Current Project State

**Target:** Version 1.0  
**Current Milestone:** Version 1.0 Release Candidate  
**Last Completed Milestone:** Release 0.9.7 — Network & Playback Verification

The core application architecture is complete. The application has passed the current functional verification of its primary listening, editorial and CMS-driven content systems.

## Overview

Radio Africana Mobile is the official Android application for Radio Africana.

The application provides a premium native experience combining uninterrupted live radio streaming, editorial storytelling, promotional content and future community features.

The website remains the Content Management System while the mobile application serves as the primary native listening and reading experience.

## Product Principles

1. **Listening Comes First** — live radio is the primary product and playback must remain persistent.
2. **Editorial Excellence** — Stories should feel like a premium digital publication.
3. **CMS Driven** — live content should come from WordPress and Radio Africana services wherever practical.
4. **Native Experience** — navigation, playback and interaction should behave like a native Android application.
5. **Versioned Growth** — new capabilities are introduced through controlled releases rather than unfinished feature expansion.

## Product Architecture

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

## Playback Architecture

Playback is managed globally through the shared Playback Provider.

```text
App
 └── Navigation
      └── PlaybackProvider
              ├── Home
              ├── Stories
              ├── Story Detail
              └── More
```

This provides:

- uninterrupted playback
- shared playback state
- persistent Mini Player
- cross-screen listening
- Android background playback
- Android media notification controls

The current implementation uses `react-native-video` with the Android ExoPlayer/Media3 playback service.

## Application Structure

### Home

Primary listening experience.

- LiveHero
- Live radio controls
- Dynamic Now Playing
- Dynamic artwork
- Banner Carousel
- Featured Story
- Latest Stories
- Persistent Mini Player

### Stories

Editorial discovery.

- Stories feed
- Pull-to-refresh
- Infinite scrolling
- Story Detail navigation
- Continue Reading
- Native sharing

### Story Detail

Premium reading experience.

- Story rendering
- Native sharing
- Continue Reading
- Persistent Mini Player

### More

Application information and utilities.

- Contact
- Meet the Team
- Website
- Privacy Policy
- Terms & Conditions
- Share App
- Version information
- Persistent Mini Player

## Backend Architecture

### WordPress REST API

Provides:

- Stories
- Categories
- Media
- Editorial content

### Custom Radio Africana REST API

Provides:

- Now Playing
- Banner Carousel
- Additional mobile-specific endpoints

## Design Architecture

The application uses centralised design tokens for:

- Colours
- Typography
- Spacing
- Radius
- Shadows

`AppText` is the shared typography rendering layer. Inter is used for interface typography and Lora for editorial display typography.

## Version 1 Scope

### Listening

- Live radio
- Persistent playback
- Cross-screen playback
- Mini Player
- Dynamic metadata
- Dynamic artwork
- Background playback

### Reading

- Stories
- Story Detail
- Continue Reading
- Native sharing

### Content

- CMS-driven banners
- Clickable promotional banners
- Featured Story
- Latest Stories

### Application

- More screen
- Firebase notifications
- Production Android release

## Known Limitation

The current Now Playing polling mechanism runs in React Native JavaScript. Android may suspend the JavaScript polling loop while the app is fully backgrounded. Consequently, the Android notification can retain the previous track until the app becomes active again.

Playback itself remains uninterrupted. This is documented as a future enhancement rather than a Version 1 blocker.

## Version 1.0 Release Candidate

The current work is no longer feature expansion. It is focused on:

- Functional QA
- Production Android build
- Performance review
- Accessibility review
- Final UI consistency
- Production testing
- Google Play preparation
