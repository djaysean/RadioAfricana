# Radio Africana Mobile Releases

## Overview

This document records the evolution of the Radio Africana Mobile application.

Each release represents a stable development milestone and documents the features, architectural improvements and design changes introduced during that phase of the project.

Future work belongs in the Roadmap document. Once completed, it is documented here.

---

# Release 0.1

## Foundation

Established the React Native project and development environment.

### Highlights

- React Native project created.
- Android development environment configured.
- Initial application bootstrapped.
- Repository created.

### Status

✅ Completed

---

# Release 0.2

## Application Architecture

Built the initial application structure that would support future development.

### Highlights

- Project folder architecture.
- Base component structure.
- Theme preparation.
- Initial constants layer.
- Initial services layer.

### Status

✅ Completed

---

# Release 0.3

## Live Radio Foundation

Introduced the application's first live radio experience.

### Highlights

- Live Now Playing.
- Dynamic album artwork.
- Shared playback service.
- Initial Home screen.
- Banner carousel foundation.
- Persistent playback architecture.

### Status

✅ Completed

---

# Release 0.4

## Premium Home Experience

Completely redesigned the Home screen into a premium streaming experience inspired by modern media applications.

### Highlights

#### User Experience

- Premium Hero section.
- Premium Banner Carousel.
- Dynamic Now Playing.
- Persistent Mini Player.
- Improved visual hierarchy.
- Premium spacing.
- Premium typography.

#### Components

- LiveHero.
- BannerCard.
- MiniPlayer improvements.
- Stories architecture preparation.

#### Architecture

- Improved services layer.
- Shared playback state.
- Shared constants.
- Better component separation.

### Git Milestone

Release 0.4

### Status

✅ Completed

---

# Release 0.5

## Live Content Platform

Transitioned the application from static content to a fully CMS-driven experience.

### Highlights

#### Mobile Application

- Shared API layer.
- Featured Story service.
- Banner service.
- Live Featured Story.
- Live Banner Carousel.
- Remote image support.
- Shared API architecture.

#### WordPress Backend

- Custom REST API namespace.
- Elementor Banner endpoint.
- Backend documentation.
- Child Theme customisations.
- Upgrade-safe implementation.

#### Architecture

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
React Native Components
```

### Git Milestone

Release 0.5

### Status

✅ Completed

---

# Release 0.6

## Editorial Platform

Expanded the application beyond the Home screen by introducing the editorial experience.

### Highlights

#### Stories

- Stories listing screen.
- Infinite scrolling.
- Story Detail screen.
- Slug-based navigation.
- HTML article rendering.
- Featured Story improvements.

#### Reader

- Story Hero.
- Story metadata.
- Article body rendering.
- HTML decoding.
- Better typography support.

#### Navigation

- Story navigation flow.
- Screen architecture improvements.

#### Performance

- Shared Story services.
- Improved API usage.
- Better component separation.

### Git Milestone

Release 0.6

### Status

✅ Completed

---

# Release 0.7

## Design System & Reader Experience

Focused on transforming the application into a premium editorial product.

### Completed

#### Design System

- Shared typography system.
- Shared spacing system.
- Shared radius system.
- Shared shadow system.
- Central constants exports.
- Custom font integration.
- Inter font family.
- Lora font family.

#### Reader Experience

- Premium editorial typography.
- Improved article hierarchy.
- HTML rendering improvements.
- Reader layout refinements.

#### Documentation

- Project documentation.
- Design System documentation.
- Roadmap updates.
- Release documentation.
- Changelog improvements.

### In Progress

- Native sharing.
- Continue Reading section.
- Reader polish.
- API caching.
- Performance optimisation.

### Status

🟡 Active Development

---

# Version 1.0

## Planned Public Release

The first production release will include:

### Core Features

- Live Radio.
- Stories.
- Premium Reader.
- Search.
- Bookmarks.
- Podcasts.
- Events.
- Programme Schedule.

### Platform

- Android production build.
- Google Play Store release.

### Quality

- Complete documentation.
- Production optimisation.
- Accessibility review.
- Final UI polish.

---

# Release Philosophy

Each release should satisfy the following principles:

- Deliver a stable milestone.
- Improve architecture before adding complexity.
- Maintain backward compatibility whenever possible.
- Keep commits small and testable.
- Document all completed work.

Every completed release becomes part of this document, providing a complete history of the project's evolution.