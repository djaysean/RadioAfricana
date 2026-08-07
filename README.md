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

The project is currently in the final implementation phase before Version 1.

Core architecture has been completed and development is focused on feature completion, UI consistency and production readiness.

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

---

## Editorial

- Featured Story
- Stories listing
- Story Detail screen
- Premium article reader
- Infinite scrolling
- Continue Reading
- Native article sharing

---

## Content Platform

- WordPress REST API integration
- Custom Radio Africana REST API
- Elementor Banner integration
- Dynamic CMS-driven content
- Shared API service architecture

---

# Architecture

The application follows a modular, component-first architecture.

```
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

---

# Technology Stack

## Mobile

- React Native
- TypeScript
- React Navigation
- react-native-video

## Backend

- WordPress REST API
- Custom Radio Africana REST API
- Elementor
- Pro.Radio Theme
- Pro.Radio Child Theme

## Planned

- Firebase Cloud Messaging (FCM)

---

# Project Structure

```text
src/
├── components/
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

Install dependencies

```bash
npm install
```

Start Metro

```bash
npx react-native start
```

Reset Metro cache

```bash
npx react-native start --reset-cache
```

Run Android

```bash
npx react-native run-android
```

During normal UI development, JavaScript changes should be reloaded through Metro rather than rebuilding the Android application.

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

---

# License

Copyright © Radio Africana.

All rights reserved.