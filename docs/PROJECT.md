# Radio Africana Mobile --- Technical Project Documentation

## 1. Document Purpose

This document is the technical source of truth for the current Radio
Africana Mobile React Native project.

It supersedes the previous project documentation where the two differ.

The current source audit was performed against the supplied `src`
archive and the supplied project-root structure/documentation. The
documentation deliberately distinguishes:

-   current source implementation,
-   previously completed work,
-   current client-test status,
-   and items that still require verification before production release.

------------------------------------------------------------------------

# 2. Current Project Status

**Stage:** Release Candidate / final client-test stage

The current feature scope is considered implemented and functionally
complete based on the current development/test state.

The next engineering artifact is:

``` text
Final client-test APK
```

The application is **not yet treated as production/store-final** until
the client has tested and approved this build.

The post-approval phase will cover the final release-readiness
checklist, production configuration, store assets, signing/release
verification, and any remaining defect fixes.

------------------------------------------------------------------------

# 3. Application Identity

  Property             Current value
  -------------------- -------------------------------------------
  Application          Radio Africana
  Platform             Android
  Framework            React Native
  Language             TypeScript / TSX
  Application ID       `com.radioafricana.radio.africana`\*
  Version              `1.0.0`\*
  Version Name         `1.0`\*
  WordPress base API   `https://radioafricana.com/wp-json`
  Live stream          `https://radioafricana.radioca.st/stream`

\*These values come from the supplied previous project documentation.
The uploaded source archive contains `src` only, so the root
`package.json` and Android Gradle metadata should be checked in the
working repository before the final commit/build.

------------------------------------------------------------------------

# 4. Architectural Overview

The application is organized around a small number of clearly separated
concerns:

``` text
External Services
       │
       ▼
   src/services
       │
       ├───────────────┐
       │               │
       ▼               ▼
  Application      Playback
    data/state       state
       │               │
       └───────┬───────┘
               ▼
          Navigation
               │
       ┌───────┼────────┐
       ▼       ▼        ▼
      Home   Stories    More
                         │
              ┌──────────┼──────────┐
              ▼          ▼          ▼
          Subscribe   Contact     Team
              │                     │
              ▼                     ▼
         Firebase topics       WordPress members

       Persistent Mini Player
               │
               ▼
        Global playback state
```

The source is divided into:

``` text
components
constants
navigation
playback
screens
services
```

------------------------------------------------------------------------

# 5. Application Shell and Navigation

The application navigator is implemented in:

``` text
src/navigation/index.tsx
```

The playback provider wraps the safe-area provider and navigation shell.

The global Mini Player is rendered outside the navigation container and
positioned above the bottom tab bar.

Conceptually:

``` text
PlaybackProvider
└── SafeAreaProvider
    └── AppShell
        ├── NavigationContainer
        │   └── BottomTabs
        └── Global MiniPlayer
```

This architecture is what allows playback and the Mini Player to persist
independently of the currently displayed screen.

------------------------------------------------------------------------

# 6. Bottom Navigation

Implemented in:

``` text
src/navigation/BottomTabs.tsx
```

Primary tabs:

``` text
Home
Stories
More
```

Each tab is backed by a native stack.

### Home stack

``` text
Home
└── StoryDetail
```

### Stories stack

``` text
Stories
└── StoryDetail
```

### More stack

``` text
More
├── SubscribeToShows
├── ContactUs
├── MeetTheTeam
├── PrivacyPolicy
└── Page
```

The generic `Page` route remains available as a reusable WordPress-page
renderer.

The three current More utility destinations no longer depend on that
generic route.

------------------------------------------------------------------------

# 7. Route Definitions

Routes are centralized in:

``` text
src/navigation/routes.ts
```

Current routes:

``` text
HOME
STORIES
STORY_DETAIL
MORE
SUBSCRIBE_TO_SHOWS
CONTACT_US
MEET_THE_TEAM
PRIVACY_POLICY
PAGE
```

Navigation typing is centralized in:

``` text
src/navigation/types.ts
```

`StoryDetail` receives:

``` text
slug: string
```

`Page` receives:

``` text
slug: string
```

The three native More utility screens require no route parameters.

------------------------------------------------------------------------

# 8. Home Architecture

Implemented in:

``` text
src/screens/Home/HomeScreen.tsx
```

Current Home composition:

``` text
HomeScreen
├── Header / logo
├── BannerCarousel
├── LiveHero
├── RecentlyPlayedSection
└── LatestStory
```

