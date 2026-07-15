/*
|--------------------------------------------------------------------------
| Settings Screen
|--------------------------------------------------------------------------
*/

import React from "react";

import {
  View,
  Text,
  StyleSheet,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import AppHeader from "../src/components/header/AppHeader";
import ScreenLayout from "../src/components/layout/ScreenLayout";
import ScreenTitle from "../src/components/layout/ScreenTitle";

import {
  Colors,
  Typography,
  Spacing,
  Radius,
} from "../src/constants";

const settings = [

  "Notifications",

  "Dark Mode",

  "Language",

  "Privacy Policy",

  "Terms & Conditions",

  "About",

];

export default function SettingsScreen(){

  return(

    <ScreenLayout>

      <AppHeader
        title="Settings"
      />

      <ScreenTitle
        title="Settings"
        subtitle="Manage your application preferences."
      />

      {settings.map((item)=>(

        <View
          key={item}
          style={styles.item}
        >

          <Text style={styles.text}>
            {item}
          </Text>

          <Ionicons
            name="chevron-forward"
            size={20}
            color={Colors.textSecondary}
          />

        </View>

      ))}

    </ScreenLayout>

  );

}

const styles=StyleSheet.create({

  item:{

    backgroundColor:Colors.white,

    borderRadius:Radius.lg,

    padding:Spacing.lg,

    marginBottom:Spacing.md,

    flexDirection:"row",

    justifyContent:"space-between",

    alignItems:"center",

  },

  text:{

    fontSize:Typography.body,

    color:Colors.text,

  },

});