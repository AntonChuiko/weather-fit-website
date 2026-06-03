# Weather Fit - Product Documentation

**Last Updated:** May 31, 2026

**Platforms:** iPhone, iPad, Apple Watch

**Minimum iOS Version:** iOS 16+

**Supported Languages:** 14 languages

---

## Table of Contents

1. Product Overview
2. Business Model
3. Onboarding Flow
4. Core Features
5. Settings & Configuration
6. Platform Extensions
7. Monetization

---

## Product Overview

### What is Weather Fit?

Weather Fit is an iOS weather app that provides outfit recommendations based on weather conditions. The app combines weather forecasting with personalized clothing suggestions to help users dress appropriately for current and upcoming weather.

### App Structure

The app consists of three main tabs accessible via bottom navigation:

1. **Locations** - Manage saved locations
2. **Weather** - Main weather forecast view (default)
3. **Settings** - App configuration and customization

### Key Differentiators

- Personalized character that changes outfits based on weather
- Customizable wardrobe with clothing preferences
- Visual weather representation with dynamic backgrounds

---

## Business Model

### Pricing Tiers

**Free Tier:**

- Full weather forecasts (hourly, daily, statistics)
- Morning and afternoon outfit recommendations
- Limited clothing items (max 2 per subcategory)
- Single landscape option (City)
- One Home Screen widget option (Conditions - minimal)
- iCloud Sync for data backup and multi-device sync

**Premium Subscription:**

- All features from free tier
- Unlimited clothing items and customization
- All 4 landscape options (City, Mountains, Sea, Village)
- All Home Screen widgets (10 types)
- All Lock Screen widgets (19 variations)
- Apple Watch app with complications
- Weather Maps (precipitation radar)

### Subscription Options

- **Annual:** $19.99/year (98% of revenue)
- **Monthly:** $3.99/month
- **Lifetime:** $99.99 one-time

### Trial System

- Free trial available for eligible users
- Trial eligibility: never purchased subscription, never used trial
- Trial shown during onboarding if eligible
- Can skip trial and use free tier

---

## Onboarding Flow

**Trigger:** First app launch after installation

### Flow Structure

The onboarding consists of 3-4 steps:

1. Welcome Screen
2. Character Selection
3. Location Services
4. Paywall (conditional - shown only if trial eligible)

---

### Step 1: Welcome Screen

**Visual Elements:**

- App icon and name
- Illustration: two characters under umbrella with village background

**User Actions:**

- Primary CTA button → Proceeds to character selection
- Links to Terms of Use and Privacy Policy (open in-app, without leaving the app)

---

### Step 2: Character Selection

**Skin Tone Selection:**

- 6 skin tone options
- Arranged in 2 rows of 3
- Selected tone highlighted with blue border
- Range from lightest to darkest

**Character Type Selection:**

- 2 character options (male and female appearance)
- Both shown with default clothing (jacket)
- Side-by-side display
- Updates based on selected skin tone

**User Actions:**

- Skip button → proceeds with default character
- Making selections → automatically proceeds to next step

---

### Step 3: Location Services

**Purpose:** Request location permission or manual location selection

**Visual:**

- Large location icon

**User Actions:**

**Option A: Enable Location**

- "Next" button → Triggers iOS location permission dialog
- iOS Permission Options:
    - Allow Once
    - Allow While Using App
    - Don't Allow

**Option B: Manual Location Selection**

- "Choose Location" button → Opens location search
- Search interface:
    - Search bar with X to close
    - Results show: location name, region/country (e.g., "Chicago, Illinois, United States")
    - Keyboard for input
    - Globe icon at bottom
- Selecting location → proceeds to next step

---

### Step 4: Paywall (Conditional)

**Display Conditions:**

- User never purchased subscription AND
- User never used trial AND
- User has trial eligibility

**If Conditions Met:**

- Shows paywall (same as in-app paywall)
- User can subscribe or skip

**User Actions:**

- Subscribe → Premium subscriber → Main app
- Skip/Close → Free tier user → Main app

**If Conditions Not Met:**

- Skip this step entirely → Main app

---

### Onboarding Completion

User arrives at Weather tab showing forecast for:

