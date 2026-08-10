# Changelog

All notable changes to Radio Africana Mobile are documented in this file.

The project follows a simplified changelog format based on four categories:

- Added
- Changed
- Fixed
- Technical

Each completed release is recorded once and never modified retrospectively except to correct factual inaccuracies.

---

# Release 0.9.6 — App-Wide UI Consistency

## Added

### Home

- Pull-to-refresh support on the Home screen.
- Home refresh now refreshes Now Playing data.
- Home refresh remounts CMS-driven content so banners and the latest story can refresh through their existing services.

### More

- Pull-to-refresh support on the More screen.
- More refresh now refreshes Now Playing data.

### Typography

- Completed application-wide migration from direct React Native `Text` usage to the shared `AppText` typography component where appropriate.
- Migrated remaining Story Detail interface typography to the shared typography system.
- Migrated Continue Reading heading typography.
- Migrated Continue Reading Card typography.
- Migrated Story Body end-of-story typography.
- Migrated Story Footer typography.
- Migrated Story Hero typography.

---

## Changed

### Home

- Added a native pull-to-refresh interaction while preserving the existing Home layout and playback architecture.

### More

- Replaced native interface text with `AppText`.
- Added pull-to-refresh without changing the existing menu structure, links or Now Playing polling.

### Story Experience

- Replaced remaining direct native `Text` usage in Story Detail components with `AppText`.
- Preserved the existing article HTML typography configuration using Inter and Lora.
- Preserved existing Story navigation, sharing and Continue Reading behaviour.

### Typography

- Completed the application-wide typography consistency pass.
- Centralised remaining interface typography through `AppText`.
- Preserved the established Inter and Lora font families.
- Removed unnecessary direct native-font styling from application interface components.

### Navigation

- Audited bottom navigation typography.
- Confirmed navigation labels already use the installed Inter font.
- No navigation architecture changes were required.

### Existing Components

The following major components were audited and confirmed to already use the shared typography system correctly:

- LiveHero
- MiniPlayer
- BannerCarousel

---

## Fixed

- Remaining native-font usage across application interface components.
- Typography inconsistency in Story Detail supporting elements.
- Typography inconsistency in Continue Reading.
- Typography inconsistency in Story Hero.
- Typography inconsistency in Story Footer.
- Typography inconsistency in the Story Body end state.
- Missing Home pull-to-refresh behaviour.
- Missing More pull-to-refresh behaviour.

---

## Technical

- Performed a repository-wide audit of `.tsx` files for direct React Native `Text` usage.
- Confirmed that the only remaining direct `Text` usage is the intentional implementation inside `AppText.tsx`.
- Preserved the existing playback architecture.
- Preserved the existing Stories architecture.
- Preserved the existing CMS and API services.
- Preserved the existing Firebase implementation.
- No networking or playback service changes were introduced during this release.

### Verification

- Home screen verified.
- Stories screen verified.
- Story Detail verified.
- More screen verified.
- Home pull-to-refresh verified.
- More pull-to-refresh verified.
- Stories pull-to-refresh preserved and verified.
- Typography verified across the primary application experience.

### Status

✅ Stable

---

# Release 0.9.5 — Firebase & Typography Foundation

## Added

### Firebase Cloud Messaging

- Firebase Cloud Messaging integration.
- Connection to the existing Radio Africana Firebase project.
- Android Firebase application registration.
- FCM token generation.
- Firebase Console test notification support.

### Typography

- Shared `AppText` typography component.
- Application typography foundation using the installed Inter and Lora fonts.
- Centralised typography rendering through the shared UI layer.

---

## Changed

### Firebase

- Preserved the client's existing Firebase workflow.
- Kept Firebase notifications independent from the Stories editorial system.
- Deliberately did not introduce Stories-specific article notification automation at this stage.

### Typography

- Began migrating interface text away from the device's native font.
- Applied the shared typography system to reusable components.
- Migrated typography in the Mini Player.
- Migrated typography in LiveHero.
- Migrated typography across Stories components.
- Migrated typography in BannerCarousel.
- Migrated typography in SectionHeader.

### Components

- Updated shared components to use `AppText` where interface text is rendered.
- Preserved existing component behaviour, navigation and data services while migrating typography.

---

## Fixed

- Inconsistent typography between reusable application components.
- Native device font usage in migrated shared components.
- Typography path/import issue in `SectionHeader`.

---

## Technical

- Established `AppText` as the shared typography rendering layer.
- Retained the existing Inter and Lora font assets.
- Verified Firebase notification delivery through the Firebase Console.
- Verified FCM token generation on the Android application.
- Preserved the existing playback and networking architecture during the typography work.

