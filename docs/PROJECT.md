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

```
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

```
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

---

## Story Detail

Purpose:

Premium reading experience.

Responsibilities:

- Story rendering
- Native sharing
- Continue Reading
- Persistent Mini Player

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
- Persistent Mini Player

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

---

# Design Philosophy

The application follows an editorial-first design system.

Visual consistency takes priority over screen-specific styling.

Every reusable component should inherit its appearance from the shared design system.

Typography, spacing and hierarchy are designed to maximise readability.

---

# Technology Stack

## Mobile

- React Native
- TypeScript
- React Navigation
- react-native-video

## Backend

- WordPress
- Elementor
- Custom REST API
- Pro.Radio Theme
- Pro.Radio Child Theme

## Planned

- Firebase Cloud Messaging
- Firebase Analytics (future)

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

---

## Content

- CMS-driven banners
- Clickable promotional banners
- Featured Story
- Latest Stories

---

## Application

- More screen
- Firebase notifications
- Production Android release

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

---

# Success Criteria

Version 1 will be considered complete when:

- Live radio functions reliably.
- Playback continues across navigation.
- Stories provide a premium reading experience.
- Every visible feature is fully functional.
- Firebase notifications are operational.
- The application is production-ready for Google Play.