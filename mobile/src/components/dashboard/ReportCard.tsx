/*
|--------------------------------------------------------------------------
| ReportCard
|--------------------------------------------------------------------------
|
| Displays a summary of a reported incident.
|
*/

import React from "react";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import AppCard from "../cards/AppCard";
import StatusBadge from "../badges/StatusBadge";

import {
  Colors,
  Typography,
  Spacing,
} from "../../constants";

type ReportCardProps = {

  title: string;

  location: string;

  date: string;

  status: "pending" | "resolved" | "in-progress" | "rejected";

  onPress?:()=>void;

};

export default function ReportCard({

  title,

  location,

  date,

  status,

  onPress,

}: ReportCardProps) {

  return (

  <TouchableOpacity

    activeOpacity={0.8}

    onPress={onPress}

  >

    <AppCard>

      {/* Report title */}

      <Text style={styles.title}>

        {title}

      </Text>

      {/* Current report status */}

      <View style={{ marginVertical: Spacing.sm }}>

        <StatusBadge status={status} />

      </View>

      {/* Footer */}

      <View style={styles.footer}>

        <View>

          <Text style={styles.info}>

            📍 {location}

          </Text>

          <Text style={styles.info}>

            🕒 {date}

          </Text>

        </View>

        <Ionicons

          name="chevron-forward"

          size={22}

          color={Colors.primary}

        />

      </View>

    </AppCard>

  </TouchableOpacity>

);

}

const styles = StyleSheet.create({

  title: {

    fontSize: Typography.body,

    fontWeight: "700",

    color: Colors.text,

  },

  info: {

    marginTop: Spacing.xs,

    color: Colors.textSecondary,

  },

  footer: {

  flexDirection: "row",

  justifyContent: "space-between",

  alignItems: "center",

  marginTop: Spacing.md,

},
});