# Radio Africana Mobile

![Platform](https://img.shields.io/badge/Platform-Android-green)
![React Native](https://img.shields.io/badge/React%20Native-0.82-blue)
![Status](https://img.shields.io/badge/Status-Active%20Development-orange)
![Version](https://img.shields.io/badge/Target-v1.0-gold)

The official Android application for **Radio Africana**, designed to combine premium live radio streaming with a modern editorial reading experience.

Built with **React Native** and powered by **WordPress**, the application delivers live radio, dynamic programme metadata, editorial content, promotional campaigns and future community features through a single native mobile experience.

---

# Project Vision

Radio Africana Mobile is designed to become the primary digital experience for Radio Africana listeners.

Rather than replicating the website, the application focuses on providing a native, fast and immersive experience inspired by modern media platforms such as Spotify, BBC Sounds and Apple News.

The website remains the Content Management System (CMS), while the mobile application becomes the primary destination for listening and reading.

---

# Current Status

## Version

**Target Version:** 1.0

## Development Status

🟢 Active Development

The project is in the final development and verification phase before Version 1.

Core architecture has been completed.

Firebase Cloud Messaging has been integrated and verified.

The application-wide UI consistency pass has been completed and verified, including the shared typography system, primary screen consistency and pull-to-refresh behaviour on Home and More.

The remaining Version 1 work focuses on network and playback verification, production quality assurance and Android release preparation.

---

# Current Features

## Live Radio

- Persistent live radio playback
- Cross-screen audio playback
- Dynamic "Now Playing" metadata
- Dynamic album artwork
- Home screen Live Hero
- Persistent Mini Player
- Play / Pause controls
- Shared playback state

---

## Editorial

- Featured Story
- Stories listing
- Story Detail screen
- Premium article reader
- Infinite scrolling
- Pull-to-refresh on Stories
- Continue Reading
- Native article sharing

---

## Content Platform

- WordPress REST API integration
- Custom Radio Africana REST API
- Elementor Banner integration
- Dynamic CMS-driven content
- Shared API service architecture
- CMS-driven promotional banners

---

# Notifications

- Firebase Cloud Messaging integration
- Existing Radio Africana Firebase project connection
- Android Firebase app registration
- FCM token generation
- Firebase Console notification delivery

Firebase Cloud Messaging has been integrated into the new application and successfully tested through the existing Radio Africana Firebase project.

The client's existing Firebase workflow remains available for general-purpose Radio Africana notifications.

Stories-specific notification automation is not currently part of the application scope. If article publication notifications are required in the future, they can be introduced as a separate feature.

---

# Design System

- Centralised colour system
- Centralised typography system
- Inter font integration
- Lora font integration
- Shared spacing system
- Shared radius system
- Shared shadow system
- Reusable `AppText` typography component
- Shared component styling architecture

The application-wide typography consistency pass has been completed and verified.

Interface typography now uses the established Radio Africana typography system through the shared `AppText` component where appropriate, rather than relying on the device's native font.

The Story reader retains its dedicated Inter and Lora typography configuration for editorial content.

---

# Architecture

The application follows a modular, component-first architecture.

```text
WordPress CMS
        │
        ▼
REST API Services
        │
        ▼
Shared Services
        │
        ▼
React Native Screens
        │
        ▼
Reusable Components
```

Live playback is managed through a shared Playback Provider, allowing uninterrupted listening across the entire application.

Firebase Cloud Messaging is integrated independently of the editorial content system, allowing the client to continue using Firebase for general-purpose Radio Africana notifications.

---

# Technology Stack

## Mobile

- React Native
- TypeScript
- React Navigation
- react-native-video
- React Native Firebase

## Services

- Firebase Cloud Messaging
- Firebase Console
- WordPress REST API
- Radio Africana custom REST services

## Backend

- WordPress REST API
- Custom Radio Africana REST API
- Elementor
- Pro.Radio Theme
- Pro.Radio Child Theme

---

# Project Structure

```text
src/
├── components/
│   ├── common/
│   ├── stories/
│   └── ui/
├── constants/
├── navigation/
├── playback/
├── screens/
├── services/
├── types/

assets/

docs/

wordpress/
```

---

# Development Workflow

Install dependencies:

```bash
npm install
```

Start Metro:

```bash
npx react-native start
```

Reset Metro cache:

```bash
npx react-native start --reset-cache
```

Run Android:

```bash
npx react-native run-android
```

During normal UI development, JavaScript changes should be reloaded through Metro rather than rebuilding the Android application.

For native dependency, Firebase, Android configuration or other native changes, a fresh Android build may be required.

---

# Engineering Principles

The project follows several core engineering principles.

- Component-first architecture.
- Service-first data layer.
- CMS-driven content.
- Shared Design System.
- Reusable components before reusable screens.
- Complete feature implementation before expansion.
- Small, testable releases.
- Git commit after every completed release.
- Documentation updated after every release.
- Preserve existing client workflows wherever practical.
- Avoid introducing functionality that is not required by the current product scope.

---

# Version 1 Scope

Version 1 focuses on delivering a complete, polished experience rather than the largest possible feature set.

Included:

- Live Radio
- Persistent Playback
- Stories
- Story Reader
- Banner Carousel
- More screen
- Firebase Push Notifications
- Premium Design System
- Production Android Release

Future versions will introduce additional capabilities such as Programme Schedule, Search, Podcasts and Dark Mode.

---

# Completed Development Milestones

## Release 0.9.5 — Firebase & Typography Foundation

Completed:

- Firebase Cloud Messaging integration
- Existing Radio Africana Firebase project connection
- FCM token generation
- Firebase Console notification testing
- Shared `AppText` typography foundation
- Inter and Lora typography integration
- Shared component typography migration

---

## Release 0.9.6 — App-Wide UI Consistency

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
- Repository-wide native `Text` audit

The application was visually tested across Home, Stories, Story Detail and More after the 0.9.6 changes.

---

# Current Development Priorities

## Release 0.9.7 — Network & Playback Verification

The next development milestone focuses on verifying existing network-dependent functionality under stable network conditions.

This includes:

- Stories loading
- Story pagination
- Banner loading
- Banner interaction
- Now Playing metadata
- Live radio streaming
- Buffering behaviour
- Playback recovery
- Background playback
- Lock-screen behaviour
- Resume after background
- Network failure handling
- Offline behaviour
- Retry behaviour

No unnecessary changes will be made to networking or playback services until the existing behaviour has been tested under a reliable network connection.

---

# Documentation

The `/docs` directory contains the complete project documentation.

| Document | Purpose |
|----------|---------|
| Project.md | Product specification and architecture |
| Design System.md | Visual language and UI standards |
| Releases.md | Completed release history |
| Changelog.md | Detailed implementation history |
| Roadmap.md | Future development roadmap |
| Version 1 Checklist.md | Production release checklist |

---

# Development Philosophy

Radio Africana Mobile is built around one simple principle:

> Every feature that exists in Version 1 must feel complete.

New functionality is introduced through future releases rather than shipping unfinished experiences.

The project follows a controlled release process: each milestone is implemented, tested, documented and committed before the next milestone begins.

---

# License

Copyright © Radio Africana.

All rights reserved.