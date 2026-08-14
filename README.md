# Radio Africana Mobile

Radio Africana Mobile is the React Native mobile application for Radio
Africana. It combines live radio playback, current-track information,
promotional content, Radio Africana Stories, programme notifications,
and native utility screens.

> **Current status:** Release Candidate / client final-test stage.\
> The application is functionally complete for the current scope. The
> next artifact is a final client test APK. Production/store release
> work should begin only after client sign-off and the final
> release-readiness pass.

------------------------------------------------------------------------

## Application Identity

  Property                     Current value
  ---------------------------- -------------------------------------------
  Application                  Radio Africana
  Platform                     Android
  Version                      `1.0.0`\*
  Version Name                 `1.0`\*
  Application ID               `com.radioafricana.radio.africana`\*
  Framework                    React Native
  Language                     TypeScript / TSX
  Editorial/content platform   WordPress
  Live stream                  `https://radioafricana.radioca.st/stream`

\*The supplied project documentation identifies these release values.
The root `package.json` and Android Gradle metadata should be rechecked
against the local working tree before the final build/tag is created.

------------------------------------------------------------------------

## Product Scope

The application is organized around three primary navigation areas:

``` text
Home
Stories
More
```

A persistent Mini Player sits above the bottom navigation and keeps live
playback controls available while navigating through the app.

The current build includes:

-   Live radio playback
-   Global playback state
-   Current Now Playing metadata and artwork
-   Persistent Mini Player
-   Android media notification controls
-   Promotional banners
-   Recently Played
-   Radio Africana Stories
-   Story Detail
-   Continue Reading
-   Native Story sharing
-   Firebase push notifications
-   Subscribe to Shows
-   Native Contact Us
-   Native Meet the Team
-   Native Privacy Policy
-   Visit Website
-   Share App
-   App version display

------------------------------------------------------------------------

# Home

The Home screen is the primary live-radio entry point.

Current composition:

``` text
Home
├── Radio Africana logo
├── Promotional Banner Carousel
├── Live artwork / hero
├── Recently Played
└── Latest Story
```

Home supports pull-to-refresh. Refreshing remounts the remotely loaded
Home sections so current banners, artwork, Recently Played and the
latest Story can be refreshed together.

### Promotional Banners

Banners are loaded from the Radio Africana WordPress/API layer and may
provide:

-   Image
-   Alt text
-   Title
-   Subtitle
-   Button text
-   Destination link
-   Link availability

### Live Artwork

The Live Hero displays the current Now Playing artwork. If no artwork is
available, the application uses the bundled default artwork.

### Recently Played

The Home screen retrieves the most recent tracks from the Radio Africana
service and displays up to five tracks horizontally.

### Latest Story

The latest WordPress Story is displayed as part of the Home content.

------------------------------------------------------------------------

# Live Radio and Playback

Live playback is global and is provided through:

``` text
src/playback/
├── PlaybackContext.ts
├── PlaybackProvider.tsx
└── index.ts
```

The playback provider wraps the application navigation tree, allowing
playback state to remain available across navigation.

The public playback interface is:

``` text
isPlaying
nowPlaying
play()
pause()
toggle()
```

### Stream

``` text
https://radioafricana.radioca.st/stream
```

### Playback implementation

The application uses `react-native-video` with:

-   Background playback
-   Playback while inactive
-   Android notification controls
-   Live metadata
-   Current artwork

The video component is visually hidden because the application's own
controls provide the visible playback interface.

### Recovery behaviour

A new player instance is created when playback is started/resumed. This
is also used as the recovery mechanism after a stream error.

``` text
Play
  ↓
Live stream
  ↓
Temporary/network failure
  ↓
Playback stops
  ↓
Play again
  ↓
Fresh player instance
  ↓
Stream reconnects
```

------------------------------------------------------------------------

# Now Playing

Current track information is retrieved from:

``` text
https://radioafricana.com/controllers/playing.php
```

