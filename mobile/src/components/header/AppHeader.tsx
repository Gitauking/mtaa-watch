/*
|--------------------------------------------------------------------------
| AppHeader Component
|--------------------------------------------------------------------------
|
| This component displays the header at the top of each screen.
|
| Features:
|
| ✓ Screen title
| ✓ Optional back button
| ✓ Optional right icon
| ✓ Safe area support
|
| Later, every screen in the application will use this component.
|
*/

import { router } from "expo-router";
import React from "react";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

/*
|--------------------------------------------------------------------------
| SafeAreaView

Keeps our content below the phone notch or Dynamic Island.

Without it, content may overlap the status bar.
|--------------------------------------------------------------------------
*/

import { SafeAreaView } from "react-native-safe-area-context";

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
| title
|   -> Screen title
|
| showBackButton
|   -> Show or hide the back arrow
|
| rightIcon
|   -> Optional icon displayed on the right
|
| onBackPress
|   -> Function executed when the back button is pressed
|
| onRightPress
|   -> Function executed when the right icon is pressed
|
*/

type AppHeaderProps = {

  title: string;

  showBackButton?: boolean;

  rightIcon?: keyof typeof Ionicons.glyphMap;

  onBackPress?: () => void;

  onRightPress?: () => void;

};

export default function AppHeader({

  title,

  showBackButton = false,

  rightIcon,

  onBackPress,

  onRightPress,

}: AppHeaderProps) {

  return (

    <SafeAreaView edges={["top"]}>

      <View style={styles.container}>

        {/*----------------------------------------------------------
            Left Section
        ----------------------------------------------------------*/}

        <View style={styles.leftSection}>

          {showBackButton && (

            <TouchableOpacity
              onPress={

            onBackPress ??

    (() => router.back())

}
            >

              <Ionicons
                name="arrow-back"
                size={26}
                color={Colors.text}
              />

            </TouchableOpacity>

          )}

        </View>

        {/*----------------------------------------------------------
            Title
        ----------------------------------------------------------*/}

        <Text style={styles.title}>

          {title}

        </Text>

        {/*----------------------------------------------------------
            Right Section
        ----------------------------------------------------------*/}

        <View style={styles.rightSection}>

          {rightIcon && (

            <TouchableOpacity
              onPress={onRightPress}
            >

              <Ionicons
                name={rightIcon}
                size={24}
                color={Colors.text}
              />

            </TouchableOpacity>

          )}

        </View>

      </View>

    </SafeAreaView>

  );

}

const styles = StyleSheet.create({

  container: {

    flexDirection: "row",

    alignItems: "center",

    justifyContent: "space-between",

    paddingHorizontal: Spacing.lg,

    paddingVertical: Spacing.md,

    backgroundColor: Colors.white,

  },

  leftSection: {

    width: 40,

    justifyContent: "center",

    alignItems: "flex-start",

  },

  title: {

    flex: 1,

    textAlign: "center",

    fontSize: Typography.h3,

    fontWeight: "700",

    color: Colors.text,

  },

  rightSection: {

    width: 40,

    justifyContent: "center",

    alignItems: "flex-end",

  },

});