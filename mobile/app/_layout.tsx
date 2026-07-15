/*
|--------------------------------------------------------------------------
| Root Navigation
|--------------------------------------------------------------------------
|
| The Stack navigator controls screen transitions and enables
| native back gestures on iOS and Android.
|
*/

import { Stack } from "expo-router";

export default function RootLayout() {

  return (

    <Stack

      screenOptions={{

        // We use our own AppHeader
        headerShown: false,

        // Native iOS push animation
        animation: "ios_from_right",

        // Enables swipe-to-go-back on iPhone
        gestureEnabled: true,

        // Swipe from the left edge
        fullScreenGestureEnabled: true,

      }}

    />

  );

}