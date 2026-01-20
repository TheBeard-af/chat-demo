# Chat App

## Description

Chat App is a React Native mobile chat application built with Expo.
It allows users to send text messages, share images from their device or camera, and share their current location in real time.
Messages and media are stored using Google Firebase, enabling persistent chat history across devices.

This app was developed as part of a mobile development project focused on communication features, accessibility, and ethical data usage in the CareerFoundry Full-Stack Immersion Program.

---

## Features

- Anonymous user authentication
- Real-time text messaging
- Image sharing from media library
- Photo capture using device camera
- Location sharing with map rendering
- Offline message caching
- Accessible custom action button

---

## Technologies Used

- React Native
- Expo
- React Native Gifted Chat
- Firebase Authentication
- Firebase Firestore
- Firebase Cloud Storage
- Expo ImagePicker
- Expo Location
- React Native Maps

---

## Setup Instructions

### Prerequisites

Ensure the following are installed:

- Node.js (LTS recommended)
- npm
- Expo CLI
- Android Studio (Android Emulator)
- A physical Android device (recommended for camera and location testing)
- Firebase account

To install Expo CLI globally:

npm install -g expo-cli

---

### Installation

1. Clone the repository:

git clone <your-repository-url>
cd chat-app

2. Install dependencies:

npm install

---

## Firebase Configuration

This app uses **Google Firebase** as its backend service.

### Firebase Services Used

- Firebase Authentication (Anonymous sign-in)
- Firestore Database (chat messages and metadata)
- Firebase Cloud Storage (image uploads)

### Configuration Setup

Firebase credentials are added directly in `App.js` using Firebase’s configuration object.

Developers setting up this project must:

1. Create a Firebase project
2. Enable:
   - Anonymous Authentication
   - Firestore Database
   - Firebase Storage
3. Replace the Firebase configuration object in `App.js` with their own project credentials

Sensitive Firebase credentials should not be committed to public repositories.

---

## Environment Variables (Optional)

If using Google Maps for location rendering, an API key may be required.

Optionally create a `.env` file in the project root:

GOOGLE_MAPS_API_KEY=your_api_key_here

This key is used only for map rendering and does not affect chat functionality.

---

## Running the App

To run the app on Android:

npx expo run:android

This will:

- Build the app
- Install it on an Android emulator or connected physical device
- Start the Metro bundler

For physical devices, Android Wireless Debugging can be used to enable hot reloading.

---

## Permissions

The app requests the following permissions at runtime:

- Media Library access (image selection)
- Camera access (photo capture)
- Location access (location sharing)

Permissions are requested only when required and handled using Expo APIs.

---

## Known Issues

- Tapping an image message opens a blank modal due to Gifted Chat’s default image viewer behavior.
  This does not affect image rendering or storage.
- Location sharing on the Android emulator requires manually setting mock coordinates.
- Deprecation warnings related to Expo libraries originate from upstream updates and do not affect functionality.

---

## 🤖 AI Usage Disclosure

AI tools were used to assist with drafting and structuring documentation.
All content was reviewed, edited, and verified for accuracy by the author.
