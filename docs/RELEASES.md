# Radio Africana Mobile Releases

## Overview

This document records every completed development milestone and formal development checkpoint in the Radio Africana Mobile project.

Each release represents a defined implementation milestone that has been completed, tested and committed.

Development checkpoints may document substantial work that has been committed while follow-up work remains in progress.

Planned future work is documented separately in **Roadmap.md**.

---

# Release 0.1

## Foundation

Established the React Native project and development environment.

### Completed

- React Native project created
- Android development environment configured
- Initial application bootstrapped
- Repository created

### Status

✅ Completed

---

# Release 0.2

## Project Architecture

Established the application's core architecture.

### Completed

- Modular project structure
- Initial navigation architecture
- Shared constants
- Shared services layer
- Base component structure
- TypeScript foundation

### Status

✅ Completed

---

# Release 0.3

## Live Radio Foundation

Introduced the first live listening experience.

### Completed

- Live Now Playing service
- Dynamic album artwork
- Initial Home screen
- Banner carousel foundation
- Radio service integration

### Status

✅ Completed

---

# Release 0.4

## Premium Home Experience

Transformed the Home screen into the primary listening experience.

### Completed

#### User Experience

- Premium Home layout
- LiveHero component
- Banner Carousel
- Featured Story
- Improved spacing
- Improved typography

#### Components

- LiveHero
- BannerCard
- Home content architecture

#### Architecture

- Shared services improvements
- Component separation
- Improved API structure

### Git Milestone

Release 0.4 – Premium Home Experience

### Status

✅ Completed

---

# Release 0.5

## Live Content Platform

Transitioned the application from static content to a fully CMS-driven platform.

### Completed

#### Mobile

- Featured Story service
- Banner service
- Shared API layer
- Dynamic Home content
- Remote image support

#### Backend

- Custom REST API namespace
- Elementor Banner endpoint
- Child Theme integration
- Upgrade-safe implementation

### Git Milestone

Release 0.5 – Live Content Platform

### Status

✅ Completed

---

# Release 0.6

## Editorial Platform

Expanded the application into a complete editorial experience.

### Completed

#### Stories

- Stories feed
- Infinite scrolling
- Story Detail screen
- HTML rendering
- Slug navigation

#### Reader

- Story metadata
- Premium typography
- Improved article layout

#### Performance

- Shared Story services
- API improvements

### Git Milestone

Release 0.6 – Editorial Platform

### Status

✅ Completed

---

# Release 0.7

## Design System & Reader Experience

Established the visual identity of the application and refined the editorial reading experience.

### Completed

#### Design System

- Shared colour system
- Shared typography
- Shared spacing
- Shared radius
- Shared shadows
- Centralised design constants
- Inter font integration
- Lora font integration

#### Reader Experience

- Improved article hierarchy
- HTML rendering refinements
- Continue Reading
- Native article sharing
- Premium editorial layouts

#### Documentation

- Project documentation
- Design System
- Roadmap
- Release documentation
- Changelog

### Git Milestone

Release 0.7 – Design System & Reader Experience

### Status

✅ Completed

---

# Release 0.8

## Persistent Playback Architecture

Introduced the application's production playback architecture.

### Completed

#### Playback

- Global Playback Provider
- Shared Playback Context
- Persistent playback state
- Cross-screen playback
- Background playback support
- Play / Pause controls

#### User Experience

- Persistent Mini Player
- LiveHero playback integration
- Dynamic playback state
- Shared playback controls
- Continuous listening while navigating

#### Architecture

- Dedicated playback module
- Playback state management
- Reusable playback hooks
- Screen-independent audio architecture

### Git Milestone

Release 0.8 – Persistent Live Playback

### Status

✅ Completed

---

# Release 0.9

## More Screen

Expanded the application structure with the More experience.

### Completed

#### More

- More screen
- More screen navigation
- Application information and utility content
- Contact access
- Meet the Team access
- Website access
- Privacy Policy access
- Terms & Conditions access
- Share App functionality
- Version information
- Persistent Mini Player integration

