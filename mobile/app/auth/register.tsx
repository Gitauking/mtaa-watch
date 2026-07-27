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

// use require to avoid TS error when the module declares `register` but doesn't export it
import { register } from "../../src/services/authService";

import {
  View,
  Text,
  Alert,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
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

  const [firstName, setFirstName] = useState("");

const [lastName, setLastName] = useState("");

const [email, setEmail] = useState("");

const [password, setPassword] = useState("");

const [confirmPassword, setConfirmPassword] = useState("");

const [loading, setLoading] = useState(false);
  

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

  const handleRegister = async () => {

    if (!firstName.trim()) {
        Alert.alert("Validation Error", "First name is required.");
        return;
    }

    if (!lastName.trim()) {
        Alert.alert("Validation Error", "Last name is required.");
        return;
    }

    if (!email.trim()) {
        Alert.alert("Validation Error", "Email address is required.");
        return;
    }

    const emailRegex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email.trim())) {
        Alert.alert(
            "Validation Error",
            "Please enter a valid email address."
        );
        return;
    }

    if (!password) {
        Alert.alert(
            "Validation Error",
            "Password is required."
        );
        return;
    }

    if (password.length < 8) {
        Alert.alert(
            "Validation Error",
            "Password must be at least 8 characters."
        );
        return;
    }

    if (password !== confirmPassword) {
        Alert.alert(
            "Validation Error",
            "Passwords do not match."
        );
        return;
    }

   try {

    setLoading(true);

    console.log("================================");
    console.log("REGISTER BUTTON PRESSED");
    console.log("Sending registration data:");
    console.log({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        password
    });
    console.log("================================");

    const response = await register({

        firstName: firstName.trim(),

        lastName: lastName.trim(),

        email: email.trim(),

        password

    });

    console.log("Registration Response:");
    console.log(response);

    Alert.alert(
        "Success",
        response.message
    );

}catch (error: any) {

        Alert.alert(

            "Registration Failed",

            error.response?.data?.message ||

            "Unable to register. Please try again."

        );

    } finally {

        setLoading(false);

    }

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

            {/* First Name */}

<AppInput
    label="First Name"
    placeholder="Enter your first name"
    value={firstName}
    onChangeText={setFirstName}
/>

{/* Last Name */}

<AppInput
    label="Last Name"
    placeholder="Enter your last name"
    value={lastName}
    onChangeText={setLastName}
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
    title={loading ? "Creating Account..." : "Create Account"}
    onPress={handleRegister}
    disabled={loading}
/>

{loading && (
    <ActivityIndicator
        size="large"
        style={{ marginTop: 20 }}
    />
)}

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