Artwork is resolved from:

``` text
https://radioafricana.com/station/pictures/
```

The application model is:

``` text
NowPlaying
├── artist
├── title
└── picture
```

The global playback provider refreshes Now Playing every five seconds
while it is mounted.

Now Playing information is used by:

-   Live Hero
-   Mini Player
-   Playback metadata
-   Android media controls

------------------------------------------------------------------------

# Mini Player

The Mini Player is implemented in:

``` text
src/components/MiniPlayer.tsx
```

It is rendered globally by:

``` text
src/navigation/index.tsx
```

and positioned above the bottom tab bar.

The Mini Player displays:

-   Current artwork
-   Current track title
-   Current artist
-   Live/Ready state
-   Up Next information
-   Play/Pause control

The current UI refinement makes the artist name visually stronger
through `Inter-SemiBold`, and the Up Next label is also semibold.

The Mini Player retrieves Up Next information from:

``` text
https://radioafricana.com/controllers/queuesong.php
```

and refreshes it every 15 seconds.

> **Pre-build audit note:** the current source styles the Up Next label
> with `Colors.text` rather than `Colors.gold`. If the approved client
> requirement is still "bold and champagne/gold," this should be
> corrected before the final client APK. The source confirms the label
> is bold, but not currently gold.

------------------------------------------------------------------------

# Stories

Stories are connected directly to the Radio Africana WordPress REST API.

The Stories area provides:

-   Latest Stories
-   Featured images
-   Categories
-   Excerpts
-   Paginated loading
-   Pull-to-refresh
-   Empty states
-   Error/retry states
-   Story Detail navigation

The current Story feed requests ten posts per API page.

### Story Detail

A Story Detail screen contains:

-   Back navigation
-   Share action
-   Featured image
-   Category
-   Title
-   Publication date
-   Rich article content
-   Continue Reading
-   Native sharing
-   Persistent Mini Player

Article HTML is rendered natively using `react-native-render-html`.

Supported article styling includes:

-   Paragraphs
-   H2/H3 headings
-   Strong text
-   Italic text
-   Ordered and unordered lists
-   Blockquotes
-   Links
-   Images

### End of Story

The `End of Story` marker belongs to the Story content layer:

``` text
src/screens/Story/components/StoryBody.tsx
```

It is not generated by WordPress Theme Builder and is not part of the
Contact Us, Meet the Team or Privacy Policy screens.

------------------------------------------------------------------------

# More

The More screen is now a native application menu.

Current items:

``` text
Subscribe to Shows
──────────────────
EXPLORE
Contact Us
Meet the Team
Visit Website
──────────────────
APP
Share App
Privacy Policy
App Version
```

There is currently **no Terms & Conditions item**.

The three utility pages that previously depended on the generic
WordPress page route are now dedicated native screens:

``` text
Contact Us       → ContactUsScreen
Meet the Team    → MeetTheTeamScreen
Privacy Policy   → PrivacyPolicyScreen
```

The generic `PageScreen` remains in the source as a reusable
WordPress-page fallback, but it is no longer used for those three More
destinations.

------------------------------------------------------------------------

# Subscribe to Shows

Subscribe to Shows is implemented as a native screen:

``` text
src/screens/Subscribe/SubscribeToShowsScreen.tsx
```

Programme data is loaded from:

``` text
https://radio-africana-dashboard.vercel.app/api/programs
```

Each programme provides:

``` text
id
name
days
time
topic
```

The screen:

-   Loads programmes remotely
-   Sorts programmes by day and time
-   Displays programme schedules
-   Allows topic subscription/unsubscription
-   Uses Firebase topic subscriptions
-   Shows per-programme processing states
-   Provides loading, empty and retry states

Programme names use `Inter-SemiBold` in the current implementation.

------------------------------------------------------------------------

# Contact Us

Contact Us is a fully native screen:

``` text
src/screens/ContactUs/ContactUsScreen.tsx
```

