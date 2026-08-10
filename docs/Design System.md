# Radio Africana Mobile Design System

## Overview

The Radio Africana Design System defines the visual language, interaction patterns and reusable interface standards for the Radio Africana Mobile application.

It serves as the single source of truth for every screen, component and interaction within the application.

Every user interface element should either follow this design system or extend it intentionally.

---

# Design Philosophy

Radio Africana Mobile is inspired by the clarity of BBC Sounds, the simplicity of Spotify and the editorial quality of modern digital publications.

The application should feel:

- Calm
- Editorial
- Modern
- Premium
- Purposeful

Visual consistency is considered more important than individual screen creativity.

---

# Core Principles

## Editorial First

Reading should feel effortless.

Typography, spacing and hierarchy always prioritise long-form content.

---

## Listening First

Live radio is the primary experience.

Playback should remain persistent while navigation changes around it.

---

## Consistency Before Creativity

Reusable patterns are preferred over unique layouts.

Users should never have to relearn the interface between screens.

---

## Native Before Web

Although powered by WordPress, the application must behave like a native Android application.

---

## Simplicity Before Density

Only present what users need.

Avoid unnecessary controls, visual clutter or decorative elements.

---

# Design Tokens

The design tokens are maintained centrally within:

```text
src/constants/
```

The application uses shared constants for:

- Colours
- Typography
- Spacing
- Radius
- Shadows

Hardcoded visual values should be avoided whenever practical.

---

# Typography

Typography is centralised through the shared typography system and rendered through the reusable `AppText` component.

The installed font families are used throughout the application rather than relying on the Android device's native font.

## Lora

Purpose:

Editorial display typography.

Used for:

- Story titles
- Major editorial headings
- Premium reading experiences
- Prominent editorial content

---

## Inter

Purpose:

Interface typography.

Used for:

- Body copy
- Metadata
- Buttons
- Navigation
- Labels
- Forms
- Status indicators
- Supporting interface text

---

## AppText

`AppText` is the shared typography component for application UI text.

Components should use `AppText` rather than importing and styling React Native's native `Text` component directly whenever the text belongs to the application interface.

The component consumes the central typography definitions and provides consistent variants across the application.

Typography variants include:

- Display
- Heading
- Body
- Body Small
- Label
- Meta
- Button

The typography system is being progressively applied across the application as part of the Release 0.9.6 UI consistency work.

---

# Colour System

The application colour palette communicates hierarchy rather than decoration.

Primary colours include:

- Brand Gold
- Editorial Black
- White
- Background Grey
- Border Grey
- Success / Live indicator

Every component should reference shared colour constants.

---

# Layout Principles

The application follows a predictable vertical hierarchy.

```text
Header

↓

Primary Content

↓

Persistent Mini Player

↓

Bottom Navigation
```

This structure remains consistent across all primary screens.

---

# Header System

The Radio Africana logo is the primary application header.

Version 1 standard:

Home

Stories

More

All use the same branded header.

Headers should maintain consistent height and spacing.

Typography used within headers should follow the shared application typography system.

---

# Home Screen

Purpose:

Primary listening destination.

Contains:

- Radio Africana logo
- LiveHero
- Banner Carousel
- Featured Story
- Latest Stories
- Persistent Mini Player

The Home screen is the only location where the large LiveHero appears.

Home is also the primary location for live playback interaction and promotional content.

---

# LiveHero

Purpose:

Primary live listening experience.

Contains:

- Dynamic artwork
- Now Playing
- Artist
- Live status
- Listen Live button

Only displayed on the Home screen.

All LiveHero interface text should use the shared typography system.

---

# Persistent Mini Player

Purpose:

Provide uninterrupted playback controls.

Visible throughout the application.

Responsibilities:

- Current artwork
- Current title
- Artist
- Live status
- Play/Pause

The Mini Player should never replace the LiveHero.

Instead, it complements it by remaining available during navigation.

All Mini Player interface text should use the shared typography system.

---

# Banner Carousel

Purpose:

Highlight promotional content.

Rules:

- CMS-driven
- Swipeable
- Responsive

Interaction:

If a banner has a destination URL:

Tap opens the destination.

If no URL exists:

Banner remains non-interactive.

Image enlargement is intentionally not supported.

Banner status and retry messaging should use the shared typography system.

---

# Story Cards

Story cards should prioritise readability.

Include:

- Featured image
- Title
- Metadata
- Clear spacing

Avoid excessive text truncation.

Story card typography should follow the established Lora and Inter hierarchy.

---

# Story Reader

The reader experience should resemble a premium publication.

Characteristics:

- Comfortable line spacing
- Generous whitespace
- Strong heading hierarchy
- Minimal visual distractions

Editorial display typography uses Lora, while interface and supporting text use Inter.

---

# Stories

The Stories experience includes:

- Stories Header
- Stories Feed
- Latest Stories
- Latest Story
- Story Cards
- Story Detail

The Stories feed supports pull-to-refresh.

Loading, empty and error states should use the shared typography system and should never expose raw technical errors to users.

---

# Bottom Navigation

Version 1 includes:

- Home
- Stories
- More

Requirements:

- Branded icons
- Active state
- Consistent spacing
- Native behaviour

Navigation labels and supporting text should use the shared application typography system.

---

# Interaction Principles

Buttons must provide immediate feedback.

Interactive elements should always communicate their state.

Examples:

Listen Live

↓

Playing Live

READY

↓

LIVE

Users should never wonder whether an action succeeded.

---

# Loading States

Every network-driven component should define:

- Loading
- Empty
- Error
- Success

Raw technical errors must never be shown to end users.

Loading, empty and error states should use the shared typography system.

---

# Accessibility

Version 1 requirements include:

- Readable typography
- Consistent touch targets
- Colour contrast
- Predictable navigation
- Semantic hierarchy

Accessibility improvements will continue in future releases.

---

# Responsive Behaviour

Layouts should adapt gracefully across Android devices.

Spacing should remain consistent without introducing screen-specific designs.

---

# Component Philosophy

Reusable components should:

- Have a single responsibility.
- Avoid duplicated styling.
- Consume shared constants.
- Remain independent of business logic whenever possible.
- Use shared typography and colour primitives.
- Avoid introducing one-off visual styles without a design-system requirement.

---

# Release 0.9.6 UI Consistency Work

The current application-wide UI consistency pass focuses on bringing all primary screens and shared interface elements into the same visual language.

Remaining work includes:

- Home screen typography
- More screen typography
- Main player typography
- Header consistency
- Navigation consistency
- Home pull-to-refresh
- More pull-to-refresh
- Final Stories UI verification
- Final verification of the Banner presentation
- Removal of remaining unnecessary native-font usage

The objective is for the application to present one consistent Radio Africana visual identity from launch through navigation, listening and reading.

---

# Future Expansion

The design system is intended to grow alongside the application.

Future additions may include:

- Motion guidelines
- Animation tokens
- Dark Mode
- Iconography standards
- Elevation system
- Haptic feedback guidance
- Component state documentation

---

# Maintenance

The Design System is the authoritative reference for every visual decision within Radio Africana Mobile.

Any change affecting appearance should first be reflected in this document before implementation.

Maintaining a single visual language ensures consistency, reduces maintenance effort and preserves the premium identity of the application.