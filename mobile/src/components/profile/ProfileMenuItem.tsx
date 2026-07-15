/*
|--------------------------------------------------------------------------
| Profile Menu Item
|--------------------------------------------------------------------------
|
| Reusable row used on the Profile screen.
|
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

type ProfileMenuItemProps = {

  icon: keyof typeof Ionicons.glyphMap;

  title: string;

  onPress: () => void;

  danger?: boolean;

};

export default function ProfileMenuItem({

  icon,

  title,

  onPress,

  danger = false,

}: ProfileMenuItemProps){

  return(

    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
    >

      <View style={styles.left}>

        <Ionicons

          name={icon}

          size={22}

          color={danger ? "red" : Colors.primary}

        />

        <Text
          style={[
            styles.title,
            danger && { color: "red" },
          ]}
        >

          {title}

        </Text>

      </View>

      <Ionicons

        name="chevron-forward"

        size={20}

        color={Colors.textSecondary}

      />

    </TouchableOpacity>

  );

}

const styles = StyleSheet.create({

  container:{

    backgroundColor:Colors.white,

    borderRadius:Radius.lg,

    padding:Spacing.lg,

    marginBottom:Spacing.md,

    flexDirection:"row",

    justifyContent:"space-between",

    alignItems:"center",

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