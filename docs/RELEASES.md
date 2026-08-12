# Radio Africana Mobile Releases

## Overview

This document records completed development milestones.

Completed releases are historical records and are not reopened as active work. Future work belongs in `Roadmap.md`.

---

# Release 0.1 — Foundation

- React Native project created
- Android environment configured
- Initial application bootstrapped
- Repository created

**Status:** ✅ Completed

---

# Release 0.2 — Project Architecture

- Modular project structure
- Navigation architecture
- Shared constants
- Shared services
- Base component structure
- TypeScript foundation

**Status:** ✅ Completed

---

# Release 0.3 — Live Radio Foundation

- Live Now Playing service
- Dynamic artwork
- Initial Home experience
- Banner carousel foundation
- Radio service integration

**Status:** ✅ Completed

---

# Release 0.4 — Premium Home Experience

- Premium Home layout
- LiveHero
- Banner Carousel
- Featured Story
- Improved spacing and typography
- Shared service improvements
- Component separation

**Status:** ✅ Completed

---

# Release 0.5 — Live Content Platform

- Featured Story service
- Banner service
- Shared API layer
- Dynamic Home content
- Remote image support
- Custom Radio Africana REST namespace
- Elementor Banner endpoint
- Child Theme integration

**Status:** ✅ Completed

---

# Release 0.6 — Editorial Platform

- Stories feed
- Infinite scrolling
- Story Detail
- HTML rendering
- Slug navigation
- Story metadata
- Premium reader layout
- Shared Story services

**Status:** ✅ Completed

---

# Release 0.7 — Design System & Reader Experience

- Shared colour, typography, spacing, radius and shadow systems
- Inter and Lora integration
- Improved article hierarchy
- Continue Reading
- Native sharing
- Premium editorial layouts
- Project documentation foundation

**Status:** ✅ Completed

---

# Release 0.8 — Persistent Live Playback

- Global Playback Provider
- Shared Playback Context
- Persistent playback state
- Cross-screen playback
- Background playback
- Play / Pause
- Persistent Mini Player
- LiveHero playback integration

**Status:** ✅ Completed

---

# Release 0.9 — More Screen

- More screen
- Contact and information utilities
- Website
- Privacy Policy
- Terms & Conditions
- Share App
- Version information

**Status:** ✅ Completed

---

# Release 0.9.5 — Firebase & Typography Foundation

## Firebase

- Firebase Cloud Messaging integration
- Existing Radio Africana Firebase Android registration retained
- Notification permission support
- FCM token generation
- Firebase Console test notification verified on a physical Android device

## Typography

- Shared `AppText` component
- Inter and Lora connected to reusable UI rendering
- Core shared components migrated

**Status:** ✅ Completed

---

# Release 0.9.6 — App-Wide UI Consistency

## Completed

- Application-wide typography migration
- Home typography verification
- More typography migration
- Story Detail typography migration
- Continue Reading typography migration
- Main Player typography verification
- Mini Player typography verification
- Header consistency
- Navigation typography
- Banner presentation verification
- Home pull-to-refresh
- More pull-to-refresh
- Repository-wide native `Text` audit

## Preserved

- Playback architecture
- Stories data and pagination
- CMS/API architecture
- Firebase implementation
- Navigation architecture

**Status:** ✅ Completed

---

# Release 0.9.7 — Network & Playback Verification

## Verified

### Stories

- Stories loading
- Story pagination
- Pull-to-refresh
- Story Detail navigation
- Continue Reading
- Native sharing

### Banners

- CMS-driven banner loading
- Carousel behaviour
- Clickable banners
- Non-clickable behaviour

### Live Radio

- Stream connection
- Now Playing metadata
- Dynamic artwork
- Persistent playback
- Mini Player
- Cross-screen playback
- Background playback
- Buffering behaviour
- Playback recovery
- Lock-screen behaviour
- Resume after background

### Application

- Home
- Stories
- Story Detail
- More
- Navigation
- Playback persistence
- Repeated foreground/background transitions

## Known Limitation

When the application is fully backgrounded, the React Native JavaScript Now Playing polling loop can be suspended by Android. The audio stream remains uninterrupted, but the Android notification may retain the previous track until the application becomes active again.

This was deliberately not expanded into a larger native background-polling architecture before Version 1 QA.

**Status:** 🟩 Completed / Frozen

---

# Release Philosophy

Every release must:

- Deliver a defined milestone.
- Be tested before completion.
- Preserve stable architecture.
- End with a Git commit.
- Update documentation immediately after completion.

Completed releases are never reopened as current development stages.

---

# Current Milestone

**Version 1.0 Release Candidate**

Future work belongs exclusively in `Roadmap.md`.
