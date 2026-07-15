// Import React so we can create React components
import React from "react";

// Import the React Native components needed to build the button
import {
  TouchableOpacity, // Makes the button touchable
  Text,             // Displays text inside the button
  StyleSheet,       // Used to create reusable styles
  ActivityIndicator // Displays a loading spinner
} from "react-native";

// Import our custom design system constants.
// This keeps colors, spacing and font sizes consistent throughout the app.
import {
  Colors,
  Radius,
  Spacing,
  Typography,
} from "../../constants";

/*
|--------------------------------------------------------------------------
| Props Definition
|--------------------------------------------------------------------------
| This defines what information (properties) this button expects.
|
| title      -> Text displayed on the button.
| onPress    -> Function that runs when the button is pressed.
| loading    -> Shows a spinner instead of text.
| disabled   -> Prevents the button from being pressed.
|
| The '?' means these properties are optional.
*/

type PrimaryButtonProps = {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
};

/*
|--------------------------------------------------------------------------
| PrimaryButton Component
|--------------------------------------------------------------------------
|
| This is a reusable button component.
|
| Instead of writing button code on every screen,
| i create it once and reuse it everywhere.
*/

export default function PrimaryButton({

  // Values received from the parent screen/component
  title,
  onPress,

  // Default values
  // If loading or disabled are not provided,
  // they automatically become false.
  loading = false,
  disabled = false,

}: PrimaryButtonProps) {

  return (

    /*
    ------------------------------------------------------------------------
    TouchableOpacity
    ------------------------------------------------------------------------

    This is the actual button.

    activeOpacity
    ↓
    Controls how transparent the button becomes when tapped.

    style
    ↓
    Applies multiple styles.

    If "disabled" is true,
    styles.disabled is also applied.
    */

    <TouchableOpacity
      style={[
        styles.button,

        // This only applies if disabled == true
        disabled && styles.disabled,
      ]}

      activeOpacity={0.85}

      // Function that runs when the user taps the button
      onPress={onPress}

      // Disable the button if:
      // 1. disabled == true
      // OR
      // 2. loading == true
      disabled={disabled || loading}
    >

      {/*
      ----------------------------------------------------------------------
      Conditional Rendering
      ----------------------------------------------------------------------

      This is called a Ternary Operator.

      If loading is true:
          Show the spinner

      Otherwise:
          Show the button text
      */}

      {loading ? (

        // Spinner shown while data is loading
        <ActivityIndicator color={Colors.white} />

      ) : (

        // Normal button text
        <Text style={styles.text}>
          {title}
        </Text>

      )}

    </TouchableOpacity>
  );
}

/*
|--------------------------------------------------------------------------
| Styles
|--------------------------------------------------------------------------
|
| StyleSheet.create() is React Native's recommended
| way of creating styles.
|
| It improves performance and keeps styles organized.
*/

const styles = StyleSheet.create({

  /*
  --------------------------------------------------------------------------
  Main Button Style
  --------------------------------------------------------------------------
  */

  button: {

    // Blue background
    backgroundColor: Colors.primary,

    // Fixed button height
    height: 56,

    // Center content vertically
    justifyContent: "center",

    // Center content horizontally
    alignItems: "center",

    // Rounded corners
    borderRadius: Radius.lg,

    // Horizontal padding
    paddingHorizontal: Spacing.lg,
  },

  /*
  --------------------------------------------------------------------------
  Disabled Button Style
  --------------------------------------------------------------------------

  Applied only when the button is disabled.
  */

  disabled: {
    backgroundColor: Colors.disabled,
  },

  /*
  --------------------------------------------------------------------------
  Text Style
  --------------------------------------------------------------------------
  */

  text: {

    // White text
    color: Colors.white,

    // Font size from our design system
    fontSize: Typography.body,

    // Semi-bold font
    fontWeight: "600",
  },
});