- Selected location (if manually chosen), OR
- Current location (if permission granted), OR
- Default location

---

## Core Features

### 1. Weather Forecast

Main screen accessed via Weather tab. Displays multiple sections in vertical scroll:

### 1.1 Overview Section

**Purpose:** Hero section with current weather and outfit visualization

**Display Elements:**

**Header Information:**

- Location name (e.g., "Zielonki")
- Time context (e.g., "Tomorrow Afternoon", "Now, 16:25")
- Weather condition (e.g., "Sunny", "Clear")
- Large temperature display
- Feels Like temperature

**Visual Components:**

*Character Display:*

- Personalized character wearing weather-appropriate clothing
- Outfit changes based on weather conditions
- Examples: coat and scarf for cold, sunglasses for sunny weather

*Dynamic Background:*

- Landscape type based on user's selection for location
- 4 landscape options: City, Mountains, Sea, Village (Premium: all 4, Free: City only)
- Color scheme varies by time of day (blue for day, darker for evening/night)
- Animated weather effects (snow, rain, etc.)

*Time Indicator:*

- Sun/moon icon in top right showing time of day

**Time Period Navigation:**

- Dots at bottom allow switching between 4 time periods:
    - Morning
    - Afternoon
    - Evening
    - Night
- Swipe to change time period
- All visual elements update accordingly (character outfit, background, weather data)

**Top Bar Actions:**

- Map icon (top left) → Weather Maps (Premium only)
- Share button (top right) → Share weather snapshot

---

### 1.2 Share Feature

**Access:** Share button in Overview section

**Functionality:**

- Generates shareable image of current Overview display
- Captures weather information and character visualization
- Uses currently active time period

**Image Format Options:**

- Portrait (vertical orientation)
- Square (optimized for social media)

**Workflow:**

1. Navigate to desired time period in Overview
2. Tap share button
3. Select orientation
4. Choose sharing destination via iOS share sheet:
    - Save to Photos
    - Instagram Stories
    - Messages
    - AirDrop
    - Other iOS share options

**Image Contents:**

- Location name
- Time context
- Weather condition
- Temperature
- Feels Like temperature
- Character with outfit
- Background scenery

---

### 1.3 Weather Maps (Premium Feature)

**Access:** Map icon (top left of Overview section)

**Display:**

- Full-screen interactive map (MapKit)
- Precipitation overlay (rain and snow) for the selected time
- Pin annotation for the selected location
- Rainbow.ai attribution link (bottom right)

**Controls:**

- Close button (X) in top right
- Play/Pause button (bottom left) for animating through forecast frames
- Timeline slider at bottom for scrubbing through the 1-hour precipitation forecast
- Slider labels: "Now", "+30", "+60" minutes
- Time label showing current forecast offset
- Loading indicator while tiles load

**Legend:**

- Two gradient bars shown at top left: Rain and Snow
- Rain gradient: light blue (none) → blue → purple → pink → yellow (heavy)
- Snow gradient: light cyan (none) → cyan → blue → dark blue (heavy)

**Precipitation Forecast Timeline:**

- Range: Now → +60 minutes (1-hour forecast)
- Frame interval: 10 minutes (7 discrete frames)
- Animation: smooth 60fps crossfade playback over ~2.5 seconds per cycle
- Scrubbing the slider pauses animation and shows selected frame

**Data Availability:**

- Coverage varies by region; a banner is shown when forecast data is unavailable or limited in the visible map area
- Rate limit banner shown if daily API quota is reached

**Technical:** Uses Rainbow.ai precipitation tile API

**Availability:** Premium subscribers only

---

### 1.4 Alerts Section

**Display Conditions:** Only visible when weather alerts are active

**Alert Types:** Low temperature alerts, severe weather warnings, etc.

**Main View:**

- Alert preview displayed in feed
- Tappable to view details

**Alert Detail View:**

- Alert title (e.g., "Moderate Low Temperature")
- Issued date and time
- Expiration date and time
- Summary description with full details
- Close button (X) in top right

---

### 1.5 Next Hour Precipitation

**Display:**

- Precipitation intensity forecast for next 60 minutes
- Minute-by-minute breakdown
- Visual graph showing precipitation likelihood

