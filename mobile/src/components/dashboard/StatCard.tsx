/*
|--------------------------------------------------------------------------
| StatCard
|--------------------------------------------------------------------------
|
| Displays a dashboard statistic.
|
| Example:
| 24
| Total Reports
|
*/

import React from "react";
import { View, Text, StyleSheet } from "react-native";

import { Colors, Typography, Spacing, Radius } from "../../constants";

type StatCardProps = {
  value: string;
  title: string;
};

export default function StatCard({
  value,
  title,
}: StatCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.value}>{value}</Text>

      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({

  card: {

    backgroundColor: Colors.white,

    borderRadius: Radius.lg,

    padding: Spacing.lg,

    width: "48%",

    alignItems: "center",

    elevation: 3,

  },

  value: {

    fontSize: 34,

    fontWeight: "700",

    color: Colors.primary,

  },

  title: {

    marginTop: Spacing.sm,

    color: Colors.textSecondary,

    fontSize: Typography.small,

    textAlign: "center",

  },

});