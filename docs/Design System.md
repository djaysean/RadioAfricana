# Radio Africana Mobile Design System

## Current Status

The application-wide UI consistency work of Release 0.9.6 is complete and verified.

The Design System is now the visual source of truth for Version 1 Release Candidate work.

## Design Philosophy

Radio Africana Mobile should feel:

- Calm
- Editorial
- Modern
- Premium
- Purposeful

Visual consistency takes priority over screen-specific creativity.

## Core Principles

### Editorial First

Reading should feel effortless. Typography, spacing and hierarchy prioritise long-form content.

### Listening First

Live radio is the primary experience. Playback remains persistent while navigation changes around it.

### Consistency Before Creativity

Reusable patterns are preferred over unique layouts.

### Native Before Web

Although powered by WordPress, the application behaves as a native Android product.

### Simplicity Before Density

Only present what users need.

## Design Tokens

Centralised tokens are maintained in:

```text
src/constants/
```

Shared tokens cover:

- Colours
- Typography
- Spacing
- Radius
- Shadows

## Typography

`src/constants/typography.ts` is the source of truth for typography tokens.

`src/components/ui/AppText.tsx` is the shared rendering layer.

All new interface text should use `AppText` rather than raw React Native `Text` wherever practical.

### Lora

Used for:

- Story titles
- Editorial headings
- Premium reading experiences

### Inter

Used for:

- Body copy
- Metadata
- Buttons
- Navigation
- Labels
- Forms

## Colour System

Primary colours include:

- Brand Gold
- Editorial Black
- White
- Background Grey
- Border Grey
- Success / Live indicator

Components should consume shared colour constants.

## Layout Principles

```text
Header
   ↓
Primary Content
   ↓
Persistent Mini Player
   ↓
Bottom Navigation
```

This hierarchy remains consistent across primary screens.

## Header System

The Radio Africana logo is the primary application header.

Version 1 primary screens:

- Home
- Stories
- More

Headers should maintain consistent height and spacing.

## Home

Contains:

- Radio Africana logo
- LiveHero
- Banner Carousel
- Featured Story
- Latest Stories
- Persistent Mini Player

LiveHero is the primary large listening surface and appears on Home.

## LiveHero

Contains:

- Dynamic artwork
- Now Playing
- Artist
- Live status
- Listen Live control

## Persistent Mini Player

Visible throughout the application.

Responsibilities:

- Current artwork
- Current title
- Artist
- Live status
- Play/Pause

The Mini Player complements rather than replaces LiveHero.

## Banner Carousel

Rules:

- CMS-driven
- Swipeable
- Responsive
- Clickable when a destination URL exists
- Non-interactive when no destination exists

Image enlargement is intentionally unsupported.

## Story Cards

Prioritise:

- Featured image
- Title
- Metadata
- Clear spacing

Avoid excessive text truncation.

Story typography follows the Lora/Inter hierarchy.

## Story Reader

The reader should provide:

- Comfortable line spacing
- Generous whitespace
- Strong heading hierarchy
- Minimal visual distraction

## Bottom Navigation

Version 1:

- Home
- Stories
- More

Requirements:

- Branded icons
- Active state
- Consistent spacing
- Native behaviour

## Interaction Principles

Buttons provide immediate feedback.

Users should always understand whether an action succeeded.

## Loading States

Every network-driven component should define:

- Loading
- Empty
- Error
- Success

Technical errors must never be exposed directly to users.

## Accessibility

Version 1 requirements include:

- Readable typography
- Consistent touch targets
- Colour contrast
- Predictable navigation
- Semantic hierarchy

## Responsive Behaviour

Layouts must adapt gracefully across Android devices without introducing screen-specific design systems.

## Component Philosophy

Reusable components should:

- Have a single responsibility.
- Avoid duplicated styling.
- Consume shared constants.
- Remain independent of business logic where practical.
- Use shared typography and colour primitives.
- Avoid one-off styles without a design-system requirement.

## Release 0.9.6 Status

Completed and verified:

- Application-wide typography migration
- Home typography
- More typography
- Story Detail typography
- Continue Reading typography
- Main Player typography
- Mini Player typography
- Header consistency
- Navigation typography
- Banner presentation
- Home pull-to-refresh
- More pull-to-refresh
- Repository-wide native `Text` audit

## Maintenance

Any future visual change should first be reflected in this document before implementation.
