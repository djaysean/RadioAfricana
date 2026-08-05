# Radio Africana WordPress Backend

This directory contains all custom WordPress functionality developed specifically for the Radio Africana mobile application.

The goal is to keep every backend customization documented, version-controlled, and independent of the Pro.Radio theme and plugins.

---

## Philosophy

The Pro.Radio theme and its plugins should never be modified directly.

All mobile-app functionality must be implemented through:

- The Pro.Radio child theme
- Custom REST API endpoints
- Future standalone functionality (when required)

This ensures updates to the parent theme or plugins do not overwrite custom work.

---

## Current API Endpoints

### Banners

Endpoint:

/wp-json/radioafricana/v1/banners

Purpose:

Returns the homepage Elementor Custom Slideshow as structured JSON for the mobile application.

Current fields:

- id
- image
- alt
- title
- subtitle
- button
- link
- hasLink

---

## Directory Structure

child-theme/

Contains production copies of modified child theme files.

endpoints/

Contains standalone source files for every custom REST endpoint.

---

## Development Principle

The WordPress website is the Content Management System.

The mobile application consumes content through REST APIs.

The app must never depend on Elementor layouts, HTML scraping, or theme templates.

Every feature exposed to the mobile application should have a dedicated API endpoint whenever appropriate.