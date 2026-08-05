# Changelog

# Changelog

## Release 0.5 (In Progress)

### Added
- Shared API layer (`src/services/api.ts`) for all future network requests.
- Live WordPress integration for Featured Stories.
- Featured Story now loads dynamically from the Radio Africana WordPress REST API.
- FeaturedStoryCard now supports both local assets and remote image URLs.
- Story service now maps live WordPress data into a clean application model.

### Improved
- Refactored story architecture to separate UI from data services.
- Established reusable service pattern for future modules (Banners, Categories, Search).

### Notes
This marks the first live backend integration in the Radio Africana mobile application.




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