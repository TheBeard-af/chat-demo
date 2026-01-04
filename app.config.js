export default {
  expo: {
    name: "chat-demo",
    slug: "chat-demo",
    android: {
      package: "com.afaqnadeem.chatdemo",
      config: {
        googleMaps: {
          apiKey: process.env.GOOGLE_MAPS_API_KEY,
        },
      },
    },
    plugins: [
      [
        "expo-image-picker",
        {
          photosPermission:
            "Allow this app to access your photos so you can share images in chat.",
          cameraPermission:
            "Allow this app to access your camera so you can take photos in chat.",
        },
      ],
    ],
  },
};
