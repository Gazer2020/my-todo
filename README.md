# Todo App

A cross-platform (Web & Android) modern Todo application built with React Native, Expo, NativeWind (TailwindCSS v4), and Firebase.

## Features

- **Offline-First Capabilities**: Seamless Firestore offline persistence via Android Native SDK (SQLite) and Web IndexedDB.
- **Realtime Sync**: Optimistic updates and instant cloud synchronization when reconnected.
- **Modern UI**: Full NativeWind v4 styling with consistent layouts across platforms.
- **Composite Sorting**: Tasks are automatically sorted by `due_date` and `priority`.
- **Advanced Interactions**:
  - Tags support for detailed task categorization.
  - Native gesture-driven Swipe-to-Delete functionality.
- **Production Ready**: Prepared for EAS APK builds with injected environment configs.

## Tech Stack

- **Framework**: Expo Router / React Native
- **Styling**: NativeWind v4 / TailwindCSS
- **Database**: Firebase Firestore (`@react-native-firebase/firestore` + `firebase` JS SDK)
- **Animations/Gestures**: `react-native-reanimated` & `react-native-gesture-handler`

## Getting Started

### Prerequisites
- Node.js LTS
- Firebase Project configured (Web + Android apps)
- Provided `.env` and `google-services.json` at root

### Run Locally

1. Install dependencies
   ```bash
   npm install
   ```

2. Start the Expo Dev Server
   ```bash
   # Run for Web
   npm run web

   # Run on Android Emulator / Device
   npx expo run:android
   ```

### Build Android APK

To build a standalone installable APK via Expo Application Services (EAS):
```bash
npx eas-cli login
npx eas-cli build -p android --profile preview
```
