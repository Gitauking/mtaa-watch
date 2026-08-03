/*
|--------------------------------------------------------------------------
| Profile Screen
|--------------------------------------------------------------------------
*/

import React, { useState, useCallback } from "react";

import {
  View,
  Text,
  StyleSheet,
  Alert,
} from "react-native";

import { router } from "expo-router";

import { Ionicons } from "@expo/vector-icons";

import { useFocusEffect } from "@react-navigation/native";

import AppHeader from "../../src/components/header/AppHeader";
import ScreenLayout from "../../src/components/layout/ScreenLayout";
import ScreenTitle from "../../src/components/layout/ScreenTitle";
import ProfileMenuItem from "../../src/components/profile/ProfileMenuItem";

import {
  getCurrentUser,
  logout as logoutUser,
} from "../../src/services/authService";

import {
  Colors,
  Typography,
  Spacing,
  Radius,
} from "../../src/constants";

type User = {
  first_name: string;
  last_name: string;
  email: string;
};

/*
|--------------------------------------------------------------------------
| Navigation
|--------------------------------------------------------------------------
*/

const goToSettings = () => {

  router.push("/settings");

};

const goToEditProfile = () => {

  router.push("/profile/edit-profile");

};

const goToHelp = () => {

  router.push("/profile/help-support");

};

export default function ProfileScreen() {

  const [user, setUser] = useState<User | null>(null);

  /*
  |--------------------------------------------------------------------------
  | Load Cached User
  |--------------------------------------------------------------------------
  */

  const loadUser = async () => {

    try {

      const currentUser = await getCurrentUser();

      setUser(currentUser);

    } catch (error) {

      console.error("Failed to load user:", error);

    }

  };

  /*
  |--------------------------------------------------------------------------
  | Refresh whenever screen is focused
  |--------------------------------------------------------------------------
  */

  useFocusEffect(

    useCallback(() => {

      loadUser();

    }, [])

  );

  /*
  |--------------------------------------------------------------------------
  | Logout
  |--------------------------------------------------------------------------
  */

  const logout = () => {

    Alert.alert(

      "Logout",

      "Are you sure you want to logout?",

      [

        {

          text: "Cancel",

          style: "cancel",

        },

        {

          text: "Logout",

          style: "destructive",

          onPress: async () => {

            await logoutUser();

            router.replace("/auth/welcome");

          },

        },

      ]

    );

  };

  return (

    <ScreenLayout>

      <AppHeader title="Mtaa Watch" />

      <ScreenTitle
        title="Profile"
        subtitle="Manage your account."
      />

      {/* ------------------------------------------------------------------ */}
      {/* Profile Card */}
      {/* ------------------------------------------------------------------ */}

      <View style={styles.profileCard}>

        <View style={styles.avatar}>

          <Ionicons
            name="person"
            size={50}
            color={Colors.primary}
          />

        </View>

        <Text style={styles.name}>

          {user
            ? `${user.first_name} ${user.last_name}`
            : "Loading..."}

        </Text>

        <Text style={styles.email}>

          {user?.email || ""}

        </Text>

      </View>

      {/* ------------------------------------------------------------------ */}
      {/* Menu Items */}
      {/* ------------------------------------------------------------------ */}

      <ProfileMenuItem

        icon="person-circle-outline"

        title="Edit Profile"

        onPress={goToEditProfile}

      />

      <ProfileMenuItem

        icon="settings-outline"

        title="Settings"

        onPress={goToSettings}

      />

      <ProfileMenuItem

        icon="help-circle-outline"

        title="Help & Support"

        onPress={goToHelp}

      />

      <ProfileMenuItem

        icon="log-out-outline"

        title="Logout"

        danger

        onPress={logout}

      />

      <Text style={styles.version}>

        Mtaa Watch v1.0.0

      </Text>

    </ScreenLayout>

  );

}

const styles = StyleSheet.create({

  profileCard: {

    alignItems: "center",

    backgroundColor: Colors.white,

    borderRadius: Radius.lg,

    padding: Spacing.xl,

    marginBottom: Spacing.xl,

  },

  avatar: {

    width: 90,

    height: 90,

    borderRadius: 45,

    backgroundColor: "#EEF4FF",

    justifyContent: "center",

    alignItems: "center",

    marginBottom: Spacing.md,

  },

  name: {

    fontSize: Typography.h3,

    fontWeight: "700",

    color: Colors.text,

  },

  email: {

    marginTop: Spacing.sm,

    color: Colors.textSecondary,

  },

  version: {

    textAlign: "center",

    marginTop: Spacing.lg,

    color: Colors.textSecondary,

  },

});