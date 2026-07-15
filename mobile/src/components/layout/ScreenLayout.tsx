/*
|--------------------------------------------------------------------------
| ScreenLayout
|--------------------------------------------------------------------------
|
| PURPOSE
|
| This component provides a consistent layout for every screen
| in the Mtaa Watch application.
|
| Instead of repeating the same SafeAreaView, ScrollView,
| background colour and padding in every screen,
| we place them here once and reuse them.
|
| BENEFITS
|
| ✓ Consistent spacing across the app
| ✓ Correct Safe Area handling on iPhone & Android
| ✓ Optional scrolling
| ✓ Less repeated code
| ✓ Easier maintenance
|
*/

import React from "react";

import {
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

import {
  Colors,
  Spacing,
} from "../../constants";

/*
|--------------------------------------------------------------------------
| Props
|--------------------------------------------------------------------------
|
| children
| --------
| The screen content placed between:
|
| <ScreenLayout>
|      ...
| </ScreenLayout>
|
| scroll
| ------
| Determines whether the screen should scroll.
|
| true  -> Uses ScrollView
| false -> Uses a normal View
|
*/

type ScreenLayoutProps = {

  children: React.ReactNode;

  scroll?: boolean;

};

export default function ScreenLayout({

  children,

  scroll = true,

}: ScreenLayoutProps) {

  /*
  |--------------------------------------------------------------------------
  | Scrollable Screen
  |--------------------------------------------------------------------------
  |
  | Most screens (forms, lists, dashboard)
  | require scrolling.
  |
  | If scroll=true, wrap everything inside
  | a ScrollView.
  |
  */

  const insets = useSafeAreaInsets();

  if (scroll) {

    return (

      <SafeAreaView style={styles.safeArea}>

        <ScrollView

          contentContainerStyle={[

    styles.scrollContent,

    {
        paddingTop: insets.top + Spacing.sm,
    },

]}

          showsVerticalScrollIndicator={false}

          keyboardShouldPersistTaps="handled"

        >

          {children}

        </ScrollView>

      </SafeAreaView>

    );

  }

  /*
  |--------------------------------------------------------------------------
  | Fixed Screen
  |--------------------------------------------------------------------------
  |
  | Some screens (Splash Screen, Welcome Screen)
  | don't need scrolling.
  |
  | In those cases we simply use a normal View.
  |
  */

  return (

    <SafeAreaView style={styles.safeArea}>

      <View
    style={[

        styles.content,

        {
            paddingTop: insets.top + Spacing.sm,
        },

    ]}
>
        {children}

      </View>

    </SafeAreaView>

  );

}

/*
|--------------------------------------------------------------------------
| Styles
|--------------------------------------------------------------------------
*/

const styles = StyleSheet.create({

  /*
  --------------------------------------------------------------------------
  Safe Area

  Ensures content never overlaps:

  • iPhone notch
  • Dynamic Island
  • Android status bar
  --------------------------------------------------------------------------
  */

  safeArea: {

    flex: 1,

    backgroundColor: Colors.background,

  },

  /*
  --------------------------------------------------------------------------
  Scroll Layout

  Used when scroll=true.

  flexGrow allows short screens to fill
  the available height while still allowing
  scrolling on long screens.
  --------------------------------------------------------------------------
  */

  scrollContent: {

    flexGrow: 1,

    paddingHorizontal: Spacing.lg,

    paddingTop: Spacing.md,

    paddingBottom: Spacing.xxl,

  },

  /*
  --------------------------------------------------------------------------
  Fixed Layout

  Used when scroll=false.
  --------------------------------------------------------------------------
  */

  content: {

    flex: 1,

    paddingHorizontal: Spacing.lg,

    paddingTop: Spacing.md,

    paddingBottom: Spacing.lg,

  },
  
  tabBarStyle: {

    height: 75,

    paddingBottom: 12,

    paddingTop: 8,

    borderTopLeftRadius: 20,

    borderTopRightRadius: 20,

    position: "absolute",

}

});