# Changelog

---

## Release 0.5 (Completed)

### Added

- Shared API layer (`src/services/api.ts`) supporting both WordPress core and custom namespaces.
- Live Featured Story service powered by the WordPress REST API.
- Live Banner service powered by a custom WordPress REST API endpoint.
- Banner API endpoint (`/wp-json/radioafricana/v1/banners`) exposed through the Pro.Radio child theme.
- Backend documentation and WordPress project structure.
- BannerCard support for both local assets and remote image URLs.
- FeaturedStoryCard support for both local assets and remote image URLs.

### Changed

- Refactored API architecture to use the `/wp-json` root endpoint.
- Refactored Story service to consume the shared API layer.
- Refactored Banner Carousel to consume live CMS data instead of local assets.
- Replaced hardcoded banner content with live Elementor-managed content.
- Improved separation between presentation components and data services.

### Technical

- Introduced reusable service pattern for all CMS-driven modules.
- Introduced custom WordPress REST namespace (`radioafricana/v1`).
- Backend customizations documented and version-controlled.
- Elementor Custom Slideshow integrated with the mobile application.
- Established backend documentation structure under `/wordpress`.

### Status

✅ Stable

---

## Release 0.4

### Added

- LiveHero component
- BannerCard component
- Now Playing service
- Dynamic album artwork
- Premium Home layout
- Banner carousel
- Shared playback state
- Default artwork fallback

### Changed

- Redesigned Home screen
- Redesigned Banner carousel
- Redesigned Hero section
- Improved spacing
- Improved typography
- Improved Mini Player integration

### Technical

- Improved project architecture
- Introduced services layer
- Introduced constants layer
- Prepared Stories architecture

### Status

✅ Stable