Home uses the global playback provider for current Now Playing artwork.

Pull-to-refresh increments a refresh key and remounts the remotely
loaded Home sections.

------------------------------------------------------------------------

# 9. Banner System

Files:

``` text
src/components/banners/BannerCard.tsx
src/components/banners/BannerCarousel.tsx
src/services/banners.ts
```

Endpoint:

``` text
https://radioafricana.com/wp-json/radioafricana/v1/banners
```

Model:

``` text
Banner
├── id
├── image
├── alt
├── title
├── subtitle
├── button
├── link
└── hasLink
```

The carousel handles remote loading, scrolling, active state, links,
loading and retry behaviour.

------------------------------------------------------------------------

# 10. Live Hero

Implemented in:

``` text
src/components/LiveHero.tsx
```

The component receives the current artwork URL and displays it using the
current Radio Africana gold border treatment.

If no remote artwork is available, it uses:

``` text
assets/images/default_artwork.png
```

------------------------------------------------------------------------

# 11. Recently Played

Files:

``` text
src/components/common/RecentlyPlayedSection.tsx
src/services/recentlyPlayed.ts
```

Endpoint:

``` text
https://radioafricana.com/controllers/recentlyplayed.php
```

The service returns a maximum of five recent tracks.

The Home section refreshes the data every five seconds while mounted.

Model:

``` text
RecentlyPlayed
├── id
├── songId
├── artist
├── title
└── picture
```

The UI displays a horizontally scrollable set of artwork cards with
title and artist.

------------------------------------------------------------------------

# 12. Up Next

Files:

``` text
src/services/upNext.ts
src/components/common/UpNextSection.tsx
src/components/MiniPlayer.tsx
```

Endpoint:

``` text
https://radioafricana.com/controllers/queuesong.php
```

The Mini Player actively consumes the Up Next service and refreshes
every 15 seconds.

`UpNextSection.tsx` is a standalone reusable section component present
in the source tree; the current primary Home composition uses the Mini
Player's Up Next presentation rather than rendering this separate
section directly.

------------------------------------------------------------------------

# 13. Playback Architecture

Files:

``` text
src/playback/PlaybackContext.ts
src/playback/PlaybackProvider.tsx
src/playback/index.ts
```

The context exposes:

``` text
isPlaying
nowPlaying
play()
pause()
toggle()
```

The provider owns the hidden `react-native-video` instance.

Stream:

``` text
https://radioafricana.radioca.st/stream
```

Player configuration includes:

``` text
playInBackground
playWhenInactive
showNotificationControls
ignoreSilentSwitch="ignore"
```

The video component is hidden from the visual UI.

------------------------------------------------------------------------

# 14. Playback Metadata

The provider calls:

``` text
src/services/nowPlaying.ts
```

Endpoint:

``` text
https://radioafricana.com/controllers/playing.php
```

Artwork base:

``` text
https://radioafricana.com/station/pictures/
```

The service returns:

``` text
NowPlaying
├── artist
├── title
└── picture
```

The provider refreshes this data every five seconds.

The metadata is passed to the video player for Android media
presentation.

------------------------------------------------------------------------

# 15. Playback Recovery

The provider maintains:

``` text
playerKey
```

Calling `play()` or resuming from a paused state increments the key and
creates a fresh video instance.

Error behaviour:

``` text
Playback error
     ↓
isPlaying = false
     ↓
User presses Play
     ↓
playerKey changes
     ↓
Fresh player instance
     ↓
Stream attempts reconnection
```

This is the current implemented recovery mechanism.

------------------------------------------------------------------------

# 16. Mini Player Architecture

Implemented in:

``` text
src/components/MiniPlayer.tsx
```

The Mini Player:

-   Reads global playback state
-   Displays current artwork
-   Displays current title
-   Displays current artist
-   Displays Live/Ready status
-   Loads Up Next
-   Provides play/pause toggle

It is mounted once by the application shell rather than separately
inside each screen.

This is important because the player is intended to remain persistent
across navigation.

### Current visual refinement

The current artist style is:

``` text
Inter-SemiBold
```

The current Up Next label is:

``` text
Inter-SemiBold
fontWeight: 600
```

### Audit item

The current Up Next label uses:

``` text
Colors.text
```

rather than:

``` text
Colors.gold
```

If the approved client requirement remains that **Up Next must be bold
while retaining the gold colour**, this is a small final visual
correction that should be made before the client-test APK.

------------------------------------------------------------------------

# 17. Stories Architecture

