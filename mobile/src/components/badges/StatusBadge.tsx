/*
|--------------------------------------------------------------------------
| StatusBadge Component
|--------------------------------------------------------------------------
|
| A reusable badge that displays the status of a report.
|
| Example:
|
| 🟡 Pending
| 🔵 In Progress
| 🟢 Resolved
| 🔴 Rejected
|
| Instead of creating four different badge components,
| i create one component whose appearance changes
| depending on the status passed to it.
|
*/

import React from "react";

import {
  View,
  Text,
  StyleSheet,
} from "react-native";

import {
  Colors,
  Radius,
  Spacing,
  Typography,
} from "../../constants";

/*
|--------------------------------------------------------------------------
| Union Type
|--------------------------------------------------------------------------
|
| This is the  first TypeScript Union Type.
|
| The status can ONLY be one of these values.
|
| This prevents spelling mistakes.
|
*/

type Status =
  | "pending"
  | "in-progress"
  | "resolved"
  | "rejected";

/*
|--------------------------------------------------------------------------
| Props
|--------------------------------------------------------------------------
*/

type StatusBadgeProps = {
  status: Status;
};

export default function StatusBadge({

  status,

}: StatusBadgeProps) {

  /*
  --------------------------------------------------------------------------
  Decide badge colors and text.

  Depending on the status received,
 i change both the background colour
  and the displayed text.

 i begin with Pending as the default.
  --------------------------------------------------------------------------
  */

  let backgroundColor = "#FEF3C7";
  let textColor = "#D97706";
  let label = "Pending";

  if (status === "in-progress") {

    backgroundColor = "#DBEAFE";
    textColor = "#2563EB";
    label = "In Progress";

  }

  if (status === "resolved") {

    backgroundColor = "#DCFCE7";
    textColor = "#16A34A";
    label = "Resolved";

  }

  if (status === "rejected") {

    backgroundColor = "#FEE2E2";
    textColor = "#DC2626";
    label = "Rejected";

  }

  return (

    <View
      style={[
        styles.badge,

        {
          backgroundColor,
        },
      ]}
    >

      <Text
        style={[
          styles.text,

          {
            color: textColor,
          },
        ]}
      >
        {label}
      </Text>

    </View>

  );

}

const styles = StyleSheet.create({

  badge: {

    alignSelf: "flex-start",

    paddingHorizontal: Spacing.md,

    paddingVertical: Spacing.sm,

    borderRadius: Radius.full,

  },

  text: {

    fontSize: Typography.small,

    fontWeight: "600",

  },

});