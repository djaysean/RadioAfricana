# WordPress Backend Changelog

## Release 0.5

### Added

- Custom REST API namespace:
  /wp-json/radioafricana/v1

- Banner endpoint:
  /wp-json/radioafricana/v1/banners

### Purpose

Expose the Elementor Custom Slideshow to the Radio Africana mobile application without modifying the Pro.Radio plugin.

### Notes

- Uses the homepage Elementor document.
- Searches recursively for the Custom Slideshow widget.
- Returns banner metadata for the mobile app.