Primary files:

``` text
src/screens/Stories/StoriesScreen.tsx
src/components/stories/StoriesHeader.tsx
src/components/stories/StoriesFeed.tsx
src/components/stories/StoryCard.tsx
src/components/stories/LatestStory.tsx
src/services/stories.ts
```

Stories are retrieved through:

``` text
https://radioafricana.com/wp-json/wp/v2/posts
```

with WordPress `_embed`.

------------------------------------------------------------------------

# 18. Story Service

Implemented in:

``` text
src/services/stories.ts
```

API page size:

``` text
10 posts
```

Story model:

``` text
Story
├── id
├── title
├── excerpt
├── category
├── image
└── slug
```

Story Detail model:

``` text
StoryDetail
├── id
├── slug
├── title
├── content
├── category
├── image
├── publishedAt
└── link
```

Endpoints:

``` text
/wp/v2/posts?_embed&per_page=10&page={page}

/wp/v2/posts?_embed&slug={slug}
```

------------------------------------------------------------------------

# 19. Stories Feed

`StoriesFeed.tsx` provides:

-   Initial loading
-   Ten-item API pages
-   Incremental loading
-   Pull-to-refresh
-   Empty state
-   Initial error state
-   Load-more error state
-   Retry
-   Story navigation

------------------------------------------------------------------------

# 20. Story Detail Architecture

Implemented in:

``` text
src/screens/Story/StoryScreen.tsx
```

Components:

``` text
StoryHero
StoryBody
StoryFooter
ContinueReading
ContinueReadingCard
Mini Player
```

### StoryHero

Contains:

-   Back action
-   Share action
-   Featured image
-   Category
-   Title
-   Publication date

### StoryBody

Uses:

``` text
react-native-render-html
```

The HTML renderer is configured for the application's Inter/Lora
typography and supports:

-   Paragraphs
-   H2/H3
-   Strong
-   Italic
-   Lists
-   Blockquotes
-   Links
-   Images

### End of Story

`End of Story` is deliberately rendered by:

``` text
src/screens/Story/components/StoryBody.tsx
```

It is part of the native Story Detail UI.

It is not a WordPress Theme Builder artifact and should not be
associated with the More utility pages.

### StoryFooter

Provides the share prompt/action using React Native's native `Share`
API.

### Continue Reading

Loads current Stories and displays up to three alternative Stories.

Selecting a card navigates to another `StoryDetail` route.

------------------------------------------------------------------------

# 21. More Architecture

Implemented in:

``` text
src/screens/More/MoreScreen.tsx
```

Current items:

``` text
Subscribe to Shows
Contact Us
Meet the Team
Visit Website
Share App
Privacy Policy
App Version
```

There is no Terms & Conditions item in the current screen.

The current three native utility destinations were introduced to remove
the dependency on generic WordPress page rendering for:

``` text
contacts
team-members
privacy-policy
```

------------------------------------------------------------------------

# 22. Subscribe to Shows

Files:

``` text
src/screens/Subscribe/SubscribeToShowsScreen.tsx
src/services/programs.ts
src/services/notifications.ts
```

Programme endpoint:

``` text
https://radio-africana-dashboard.vercel.app/api/programs
```

Programme model:

``` text
RadioProgram
├── id
├── name
├── days
├── time
└── topic
```

The screen:

1.  Fetches programmes.
2.  Filters malformed records.
3.  Sorts by earliest scheduled day.
4.  Sorts by time.
5.  Displays the programme name and schedule.
6.  Uses the programme topic as the Firebase subscription topic.

The programme name currently uses `Inter-SemiBold`.

------------------------------------------------------------------------

# 23. Notification Architecture

Implemented in:

``` text
src/services/notifications.ts
```

Technologies:

``` text
@react-native-firebase/messaging
@notifee/react-native
```

Foreground channel:

``` text
radio-africana-foreground
```

Channel name:

``` text
Radio Africana
```

Android 13+ permission:

``` text
POST_NOTIFICATIONS
```

The service:

-   Requests notification permission where required.
-   Retrieves the FCM token.
-   Registers a token-refresh listener.
-   Handles foreground messages.
-   Displays foreground notifications through Notifee.
-   Provides programme topic subscription functions.

------------------------------------------------------------------------

# 24. Contact Us Architecture

Implemented in:

``` text
src/screens/ContactUs/ContactUsScreen.tsx
```

Contact Form 7 form:

``` text
6452
```

Endpoint:

