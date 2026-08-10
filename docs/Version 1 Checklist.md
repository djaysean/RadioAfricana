# Radio Africana Mobile

# Version 1.0 Release Checklist

This document defines every requirement that must be completed before Radio Africana Mobile Version 1.0 is released publicly.

Version 1 ships only when every applicable item has been completed, tested and verified.

---

# Release Progress

Overall Progress

🟨 In Progress

The application core, Firebase notification foundation and application-wide UI consistency work have been completed and verified.

Remaining work focuses on network and playback verification, production QA and Android release preparation.

---

# Application Shell

## Navigation

- [x] Home screen complete
- [x] Stories screen complete
- [x] More screen complete
- [x] Header consistency verified
- [x] Safe Area verified
- [x] Bottom navigation verified

---

# Home Screen

## Listening Experience

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

- [x] Banner links verified
- [x] Banner loading states verified
- [x] Pull to refresh

---

# Stories

## Feed

- [x] Story listing
- [x] Infinite scrolling
- [x] Pull to refresh

## Reading

- [x] Story Detail
- [x] HTML rendering
- [x] Continue Reading
- [x] Native sharing

## Experience

- [ ] Friendly offline state verified
- [x] Friendly loading state
- [x] Friendly error state
- [ ] Network behaviour verified under stable connection

---

# More

## Information

- [x] Contact Us
- [x] Meet the Team
- [x] Website
- [x] Privacy Policy
- [x] Terms & Conditions
- [x] Share App
- [x] Version Number

## Interaction

- [x] Pull to refresh

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

- [ ] Background playback verified
- [ ] Lock screen verified
- [ ] Resume after background verified
- [ ] Playback recovery verified
- [ ] Buffering behaviour verified under stable network conditions

---

# Firebase

## Configuration

- [x] Firebase project connected
- [x] Android configuration
- [x] Google Services configured

## Notifications

- [x] Push notifications
- [x] Notification permission verified
- [ ] Notification tap handling
- [ ] Background notifications

## Current Implementation

Firebase Cloud Messaging has been integrated into the Android application and successfully tested through the existing Radio Africana Firebase project.

The client's existing Firebase notification workflow remains available.

Stories-specific article publication notification automation is not currently part of the Version 1 implementation.

---

# Design

## Typography

- [x] Inter font integrated
- [x] Lora font integrated
- [x] Shared `AppText` typography component
- [x] Application-wide typography migration
- [x] Main Player typography verified
- [x] Mini Player typography verified
- [x] Home typography verified
- [x] Stories typography verified
- [x] More typography verified
- [x] Navigation typography verified

## Components

- [x] LiveHero
- [x] Mini Player
- [x] Banner Carousel
- [x] Stories components
- [x] Section Header
- [x] Logo headers
- [x] Bottom navigation icons

## Consistency

- [x] Shared spacing verified
- [x] Shared typography verified
- [x] Shared colours verified
- [x] Header consistency verified
- [x] Application-wide UI consistency verified

---

# Performance

- [ ] Image loading
- [ ] API performance
- [ ] Smooth scrolling
- [ ] Memory review

---

# Error Handling

- [x] Story loading errors
- [x] Banner loading errors
- [ ] Network failures
- [ ] Offline handling
- [ ] Playback recovery

---

# Quality Assurance

## Functional Testing

- [x] Home
- [x] Stories
- [x] Story Detail
- [x] More
- [x] Playback
- [x] Firebase notification delivery

## Network Verification

- [ ] Stories loading under stable network
- [ ] Story pagination under stable network
- [ ] Banner loading under stable network
- [ ] Live radio streaming under stable network
- [ ] Buffering behaviour
- [ ] Playback recovery

## Device Testing

- [ ] Cold start
- [ ] Warm start
- [ ] Background
- [ ] Lock screen
- [ ] Screen rotation (if supported)

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
- [x] Release 0.8.1 committed
- [x] Release 0.8.2 committed
- [x] Release 0.8.3 committed
- [x] Release 0.9 committed
- [x] Release 0.9.5 committed
- [ ] Release 0.9.6 committed
- [ ] Version 1 tagged

---

# Current Development Sequence

## Release 0.9.7 — Network & Playback Verification

Remaining verification includes:

- [ ] Stories loading under stable network
- [ ] Story pagination under stable network
- [ ] Banner loading under stable network
- [ ] Banner interaction
- [ ] Now Playing metadata
- [ ] Live radio streaming
- [ ] Buffering behaviour
- [ ] Playback recovery
- [ ] Background playback
- [ ] Lock screen behaviour
- [ ] Resume after background
- [ ] Network failure handling
- [ ] Offline behaviour
- [ ] Retry behaviour

---

# Definition of Done

Radio Africana Mobile Version 1.0 is considered complete when:

- Every visible feature works as intended.
- No placeholder interfaces remain.
- No known blocking runtime errors remain.
- All applicable Version 1 checklist items are complete.
- Application-wide typography is consistent.
- Home and More provide the required pull-to-refresh behaviour.
- Live radio has been verified under stable network conditions.
- Stories have been verified under stable network conditions.
- Firebase notifications are operational.
- Required notification behaviour has been verified.
- The application successfully builds as a signed Android App Bundle (AAB).
- Production QA has been completed.
- Store assets and metadata are ready.
- The application is ready for submission to Google Play.