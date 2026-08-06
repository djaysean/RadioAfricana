# Radio Africana Mobile

![Platform](https://img.shields.io/badge/Platform-Android-green)
![React Native](https://img.shields.io/badge/React%20Native-0.82-blue)
![Status](https://img.shields.io/badge/Status-Active%20Development-orange)
![Release](https://img.shields.io/badge/Release-0.7-gold)

The official mobile application for Radio Africana.

Built with React Native and powered by WordPress, Radio Africana Mobile delivers a premium listening and editorial experience by combining live radio streaming, dynamic content and modern storytelling within a single native application.

---

# Overview

Radio Africana Mobile is designed around two core experiences:

- **Listen** — A premium live radio experience with dynamic playback information.
- **Read** — An editorial platform powered entirely by the Radio Africana website.

Unlike the website, which serves as the Content Management System (CMS), the mobile application is designed to be the primary experience for listeners and readers.

---

# Current Status

## Release

**Release 0.7 — Reader Experience & Design System**

## Status

🟢 Active Development

### Current Focus

- Premium Story Reader
- Shared Design System
- Performance optimisation
- API caching
- Reader experience refinement

---

# Features

## Live Radio

- Live streaming
- Dynamic Now Playing
- Dynamic album artwork
- Persistent Mini Player

## Editorial

- Featured Story
- Stories listing
- Infinite scrolling
- Story Detail screen
- HTML article rendering
- Responsive article layouts

## Content Platform

- WordPress REST API integration
- Custom Radio Africana REST API
- Elementor Banner integration
- Shared API layer

---

# Technology Stack

## Mobile

- React Native
- TypeScript
- React Navigation

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
├── screens/
├── navigation/
├── services/
├── constants/
├── hooks/
├── types/

assets/
├── fonts/

docs/

wordpress/
```

---

# Quick Start

Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/RadioAfricana.git
```

Install dependencies

```bash
npm install
```

Start Metro

```bash
npx react-native start
```

Run Android

```bash
npx react-native run-android
```

Clear Metro cache (recommended after major changes)

```bash
npx react-native start --reset-cache
```

---

# Documentation

Detailed project documentation is available in the `docs` directory.

| Document | Description |
|----------|-------------|
| Project.md | Product overview and project vision |
| Roadmap.md | Development roadmap and future direction |
| Releases.md | Release history and completed milestones |
| Changelog.md | Detailed development changes |
| Design System.md | Visual language and UI standards |

---

# Development Principles

The project follows several core principles throughout development.

- Component-first architecture.
- Service-first data layer.
- Shared Design System.
- WordPress-driven content.
- Upgrade-safe backend customisations.
- Complete file replacements during development.
- Small, testable milestones.
- Git commits after every stable implementation.

---

# Current Milestone

Release 0.7 is focused on transforming the application into a premium editorial product.

Current work includes:

- Reader experience
- Shared typography
- Design System adoption
- Native sharing
- Performance optimisation
- API request caching

---

# Roadmap

Upcoming milestones include:

## Release 0.8

- Search
- Bookmarks
- Recently Viewed
- Notifications
- Sleep Timer

## Version 1.0

- Android production release
- Google Play Store launch
- Podcasts
- Programme Schedule
- Events
- Presenter Profiles

For complete planning information, see:

```
docs/Roadmap.md
```

---

# License

Copyright © Radio Africana.

All rights reserved.