---

### 1.6 Hourly Forecast

**Main Display (for each hour):**

- Time
- Weather icon
- Temperature
- Precipitation probability (blue bar below temperature)

**Interaction:** Tappable to open detailed view

**Hourly Detail View:**

- Horizontal scrollable timeline at top
- Selected hour highlighted with border
- Detailed information for selected hour:
    - Weather condition name
    - Full date and time
    - Temperature & Feels Like
    - UV Index with description
    - Wind speed, direction, and gusts
    - Humidity & Dew Point
    - Visibility with description
    - Pressure with trend indicator
    - Rain amount (mm)
    - Cloud Cover percentage
- Swipe left/right to view other hours
- Close button (X) in top right

---

### 1.7 Daily Forecast

**Main Display (for each day):**

- Day of week
- Day of month
- Maximum temperature
- Minimum temperature
- Weather icon
- Precipitation probability

**Interaction:** Tappable to open detailed view

**Daily Detail View:**

- Full date at top (e.g., "Monday, 19 Jan")
- Weather icon and condition name
- High and low temperatures
- Grid of additional metrics (2 columns):
    - Rain (mm)
    - Wind (speed & direction)
    - Sunrise time
    - Sunset time
    - UV Index
    - Moon Phase
- Scrollable to view multiple days
- Close button (X) in top right

---

### 1.8 Weather Statistics

**Layout:** 2-column grid similar to native iPhone Weather app

**Row 1:**

- **UV Index:** Numerical value, color-coded scale, description level, forecast for rest of day
- **Sun:** Circular daylight indicator with hours of daylight, sunrise time, sunset time, sun position icon

**Row 2:**

- **Wind:** Compass display with wind speed (m/s), direction, gusts, description level
- **Air Quality:** AQI value, color-coded scale, quality description level, activity recommendation. Data comes from the nearest official monitoring station within 30 km; if none is in range, the app falls back to the closest community/citizen-sensor station within 30 km, located purely by coordinates (not by place name). Shows "No station nearby" only when no station of either kind is within 30 km; shows "No Data" when the air-quality service is unavailable or returns no result.

**Row 3:**

- **Moon Phase:** Visual icon, phase name (e.g., "Waxing Crescent"), illumination percentage
- **Pressure:** Gauge display, value in millibars (mb), trend indicator (rising/falling/steady), Low/High labels

**Row 4:**

- **Humidity:** Gauge showing percentage, scale from Dry to Moist, dew point temperature
- **Visibility:** Distance value (e.g., "4.4 km"), visual range indicator, description level

---

### 2. Locations Management

Accessed via Locations tab. Contains three main sections:

### 2.1 Search

**Position:** Top of screen

**Functionality:**

- Search for any location worldwide
- Powered by Mapbox API

**Interaction Flow:**

1. User types location in search bar
2. Results appear showing location name and region/country
3. User taps location from results
4. Location automatically added to Recents
5. App switches to Weather tab
6. Weather displayed for selected location

---

### 2.2 Current Location

**Display Conditions:** Only visible when location permission granted

**Shows for All Users:**

- Current location name
- Local time for location

**Premium Users Also See:**

- Weather preview with:
    - Temperature
    - Feels Like temperature
    - Weather icon
    - High/Low temperatures

**Interaction:** Tappable → Switches to Weather tab for this location

---

### 2.3 Favorites

**Purpose:** User-curated list of preferred locations

**How to Add:** Tap heart icon next to location in Recents section

**Shows for All Users:**

- Location name
- Local time

**Premium Users Also See:**

- Weather preview (same as Current Location)

**Management:**

- Reorderable via drag handles
- Swipe left to reveal Delete button
- Tapping location → Switches to Weather tab

---

### 2.4 Recents

**Purpose:** Auto-populated list of recently viewed locations

**Population Logic:**

- Automatically adds locations when viewed in Weather tab
- Maintains chronological order (most recent first)

**Shows for All Users:**

- Location name
- Local time

**Premium Users Also See:**

- Weather preview (same as Current Location)

**Management:**

- Heart icon to add to Favorites
- Swipe left to reveal Delete button
- Tapping location → Switches to Weather tab