The form is backed by the existing WordPress Contact Form 7
installation.

Current CF7 form ID:

``` text
6452
```

The native app submits to:

``` text
https://radioafricana.com/wp-json/contact-form-7/v1/contact-forms/6452/feedback
```

The current form fields are:

-   Your Name --- required
-   Your Email Address --- required
-   Phone Number --- optional
-   Reason for Contact --- required
-   Subject --- required
-   Your Message --- required
-   Privacy consent --- required

Reasons for contact:

``` text
General Enquiry
Advertising
Partnership
News Tip
Programme Feedback
Technical Support
Other
```

The app performs local validation before submission and also handles
Contact Form 7 server-side validation responses.

Successful submission produces a native success state.

The current contact details exposed by the screen are:

``` text
Email:   info@radioafricana.com
Phone:   +44 74 11 55 5771
Address: M6 5FW, Manchester, United Kingdom
Website: https://radioafricana.com/
```

------------------------------------------------------------------------

# Meet the Team

Meet the Team is a native, WordPress-driven directory:

``` text
src/screens/MeetTheTeam/MeetTheTeamScreen.tsx
src/services/members.ts
```

The application retrieves members from the WordPress members REST
resource.

The app displays:

-   Member image
-   Member name
-   Member role
-   Member biography

### Pagination

The native screen displays **five members per page**.

The service requests one additional record to determine whether a next
page exists:

``` text
5 displayed members
+
1 look-ahead record
=
pagination state
```

The screen provides:

``` text
Previous
Page number
Next
```

### Role handling

The service first checks embedded WordPress term data.

If a usable role is not embedded, it reads the member's public WordPress
profile page and resolves known role labels from that page.

This was introduced because the site's member role information is not
exposed through the assumed `/wp/v2/membertype` REST endpoint.

The service no longer makes that failing REST request.

------------------------------------------------------------------------

# Privacy Policy

Privacy Policy is a native screen:

``` text
src/screens/PrivacyPolicy/PrivacyPolicyScreen.tsx
```

It is not routed through the generic WordPress `PageScreen`.

The current screen contains the Radio Africana privacy-policy content in
a native, scrollable layout with:

-   Native header
-   Back navigation
-   Native typography
-   Section headings
-   Bullet lists
-   Website action where applicable

The previous generic-page issues associated with the WordPress page
rendering path are therefore no longer part of this screen.

------------------------------------------------------------------------

# Push Notifications

Push notifications use:

-   React Native Firebase Messaging
-   Notifee for foreground Android presentation

Implemented behaviour includes:

-   Android 13+ notification permission request
-   FCM token retrieval
-   Token refresh listener
-   Foreground message handling
-   Background notification delivery
-   Closed-app notification delivery
-   Foreground Android notification channel

Foreground channel:

``` text
ID:   radio-africana-foreground
Name: Radio Africana
```

Programme subscriptions use Firebase topics through:

``` text
subscribeToShow()
unsubscribeFromShow()
```

------------------------------------------------------------------------

# WordPress and External Services

## WordPress REST API

Base:

``` text
https://radioafricana.com/wp-json
```

Used for:

``` text
/wp/v2/posts
/wp/v2/pages
/wp/v2/members
/radioafricana/v1/banners
```

## Now Playing

``` text
https://radioafricana.com/controllers/playing.php
```

## Recently Played

``` text
https://radioafricana.com/controllers/recentlyplayed.php
```

## Up Next

``` text
https://radioafricana.com/controllers/queuesong.php
```

## Programme API

``` text
https://radio-africana-dashboard.vercel.app/api/programs
```

## Live Stream

``` text
https://radioafricana.radioca.st/stream
```

------------------------------------------------------------------------

# Navigation

The primary navigation is:

``` text
Home
Stories
More
```

The More stack currently contains:

``` text
More
├── SubscribeToShows
├── ContactUs
├── MeetTheTeam
├── PrivacyPolicy
└── Page
```