``` text
https://radioafricana.com/wp-json/contact-form-7/v1/contact-forms/6452/feedback
```

The native screen uses `FormData` and submits the same field names
expected by the WordPress form.

Fields:

``` text
your-name
your-email
your-phone
your-topic
your-subject
your-message
website
privacy-consent
```

Validation:

``` text
Name                required
Email               required + format validation
Phone               optional
Topic               required
Subject             required
Message             required
Message length      20–2000 characters
Privacy consent     required
```

The screen handles:

``` text
mail_sent
validation_failed
```

and maps server validation errors back to native fields.

Successful submission resets the form and displays a native success
state.

------------------------------------------------------------------------

# 25. Meet the Team Architecture

Files:

``` text
src/screens/MeetTheTeam/MeetTheTeamScreen.tsx
src/services/members.ts
```

The service calls:

``` text
/wp/v2/members?_embed&per_page=6&page={page}
```

The app displays five records and uses the sixth as a look-ahead record.

Model:

``` text
TeamMember
├── id
├── slug
├── name
├── role
├── bio
├── image
└── link
```

### Pagination

Current page size:

``` text
5 members
```

UI:

``` text
Previous | Page | Next
```

### Role resolution

Role lookup proceeds in this order:

``` text
Embedded WordPress term data
        ↓
Public member profile page
        ↓
Fallback: Radio Africana Team
```

The service does **not** query:

``` text
/wp/v2/membertype
```

because that endpoint produced a 404 on the live installation.

The public profile fallback resolves known role labels such as:

``` text
Presenter
Producer
Dj
```

### Bottom clearance

The Team screen includes substantial bottom content padding because the
global Mini Player is overlaid above the bottom tab navigation.

This prevents the last member's biography and pagination controls from
being hidden beneath the persistent player.

------------------------------------------------------------------------

# 26. Privacy Policy Architecture

Implemented in:

``` text
src/screens/PrivacyPolicy/PrivacyPolicyScreen.tsx
```

This is a native static screen.

It includes:

-   Native header
-   Back button
-   Native title
-   Scrollable policy content
-   Section headings
-   Bullet lists
-   Website action

It is deliberately not dependent on:

``` text
src/screens/Page/PageScreen.tsx
```

for its current presentation.

### Content audit note

The current source contains a textual typo in the policy copy around the
phrase:

``` text
privacy regn
```

This is content rather than an architectural issue. It should be
reviewed before production release if the policy copy is intended to be
final.

------------------------------------------------------------------------

# 27. Generic WordPress Page Support

Files:

``` text
src/screens/Page/PageScreen.tsx
src/screens/Page/components/PageBody.tsx
src/services/pages.ts
```

The generic page service uses:

``` text
/wp/v2/pages?slug={slug}
```

The generic renderer remains available for future pages.

It is not currently used for:

``` text
Contact Us
Meet the Team
Privacy Policy
```

Those now have dedicated native screens.

------------------------------------------------------------------------

# 28. Shared UI Components

## AppText

``` text
src/components/ui/AppText.tsx
```

Provides centralized typography variants.

## SectionHeader

``` text
src/components/common/SectionHeader.tsx
```

Provides reusable section headings.

## TrackRow

``` text
src/components/common/TrackRow.tsx
```

Reusable track row component present in the current source tree.

## UpNextSection

``` text
src/components/common/UpNextSection.tsx
```

Reusable Up Next section component present in the current source tree.

## Story Components

``` text
StoryCard
StoriesHeader
StoriesFeed
LatestStory
```

These compose the Stories experience.

------------------------------------------------------------------------

# 29. Design Constants

Current constants:

``` text
src/constants/colors.ts
src/constants/typography.ts
```

The older documentation described additional files:

``` text
index.ts
radius.ts
shadows.ts
spacing.ts
```

Those files are not present in the supplied current `src` archive and
have therefore been removed from this documentation.

Current colour values:

``` text
gold           #D4AF37
white          #FFFFFF
black          #111111
text           #111111
textSecondary  #666666
background     #FFFFFF
surface        #FFFFFF
border         #E5E5E5
divider        #EFEFEF
live           #D32F2F
buttonText     #FFFFFF
```

Current typography families:

``` text
Lora-Bold
Inter-Regular
Inter-Medium
Inter-SemiBold
```

------------------------------------------------------------------------

# 30. Current Source Tree

The supplied current source tree is:

