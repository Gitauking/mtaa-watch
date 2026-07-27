/*
|--------------------------------------------------------------------------
| Login Screen
|--------------------------------------------------------------------------
|
| Allows an existing user to sign into Mtaa Watch.
|
*/
import apiClient from "../../src/services/apiClient";
import React, { useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { router } from "expo-router";

// Services
import { login } from "../../src/services/authService";

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

export default function LoginScreen() {

  /*
  |--------------------------------------------------------------------------
  | State
  |--------------------------------------------------------------------------
  */

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  /*
  |--------------------------------------------------------------------------
  | Navigation
  |--------------------------------------------------------------------------
  */

  const goBack = () => {

    router.back();

  };

  const goToRegister = () => {

    router.push("/auth/register");

  };

  /*
  |--------------------------------------------------------------------------
  | Login
  |--------------------------------------------------------------------------
  */

  const handleLogin = async () => {

    try {

        console.log("================================");
        console.log("LOGIN BUTTON PRESSED");
        console.log("================================");

        console.log("Calling authService.login()...");

        const response = await login({

            email: email.trim(),

            password,

        });

        console.log("Returned from authService.login()");

        console.log(response);

        Alert.alert(

            "Success",

            response.message

        );

        router.replace("/tabs/home");

    } catch (error: any) {

        console.log("AUTH SERVICE ERROR");

        console.log(error);

        Alert.alert(

            "Login Failed",

            error.response?.data?.message ||

            error.message

        );

    }

};

  return (

    <SafeAreaView style={styles.container}>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={
          Platform.OS === "ios"
            ? "padding"
            : undefined
        }
      >

        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >

          <AppHeader
            title="Sign In"
            showBackButton
            onBackPress={goBack}
          />

          <View style={styles.topSection}>

            <Text style={styles.title}>

              Welcome Back

            </Text>

            <Text style={styles.subtitle}>

              Sign in to continue to Mtaa Watch.

            </Text>

          </View>

          <View>

            <AppInput
              label="Email Address"
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="email"
              textContentType="emailAddress"
              editable={!loading}
            />

            <AppInput
              label="Password"
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="password"
              textContentType="password"
              editable={!loading}
            />

            <TouchableOpacity>

              <Text style={styles.forgotPassword}>

                Forgot Password?

              </Text>

            </TouchableOpacity>

            <PrimaryButton
              title="Sign In"
              loading={loading}
              onPress={handleLogin}
            />

          </View>

          <View style={styles.footer}>

            <Text style={styles.footerText}>

              Don't have an account?

            </Text>

            <TouchableOpacity
              onPress={goToRegister}
            >

              <Text style={styles.link}>

                Create Account

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

  },

  forgotPassword: {

    textAlign: "right",

    color: Colors.primary,

    marginBottom: Spacing.lg,

    fontWeight: "600",

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