The generic `Page` route remains available for future WordPress pages
requiring generic rendering.

Story navigation uses:

``` text
StoryDetail
```

with:

``` text
slug: string
```

as its route parameter.

------------------------------------------------------------------------

# Design System

The current source contains a deliberately small centralized design
system:

``` text
src/constants/
├── colors.ts
└── typography.ts
```

### Colours

``` text
Gold:            #D4AF37
White:           #FFFFFF
Primary text:    #111111
Secondary text:  #666666
Border:          #E5E5E5
Divider:         #EFEFEF
Live status:     #D32F2F
Button text:     #FFFFFF
```

### Typography

Primary font families:

``` text
Lora-Bold
Inter-Regular
Inter-Medium
Inter-SemiBold
```

The centralized typography variants include:

``` text
display
heading1
heading2
heading3
body
bodySmall
label
meta
button
```

------------------------------------------------------------------------

# Source Structure

The current supplied `src` tree is:

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

This tree supersedes the older documentation. In particular, the current
project no longer has the previously documented `constants/index.ts`,
`radius.ts`, `shadows.ts`, or `spacing.ts` files.

------------------------------------------------------------------------

# Development

Install dependencies:

``` bash
npm install
```

Start Metro:

``` bash
npx react-native start
```

Run Android:

``` bash
npx react-native run-android
```

The Android project is contained in:

``` text
android/
```

------------------------------------------------------------------------

# Current Release Workflow

The project is currently at the **client final-test stage**, not yet the
final store-publishing stage.

The intended sequence is:

``` text
Current RC source
      ↓
Documentation updated
      ↓
Git working tree reviewed
      ↓
Commit current completed state
      ↓
Create final client test APK
      ↓
Install on physical Android device
      ↓
Full client regression test
      ↓
Client sign-off
      ↓
Final release-readiness checklist
      ↓
Store/release assets and production build
```

The client test build should be treated as the final acceptance
candidate for the current feature scope.

------------------------------------------------------------------------

# Important Release Boundary

No new feature work should be introduced between the final client test
build and client sign-off unless a test reveals a defect or the client
requests a change.

After sign-off, remaining work should be limited to:

-   Release-readiness verification
-   Required production configuration
-   Store metadata/assets
-   Signing/release configuration
-   Final build verification
-   Necessary defect fixes
-   Final documentation/version updates

------------------------------------------------------------------------

# Repository Hygiene

Before the final client-test commit:

1.  Confirm TypeScript/ESLint is clean.
2.  Confirm no temporary debugging files are tracked.
3.  Confirm the final `src` tree matches this documentation.
4.  Confirm root version metadata.
5.  Review Git status.
6.  Commit the completed application state.
7.  Tag/version the client-test milestone if that is part of the
    repository workflow.
8.  Build the APK from the committed source.

------------------------------------------------------------------------

# Final Client-Test Scope

The final client test should specifically cover:

### Playback

-   Start live radio
-   Pause
-   Resume
-   Mini Player persistence
-   Current artist/title
-   Current artwork
-   Up Next
-   Android media controls
-   Recovery after network interruption

### Home

-   Banners
-   Live artwork
-   Recently Played
-   Latest Story
-   Pull-to-refresh

### Stories

-   Story feed
-   Story pagination/loading
-   Story Detail
-   Rich article rendering
-   End of Story marker
-   Continue Reading
-   Share

### More

-   Subscribe to Shows
-   Contact Us
-   Meet the Team
-   Privacy Policy
-   Visit Website
-   Share App
-   Version display

### Native utility screens

-   Contact form validation and successful submission
-   Team member loading
-   Team role display
-   Five-member pagination
-   Privacy Policy scrolling
-   Back navigation from all three screens

------------------------------------------------------------------------

# Documentation Status

This README is intended to replace the earlier documentation that
described an older source tree and older feature set.

It should be updated again only when the application architecture,
release state, or supported feature set materially changes.
