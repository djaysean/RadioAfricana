# Radio Africana Mobile

# Version 1.0 Release Checklist

This checklist defines the remaining requirements before Version 1.0 can be released publicly.

## Current Progress

**🟨 In Progress — Release Candidate**

Release 0.9.7 functional verification is complete. Production QA and release preparation remain.

---

# Application Shell

## Navigation

- [x] Home screen verified
- [x] Stories screen verified
- [x] More screen verified
- [x] Header consistency verified
- [x] Safe Area behaviour verified
- [x] Bottom navigation verified

---

# Home

## Listening

- [x] LiveHero
- [x] Live stream playback
- [x] Dynamic Now Playing
- [x] Dynamic artwork
- [x] Play button
- [x] Playing state

## Content

- [x] Featured Story
- [x] Latest Stories
- [x] Banner Carousel

## Interaction

- [x] Banner links
- [x] Non-clickable banners
- [x] Banner loading behaviour

---

# Stories

## Feed

- [x] Story listing
- [x] Infinite scrolling
- [x] Pull-to-refresh

## Reading

- [x] Story Detail
- [x] HTML rendering
- [x] Continue Reading
- [x] Native sharing

---

# More

- [x] Contact Us
- [x] Meet the Team
- [x] Website
- [x] Privacy Policy
- [x] Terms & Conditions
- [x] Share App
- [x] Version Number

---

# Playback

## Core

- [x] Persistent playback
- [x] Cross-screen playback
- [x] Shared playback state
- [x] Mini Player
- [x] Play / Pause
- [x] Live status

## Verification

- [x] Background playback
- [x] Lock-screen playback
- [x] Resume after background
- [x] Playback recovery

---

# Firebase

## Configuration

- [x] Firebase project connected
- [x] Android configuration
- [x] Google Services configured

## Notifications

- [x] Push notifications
- [x] Notification permissions
- [ ] Notification tap handling final verification
- [ ] Background notification final verification

## Verification

- [x] FCM token generated
- [x] Firebase Console test notification received on physical Android device

---

# Design

## Components

- [x] LiveHero
- [x] Mini Player
- [x] Logo headers
- [x] Bottom navigation

## Consistency

- [x] Shared spacing verified
- [x] Shared typography verified
- [x] Shared colours verified

### Typography

- [x] Central typography tokens
- [x] AppText component
- [x] Core shared component migration
- [x] Screen-level migration
- [x] Repository-wide native `Text` audit

---

# Performance

- [ ] Image loading review
- [ ] API performance review
- [ ] Smooth scrolling review
- [ ] Memory review

---

# Error Handling

- [ ] Story loading error review
- [ ] Banner loading error review
- [ ] Network failure review
- [ ] Offline behaviour review

---

# Quality Assurance

## Functional Testing

- [x] Home
- [x] Stories
- [x] Story Detail
- [x] More
- [x] Playback
- [x] Firebase basic delivery

## Device Testing

- [ ] Cold start
- [ ] Warm start
- [x] Background
- [ ] Screen rotation, if supported

---

# Release

## Android

- [ ] Release build
- [ ] Signed AAB
- [ ] Version number
- [ ] Version code

## Store Assets

- [ ] App icon
- [ ] Feature graphic
- [ ] Screenshots
- [ ] Store description
- [ ] Privacy policy URL

---

# Documentation

- [x] README
- [x] Project
- [x] Design System
- [x] Releases
- [x] Changelog
- [x] Roadmap
- [x] Version 1 Checklist

---

# Git

- [x] Release 0.8 committed
- [x] Release 0.9 committed
- [x] Release 0.9.5 committed/recorded
- [x] Release 0.9.6 completed/recorded
- [x] Release 0.9.7 completed/recorded
- [ ] Version 1.0 release candidate commit
- [ ] Version 1.0 tag

---

# Definition of Done

Radio Africana Mobile Version 1.0 is complete when:

- Every visible feature works as intended.
- No placeholder interfaces remain.
- No known release-blocking runtime issues remain.
- All applicable Version 1 checklist items are complete.
- The application successfully builds as a signed Android App Bundle.
- The application is ready for Google Play submission.