#### Navigation

- More integrated into the primary application navigation
- Shared application structure preserved across Home, Stories and More

### Git Milestone

Release 0.9 – More Screen

### Status

✅ Completed

---

# Release 0.9.5

## Firebase & Typography Foundation

Established the Firebase notification foundation and began the application-wide typography consistency migration.

### Completed

#### Firebase Cloud Messaging

- Firebase Cloud Messaging integration
- Existing Radio Africana Firebase project connection
- Android Firebase application registration
- FCM token generation
- Firebase Console test notification delivery
- Verified notification delivery to the new application installation

#### Notification Strategy

- Preserved the client's existing Firebase notification workflow
- Kept Firebase notification functionality independent of the Stories editorial system
- Deliberately excluded Stories-specific article notification automation from the current implementation

#### Typography Foundation

- Shared `AppText` typography component
- Centralised typography rendering
- Inter font integration through the shared typography system
- Lora font integration through the shared typography system
- Established shared typography variants

#### Shared Component Typography

Typography migration was completed across the shared components worked on during this checkpoint, including:

- Mini Player
- LiveHero
- Latest Story
- Latest Stories
- Stories Header
- Stories Feed
- Story Card
- Banner Carousel
- Section Header

#### Banner Presentation

- Banner Carousel typography migrated to the shared typography system
- Existing Banner Card behaviour preserved

### Changed

- Replaced native interface text usage with `AppText` in migrated shared components.
- Preserved existing playback behaviour while updating Mini Player and LiveHero typography.
- Preserved existing Stories data, pagination and refresh behaviour while updating Stories typography.
- Preserved existing Banner Carousel behaviour while updating its typography.
- Preserved existing component APIs and navigation behaviour throughout the typography migration.

### Fixed

- Inconsistent native-font usage across migrated shared components.
- Typography import/path issue in `SectionHeader`.
- Shared component typography now follows the central typography system where migrated.

### Technical

- Established `AppText` as the shared typography rendering layer.
- Retained the installed Inter and Lora font assets.
- Verified Firebase notification delivery through Firebase Console.
- Verified FCM token generation on Android.
- Preserved the existing playback, Stories and API architecture during the typography work.

### Git Milestone

Release 0.9.5 – Firebase & Typography Foundation

### Status

🟡 Current Checkpoint

The Firebase implementation is operational and verified.

The typography foundation and shared-component migration are established, but the application-wide typography consistency pass is not yet complete.

The remaining UI consistency work continues under Release 0.9.6.

---

# Release Philosophy

Every release must satisfy the following principles.

- Deliver a clearly defined implementation milestone.
- Improve architecture before adding unnecessary complexity.
- Remain backwards compatible whenever practical.
- Test completed functionality before declaring it complete.
- End each formal milestone with a Git commit.
- Update documentation immediately after the milestone.
- Do not mark unfinished work as complete.
- Preserve the client's existing operational workflows wherever practical.

---

# Current Development Sequence

## Release 0.9.6

### App-Wide UI Consistency

The next development milestone focuses on completing the visual consistency pass across the application.

Planned work includes:

- Home screen typography
- More screen typography
- Main player typography
- Header consistency
- Navigation consistency
- Banner presentation verification
- Pull-to-refresh on Home
- Pull-to-refresh on More
- Final Stories UI verification
- Removal of remaining unnecessary native-font usage

---

## Release 0.9.7

### Network & Playback Verification

After the UI consistency work is complete, network-dependent functionality will be verified under stable network conditions.

Planned verification includes:

- Stories loading
- Story pagination
- Banner loading
- Now Playing metadata
- Live radio streaming
- Buffering behaviour
- Playback recovery

No unnecessary networking or playback changes will be introduced until the existing functionality has been tested under a reliable network connection.

---

# Historical Record

The Releases document is a permanent historical record.

Completed releases are not removed or rewritten.

Development checkpoints may be documented when a substantial implementation boundary has been committed while follow-up work remains active.

Future work belongs exclusively in **Roadmap.md**.