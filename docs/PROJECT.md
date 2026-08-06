# Radio Africana Mobile

## Overview

Radio Africana Mobile is the official mobile application for Radio Africana, built to deliver a premium African radio and editorial experience.

The application combines live radio streaming, editorial storytelling, promotional content and future community features within a modern React Native application powered by the Radio Africana website.

Unlike the website, which serves primarily as the Content Management System (CMS), the mobile application is designed as the primary listening and reading experience for users.

---

# Vision

To become the primary digital platform for Radio Africana listeners by combining live radio, high-quality editorial content and community engagement within a single premium mobile experience.

The application should feel less like a traditional radio app and more like a modern digital publication with integrated live audio.

---

# Objectives

The project is guided by the following objectives.

- Deliver a fast, stable native application.
- Maintain a premium editorial reading experience.
- Allow all content to be managed through WordPress.
- Minimise application updates by relying on live CMS content.
- Build a scalable architecture suitable for future expansion.

---

# Technology Stack

## Mobile

- React Native
- TypeScript
- React Navigation

## Backend

- WordPress REST API
- Custom Radio Africana REST API

## Content Management

- WordPress
- Elementor
- Pro.Radio Theme
- Pro.Radio Child Theme

---

# Application Architecture

The application follows a modular architecture built around reusable components and shared services.

```
WordPress CMS
        │
        ▼
 REST API Services
        │
        ▼
 Shared Service Layer
        │
        ▼
 Screens
        │
        ▼
 Components
```

This separation keeps presentation independent from data retrieval while allowing the backend to evolve without major application changes.

---

# Design Philosophy

The Radio Africana mobile application follows an editorial-first design philosophy.

Key principles include:

- Readability over decoration.
- Consistent typography.
- Clean visual hierarchy.
- Modular components.
- Centralised design tokens.
- Semantic styling.
- Responsive layouts.

The mobile application should feel like a premium publication rather than a traditional radio application.

---

# Current Features

## Live Radio

- Live audio streaming
- Persistent Mini Player
- Dynamic Now Playing information
- Dynamic album artwork

## Editorial

- Home Featured Story
- Stories listing
- Story Detail screen
- HTML article rendering
- Infinite scrolling
- Category support

## Content Delivery

- WordPress REST API integration
- Custom Radio Africana API
- Elementor Banner integration
- Shared API layer
- Shared services architecture

---

# Design System

The application uses a shared design system consisting of:

- Colours
- Typography
- Spacing
- Radius
- Shadows

These are maintained centrally within:

```
src/constants/
```

Every screen should reference the design system rather than introducing new visual values.

---

# Repository Structure

```
src/

components/
screens/
navigation/
services/
constants/
hooks/
types/

assets/

docs/

wordpress/
```

The repository is organised around feature separation, shared services and reusable UI components.

---

# Development Principles

The project follows several core engineering principles.

- Component-first architecture.
- Service-first data layer.
- Upgrade-safe WordPress customisations.
- Centralised design system.
- Complete file replacements during development.
- Small, testable feature milestones.
- Git commits after every stable implementation.

---

# Current Status

Current Release:

**Release 0.7**

Status:

**Active Development**

Current focus:

- Premium reader experience.
- Design system adoption.
- Shared typography.
- UI refinement.
- Performance optimisation.
- API caching.

---

# Long-Term Goals

Future development includes:

- Podcasts
- Programme Schedule
- Presenter Profiles
- Events
- Search
- Bookmarks
- Notifications
- Chromecast
- Android Auto
- Apple CarPlay
- Offline reading
- iOS support

---

# Documentation

Project documentation is maintained within the `/docs` directory.

Key documents include:

- Project
- Roadmap
- Releases
- Changelog
- Design System

These documents evolve alongside the application and should always reflect the current state of the project.