# Radio Africana Design System

## Overview

The Radio Africana Design System provides a single source of truth for the visual language of the mobile application.

Its purpose is to ensure consistency across every screen, reduce duplicated styling, improve maintainability, and make future design updates possible from a central location.

Every new screen, component, or feature should use the design system instead of introducing new visual styles unless there is a clear product requirement to do otherwise.

---

# Design Principles

The Radio Africana app follows five core design principles.

## 1. Editorial First

The application is a digital publication before it is a mobile application.

Typography, spacing, imagery, and layout should always prioritise readability and long-form content consumption.

---

## 2. Consistency Before Customisation

Visual consistency is more valuable than creating unique styling for individual screens.

Common design patterns should always reuse the design system.

---

## 3. Semantic Styling

Styles are named by purpose rather than appearance.

Examples:

- Typography.heading1
- Typography.body
- Spacing.lg
- Radius.md

Avoid naming styles based on visual size or colour.

---

## 4. Readability Over Decoration

Whitespace, typography and hierarchy should improve reading comfort.

Decorative styling should never reduce clarity.

---

## 5. Single Source of Truth

Colours, typography, spacing, radius and shadows must be managed from the constants directory.

Hardcoded visual values should be avoided whenever possible.

---

# Colours

Location:

src/constants/colors.ts

The colour palette defines the application's visual identity.

Primary usage includes:

- Brand colours
- Text colours
- Background colours
- Accent colours
- Borders
- Status colours

All components should reference Colours instead of hardcoded HEX values.

---

# Typography

Location:

src/constants/typography.ts

The application uses two font families.

## Lora

Used for:

- Article titles
- Editorial headings
- Display text

Purpose:

To create a premium editorial appearance while maintaining excellent readability.

---

## Inter

Used for:

- Body content
- Metadata
- Navigation
- Buttons
- Labels

Purpose:

To provide highly readable interface text across Android and iOS devices.

Typography styles are semantic and should be reused throughout the application.

---

# Spacing

Location:

src/constants/spacing.ts

Spacing follows a consistent design scale.

Values:

- 4
- 8
- 12
- 16
- 24
- 32
- 40
- 48
- 64

Spacing should always be referenced through the Spacing constant instead of hardcoded numeric values.

---

# Radius

Location:

src/constants/radius.ts

Corner radius values are centralised to maintain consistency across the application.

Typical usage:

- Buttons
- Cards
- Images
- Containers
- Modals

Components should use Radius values instead of individual borderRadius numbers.

---

# Shadows

Location:

src/constants/shadows.ts

The shadow system abstracts platform differences between Android and iOS.

Rather than defining shadow properties on individual components, screens should use the predefined shadow styles.

This ensures a consistent elevation system across the application.

---

# Component Guidelines

All reusable components should:

- Use Colours from the design system.
- Use Typography styles.
- Use Spacing values.
- Use Radius values.
- Use predefined Shadows where appropriate.

New components should avoid introducing duplicate visual styles.

---

# Future Expansion

Future versions of the design system may include:

- Icon sizing guidelines
- Motion and animation tokens
- Dark Mode support
- Elevation guidelines
- Responsive typography
- Component state specifications
- Accessibility standards

These additions will expand the design system while preserving backwards compatibility.

---

# Maintenance

The Design System is considered the authoritative source for all visual styling within the Radio Africana mobile application.

Changes to colours, typography, spacing, radius or shadows should be made in their respective constants files before individual screens are modified.

This approach keeps the application visually consistent and significantly reduces long-term maintenance effort.