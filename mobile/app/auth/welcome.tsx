/*
|--------------------------------------------------------------------------
| Welcome Screen
|--------------------------------------------------------------------------
|
| This is the first interactive screen users see after the Splash Screen.
|
| Responsibilities:
|
| • Welcome the user
| • Introduce the app
| • Navigate to Login or Register
|
*/

import React from "react";

import {
  View,
  Image,
  StyleSheet,
} from "react-native";

import { router } from "expo-router";

// Reusable Components
import PrimaryButton from "../../src/components/buttons/PrimaryButton";
import SecondaryButton from "../../src/components/buttons/SecondaryButton";
import ScreenLayout from "../../src/components/layout/ScreenLayout";
import ScreenTitle from "../../src/components/layout/ScreenTitle";

// Design System
import {
  Spacing,
} from "../../src/constants";

export default function WelcomeScreen() {

  /*
  --------------------------------------------------------------------------
  Navigation Functions
  --------------------------------------------------------------------------

  These functions take the user to the appropriate authentication screen.
  */

  const goToRegister = () => {
    router.push("/auth/register");
  };

  const goToLogin = () => {
    router.push("/auth/login");
  };

  return (

    /*
    ------------------------------------------------------------------------
    ScreenLayout

    This component provides:

    • Safe Area
    • Consistent padding
    • Background colour
    • Correct layout on different devices

    Since the Welcome screen doesn't need scrolling,
    we set scroll={false}.
    ------------------------------------------------------------------------
    */

    <ScreenLayout scroll={false}>

      {/*--------------------------------------------------------------
          Top Section
      --------------------------------------------------------------*/}

      <View style={styles.topSection}>

        {/* App Logo */}

        <Image
          source={require("../../assets/logo/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />

        {/*--------------------------------------------------------------
            Screen Title

            Instead of manually styling Text components,
            we now use our reusable ScreenTitle component.

            This ensures every screen has the same typography.
        --------------------------------------------------------------*/}

        <ScreenTitle

          title="Welcome to Mtaa Watch"

          subtitle="Report incidents in your community and help build safer neighbourhoods."

        />

      </View>

      {/*--------------------------------------------------------------
          Illustration

          We'll replace this placeholder with a proper
          Kenyan-inspired illustration later.
      --------------------------------------------------------------*/}

      <View style={styles.middleSection}>

        <Image

          // source={require("../../assets/images/welcome.png")}

          style={styles.image}

          resizeMode="contain"

        />

      </View>

      {/*--------------------------------------------------------------
          Bottom Buttons
      --------------------------------------------------------------*/}

      <View>

        <PrimaryButton

          title="Get Started"

          onPress={goToRegister}

        />

        <View style={{ height: Spacing.md }} />

        <SecondaryButton

          title="Sign In"

          onPress={goToLogin}

        />

        <View style={{ height: Spacing.lg }} />

      </View>

    </ScreenLayout>

);
}

const styles = StyleSheet.create({

  /*
  --------------------------------------------------------------------------
  Top Section

  Holds the application logo and title.

  alignItems: "center"
  keeps everything horizontally centered.
  --------------------------------------------------------------------------
  */

  topSection: {

    alignItems: "center",

    marginTop: Spacing.lg,

  },

  /*
  --------------------------------------------------------------------------
  Logo
  --------------------------------------------------------------------------
  */

  logo: {

    width: 120,

    height: 120,

    marginBottom: Spacing.lg,

  },

  /*
  --------------------------------------------------------------------------
  Illustration Section
  --------------------------------------------------------------------------
  */

  middleSection: {

    flex: 1,

    justifyContent: "center",

    alignItems: "center",

  },

  /*
  --------------------------------------------------------------------------
  Illustration Image
  --------------------------------------------------------------------------
  */

  image: {

    width: 300,

    height: 260,

  },

});