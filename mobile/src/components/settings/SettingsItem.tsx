/*
|--------------------------------------------------------------------------
| Settings Item
|--------------------------------------------------------------------------
*/

import React from "react";

import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import {
  Colors,
  Typography,
  Spacing,
  Radius,
} from "../../constants";

type SettingsItemProps = {

  icon: keyof typeof Ionicons.glyphMap;

  title: string;

  onPress: () => void;

};

export default function SettingsItem({

  icon,

  title,

  onPress,

}: SettingsItemProps) {

  return (

    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
    >

      <View style={styles.left}>

        <Ionicons
          name={icon}
          size={22}
          color={Colors.primary}
        />

        <Text style={styles.title}>
          {title}
        </Text>

      </View>

      <Ionicons
        name="chevron-forward"
        size={18}
        color={Colors.textSecondary}
      />

    </TouchableOpacity>

  );

}

const styles = StyleSheet.create({

  container:{

    flexDirection:"row",

    justifyContent:"space-between",

    alignItems:"center",

    backgroundColor:Colors.white,

    padding:Spacing.lg,

    marginBottom:Spacing.md,

    borderRadius:Radius.lg,

  },

  left:{

    flexDirection:"row",

    alignItems:"center",

  },

  title:{

    marginLeft:Spacing.md,

    fontSize:Typography.body,

    color:Colors.text,

  },

});