/*
|--------------------------------------------------------------------------
| Notifications Screen
|--------------------------------------------------------------------------
*/

import React from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";

import AppHeader from "../../src/components/header/AppHeader";
import ScreenLayout from "../../src/components/layout/ScreenLayout";
import ScreenTitle from "../../src/components/layout/ScreenTitle";

import {
  Colors,
  Typography,
  Spacing,
  Radius,
} from "../../src/constants";

// Temporary notification data
const notifications = [

  {
    id: 1,
    title: "Report Submitted",
    message: "Your pothole report has been received.",
    time: "2 minutes ago",
  },

  {
    id: 2,
    title: "Report Assigned",
    message: "Your streetlight report is under review.",
    time: "Yesterday",
  },

  {
    id: 3,
    title: "Report Resolved",
    message: "The illegal dumping report has been resolved.",
    time: "2 days ago",
  },

];

export default function NotificationsScreen() {

  return (

    <ScreenLayout>

      <AppHeader
        title="Mtaa Watch"
      />

      <ScreenTitle
        title="Notifications"
        subtitle="Stay updated on your submitted reports."
      />

      {notifications.map((item) => (

        <View
          key={item.id}
          style={styles.card}
        >

          <Text style={styles.title}>
            🔔 {item.title}
          </Text>

          <Text style={styles.message}>
            {item.message}
          </Text>

          <Text style={styles.time}>
            {item.time}
          </Text>

        </View>

      ))}

    </ScreenLayout>

  );

}

const styles = StyleSheet.create({

  card: {

    backgroundColor: Colors.white,

    borderRadius: Radius.lg,

    padding: Spacing.lg,

    marginBottom: Spacing.md,

  },

  title: {

    fontWeight: "700",

    fontSize: Typography.body,

    color: Colors.text,

  },

  message: {

    marginTop: Spacing.sm,

    color: Colors.textSecondary,

  },

  time: {

    marginTop: Spacing.md,

    color: Colors.textSecondary,

    fontSize: Typography.small,

  },

});