---

## Settings & Configuration

### Settings Structure

Accessed via Settings tab. Contains following sections:

1. General
2. Subscription/Paywall
3. Character
4. Clothing
5. Landscapes
6. Widgets (informational)
7. Apple Watch (informational)
8. Contact Support
9. Rate in App Store
10. About

---

### 3.1 General Settings

**Access:** Settings > General

General settings control app-wide preferences for units, display, forecast display, layout, and accessibility.

### Units

**Access:** General > Units

Configure measurement units for weather data display.

**Available Unit Settings:**

**Temperature:**

- Celsius (°C)
- Fahrenheit (°F)

**Wind:**

- Meters per second (m/s)
- Kilometers per hour (km/h)
- Miles per hour (mph)
- Knots (kn)
- Beaufort scale (bft)

**Pressure:**

- Millibars (mb)
- Inches of mercury (inHg)
- Millimeters of mercury (mmHg)
- Hectopascals (hPa)

**Distance:**

- Kilometers (km)
- Miles (mi)

---

### Display

**Appearance:**

- Automatic (follows system setting)
- Light (force light mode)
- Dark (force dark mode)

**Language:**

- System language or manual selection
- 14 languages available (see Appendix for full list)

---

### Forecast

**Data Point:**
Determines which temperature value to display in hourly/daily forecasts.

**Available Options:**

- Feels Like (default) - Apparent temperature
- Clothing - Temperature used for outfit algorithm
- Wind - Wind speed
- Gusts - Wind gust speed
- UV Index - UV radiation level
- Humidity - Humidity percentage
- Dew Point - Dew point temperature
- Pressure - Atmospheric pressure
- Visibility - Visibility distance
- None - Show only actual temperature

**Number of Dayparts:**
Controls how many time period segments shown in Today forecast section.

**Options:**

- 4, 8, 12 dayparts
- Default: 12

**Number of Hours:**
Controls how many hours shown in Hourly Forecast section.

**Options:** 24, 48, 72, All Available. Default: All Available.

**Number of Days:**
Controls how many days shown in Daily Forecast section.

**Options:** 3, 5, 7, 10, All Available. Default: All Available.

---

### Layout

**Arrange Sections:**
Customize order and visibility of sections in Weather forecast view.

**Available Sections:**

- Overview (always visible, cannot be hidden or reordered)
- Alerts
- Next-Hour Precipitation
- Hourly Forecast
- Daily Forecast
- Weather Details

**Functionality:**

- Drag handles to reorder sections
- Red minus icon to hide section
- Sections can be shown/hidden individually
- Order persists across app sessions

**Arrange Weather Details:**
Customize order and visibility of statistics cards in Weather Details section.

**Available Detail Cards:**

- UV Index
- Sun
- Wind
- Air Quality
- Moon Phase
- Pressure
- Humidity
- Visibility

**Functionality:**

- Drag handles to reorder cards
- Red minus icon to hide card
- Cards can be shown/hidden individually
- Order persists across app sessions

---

### Accessibility

**Haptics:**
Toggle switch to enable/disable haptic feedback throughout the app.

**Options:**

- On (default) - Haptic feedback enabled for interactions
- Off - No haptic feedback

---

### iCloud Sync

**Purpose:** Backup and restore user data when setting up a new device. Also synchronizes data across multiple devices using iCloud.

**Interface:**

- Toggle switch: "Sync with iCloud"
- Last sync timestamp (e.g., "Last sync: 2 minutes ago")

**Synced Data:**

- Character customization (gender, skin tone, hairstyle, hair color, facial hair)
- Wardrobe items, wear preferences, and comfort level
- Weather settings (units, forecast preferences, layout)
- Locations (favorites, recents, current location*)
- App preferences (haptics, appearance mode)

*Current location only syncs if not already set on device

**Enabling Sync:**

**If No Cloud Data:**
- Uploads device data to iCloud
- Displays "Sync Enabled" toast

**If Cloud Data Exists:**
- Alert: "Data from another device is already in iCloud. Which data would you like to keep?"
- Options:
    - Download from iCloud (overwrites local)
    - Upload from This Device (overwrites cloud)
    - Cancel

