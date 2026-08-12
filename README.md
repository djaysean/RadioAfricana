# Radio Africana Mobile

![Platform](https://img.shields.io/badge/Platform-Android-green)
![React Native](https://img.shields.io/badge/React%20Native-0.82-blue)
![Status](https://img.shields.io/badge/Status-Version%201%20Release%20Candidate-gold)
![Version](https://img.shields.io/badge/Target-v1.0-gold)

The official Android application for **Radio Africana**, combining premium live radio streaming with an editorial reading experience.

## Current Status

**Target Version:** 1.0  
**Current Milestone:** Version 1.0 Release Candidate  
**Development State:** 🟡 Active QA / Production Preparation

Release 0.9.7 — Network & Playback Verification — has been completed and manually verified on the current Android build.

The application has been tested across Home, Stories, Story Detail, More, banners, live playback, Now Playing metadata, dynamic artwork, persistent playback, background playback, lock-screen playback and resume behaviour.

The project is now frozen at the end of Release 0.9.7 while Version 1.0 Release Candidate work begins.

## Current Features

### Live Radio

- Persistent live radio playback
- Cross-screen playback
- Dynamic Now Playing metadata
- Dynamic album artwork
- Home LiveHero
- Persistent Mini Player
- Play / Pause
- Android media notification
- Background playback
- Lock-screen playback

### Editorial

- Featured Story
- Stories listing
- Infinite scrolling
- Pull-to-refresh
- Story Detail
- HTML rendering
- Continue Reading
- Native sharing

### Content Platform

- WordPress REST API
- Custom Radio Africana REST API
- CMS-driven Featured Story
- CMS-driven promotional banners
- Shared API service architecture

### Notifications

- Firebase Cloud Messaging
- Existing Radio Africana Firebase project connection
- FCM token generation
- Firebase Console notification delivery

## Known Playback Limitation

Dynamic Now Playing metadata and artwork update correctly while the application is active and are reflected in the Android notification.

When the application remains fully backgrounded, the React Native JavaScript polling loop can be suspended by Android. In that state, the notification may retain the previous track until the application becomes active again.

This is a known enhancement opportunity and is intentionally **not being expanded during the current Version 1 Release Candidate preparation** because playback itself remains stable and uninterrupted.

## Architecture

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

Live playback is managed globally through the shared Playback Provider.

## Technology Stack

### Mobile

- React Native 0.82
- TypeScript
- React Navigation
- react-native-video
- React Native Firebase

### Backend

- WordPress REST API
- Custom Radio Africana REST API
- Elementor
- Pro.Radio Theme
- Pro.Radio Child Theme

## Project Structure

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

## Development Workflow

```bash
npm install
npx react-native start
npx react-native start --reset-cache
npx react-native run-android
```

JavaScript-only changes should normally be reloaded through Metro. Native dependency, Firebase or Android configuration changes require a fresh Android build.

## Version 1 Scope

Version 1 includes:

- Live Radio
- Persistent Playback
- Stories
- Story Reader
- Banner Carousel
- More screen
- Firebase Push Notifications
- Premium Design System
- Production Android Release

Intentionally post-Version-1 features include Programme Schedule, Search, Bookmarks, Podcasts, Presenter Profiles, Events, Dark Mode, Sleep Timer and Offline Reading.

## Documentation

The `/docs` directory is the project's documentation source of truth:

| Document | Purpose |
|---|---|
| Project.md | Product specification and architecture |
| Design System.md | Visual language and UI standards |
| Releases.md | Completed milestones |
| Changelog.md | Implementation history |
| Roadmap.md | Remaining work |
| Version 1 Checklist.md | Release QA checklist |

## Development Rule

Completed milestones are never reopened as active development stages. Once a release is frozen, future work begins from the current roadmap state only.

Copyright © Radio Africana. All rights reserved.
