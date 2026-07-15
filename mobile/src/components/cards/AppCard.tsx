/*
|--------------------------------------------------------------------------
| AppCard Component
|--------------------------------------------------------------------------
|
| A reusable container for displaying content.
|
| This component provides:
| • Rounded corners
| • White background
| • Padding
| • Shadow
| • Consistent spacing
|
| It accepts ANY content through the children prop.
|
*/

import React from "react";

import {
  View,
  StyleSheet,
  ViewStyle,
} from "react-native";

import {
  Colors,
  Radius,
  Spacing,
} from "../../constants";

/*
|--------------------------------------------------------------------------
| Props
|--------------------------------------------------------------------------
|
| children
|   -> Whatever we place inside the card.
|
| style
|   -> Optional additional styling.
|
*/

type AppCardProps = {
  children: React.ReactNode;
  style?: ViewStyle;
};

export default function AppCard({

  children,

  style,

}: AppCardProps) {

  return (

    <View
      style={[
        styles.card,
        style,
      ]}
    >
      {children}
    </View>

  );

}

const styles = StyleSheet.create({

  card: {

    backgroundColor: Colors.white,

    borderRadius: Radius.lg,

    padding: Spacing.lg,

    marginBottom: Spacing.md,

    /*
    ----------------------------------------------------
    Shadow (iOS)
    ----------------------------------------------------
    */

    shadowColor: "#000",

    shadowOffset: {
      width: 0,
      height: 2,
    },

    shadowOpacity: 0.08,

    shadowRadius: 8,

    /*
    ----------------------------------------------------
    Shadow (Android)
    ----------------------------------------------------
    */

    elevation: 3,

  },

});