``` text
src/
├── components/
│   ├── banners/
│   │   ├── BannerCard.tsx
│   │   └── BannerCarousel.tsx
│   ├── common/
│   │   ├── RecentlyPlayedSection.tsx
│   │   ├── SectionHeader.tsx
│   │   ├── TrackRow.tsx
│   │   └── UpNextSection.tsx
│   ├── stories/
│   │   ├── LatestStory.tsx
│   │   ├── StoriesFeed.tsx
│   │   ├── StoriesHeader.tsx
│   │   └── StoryCard.tsx
│   ├── ui/
│   │   └── AppText.tsx
│   ├── LiveHero.tsx
│   └── MiniPlayer.tsx
│
├── constants/
│   ├── colors.ts
│   └── typography.ts
│
├── navigation/
│   ├── BottomTabs.tsx
│   ├── index.tsx
│   ├── routes.ts
│   └── types.ts
│
├── playback/
│   ├── PlaybackContext.ts
│   ├── PlaybackProvider.tsx
│   └── index.ts
│
├── screens/
│   ├── ContactUs/
│   │   └── ContactUsScreen.tsx
│   ├── Home/
│   │   └── HomeScreen.tsx
│   ├── MeetTheTeam/
│   │   └── MeetTheTeamScreen.tsx
│   ├── More/
│   │   └── MoreScreen.tsx
│   ├── Page/
│   │   ├── components/
│   │   │   └── PageBody.tsx
│   │   └── PageScreen.tsx
│   ├── PrivacyPolicy/
│   │   └── PrivacyPolicyScreen.tsx
│   ├── Stories/
│   │   └── StoriesScreen.tsx
│   ├── Story/
│   │   ├── components/
│   │   │   ├── ContinueReading.tsx
│   │   │   ├── ContinueReadingCard.tsx
│   │   │   ├── StoryBody.tsx
│   │   │   ├── StoryFooter.tsx
│   │   │   └── StoryHero.tsx
│   │   └── StoryScreen.tsx
│   └── Subscribe/
│       └── SubscribeToShowsScreen.tsx
│
└── services/
    ├── api.ts
    ├── banners.ts
    ├── members.ts
    ├── notifications.ts
    ├── nowPlaying.ts
    ├── pages.ts
    ├── programs.ts
    ├── recentlyPlayed.ts
    ├── stories.ts
    └── upNext.ts
```

------------------------------------------------------------------------

# 31. Project Root Structure

The supplied project-root screenshot shows:

``` text
RadioAfricana/
├── __tests__/
├── .bundle/
├── android/
├── assets/
├── docs/
├── ios/
├── node_modules/
├── patches/
├── src/
├── wordpress/
├── .eslintrc.js
├── .gitignore
├── .prettierrc.js
├── .watchmanconfig
├── app.json
├── App.tsx
├── babel.config.js
├── Gemfile
├── index.js
├── jest.config.js
├── metro.config.js
├── package-lock.json
├── package.json
├── react-native.config.js
├── README.md
└── tsconfig.json
```

The screenshot confirms the existence of the root project structure, but
the uploaded source archive did not include root file contents. Root
metadata should therefore be verified locally before the final build.

------------------------------------------------------------------------

# 32. Development Commands

Install dependencies:

``` bash
npm install
```

Start Metro:

``` bash
npx react-native start
```

Run Android development build:

``` bash
npx react-native run-android
```

The Android project is under:

``` text
android/
```

------------------------------------------------------------------------

# 33. Documentation Migration

The previous documentation became stale because the application evolved
significantly.

Major documentation corrections now include:

### Added to the documented architecture

-   Contact Us native screen
-   Meet the Team native screen
-   Privacy Policy native screen
-   Subscribe to Shows
-   Programme service
-   Members service
-   Recently Played
-   Up Next
-   Native More navigation
-   Firebase topic subscriptions
-   Contact Form 7 integration
-   Team pagination
-   Team role resolution

### Removed from the old source-tree description

The old documentation listed files that are not present in the supplied
current source:

``` text
src/constants/index.ts
src/constants/radius.ts
src/constants/shadows.ts
src/constants/spacing.ts
```

### Corrected

The old documentation described the three More utility pages
generically. The current implementation is:

``` text
Contact Us       native
Meet the Team    native
Privacy Policy   native
```

------------------------------------------------------------------------

# 34. Current Functional Acceptance State

The current development/test state has confirmed:

``` text
Contact Us
    ✓ Native navigation
    ✓ Form validation
    ✓ CF7 submission integration
    ✓ Success state
    ✓ No TypeScript/ESLint errors

Privacy Policy
    ✓ Native navigation
    ✓ Header
    ✓ Scrollable content
    ✓ Back navigation
    ✓ No TypeScript/ESLint errors

Meet the Team
    ✓ Native navigation
    ✓ WordPress member loading
    ✓ Images
    ✓ Names
    ✓ Roles
    ✓ Biographies
    ✓ Five-member pagination
    ✓ Previous/Next
    ✓ Mini Player clearance
    ✓ No TypeScript/ESLint errors
    ✓ No role-endpoint 404s

Subscribe to Shows
    ✓ Programme loading
    ✓ Programme names
    ✓ Schedule display
    ✓ Firebase topic subscription controls

More
    ✓ Native destinations
    ✓ Website
    ✓ Share
    ✓ Privacy Policy
    ✓ Version display
```

The current client-test build should still undergo the complete
cross-feature regression pass before being considered accepted.

------------------------------------------------------------------------

# 35. Final Client-Test Build Procedure

The intended sequence is:

``` text
1. Review source
2. Confirm lint/TypeScript clean
3. Confirm documentation matches source
4. Review git diff
5. Review git status
6. Commit completed RC state
7. Build Android APK
8. Install APK on physical device
9. Test without Metro/dev-server dependency
10. Execute client regression checklist
11. Deliver APK to client
12. Collect client feedback
```

The final client APK should be built from the committed source state.

------------------------------------------------------------------------

# 36. Git Commit Boundary

The current completed work should be treated as one coherent RC
milestone because it includes the final More-section architecture and
associated native screens.

Recommended commit subject:

``` text
feat: complete Radio Africana RC app screens and navigation
```

Suggested scope summary:

``` text
- add native Contact Us screen
- add native Privacy Policy screen
- add native Meet the Team screen
- add WordPress-driven member pagination and role resolution
- wire native More navigation
- add Subscribe to Shows programme subscriptions
- add Recently Played and Up Next integrations
- refine Mini Player presentation
- update application documentation
```

The exact commit should be reviewed against the actual Git diff before
execution.

------------------------------------------------------------------------

# 37. Final Release Boundary

After the client receives and approves the final test APK:

``` text
Client sign-off
      ↓
Final release-readiness checklist
      ↓
Production configuration review
      ↓
Signing/release configuration
      ↓
Store metadata/assets
      ↓
Production APK/AAB
      ↓
Final install verification
      ↓
Publication
```

No new feature work should be introduced after client sign-off unless
required to correct a defect or satisfy an explicit client change
request.

------------------------------------------------------------------------

# 38. Remaining Audit Items Before the Final APK

The current implementation is functionally strong, but the following
should be explicitly verified before building the client APK:

1.  **Up Next colour**
    -   Current source: bold/semibold but `Colors.text`.
    -   Verify whether the approved client requirement is still gold.
    -   If yes, correct before the build.
2.  **Privacy Policy copy**
    -   Current native source contains a visible copy typo around
        `privacy regn`.
    -   Decide whether to correct it now or preserve the approved
        website copy.
3.  **Root version metadata**
    -   Confirm `package.json` version.
    -   Confirm Android `versionCode` / `versionName`.
    -   Confirm application ID.
4.  **Git state**
    -   Confirm only intended files changed.
    -   Confirm no generated or temporary files are staged.
5.  **Release build**
    -   Build from the committed source.
    -   Install on a physical Android device.
    -   Verify standalone operation.

These are verification/cleanup items, not a reason to reopen completed
architecture.

------------------------------------------------------------------------

# 39. Documentation Maintenance Rule

Future documentation changes should be made when one of the following
occurs:

-   A new screen is added.
-   A route changes.
-   An external endpoint changes.
-   A major component is added/removed.
-   Playback architecture changes.
-   Notification architecture changes.
-   Release version changes.
-   Production configuration changes.

Small styling-only changes do not require rewriting the technical
documentation unless they materially change the documented behaviour.

------------------------------------------------------------------------

# 40. Current Project Definition

At this checkpoint, Radio Africana Mobile is a React Native Android
application with:

``` text
Native navigation
+ Global live playback
+ Persistent Mini Player
+ WordPress Stories
+ WordPress team directory
+ Native Contact Us
+ Native Privacy Policy
+ Native Meet the Team
+ Programme subscriptions
+ Firebase notifications
+ Remote banners
+ Recently Played
+ Up Next
```

The project is now in **final client acceptance preparation**, not
active feature-development mode.
