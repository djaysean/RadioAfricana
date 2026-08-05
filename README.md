# Radio Africana Mobile

![Platform](https://img.shields.io/badge/Platform-Android-green)
![React Native](https://img.shields.io/badge/React%20Native-0.82-blue)
![Status](https://img.shields.io/badge/Status-Active%20Development-orange)
![Release](https://img.shields.io/badge/Release-0.5-gold)

The official Android application for Radio Africana.

Radio Africana Mobile delivers a premium African radio experience by combining live streaming, real-time playback information, editorial storytelling, promotional campaigns and community content within a modern native mobile application.

---

# Current Status

## Release

**Release 0.5 — Live Content Platform**

## Project Status

🟢 Active Development

Release 0.5 established the application's live content architecture by integrating both WordPress and custom backend services.

---

# Current Features

## Live Radio

- Live Now Playing
- Dynamic album artwork
- Persistent Mini Player

## Home Screen

- Premium Hero
- Live Banner Carousel
- Live Featured Story

## Content Platform

- WordPress Featured Stories
- Elementor Banner Integration
- Shared API layer
- CMS-driven Home screen

## Architecture

- Modular React Native components
- Shared services layer
- Shared constants layer
- Custom WordPress backend
- Upgrade-safe REST API integration

---

# Technology Stack

## Mobile

- React Native
- TypeScript

## Backend

- WordPress REST API
- Custom Radio Africana REST API
- Elementor
- Pro.Radio Theme

---

# API Architecture

The application consumes content from two API namespaces.

## WordPress Core

```text
/wp-json/wp/v2/
```

Used for:

- Stories
- Categories
- Future editorial content

## Radio Africana

```text
/wp-json/radioafricana/v1/
```

Current endpoints:

- Banner Carousel

Future endpoints:

- Podcasts
- Events
- Presenters
- Programme Schedule

---

# Project Structure

```text
src/
├── components/
├── constants/
├── services/

docs/

wordpress/
├── child-theme/
└── endpoints/
```

---

# Development

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
npm start
```

Run Android

```bash
npm run android
```

Reset Metro cache (recommended after major architecture changes)

```bash
npx react-native start --reset-cache
```

---

# Release History

| Release | Status |
|----------|--------|
| 0.1 | Foundation |
| 0.2 | Project Architecture |
| 0.3 | Live Radio Foundation |
| 0.4 | Premium Home Experience |
| 0.5 | Live Content Platform |

---

# Documentation

Project documentation is maintained in:

```text
docs/
```

Backend documentation is maintained in:

```text
wordpress/
```

---

# Roadmap

Current development is focused on **Release 0.6**.

Upcoming work includes:

- Stories listing
- Story Detail screen
- Banner deep linking
- Bottom Navigation
- Live streaming improvements

See **ROADMAP.md** for the complete development roadmap.

---

# License

Copyright © Radio Africana.

All rights reserved.