**Automatic Syncing:**

- Uploads: When app closes
- Downloads: Real-time from other devices
- Silent background operation

**Disabling Sync:**

- Stops automatic sync
- Cloud data remains stored
- Displays "Sync Disabled" toast

**Availability:** Free & Premium users

### 3.2 Subscription/Paywall

**Access:** Settings > Subscription (or triggered from premium features)

**Display Components:**

**Character Visual:**

- Full character display with seasonal outfit
- Weather-appropriate clothing
- Dynamic background

**Pricing Plans:**

- Annual subscription (most prominent)
- Monthly subscription
- Lifetime purchase
- Pricing clearly displayed for each option
- Selected plan highlighted

**Features List:**

- Unlimited Clothing
- All Landscapes
- All Widgets
- Apple Watch App
- Weather Maps

**Trial Information:**

- Trial duration and terms displayed
- Automatic billing info after trial
- Clear pricing after trial period

**Actions:**

- Primary CTA button for selected plan
- Plan switcher buttons
- Close button (X) in top right
- Restore Purchases link
- Links to Terms of Use and Privacy Policy

**Entry Points:**

- Settings > top section
- Tapping locked premium features
- During onboarding (if trial eligible)
- Attempting to add premium-only widget

---

### 3.3 Character Customization

**Access:** Settings > Character

### Gender Selection

- Male character option
- Female character option
- Affects character appearance and default clothing preferences

### Skin Tone Selection

- 6 skin tone options
- Same options as onboarding
- Range from lightest to darkest
- Selected tone highlighted with blue border

### Hairstyle Selection

**Male Character Hairstyles:**

1. Straight Short
2. Wavy Short
3. Curly Short
4. Buzz Cut
5. Fade
6. Long Hair
7. Bald

**Female Character Hairstyles:**

1. Straight Long
2. Wavy Long
3. Curly Long
4. Bob
5. Pixie Cut
6. Ponytail
7. Bun

**Hair Color Options:**

- Natural colors: Black, Brown shades, Blonde shades, Red, Gray, White
- Vibrant colors: Purple, Pink, Blue, Green, etc.

### Facial Hair (Male Characters Only)

- None
- Stubble
- Short Beard
- Long Beard
- Mustache
- Goatee

---

### 3.4 Clothing Customization

**Access:** Settings > Clothing

### Wardrobe Categories

**Main Categories:**

**Tops:**

- Dresses
- T-Shirts
- Shirts
- Sweaters

**Bottoms:**

- Pants
- Shorts
- Skirts

**Outerwear:**

- Light Jackets
- Winter Jackets

**Accessories:**

- Scarves
- Beanies
- Gloves
- Umbrellas
- Sunglasses

**Footwear:**

- Shoes
- Sandals
- Boots

### Navigation Flow

**Main Screen:**

- 5 category cards with icons
- Tap category → View subcategories

**Category View:**

- Tabs for subcategories
- Current items displayed
- Plus icon to add new items

**Adding Items:**

- Plus icon → Opens clothing shop
- Browse all available items in subcategory
- Item detail view shows:
    - Character preview wearing item
    - Color palette selector
    - Brightness slider (for color adjustment)
    - Add or Unlock button (Premium required for unlimited)

**Existing Items:**

- Character preview wearing item
- Remove button
- No color editing after adding

### Free vs Premium Limits

**Free Tier:**

- Limited items
- Maximum 2 items per subcategory
- Can be: 2 different styles OR 1 style in 2 colors

**Premium Tier:**

- Unlimited items
- All clothing options unlocked

**Exceeding Free Limit:**

- Modal appears when attempting to add beyond limit
- Prompts upgrade to Premium

---

### Comfort Level Adjustment

**Purpose:** Adjust temperature sensitivity of outfit algorithm

**Interface:**

- Slider from -8°C to +8°C
- Default: 0°C (center position)
- Left side: Stay Cooler
- Right side: Stay Warmer

**Functionality:**

- Adjusts temperature threshold for clothing recommendations
- Example: T-shirt normally recommended at 22°C
    - With +8°C adjustment → T-shirt at 30°C
    - With -8°C adjustment → T-shirt at 14°C
