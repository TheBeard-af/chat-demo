# Chat App

## Description

Chat App is a React Native mobile chat application built with Expo.
It allows users to send text messages, share images from their device or camera, and share their current location in real time.
Messages and media are stored using Google Firebase, enabling persistent chat history across devices.
The app was developed as part of a mobile development project focused on communication features, accessibility, and ethical data usage.

## Features

- Anonymous user authentication
- Real-time text messaging
- Image sharing from media library
- Photo capture using device camera
- Location sharing with map rendering
- Offline message caching
- Accessible custom action button

## Technologies Used

- React Native
- Expo (development build)
- React Native Gifted Chat
- Firebase Authentication
- Firebase Firestore
- Firebase Cloud Storage
- Expo ImagePicker
- Expo Location
- React Native Maps

## Setup Instructions

### Prerequisites

- Node.js (LTS recommended)
- Expo CLI
- Android Studio (Android Emulator)
- A physical Android device (recommended for testing camera and location)
- Firebase account

### Installation & Configuration

- Install project dependencies:

  ```bash
  npm install
  ```

- Create a Firebase project and enable:

  - Anonymous Authentication
  - Firestore Database
  - Firebase Storage

- Add your Firebase configuration to `App.js`.

- (Optional) Create a `.env` file for your Google Maps API key:
  ```env
  GOOGLE_MAPS_API_KEY=your_api_key_here
  ```

### Running the App

- Run the app using a development build:

  ```bash
  npx expo run:android
  ```

- This installs the app on an Android emulator or connected physical device and starts the Metro bundler.
- To enable hot reloading over Wi‑Fi on a physical device, Android Wireless Debugging can be used.

## Firebase Configuration

- Firestore is used to store chat messages, image URLs, and location data.
- Firebase Storage is used to store uploaded images.
- Firestore and Storage rules were configured to allow read/write access for development purposes.

## Permissions

The app requests the following permissions at runtime:

- Media Library access (for selecting images)
- Camera access (for taking photos)
- Location access (for sharing current location)

Permissions are handled using Expo APIs and are requested only when required.

## Known Issues

- Tapping an image message opens a blank modal due to Gifted Chat’s default image viewer behavior.
  This does not affect image rendering or storage and is a known library limitation.
- Location sharing from the Android emulator requires manually setting mock coordinates.
- Deprecation warnings related to `expo-image-picker` and `SafeAreaView` originate from library updates and do not affect functionality.
