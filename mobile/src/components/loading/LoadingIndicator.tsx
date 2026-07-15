/*
|--------------------------------------------------------------------------
| LoadingIndicator Component
|--------------------------------------------------------------------------
|
| This component displays a loading spinner with an optional message.
|
| Example Uses:
|
| • Logging in
| • Registering a user
| • Uploading images
| • Loading reports
| • Refreshing data
|
| By creating one reusable component, we keep the loading
| experience consistent throughout the app.
|
*/

import React from "react";

import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
} from "react-native";

import {
  Colors,
  Typography,
  Spacing,
} from "../../constants";

/*
|--------------------------------------------------------------------------
| Props
|--------------------------------------------------------------------------
|
| message
| -> Optional text displayed below the spinner.
|
*/

type LoadingIndicatorProps = {
  message?: string;
};

export default function LoadingIndicator({

  message = "Loading...",

}: LoadingIndicatorProps) {

  return (

    <View style={styles.container}>

      {/* Spinner */}

      <ActivityIndicator

        size="large"

        color={Colors.primary}

      />

      {/* Loading message */}

      <Text style={styles.text}>

        {message}

      </Text>

    </View>

  );

}

const styles = StyleSheet.create({

  container: {

    justifyContent: "center",

    alignItems: "center",

    padding: Spacing.xl,

  },

  text: {

    marginTop: Spacing.md,

    fontSize: Typography.body,

    color: Colors.textSecondary,

  },

});