- Affects all outfit recommendations globally

---

### Preferred Clothing Items

**Purpose:** Enable/disable specific clothing types

**Interface:** Toggle switches for each item type

**Available Toggles:**

- Gloves
- Scarves
- Beanies
- Sandals
- Shorts
- Dresses
- Sunglasses
- Skirts

**Functionality:**

- Disabled items never appear in outfit recommendations
- Regardless of weather conditions
- Character will not wear disabled items

**Default Settings:**

- Female characters: All items ON
- Male characters: Dresses and Skirts OFF

---

### Apple Watch Sync

**Purpose:** Sync wardrobe configuration to Apple Watch

**Requirements:**

- Apple Watch paired with iPhone
- Both apps must be open during sync

**Direction:** One-way sync from iPhone → Apple Watch

**Configuration Location:** Clothing settings only available on iPhone

**Visibility:** Only shown when Apple Watch is paired

---

### Reset Wardrobe

**Access:** Three-dot menu (top right of Clothing screen)

**Action:** Reset Wardrobe option

**Functionality:**

- Resets all clothing selections to factory defaults
- Removes all user-added items
- Restores default wardrobe configuration

---

### 3.5 Landscapes Customization

**Access:** Settings > Landscapes

**Purpose:** Customize background scenery in Overview section per location

**Navigation:**

- Main screen shows list of user's locations
- Each location shows current landscape preview
- Tap location → View landscape options

**Landscape Selection View:**

- Location name, time, weather condition, temperature, feels like
- Character in weather-appropriate outfit
- Full background scenery preview
- Swipe through 4 landscape types
- Pagination dots show current selection

**Available Landscapes:**

1. **City** (Free & Premium)
    - Urban cityscape background
2. **Mountains** (Premium only)
    - Mountain scenery background
3. **Sea** (Premium only)
    - Beach/coastal background
4. **Village** (Premium only)
    - Rural/suburban background

**Free vs Premium:**

- Free: City only (other landscapes locked with premium badge)
- Premium: All 4 landscapes, unique selection per location

---

### 3.6 Widgets (Informational)

**Access:** Settings > Widgets

**Purpose:** Informational guide about adding widgets

**Content:**

**Visual Previews:**

- Screenshots of Home Screen widgets
- Screenshots of Lock Screen widgets

**Instructions:**

*Home Screen Widget Instructions (4 steps):*

1. Long press on Home Screen
2. Tap + icon in top corner
3. Search for Weather Fit
4. Select widget size and add

*Lock Screen Widget Instructions (5 steps):*

1. Long press on Lock Screen
2. Tap Customize
3. Select Lock Screen to edit
4. Tap widget area
5. Search for Weather Fit and add

**Widget Examples Show:**

- Location name
- Time periods
- Temperatures
- Character with outfit

**Note:** Premium feature only (full functionality)

---

### 3.7 Apple Watch (Informational)

**Access:** Settings > Apple Watch

**Purpose:** Informational guide about Apple Watch app

**Content:**

**Watch App Previews:**

- Screenshots of Weather Fit on Apple Watch
- Main watch face: character with outfit, location, temperature, feels like, weather condition
- Detail view: precipitation forecast, time period breakdown

**Features:**

- Current weather with character in outfit
- Temperature and Feels Like
- Weather condition
- Precipitation forecast
- Time period breakdowns (Morning, Afternoon, Evening, Overnight)
- Complications for watch faces

**Adding Complications Instructions (4 steps):**

1. Touch and hold watch face, tap Edit
2. Swipe left to end (complications shown on last screen)
3. Tap complication, turn Digital Crown to choose new one
4. Press Digital Crown to save, tap face to switch

**Availability:** Premium subscribers only

---

### 3.8 Contact Support

**Access:** Settings > Contact Support

**Purpose:** Submit support requests

**Contact Methods:**

**Email:** [hi@weatherfit.com](mailto:hi@weatherfit.com) (tappable link)

**Contact Form:**

- Name field (text input)
- Email field (text input)
- Message field (large text area)
- Send button (submits to support team)

**Navigation:** Back button in top left

---

