# Radio Africana Mobile Roadmap

## Overview

This roadmap defines the remaining work required to complete Version 1.0 of Radio Africana Mobile.

Unlike the Releases document, which records completed milestones, this document contains only future work.

Features are organised into small, testable releases that can each be completed, committed and verified independently.

Completed milestones are recorded in **Releases.md** and are not repeated here.

---

# Current Development Status

## Target Version

Version 1.0

## Status

🟢 Active Development

Core application architecture has been completed.

Firebase Cloud Messaging has been integrated and verified.

The shared typography foundation has been established through the `AppText` component and the installed Inter and Lora fonts.

The remaining Version 1 work focuses on completing application-wide UI consistency, verifying network-dependent functionality and preparing the production release.

---

# Version 1 Development Plan

## Release 0.9.6 — App-Wide UI Consistency

### Objective

Complete the visual consistency pass across the entire application so that Home, Stories, More, navigation and shared playback components use one consistent Radio Africana interface system.

### Tasks

#### Typography

- Audit remaining native React Native `Text` usage.
- Complete Home screen typography migration.
- Complete More screen typography migration.
- Verify Stories typography.
- Verify Main Player typography.
- Verify Mini Player typography.
- Verify navigation typography.
- Ensure remaining application interface text uses `AppText` where appropriate.

#### Home

- Review Home screen visual consistency.
- Review LiveHero typography.
- Review Main Player typography.
- Review Banner presentation.
- Review Featured Story presentation.
- Review Latest Stories presentation.
- Add pull-to-refresh where appropriate.

#### More

- Review More screen typography.
- Review More screen spacing and hierarchy.
- Review header consistency.
- Add pull-to-refresh where appropriate.

#### Shared Application Shell

- Standardise header presentation.
- Verify Safe Area spacing.
- Verify bottom navigation spacing.
- Verify Mini Player placement across primary screens.
- Verify typography consistency across shared interface elements.

### Success Criteria

- Home, Stories and More share the same visual language.
- Application interface text consistently uses the established typography system.
- Main Player and Mini Player use the established typography system.
- Banners remain fully functional and visually consistent.
- Home supports the required pull-to-refresh behaviour.
- More supports the required pull-to-refresh behaviour.
- No unnecessary native-font usage remains in the primary application UI.

### Git Milestone

Release 0.9.6 – App-Wide UI Consistency

---

## Release 0.9.7 — Network & Playback Verification

### Objective

Verify the existing network-dependent features under stable network conditions before making any unnecessary changes to the underlying services.

### Tasks

#### Stories

- Verify Stories loading.
- Verify Story pagination.
- Verify pull-to-refresh.
- Verify Story Detail navigation.
- Verify Continue Reading.
- Verify native sharing.

#### Banners

- Verify CMS-driven banner loading.
- Verify banner carousel behaviour.
- Verify clickable banners.
- Verify non-clickable banners.
- Verify banner loading and error states.

#### Live Radio

- Verify radio stream connection.
- Verify Now Playing metadata.
- Verify dynamic artwork.
- Verify persistent playback.
- Verify Mini Player.
- Verify playback across navigation.
- Verify background playback.
- Verify buffering behaviour.
- Verify playback recovery.

#### Network Resilience

- Verify loading states.
- Verify friendly error states.
- Verify retry behaviour.
- Confirm that temporary network failures do not expose technical errors to users.

### Success Criteria

- Stories load reliably under a stable network connection.
- Banners load reliably.
- Live radio connects and plays reliably.
- Playback remains persistent across navigation.
- Buffering and recovery behaviour are acceptable.
- Network failures provide meaningful user feedback.
- No unnecessary service changes are introduced when existing functionality is working correctly.

### Git Milestone

Release 0.9.7 – Network & Playback Verification

---

# Version 1.0 Release Candidate

## Objective

Prepare the application for public release after the feature and verification milestones are complete.

### Functional QA

#### Live Radio

- Persistent playback
- Background playback
- Mini Player
- Dynamic metadata
- Album artwork
- Cross-screen playback

#### Stories

- Story loading
- Infinite scrolling
- Pull-to-refresh
- Story Detail
- Continue Reading
- Native sharing

#### Banners

- CMS-driven promotional banners
- Clickable promotional banners
- Non-clickable banner behaviour
- Loading and error states

#### Home

- LiveHero
- Main Player
- Banner Carousel
- Featured Story
- Latest Stories
- Pull-to-refresh

#### More

- Every menu item functional
- Consistent typography
- Consistent header
- Pull-to-refresh

#### Notifications

- Firebase Cloud Messaging
- Firebase Console delivery
- Android notification permissions
- Notification behaviour verified for the supported implementation

---

### Production QA

- Android release build
- Performance optimisation
- Accessibility review
- Final UI consistency review
- Final typography review
- Production testing
- Firebase production configuration review
- Google Play Store preparation

### Success Criteria

Every visible feature works exactly as intended.

No placeholder interfaces remain.

No known blocking runtime issues remain.

The application presents a consistent Radio Africana visual identity across all primary screens.

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
- Background playback

---

## Reading

- Stories
- Story Detail
- Continue Reading
- Native sharing
- Pull-to-refresh on Stories

---

## Content

- CMS-driven banners
- Clickable banners
- Featured Story
- Latest Stories

---

## Application

- Home
- Stories
- More
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
- Do not duplicate completed work in the roadmap.
- Commit after every completed release.
- Update documentation after every release.
- Preserve existing client workflows wherever practical.
- Avoid introducing functionality that is not required by the current product scope.

---

# Roadmap Maintenance

This roadmap is the authoritative source for all future development.

Completed work must move to the Releases document.

Only unfinished work belongs here.

When a roadmap milestone is completed, it should be removed from this document and recorded permanently in **Releases.md** and **Changelog.md**.