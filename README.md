# Radio Africana Mobile

The official Radio Africana mobile application, built with React Native for Android and iOS.

Radio Africana Mobile brings live radio, Now Playing information, programmes, stories, notifications and other station content together in one mobile experience.

## Features

- Live radio streaming
- Now Playing information and artwork
- Up Next and Recently Played
- Persistent Mini Player
- Background audio and media controls
- Radio Africana Stories
- Story detail and sharing
- Programme discovery and show subscriptions
- Push notifications
- Live Video
- Contact Us
- Meet the Team
- Privacy Policy
- Radio Africana website content
- Visit Website and Share App

## Technology

- React Native 0.86.2
- React 19
- TypeScript
- React Navigation
- React Native Reanimated
- React Native Video / Media3
- Firebase
- Notifee
- YouTube IFrame Player

## Project Structure

```text
RadioAfricana/
├── android/          # Android application
├── ios/              # iOS application
├── assets/           # Application assets
├── patches/          # Maintained dependency patches
├── src/
│   ├── components/   # Reusable UI components
│   ├── constants/    # Shared constants
│   ├── navigation/   # Navigation
│   ├── playback/     # Global playback
│   ├── screens/      # Application screens
│   └── services/     # API and service integrations
├── wordpress/        # WordPress-related resources
├── __tests__/        # Automated tests
├── App.tsx           # Application entry point
├── package.json
├── package-lock.json
├── README.md
└── PROJECT.md
```

## Getting Started

### Requirements

- Node.js
- npm
- Android Studio and Android SDK for Android development
- Xcode and CocoaPods for iOS development
- A compatible Java/JDK installation for Android development

### Install dependencies

```bash
npm install
```

### Start Metro

```bash
npm start
```

## Running the App

### Android

```bash
npm run android
```

### iOS

```bash
npm run ios
```

## Android Release Build

The Android application is distributed through Google Play as an Android App Bundle.

From the project root:

```bash
cd android
./gradlew bundleRelease
```

On Windows PowerShell:

```powershell
cd android
.\gradlew bundleRelease
```

The release bundle is generated at:

```text
android/app/build/outputs/bundle/release/app-release.aab
```

Release signing credentials are kept outside the source repository.

## Development

Run the automated tests with:

```bash
npm test
```

Run linting with:

```bash
npm run lint
```

The project uses `patch-package` for maintained dependency patches. Installing dependencies applies the configured patches automatically.

## Documentation

For detailed technical documentation covering the application architecture, services, platform-specific implementation and maintenance, see [`PROJECT.md`](PROJECT.md).

## Ownership

Radio Africana Mobile is proprietary software developed for Radio Africana.

Copyright © Radio Africana. All rights reserved.
