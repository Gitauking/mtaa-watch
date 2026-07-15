/*
|--------------------------------------------------------------------------
| Home Screen
|--------------------------------------------------------------------------
|
| This screen is currently being used as our UI playground.
|
| We use it to test reusable components before adding them to the
| actual Mtaa Watch screens.
|
| Components being tested:
| ✓ AppCard
| ✓ AppInput
| ✓ PrimaryButton
| ✓ SecondaryButton
|
*/

import React, { useState } from "react";

import {
  ScrollView,
  View,
  Text,
  StyleSheet,
} from "react-native";

// Reusable UI Components
import AppCard from "../src/components/cards/AppCard";
import AppInput from "../src/components/inputs/AppInput";
import AppHeader from "../src/components/header/AppHeader";
import PrimaryButton from "../src/components/buttons/PrimaryButton";
import SecondaryButton from "../src/components/buttons/SecondaryButton";
import StatusBadge from "../src/components/badges/StatusBadge";
import LoadingIndicator from "../src/components/loading/LoadingIndicator";
import EmptyState from "../src/components/empty/EmptyState";

// Design System
import {
  Colors,
  Typography,
  Spacing,
} from "../src/constants";

export default function HomeScreen() {

  /*
  --------------------------------------------------------------------------
  Local State
  --------------------------------------------------------------------------

  These variables store whatever the user types into the inputs.

  email       -> Stores the email address

  password    -> Stores the password

  Whenever the user types, React automatically updates these values.
  */

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  /*
  --------------------------------------------------------------------------
  Login Function

  For now, this simply prints the entered values.

  Later this will send the data to our Node.js backend for authentication.
  */

  const handleLogin = () => {
    console.log("Login Details");

    console.log(email);

    console.log(password);
  };

  return (

  /*
  --------------------------------------------------------------------------
  ScrollView

  We use a ScrollView instead of a normal View because this page is now
  displaying many test components.

  As we add more components, the screen becomes taller than the device,
  allowing us to scroll instead of everything being cut off.
  --------------------------------------------------------------------------
  */

  <ScrollView
    contentContainerStyle={styles.container}
    showsVerticalScrollIndicator={false}
  >

  <AppHeader
    title="Mtaa Watch"
/>

<View style={{ height: Spacing.xl }} />

<AppHeader
    title="My Profile"
    showBackButton
/>

<View style={{ height: Spacing.xl }} />

<AppHeader
    title="Home"
    rightIcon="notifications-outline"
    onRightPress={() => console.log("Notifications")}
 />

<View style={{ height: Spacing.xl }} />

<AppHeader
    title="Report Details"
    showBackButton
    rightIcon="create-outline"
    onBackPress={() => console.log("Back")}
    onRightPress={() => console.log("Edit")}
/>

    {/*--------------------------------------------------------------
        AppCard

        The card groups related content together.

        Everything inside AppCard is passed through the "children"
        prop that we learned about earlier.
    --------------------------------------------------------------*/}

    <AppCard>

      {/* Screen Heading */}

      <Text style={styles.title}>
        Welcome to Mtaa Watch
      </Text>

      {/* Small description */}

      <Text style={styles.subtitle}>
        Report community issues quickly and help improve your neighbourhood.
      </Text>

      {/* Email Input */}

      <AppInput
        label="Email Address"
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      {/* Password Input */}

      <AppInput
        label="Password"
        placeholder="Enter password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {/* Primary Button */}

      <PrimaryButton
        title="Get Started"
        onPress={handleLogin}
      />

      {/* Space between buttons */}

      <View style={{ height: Spacing.md }} />

      {/* Secondary Button */}

      <SecondaryButton
        title="Sign In"
        onPress={() => console.log("Navigate to Login")}
      />

    </AppCard>

    {/*--------------------------------------------------------------
        Status Badge Examples
    --------------------------------------------------------------*/}

    <View style={{ height: Spacing.lg }} />

    <StatusBadge status="pending" />

    <View style={{ height: Spacing.sm }} />

    <StatusBadge status="in-progress" />

    <View style={{ height: Spacing.sm }} />

    <StatusBadge status="resolved" />

    <View style={{ height: Spacing.sm }} />

    <StatusBadge status="rejected" />

    {/*--------------------------------------------------------------
        Loading Indicator Examples
    --------------------------------------------------------------*/}

    <View style={{ height: Spacing.xl }} />

    <LoadingIndicator />

    <View style={{ height: Spacing.xl }} />

    <LoadingIndicator
      message="Submitting Report..."
    />
    <View style={{ height: Spacing.xxl }} />

<EmptyState
  icon="document-outline"
  title="No Reports Yet"
  message="When you submit your first report, it will appear here."
/>

<View style={{ height: Spacing.xl }} />

<EmptyState
  icon="notifications-outline"
  title="No Notifications"
  message="You're all caught up."
/>

  </ScrollView>

);
}

const styles = StyleSheet.create({
  container: {

  /*
  --------------------------------------------------------------------------
  flexGrow

  When using ScrollView we use flexGrow instead of flex.

  This allows the content to:

  • Fill the screen if it is short.
  • Grow taller than the screen if more components are added.

  This is why scrolling now works correctly.
  --------------------------------------------------------------------------
  */

  flexGrow: 1,

  justifyContent: "center",

  padding: Spacing.lg,

  backgroundColor: Colors.background,

},
  title: {
    fontSize: Typography.h1,
    fontWeight: "700",
    color: Colors.text,
    marginBottom: Spacing.md,
  },
  subtitle: {
    fontSize: Typography.body,
    color: Colors.textSecondary,
    marginBottom: Spacing.lg,
  },
});