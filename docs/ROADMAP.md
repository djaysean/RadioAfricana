# Radio Africana Mobile Roadmap

## Overview

This roadmap contains **only unfinished work**.

Completed milestones belong in `Releases.md`. Historical releases are never reopened as active development stages.

## Current Development Status

**Target Version:** 1.0  
**Current Milestone:** Version 1.0 Release Candidate  
**Status:** 🟡 Active QA / Production Preparation

Release 0.9.7 — Network & Playback Verification — is complete and frozen.

---

# Version 1.0 Release Candidate

## Objective

Prepare the verified application for a production Android release.

## Functional QA

### Live Radio

- [x] Persistent playback verified
- [x] Background playback verified
- [x] Mini Player verified
- [x] Dynamic metadata verified
- [x] Dynamic artwork verified
- [x] Lock-screen playback verified
- [x] Resume after background verified
- [x] Playback recovery verified

### Stories

- [x] Story loading verified
- [x] Infinite scrolling verified
- [x] Pull-to-refresh verified
- [x] Story Detail verified
- [x] Continue Reading verified
- [x] Native sharing verified

### Banners

- [x] CMS-driven loading verified
- [x] Carousel behaviour verified
- [x] Clickable banners verified
- [x] Non-clickable banners verified

### More

- [ ] Final functional audit of every menu item
- [ ] Final content/link verification

### Firebase

- [x] Firebase project connection verified
- [x] Android configuration verified
- [x] FCM token generation verified
- [x] Firebase Console test notification verified
- [ ] Notification tap handling final verification
- [ ] Background notification final verification

---

# Production QA

## Android

- [ ] Clean release build
- [ ] Signed AAB
- [ ] Version number confirmed
- [ ] Version code confirmed
- [ ] Install and launch verification on physical device

## Performance

- [ ] Image loading review
- [ ] API performance review
- [ ] Smooth scrolling review
- [ ] Memory review

## Accessibility

- [ ] Typography/readability review
- [ ] Touch target review
- [ ] Contrast review
- [ ] Navigation/semantic review

## Final UI

- [ ] Final Home review
- [ ] Final Stories review
- [ ] Final Story Detail review
- [ ] Final More review
- [ ] Header review
- [ ] Bottom navigation review
- [ ] Mini Player review

## Store Preparation

- [ ] App icon
- [ ] Feature graphic
- [ ] Screenshots
- [ ] Store description
- [ ] Privacy policy URL
- [ ] Google Play preparation

---

# Known Enhancement — Not a Current Blocker

The Android notification does not always refresh to the next Now Playing track while the application is fully backgrounded because the current metadata polling is driven by React Native JavaScript.

Playback itself remains uninterrupted and the notification catches up when the application becomes active.

A future release may move Now Playing synchronisation into the native background playback layer.

This is intentionally **not part of the current Version 1 release-candidate scope**.

---

# Version 1 Scope — Locked

## Listening

- Live radio
- Persistent playback
- Cross-screen playback
- Mini Player
- Dynamic metadata
- Dynamic artwork

## Reading

- Stories
- Story Detail
- Continue Reading
- Native sharing

## Content

- CMS-driven banners
- Clickable banners
- Featured Story
- Latest Stories

## Application

- More screen
- Firebase notifications
- Production Android release

---

# Version 1.1

Intentionally deferred:

- Programme Schedule
- Search
- Bookmarks
- Dark Mode
- Sleep Timer
- Favourite Stories

# Version 1.2

- Podcasts
- Presenter Profiles
- Events
- Community Resources

# Long-Term Vision

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

- Finish before expanding.
- Build reusable solutions.
- Every visible feature must work.
- Keep releases small and testable.
- Commit after completed milestones.
- Update documentation after every milestone.

**This document is the authoritative source for future development.**
