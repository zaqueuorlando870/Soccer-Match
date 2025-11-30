# Soccer Match Up

A React Native mobile application built with Expo that helps players discover nearby soccer matches, confirm their participation, and track match statistics. The app supports multiple user roles including players, organizers, field managers, and administrators.

## Features

### Player Features
- **Match Discovery**: Browse and discover nearby soccer matches
- **Match Management**: View match details, confirm participation, and track your matches
- **Player Feed**: Stay updated with match feeds and activity
- **Profile Management**: Manage your player profile and preferences
- **Notifications**: Receive real-time notifications about matches and updates

### Organizer Features
- **Match Organization**: Create and manage soccer matches
- **Player Management**: Manage player participation and confirmations
- **Match Scheduling**: Schedule matches and handle logistics

### Field Manager Features
- **Field Management**: Manage soccer fields and availability
- **Facility Details**: Maintain field information and capacity details
- **Booking Management**: Handle field bookings and reservations

### Admin Features
- **System Administration**: Administrative controls and settings
- **User Management**: Manage users across the platform
- **System Configuration**: Configure app-wide settings

## Tech Stack

- **Framework**: React Native with Expo
- **Language**: TypeScript
- **Navigation**: 
  - React Navigation (Native Stack & Bottom Tabs)
  - Native Stack Navigator for screen transitions
  - Bottom Tab Navigator for role-based navigation
- **UI Components**:
  - Expo Vector Icons (Ionicons)
  - Expo Linear Gradient
  - Safe Area Context
- **Styling**: React Native StyleSheet with custom theme system

## Project Structure

```
├── assets/                          # App icons, images, and assets
├── src/
│   ├── screens/                     # Screen components
│   │   ├── AdminScreen.tsx
│   │   ├── FieldDetailScreen.tsx
│   │   ├── FieldManagerScreen.tsx
│   │   ├── MatchDetailScreen.tsx
│   │   ├── OrganizerScreen.tsx
│   │   ├── PlayerFeedScreen.tsx
│   │   ├── PlayerNotificationsScreen.tsx
│   │   ├── PlayerProfileScreen.tsx
│   │   └── PlayerScreen.tsx
│   ├── theme/                       # App theming
│   │   └── AppTheme.ts
│   ├── types/                       # TypeScript type definitions
│   │   └── index.ts
│   └── mockData.ts                  # Mock data for development
├── App.tsx                          # Main app component with navigation
├── index.ts                         # Entry point
├── app.json                         # Expo configuration
├── package.json                     # Dependencies
└── tsconfig.json                    # TypeScript configuration
```

## Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd Soccer\ match
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm start
   ```

## Running the App

### iOS
```bash
npm run ios
```

### Android
```bash
npm run android
```

### Web
```bash
npm run web
```

### Expo Go (Any Platform)
```bash
npm start
```
Then scan the QR code with Expo Go app on your mobile device.

## Key Components

### Navigation Structure

The app uses a stack-based navigation structure:

1. **Authentication Stack**:
   - Onboarding Screen
   - Login Screen
   - Register Screen

2. **Main Tabs** (role-based):
   - **Player Role**: Feed, Matches, Profile tabs
   - **Organizer Role**: Organizer tab
   - **Field Manager Role**: Field Manager tab
   - **Admin Role**: Admin tab

3. **Detail Screens**:
   - Match Detail Screen
   - Field Detail Screen
   - Player Notifications Screen

### Theme System

The app implements a custom theme system with:
- Centralized color palette
- Theme context for global theme access
- Support for light/dark mode (currently using dark theme)

### Type Definitions

Key types include:
- `Match`: Represents a soccer match with teams, time, and league info
- `Team`: Team information including name and logo
- `League`: League details with name and icon
- `RootStackParamList`: TypeScript types for all navigation routes
- `RootTabParamList`: TypeScript types for tab navigation

## Development

### Mock Data
The project includes mock data in `src/mockData.ts` for development and testing purposes.

### Code Style
- TypeScript for type safety
- React Functional Components with Hooks
- Responsive design using React Native's Flexbox

### Custom Tab Navigation
The app features custom animated tab icons with:
- Scale animation on tab focus
- Color transition between active and inactive states
- Smooth spring animation effects

## Dependencies

### Core Dependencies
- `react@19.1.0` - React library
- `react-native@0.81.5` - React Native framework
- `expo~54.0.25` - Expo platform
- `@react-navigation/native@^7.1.21` - Navigation library
- `@react-navigation/native-stack@^7.7.0` - Stack navigation
- `@react-navigation/bottom-tabs@^7.8.6` - Tab navigation

### UI Libraries
- `@expo/vector-icons@^15.0.3` - Icon library
- `expo-linear-gradient@~15.0.7` - Gradient component
- `react-native-safe-area-context@^5.6.2` - Safe area handling

### Development Dependencies
- `typescript~5.9.2` - TypeScript compiler
- `@types/react~19.1.0` - React type definitions

## Configuration

### app.json
Expo configuration file containing:
- App name: "Soccer Match Up"
- Slug: "soccer-match-up"
- Platform-specific settings for iOS and Android
- Splash screen and app icon configuration

### tsconfig.json
TypeScript configuration for strict type checking and modern JavaScript support.

## Scripts

- `npm start` - Start Expo development server
- `npm run ios` - Run on iOS simulator/device
- `npm run android` - Run on Android emulator/device
- `npm run web` - Run in web browser

## Contributing

1. Create a new branch for your feature
2. Make your changes
3. Test thoroughly on multiple platforms
4. Submit a pull request with a clear description

## License

This project is private. All rights reserved.

## Support

For issues, questions, or feature requests, please contact the development team.

---

**App Name**: Soccer Match Up  
**Version**: 1.0.0  
**Status**: Active Development
