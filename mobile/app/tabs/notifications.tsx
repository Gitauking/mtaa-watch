/*
|--------------------------------------------------------------------------
| Notifications Screen
|--------------------------------------------------------------------------
|
| Displays notifications for the logged-in user.
| Notifications are fetched from the backend whenever this screen
| comes into focus.
|
*/

import React, {
  useState,
  useCallback,
} from "react";

import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

import { useFocusEffect } from "@react-navigation/native";

import AppHeader from "../../src/components/header/AppHeader";
import ScreenLayout from "../../src/components/layout/ScreenLayout";
import ScreenTitle from "../../src/components/layout/ScreenTitle";

import { getNotifications } from "../../src/services/notificationService";

import {
  Colors,
  Typography,
  Spacing,
  Radius,
} from "../../src/constants";

export default function NotificationsScreen() {

  /*
  |--------------------------------------------------------------------------
  | State
  |--------------------------------------------------------------------------
  */

  // type as any[] to avoid TS "never" inference for empty initial array
  const [notifications, setNotifications] = useState<any[]>([]);

  const [loading, setLoading] = useState(false);

  /*
  |--------------------------------------------------------------------------
  | Load Notifications
  |--------------------------------------------------------------------------
  */

  const loadNotifications = async () => {

    try {

      setLoading(true);

      console.log("================================");
      console.log("Loading Notifications...");
      console.log("================================");

      const data = await getNotifications();

      console.log("Notifications Loaded:");
      console.log(data);

      setNotifications(data);

    } catch (error) {

      console.error("Failed to load notifications.");
      console.error(error);

    } finally {

      setLoading(false);

    }

  };

  /*
  |--------------------------------------------------------------------------
  | Refresh whenever screen is focused
  |--------------------------------------------------------------------------
  */

  useFocusEffect(

    useCallback(() => {

      loadNotifications();

    }, [])

  );

  return (

    <ScreenLayout>

      <AppHeader
        title="Mtaa Watch"
      />

      <ScreenTitle
        title="Notifications"
        subtitle="Stay updated on your submitted reports."
      />

      {
        loading ? (

          <ActivityIndicator
            size="large"
            color={Colors.primary}
          />

        ) : notifications.length === 0 ? (

          <View style={styles.emptyContainer}>

            <Text style={styles.emptyText}>

              You don't have any notifications yet.

            </Text>

          </View>

        ) : (

          notifications.map((item) => (

            <View
              key={item.id}
              style={[
                styles.card,
                !item.is_read && styles.unreadCard,
              ]}
            >

              <Text style={styles.title}>

                🔔 {item.title}

              </Text>

              <Text style={styles.message}>

                {item.message}

              </Text>

              <Text style={styles.time}>

                {new Date(item.created_at).toLocaleString()}

              </Text>

            </View>

          ))

        )
      }

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

  /*
  --------------------------------------------------------------------------
  Highlight unread notifications
  --------------------------------------------------------------------------
  */

  unreadCard: {

    borderLeftWidth: 4,

    borderLeftColor: Colors.primary,

  },

  title: {

    fontWeight: "700",

    fontSize: Typography.body,

    color: Colors.text,

  },

  message: {

    marginTop: Spacing.sm,

    color: Colors.textSecondary,

    lineHeight: 22,

  },

  time: {

    marginTop: Spacing.md,

    color: Colors.textSecondary,

    fontSize: Typography.small,

  },

  emptyContainer: {

    alignItems: "center",

    justifyContent: "center",

    marginTop: 80,

  },

  emptyText: {

    color: Colors.textSecondary,

    fontSize: Typography.body,

    textAlign: "center",

  },

});