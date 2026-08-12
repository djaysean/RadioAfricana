# Changelog

All notable changes to Radio Africana Mobile are documented here.

Completed milestones are recorded chronologically. This file is historical; current work belongs in `Roadmap.md`.

---

# Release 0.9.7 — Network & Playback Verification

## Added / Verified

- Verified Stories loading and pagination.
- Verified Stories pull-to-refresh.
- Verified Story Detail navigation.
- Verified Continue Reading.
- Verified native sharing.
- Verified CMS-driven banners.
- Verified clickable and non-clickable banner behaviour.
- Verified live radio stream connection.
- Verified Now Playing metadata.
- Verified dynamic artwork.
- Verified persistent playback.
- Verified Mini Player.
- Verified cross-screen playback.
- Verified background playback.
- Verified buffering behaviour.
- Verified playback recovery.
- Verified lock-screen playback.
- Verified resume after background.
- Repeatedly tested foreground/background transitions while playback continued.

## Fixed / Stabilised

- Removed unwanted Android notification seek controls through the maintained `react-native-video` patch.
- Preserved Play/Pause-only notification behaviour.
- Stabilised Android notification metadata presentation including title, artist and artwork.
- Corrected Media3 metadata application so the current MediaItem carries updated metadata without using the unavailable `ExoPlayer.setMediaMetadata()` API.

## Known Limitation

- Background Now Playing notification metadata is not guaranteed to refresh in real time while the React Native JavaScript runtime is suspended. The notification catches up when the application becomes active.
- Playback itself remains stable and uninterrupted.

## Technical

- `react-native-video@6.19.2` is maintained with a project patch.
- Android playback uses the existing Media3/ExoPlayer service architecture.
- No new native background-polling architecture was introduced for Version 1 preparation.

**Status:** 🟩 Completed / Frozen

---

# Release 0.9.6 — App-Wide UI Consistency

## Added

- Application-wide typography consistency.
- Home pull-to-refresh.
- More pull-to-refresh.

## Changed

- Migrated Home, More, Story Detail and shared player interface text to the shared typography system.
- Standardised header and navigation presentation.
- Verified Banner presentation.
- Preserved existing Stories refresh behaviour.

## Fixed

- Remaining inconsistent native-font usage.
- Typography inconsistencies in Story Detail and reader supporting elements.
- Missing Home and More pull-to-refresh.

## Technical

- Repository-wide `.tsx` audit for direct React Native `Text`.
- Confirmed the intentional native `Text` wrapper remains inside `AppText`.
- Preserved playback, Stories, API, Firebase and navigation architecture.

**Status:** 🟩 Completed

---

# Release 0.9.5 — Firebase & Typography Foundation

## Added

- Firebase Cloud Messaging.
- FCM token generation.
- Firebase Console notification testing.
- Shared `AppText`.
- Inter and Lora typography integration.

## Changed

- Migrated core shared components to the shared typography system.

## Technical

- Existing Radio Africana Firebase registration retained.
- Firebase notification delivery verified on physical Android hardware.

**Status:** 🟩 Completed

---

# Release 0.9 — More Screen

- More screen and utility navigation.
- Contact and information features.
- Website, privacy, terms, sharing and version information.

**Status:** 🟩 Completed

---

# Release 0.8 — Persistent Live Playback

- Global Playback Provider.
- Shared Playback Context.
- Persistent playback.
- Cross-screen playback.
- Background playback.
- Mini Player.
- Play/Pause controls.

**Status:** 🟩 Completed

---

# Release 0.7 — Design System & Reader Experience

- Shared design tokens.
- Inter and Lora.
- Continue Reading.
- Native sharing.
- Premium reader typography.
- Documentation foundation.

**Status:** 🟩 Completed

---

# Release 0.6 — Editorial Platform

- Stories feed.
- Story Detail.
- Infinite scrolling.
- Slug navigation.
- HTML rendering.
- Shared Story services.

**Status:** 🟩 Completed

---

# Release 0.5 — Live Content Platform

- Shared API layer.
- Featured Story service.
- Banner service.
- Dynamic CMS content.
- Custom REST namespace.
- Elementor integration.

**Status:** 🟩 Completed

---

# Release 0.4 — Premium Home Experience

- LiveHero.
- BannerCard.
- Premium Home.
- Featured Story.
- Dynamic artwork.
- Improved spacing and typography.

**Status:** 🟩 Completed

---

# Release 0.3 — Live Radio Foundation

- Now Playing.
- Dynamic artwork.
- Initial Home.
- Banner carousel foundation.

**Status:** 🟩 Completed

---

# Release 0.2 — Project Architecture

- Initial architecture.
- Folder structure.
- Shared services.
- Theme preparation.

**Status:** 🟩 Completed

---

# Release 0.1 — Foundation

- React Native project.
- Android development environment.
- Initial repository.

**Status:** 🟩 Completed
