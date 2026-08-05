# Radio Africana Mobile App

## Overview

Radio Africana Mobile is the official Android application for Radio Africana, designed to deliver a premium African radio experience by combining live streaming, editorial storytelling, community engagement, and promotional content within a modern native mobile application.

Unlike the website, which serves as the station's Content Management System (CMS), the mobile application is designed as a listening-first platform powered by live data.

---

## Current Status

Current Release:

**Release 0.5**

Platform:

- React Native

Primary Target:

- Android

Future Platform:

- iOS

Status:

**Active Development**

---

## Current Features

### Live Radio

- Live Now Playing
- Dynamic album artwork
- Persistent Mini Player

### Home Screen

- Premium Hero
- Live Banner Carousel
- Live Featured Story

### Content

- WordPress Featured Story integration
- Elementor Banner integration
- Shared API layer

### Architecture

- Modular component structure
- Shared services layer
- Shared constants layer
- Backend REST API integration

---

## Project Structure

```
src/

components/
    banners/
    stories/

services/

constants/

wordpress/
```

---

## Backend Architecture

The mobile application consumes content from two API namespaces:

### WordPress Core

```
/wp-json/wp/v2/
```

Used for:

- Posts
- Featured Stories
- Categories
- Future editorial content

### Radio Africana Custom API

```
/wp-json/radioafricana/v1/
```

Currently provides:

- Banner Carousel

Future endpoints:

- Podcasts
- Events
- Presenters
- Programme Schedule

---

## Design Philosophy

The website is the Content Management System.

The mobile application is the listening platform.

Editorial teams should be able to update stories, promotional banners and future content without requiring an application update.

---

## Development Principles

- Component-first architecture
- Service-first data layer
- Upgrade-safe WordPress integrations
- No direct modification of Pro.Radio plugins
- Complete file replacements during development
- Git milestone commits after every stable feature

---

## Current Milestone

Release 0.5 successfully established the application's live content architecture by integrating both the WordPress REST API and a custom Radio Africana API.

The Home screen is now primarily powered by live CMS content.