### 3.9 Rate in App Store

**Access:** Settings > Rate in App Store

**Functionality:**

- Opens native iOS App Store review sheet (StoreKit API)
- Pre-filled app information:
    - App icon
    - App name: "Weather Fit: Wearing Smart"
    - Subtitle: "Outfit Suggestion & Forecast"
- 5-star rating selector
- Optional title and review text fields
- User nickname displayed
- Submit and cancel options

---

### 3.10 About

**Access:** Settings > About

**Content:**

**App Information:**

- Weather Fit app icon (large display)
- App name
- Current version number

**Follow Us:**

- Instagram link → Opens Weather Fit Instagram profile
- X (Twitter) link → Opens Weather Fit X/Twitter profile

**Legal:**

- Terms of Use → Opens terms document
- Privacy Policy → Opens privacy document

**Support Ukraine:**

- Donate via United24 link
- Ukrainian flag icon
- Links to United24 donation platform

**Navigation:** Back button in top left, all links open in-app browser or external apps

## Platform Extensions

### 4.1 Home Screen Widgets (iOS)

Weather Fit provides 10 widget styles for iOS Home Screen.

### Widget Types

**1. Conditions (with character) - Small**

- Location name
- Current temperature
- Feels Like temperature
- Weather condition with icon
- Character wearing weather-appropriate outfit
- **Availability:** Premium only

**2. Conditions (with temperature range) - Small**

- Location name
- Current temperature
- Weather condition icon
- High/Low temperature range (e.g., ↑-3° ↓-11°)
- **Availability:** Premium only

**3. Conditions (minimal) - Small**

- Location name
- Current temperature
- Feels Like temperature
- Weather condition with icon
- No character
- **Availability:** Free & Premium

**4. Conditions (detailed) - Medium**

- Location name and current temperature
- Weather condition icon and Feels Like
- Character with outfit
- Additional metrics: Wind, Moon phase, Humidity, Sunrise time
- **Availability:** Premium only

**5. Daily Forecast - Medium**

- Location name and current temperature
- Weather condition icon
- 5-day forecast with day names, weather icons, high/low temperatures
- Character with outfit
- **Availability:** Premium only

**6. Today - Medium**

- Location name and current temperature
- Weather condition icon
- Time period breakdown (Evening, Overnight, Morning, Afternoon)
- Temperature for each period with icons
- Character with outfit
- **Availability:** Premium only

**7. Hourly Forecast - Medium**

- Location name and current temperature
- Weather condition icon
- Hourly forecast showing next several hours
- Hour, weather icon, and temperature for each hour
- Character with outfit
- **Availability:** Premium only

**8. Hourly Forecast (compact) - Small**

- Location name and current temperature
- Weather condition icon
- Next 4 hours with icons and temperatures
- Precipitation probability shown in blue
- **Availability:** Premium only

**9. Daily Forecast (compact) - Small**

- Location name and current temperature
- Weather condition icon
- Next 4 days with weather icons, high/low temperatures
- **Availability:** Premium only

**10. Conditions (comprehensive) - Large**

- Location name, current temperature, Feels Like
- Weather condition with icon
- Character with outfit
- Detailed metrics (Wind, Moon, Humidity, Sunrise)
- Hourly forecast for next 8+ hours
- Daily forecast for next 4+ days
- **Availability:** Premium only

---

### Widget Configuration

**Automatic Updates:**

- All widgets update automatically with current weather data
- Character outfit reflects wardrobe settings from app

**Customization:**

- Long-press widget → Edit Widget

**Background Options:**

*Weather Conditions (Default):*

- Dynamic background changes based on:
    - Cloud coverage (clear, partly cloudy, cloudy)
    - Time of day (light during day, dark at night)
- Automatically adjusts colors

*Static Colors:*

- Multiple solid color options
- Various preset color choices

**Widget Actions:**

- Tapping any widget opens Weather Fit app

---

### Free Tier Widget Behavior

**Free Users:**

- Only Widget #3 (Conditions - minimal) available
- Other widgets locked

**Premium Widget Placeholder (for free users):**

- Widget shows app icon
- Does not display weather data
- Tapping opens app/paywall