### Status

✅ Stable

---

# Release 0.9 — More Screen

## Added

### More

- More screen.
- More screen navigation.
- Additional application information and utility content.
- More screen integration into the application navigation structure.

---

## Changed

- Expanded the primary application navigation experience.
- Extended the shared visual language into the More section.

---

## Technical

- Integrated the More screen into the existing navigation architecture.
- Preserved the shared application structure established in previous releases.

### Status

✅ Stable

---

# Release 0.8 — Persistent Live Playback

## Added

### Playback

- Global Playback Provider
- Shared Playback Context
- Dedicated playback module
- Persistent playback architecture
- Cross-screen playback
- Shared playback controls
- Play / Pause support

### User Interface

- LiveHero playback integration
- Persistent Mini Player
- Shared playback state
- Dynamic playback status
- Dynamic playback controls

### Navigation

- Playback persistence across Home
- Playback persistence across Stories
- Playback persistence across Story Detail

---

## Changed

- Moved playback responsibility from individual screens to a global provider.
- Simplified playback management throughout the application.
- Unified playback state across all listening experiences.

---

## Fixed

- Duplicate player rendering.
- Mini Player layout regression.
- Playback state synchronisation.
- Navigation playback continuity.

---

## Technical

- Introduced Playback Context.
- Introduced Playback Provider.
- Introduced playback module structure.
- Improved separation between playback logic and presentation.

### Status

✅ Stable

---

# Release 0.7 — Design System & Reader Experience

## Added

### Design System

- Shared typography system.
- Shared spacing system.
- Shared radius system.
- Shared shadow system.
- Central design token architecture.
- Inter font integration.
- Lora font integration.

### Reader

- Continue Reading.
- Native article sharing.
- Premium article typography.
- Improved editorial hierarchy.
- HTML rendering improvements.

### Documentation

- README rewrite.
- Project specification.
- Roadmap rewrite.
- Releases documentation.
- Design System documentation.
- Changelog documentation.

---

## Changed

- Improved typography consistency.
- Improved Story architecture.
- Improved article hierarchy.
- Improved documentation standards.

---

## Fixed

- HTML entity decoding.
- Apostrophe rendering.
- Font loading.
- Typography consistency.

---

## Technical

- Added react-native.config.js.
- Introduced design token architecture.
- Introduced shared constants.
- Improved documentation structure.

### Status

✅ Stable

---

# Release 0.6 — Editorial Platform

## Added

### Stories

- Stories feed.
- Story Detail screen.
- Infinite scrolling.
- Story slug navigation.
- HTML rendering.

### Components

- StoryHero.
- StoryBody.
- StoriesFeed.

---

## Changed

- Introduced modular Story architecture.
- Improved WordPress rendering.
- Improved navigation flow.

---

## Fixed

- Story loading.
- Pagination.
- HTML decoding.

---

## Technical

- Shared Story service architecture.
- Improved API separation.
- Improved service organisation.

### Status

✅ Stable

---

# Release 0.5 — Live Content Platform

## Added

### Services

- Shared API layer.
- Featured Story service.
- Banner service.
- Dynamic CMS content.

### Backend

- Custom REST namespace.
- Elementor Banner endpoint.
- Child Theme integration.
- Backend documentation.

---

## Changed

- Replaced static banners with CMS-driven content.
- Improved API architecture.
- Improved service separation.

---

## Technical

- Reusable CMS service pattern.
- Upgrade-safe backend architecture.

### Status

✅ Stable

---

# Release 0.4 — Premium Home Experience

## Added

- LiveHero.
- BannerCard.
- Premium Home layout.
- Featured Story.
- Dynamic artwork.

---

## Changed

- Home screen redesign.
- Banner Carousel redesign.
- Improved spacing.
- Improved typography.

---

## Technical

- Expanded services layer.
- Expanded constants layer.
- Prepared Stories architecture.

### Status

✅ Stable

---

# Release 0.3 — Live Radio Foundation

## Added

- Live Now Playing.
- Dynamic album artwork.
- Initial Home screen.
- Banner Carousel foundation.

### Status

✅ Stable

---

# Release 0.2 — Project Architecture

## Added

- Initial project architecture.
- Folder structure.
- Shared services.
- Theme preparation.

### Status

✅ Stable

---

# Release 0.1 — Foundation

## Added

- React Native project.
- Android development environment.
- Initial repository.

### Status

✅ Stable