# Radio Africana Mobile Roadmap

## Overview

This roadmap defines the remaining work required to complete Version 1.0 of Radio Africana Mobile.

Unlike the Releases document, which records completed milestones, this document contains only future work.

Features are organised into small, testable releases that can each be completed, committed and verified independently.

---

# Current Development Status

## Target Version

Version 1.0

## Status

🟢 Active Development

Core application architecture has been completed.

The remaining work focuses on feature completion, production readiness and final quality assurance.

---

# Version 1 Development Plan

## Release 0.8.1 — Navigation Polish

### Objective

Complete the shared application shell and visual consistency.

### Tasks

- Replace Stories text header with the Radio Africana logo.
- Add the Radio Africana logo to the More screen.
- Verify Mini Player placement across all primary screens.
- Standardise header heights.
- Review Safe Area spacing.
- Review bottom navigation spacing.

### Success Criteria

- Every primary screen shares the same application header.
- Mini Player placement is visually consistent.
- Navigation feels seamless.

### Git Milestone

Release 0.8.1 – Navigation Polish

---

## Release 0.8.2 — Interaction Polish

### Objective

Complete all user interactions before introducing new features.

### Tasks

- Banner carousel links open correctly.
- Non-clickable banners remain static.
- Replace placeholder bottom navigation icons.
- Verify background playback.
- Improve sharing interactions where necessary.

### Success Criteria

- Every visible interactive element behaves correctly.
- Playback continues while the application is backgrounded.
- Navigation icons are production-ready.

### Git Milestone

Release 0.8.2 – Interaction Polish

---

## Release 0.8.3 — Network & User Experience

### Objective

Improve resilience and production behaviour.

### Tasks

- Friendly story loading errors.
- Offline states.
- Loading indicators.
- Pull-to-refresh refinement.
- Banner loading resilience.
- Remove remaining development LogBox issues.
- Improve API error handling.

### Success Criteria

- Network failures never expose technical errors.
- Users always receive meaningful feedback.

### Git Milestone

Release 0.8.3 – Network & UX

---

## Release 0.9 — More Screen

### Objective

Complete the application's utility section.

### Tasks

- Contact Us
- Meet the Team
- Visit Website
- Privacy Policy
- Terms & Conditions
- Share App
- Application Version

### Success Criteria

- Every menu item is fully functional.
- No placeholder content exists.

### Git Milestone

Release 0.9 – More Screen

---

## Release 0.9.5 — Firebase

### Objective

Complete the notification infrastructure.

### Tasks

- Firebase integration.
- Firebase Cloud Messaging.
- Notification permissions.
- Notification tap handling.
- Background notification behaviour.

### Success Criteria

- Push notifications work reliably.
- Users can open the application directly from notifications.

### Git Milestone

Release 0.9.5 – Firebase

---

# Version 1.0 Release Candidate

## Objective

Prepare the application for public release.

### Functional QA

#### Live Radio

- Persistent playback
- Background playback
- Mini Player
- Dynamic metadata
- Album artwork

#### Stories

- Story loading
- Infinite scrolling
- Continue Reading
- Native sharing

#### Banners

- Clickable promotional banners
- CMS-driven content

#### More

- Every menu item functional

---

### Production QA

- Android release build
- Performance optimisation
- Accessibility review
- Final UI consistency review
- Production testing
- Google Play Store preparation

### Success Criteria

Every visible feature works exactly as intended.

No placeholder interfaces remain.

No known runtime issues remain.

### Git Milestone

Version 1.0 Release Candidate

---

# Version 1 Scope (Locked)

The following features define Version 1.

## Listening

- Live radio
- Persistent playback
- Cross-screen playback
- Mini Player
- Dynamic metadata
- Dynamic artwork

---

## Reading

- Stories
- Story Detail
- Continue Reading
- Native sharing

---

## Content

- CMS-driven banners
- Clickable banners
- Featured Story
- Latest Stories

---

## Application

- More screen
- Firebase notifications
- Production Android release

---

# Version 1.1

The following features intentionally ship after Version 1.

- Programme Schedule
- Search
- Bookmarks
- Dark Mode
- Sleep Timer
- Favourite Stories

---

# Version 1.2

- Podcasts
- Presenter Profiles
- Events
- Community Resources

---

# Long-Term Vision

Future development may include:

- Android Auto
- Apple CarPlay
- Chromecast
- Offline Reading
- Offline Audio
- User Accounts
- Personalisation
- AI-powered recommendations

---

# Roadmap Principles

Every future release follows these principles.

- Finish before expanding.
- Build reusable solutions.
- Every visible feature must work.
- Keep releases small and testable.
- Commit after every completed release.
- Update documentation after every release.

---

# Roadmap Maintenance

This roadmap is the authoritative source for all future development.

Completed work must move to the Releases document.

Only unfinished work belongs here.