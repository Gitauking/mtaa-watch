/*
|--------------------------------------------------------------------------
| Splash Screen
|--------------------------------------------------------------------------
|
| This is the first screen users see when opening the app.
|
| Responsibilities:
|
| • Display the app logo
| • Display the application name
| • Display a short description
| • Automatically navigate to the Welcome Screen
|
*/

import React, { useEffect } from "react";

import {
  View,
  Text,
  Image,
  StyleSheet,
} from "react-native";

import { router } from "expo-router";

import LoadingIndicator from "../src/components/loading/LoadingIndicator";

import {
  Colors,
  Typography,
  Spacing,
} from "../src/constants";

export default function SplashScreen() {

  /*
  --------------------------------------------------------------------------
  useEffect

  Runs once when the screen loads.

  We use it to automatically move to the Welcome Screen
  after two seconds.
  --------------------------------------------------------------------------
  */

  useEffect(() => {

    const timer = setTimeout(() => {

      router.replace("/auth/welcome");

    }, 2000);

    return () => clearTimeout(timer);

  }, []);

  return (

    <View style={styles.container}>

      {/* App Logo */}

      <Image

        source={require("../assets/logo/logo.png")}

        style={styles.logo}

        resizeMode="contain"

      />

      {/* App Name */}

      <Text style={styles.title}>

        Mtaa Watch

      </Text>

      {/* Short Description */}

      <Text style={styles.subtitle}>

        Community Incident Reporting
        {"\n"}
        & Response System

      </Text>

      <LoadingIndicator
        message="Loading..."
      />

    </View>

  );

}

const styles = StyleSheet.create({

  container: {

    flex: 1,

    justifyContent: "center",

    alignItems: "center",

    backgroundColor: Colors.background,

    padding: Spacing.lg,

  },

  logo: {

    width: 130,

    height: 130,

    marginBottom: Spacing.lg,

  },

  title: {

    fontSize: Typography.h1,

    fontWeight: "700",

    color: Colors.primary,

    marginBottom: Spacing.sm,

  },

  subtitle: {

    textAlign: "center",

    fontSize: Typography.body,

    color: Colors.textSecondary,

    marginBottom: Spacing.xxl,

    lineHeight: 24,

  },

});