# Changelog

All notable changes to the Radio Africana Mobile application are documented in this file.

The format follows a simplified "Added / Changed / Fixed / Technical" structure.

---

# Release 0.7 (In Progress)

## Added

### Design System

- Introduced shared typography system.
- Introduced shared spacing system.
- Introduced shared radius system.
- Introduced shared shadow system.
- Added central constants export (`index.ts`).
- Added custom Inter font integration.
- Added custom Lora font integration.

### Reader

- Story Hero component.
- Story Body component.
- Premium article typography.
- HTML rendering improvements.
- Better editorial hierarchy.

### Documentation

- Project documentation rewritten.
- Roadmap documentation rewritten.
- Releases documentation rewritten.
- Design System documentation added.
- Changelog restructured.

---

## Changed

- Migrated article titles to Lora.
- Migrated metadata to Inter.
- Improved typography consistency.
- Improved Story component structure.
- Improved documentation standards.

---

## Fixed

- HTML entity decoding.
- Apostrophe rendering.
- Font loading configuration.
- Reader typography consistency.

---

## Technical

- Added `react-native.config.js`.
- Linked custom font assets.
- Introduced design token architecture.
- Introduced central design constants.
- Improved project documentation structure.

---

## Status

🟡 Active Development

---

# Release 0.6

## Added

### Stories

- Stories listing screen.
- Story Detail screen.
- Infinite scrolling.
- Story slug navigation.
- Story services.
- HTML article rendering.

### Components

- StoryHero.
- StoryBody.
- StoriesFeed.

---

## Changed

- Introduced modular Story architecture.
- Improved navigation flow.
- Improved WordPress content rendering.

---

## Fixed

- Story loading issues.
- HTML decoding issues.
- Pagination improvements.

---

## Technical

- Shared Story service architecture.
- Better separation between presentation and data.
- Improved API consumption.

---

## Status

✅ Stable

---

# Release 0.5

## Added

### API

- Shared API layer (`src/services/api.ts`).
- WordPress Featured Story service.
- Banner service.
- Banner endpoint (`/wp-json/radioafricana/v1/banners`).

### Backend

- Elementor integration.
- Child Theme REST endpoint.
- Backend documentation.

---

## Changed

- Refactored API architecture.
- Refactored Banner Carousel.
- Replaced local banner content with CMS content.
- Improved service separation.

---

## Technical

- Introduced reusable CMS service pattern.
- Introduced custom REST namespace.
- Backend documentation structure.

---

## Status

✅ Stable

---

# Release 0.4

## Added

- Premium Hero.
- BannerCard.
- LiveHero.
- Shared playback service.
- Persistent Mini Player.
- Dynamic album artwork.

---

## Changed

- Redesigned Home screen.
- Redesigned Hero section.
- Redesigned Banner Carousel.
- Improved spacing.
- Improved typography.

---

## Technical

- Introduced constants layer.
- Introduced services layer.
- Prepared Stories architecture.

---

## Status

✅ Stable

---

# Release 0.3

## Added

- Live Now Playing.
- Shared playback.
- Initial Home screen.
- Album artwork support.

### Status

✅ Stable

---

# Release 0.2

## Added

- Initial project architecture.
- Folder structure.
- Theme preparation.
- Initial services.

### Status

✅ Stable

---

# Release 0.1

## Added

- React Native project.
- Android development environment.
- Initial repository.

### Status

✅ Stable