/*
|--------------------------------------------------------------------------
| EmptyState Component
|--------------------------------------------------------------------------
|
| This component is displayed whenever there is no data available.
|
| Examples:
|
| • No reports
| • No notifications
| • No search results
|
| Rather than leaving the screen blank, we give users a helpful message.
|
*/

import React from "react";

import {
  View,
  Text,
  StyleSheet,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

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
| icon
|   -> Icon displayed above the message.
|
| title
|   -> Main heading.
|
| message
|   -> Description shown below the title.
|
*/

type EmptyStateProps = {

  icon: keyof typeof Ionicons.glyphMap;

  title: string;

  message: string;

};

export default function EmptyState({

  icon,

  title,

  message,

}: EmptyStateProps) {

  return (

    <View style={styles.container}>

      {/* Icon */}

      <Ionicons
        name={icon}
        size={70}
        color={Colors.textSecondary}
      />

      {/* Title */}

      <Text style={styles.title}>
        {title}
      </Text>

      {/* Description */}

      <Text style={styles.message}>
        {message}
      </Text>

    </View>

  );

}

const styles = StyleSheet.create({

  container: {

    justifyContent: "center",

    alignItems: "center",

    padding: Spacing.xxl,

  },

  title: {

    marginTop: Spacing.lg,

    fontSize: Typography.h3,

    fontWeight: "700",

    color: Colors.text,

  },

  message: {

    marginTop: Spacing.sm,

    textAlign: "center",

    color: Colors.textSecondary,

    fontSize: Typography.body,

    lineHeight: 24,

  },

});