**Premium Users:**

- All 10 widget styles unlocked
- Full customization available

---

### 4.2 Lock Screen Widgets (iOS 16+)

Weather Fit provides widgets for iOS Lock Screen customization.

### Inline Widgets (Above Clock)

Single line of text displayed above the lock screen clock.

**Available Types:**

1. **Location** - Temperature and location name (e.g., "-6° Zielonki")
2. **UV Index** - UV value and level
3. **Wind** - Wind speed and direction (e.g., "0 m/s E")
4. **Humidity** - Humidity percentage
5. **Moon Phase** - Moon phase name (e.g., "Waxing Crescent")
6. **Sun** - Sunrise/sunset time
7. **Precipitation** - Precipitation probability

---

### Circular/Rectangular Widgets (Below Clock)

Larger widgets with visual graphics displayed below the lock screen clock.

**Available Types:**

**1. Conditions**

- Multiple display variations:
    - With text: temperature, weather condition, clothing recommendation text
    - With clothing icons: temperature with row of clothing item icons
    - With temperature range: current temp with high/low range

**2. Today**

- Time periods with temperatures
- Shows: Evening, Overnight, Morning, Afternoon
- Weather icon and temperature for each period

**3. Hourly Forecast**

- Next 5 hours with icons and temperatures
- Hour numbers, weather icons, temperature for each hour

**4. Daily Forecast**

- Next 3 days with forecast
- Day names, weather icons, high and low temperatures

**5. Clothing (circular with icon)**

- Circular widget showing temperature
- Clothing item icon in center

**6. Conditions (circular with gauge)**

- Circular gauge showing temperature
- Moon/sun icon in center
- Temperature displayed around gauge

**7. Temperature**

- Circular gauge with temperature range
- Current temperature in center
- High and low range shown

**8. UV Index**

- Circular gauge showing UV index value
- UV value in center with sun icon

**9. Sun**

- Sunrise/sunset icon with time
- Sunrise icon with upward arrow
- Time display

**10. Wind**

- Wind direction and speed
- Direction abbreviation (e.g., "ESE")
- Speed value and unit (e.g., "0 M/S")

**11. Humidity**

- Circular gauge with humidity percentage
- Percentage in center with humidity icon

**12. Moon Phase**

- Moon phase icon
- Visual representation of current moon phase

---

### Lock Screen Widget Configuration

**Selection Interface:**

- Widget category names shown on second line in selection menu
- First line shows preview of what appears above clock
- Examples of categories: Conditions, Today, Hourly Forecast, Temperature, etc.

**Automatic Updates:**

- All widgets update automatically with current weather data
- Character outfit reflects wardrobe settings from app

**Widget Actions:**

- Tapping any widget opens Weather Fit app

**Availability:** Premium subscribers only

- Free users see premium required placeholder on Lock Screen

---

### 4.3 Apple Watch App

**Availability:** Premium subscribers only

**Main Features:**

- Current weather with character in outfit
- Temperature and Feels Like
- Weather condition
- Precipitation forecast
- Time period breakdowns (Morning, Afternoon, Evening, Overnight)

**Complications:**

- Available for various watch face complication slots
- Show weather at a glance
- Tap to open full app

**Syncing:**

- Wardrobe configuration syncs from iPhone
- One-way sync: iPhone → Apple Watch
- Both apps must be open during sync
- Clothing customization only on iPhone

---

## Appendix

### Platform Compatibility

**Supported Platforms:**

- iPhone
- iPad
- Apple Watch

**System Requirements:**

- iOS 16 or later
- iPadOS 16 or later
- watchOS 10 or later

### Language Support

Weather Fit is available in 14 languages:

- English
- Dutch
- French
- German
- Italian
- Japanese
- Korean
- Polish
- Portuguese (Brazil)
- Simplified Chinese
- Spanish
- Traditional Chinese
- Turkish
- Ukrainian

### Technical Details

**APIs & Services:**

- Weather Data: Apple Weather
- Air Quality: WAQI / AQICN
- Maps: Rainbow.ai for Weather Maps (precipitation radar)
- Location Search: Mapbox API
- Development: iOS (UIKit/SwiftUI)

