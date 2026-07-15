/*
|--------------------------------------------------------------------------
| Register Screen
|--------------------------------------------------------------------------
|
| Allows a new user to create a Mtaa Watch account.
|
| Backend registration and validation will be added later.
|
*/

import React, { useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { router } from "expo-router";

// Reusable Components
import AppHeader from "../../src/components/header/AppHeader";
import AppInput from "../../src/components/inputs/AppInput";
import PrimaryButton from "../../src/components/buttons/PrimaryButton";

// Design System
import {
  Colors,
  Typography,
  Spacing,
} from "../../src/constants";

export default function RegisterScreen() {

  /*
  |--------------------------------------------------------------------------
  | State
  |--------------------------------------------------------------------------
  */

  const [fullName, setFullName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  /*
  |--------------------------------------------------------------------------
  | Navigation
  |--------------------------------------------------------------------------
  */

  const goBack = () => {
    router.back();
  };

  const goToLogin = () => {
    router.push("/auth/login");
  };

  /*
  |--------------------------------------------------------------------------
  | Register
  |--------------------------------------------------------------------------
  |
  | Later this will send the data to the backend API.
  |
  */

  const handleRegister = () => {

    console.log("Full Name:", fullName);
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Confirm Password:", confirmPassword);

  };

  return (

    <SafeAreaView style={styles.container}>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >

        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >

          {/* Header */}

          <AppHeader
            title="Create Account"
            showBackButton
            onBackPress={goBack}
          />

          {/* Screen Title */}

          <View style={styles.topSection}>

            <Text style={styles.title}>
              Join Mtaa Watch
            </Text>

            <Text style={styles.subtitle}>
              Create your account and start reporting community issues.
            </Text>

          </View>

          {/* Registration Form */}

          <View>

            <AppInput
              label="Full Name"
              placeholder="Enter your full name"
              value={fullName}
              onChangeText={setFullName}
            />

            <AppInput
              label="Email Address"
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />

            <AppInput
              label="Password"
              placeholder="Create a password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />

            <AppInput
              label="Confirm Password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
            />

            <PrimaryButton
              title="Create Account"
              onPress={handleRegister}
            />

          </View>

          {/* Footer */}

          <View style={styles.footer}>

            <Text style={styles.footerText}>
              Already have an account?
            </Text>

            <TouchableOpacity
              onPress={goToLogin}
            >

              <Text style={styles.link}>
                Sign In
              </Text>

            </TouchableOpacity>

          </View>

        </ScrollView>

      </KeyboardAvoidingView>

    </SafeAreaView>

  );

}

const styles = StyleSheet.create({

  container: {

    flex: 1,

    backgroundColor: Colors.background,

  },

  content: {

    flexGrow: 1,

    padding: Spacing.lg,

  },

  topSection: {

    marginTop: Spacing.xl,

    marginBottom: Spacing.xl,

  },

  title: {

    fontSize: Typography.h1,

    fontWeight: "700",

    color: Colors.text,

    marginBottom: Spacing.sm,

  },

  subtitle: {

    fontSize: Typography.body,

    color: Colors.textSecondary,

    lineHeight: 24,

  },

  footer: {

    marginTop: "auto",

    alignItems: "center",

    paddingVertical: Spacing.xl,

  },

  footerText: {

    color: Colors.textSecondary,

    marginBottom: Spacing.sm,

  },

  link: {

    color: Colors.primary,

    fontWeight: "700",

    fontSize: Typography.body,

  },

});