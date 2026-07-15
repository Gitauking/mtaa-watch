/*
|--------------------------------------------------------------------------
| AppInput Component
|--------------------------------------------------------------------------
|
| This is a reusable text input component.
|
| Instead of creating TextInput on every screen,
| i create it once and reuse it everywhere.
|
| It supports:
| • Label
| • Placeholder
| • Password fields
| • Error messages
| • Disabled state
| • Different keyboard types
|
*/

import React, { useState } from "react";

import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardTypeOptions,
} from "react-native";

// Expo icons (install if you haven't already)
// npx expo install @expo/vector-icons
import { Ionicons } from "@expo/vector-icons";

// Import our design system
import {
  Colors,
  Radius,
  Spacing,
  Typography,
} from "../../constants";

/*
|--------------------------------------------------------------------------
| Props
|--------------------------------------------------------------------------
|
| These are the values this component expects.
|
| label            -> Text shown above the input
| placeholder      -> Hint inside the input
| value            -> Current value
| onChangeText     -> Function called when typing
| secureTextEntry  -> Password field
| keyboardType     -> Email, Phone, Number etc.
| error            -> Validation message
| editable         -> Enable/Disable input
|
*/

type AppInputProps = {
  label: string;

  placeholder: string;

  value: string;

  onChangeText: (text: string) => void;

  secureTextEntry?: boolean;

  keyboardType?: KeyboardTypeOptions;

  error?: string;

  editable?: boolean;
};

export default function AppInput({

  label,

  placeholder,

  value,

  onChangeText,

  secureTextEntry = false,

  keyboardType = "default",

  error,

  editable = true,

}: AppInputProps) {

  /*
  ------------------------------------------------------------------------
  Local State
  ------------------------------------------------------------------------

  i use this to show/hide passwords.

  Initially:

      Password is hidden.

  When the eye icon is pressed:

      Password becomes visible.
  */

  const [hidePassword, setHidePassword] = useState(secureTextEntry);

  return (

    <View style={styles.container}>

      {/* Label */}

      <Text style={styles.label}>
        {label}
      </Text>

      {/* Input Box */}

      <View style={styles.inputContainer}>

        <TextInput

          style={styles.input}

          placeholder={placeholder}

          value={value}

          onChangeText={onChangeText}

          keyboardType={keyboardType}

          editable={editable}

          /*
          --------------------------------------------------------------
          secureTextEntry

          If this is a password field:

              hidePassword = true

          Otherwise:

              false
          */

          secureTextEntry={hidePassword}
        />

        {/*
        --------------------------------------------------------------
        Only show the eye icon if this is a password field.
        --------------------------------------------------------------
        */}

        {secureTextEntry && (

          <TouchableOpacity

            onPress={() =>
              setHidePassword(!hidePassword)
            }

          >

            <Ionicons

              name={
                hidePassword
                  ? "eye-off-outline"
                  : "eye-outline"
              }

              size={22}

              color={Colors.textSecondary}

            />

          </TouchableOpacity>

        )}

      </View>

      {/*
      --------------------------------------------------------------
      Error Message

      Only display if "error" exists.
      --------------------------------------------------------------
      */}

      {error && (

        <Text style={styles.error}>

          {error}

        </Text>

      )}

    </View>

  );

}

/*
|--------------------------------------------------------------------------
| Styles
|--------------------------------------------------------------------------
*/

const styles = StyleSheet.create({

  container: {

    marginBottom: Spacing.lg,

  },

  label: {

    marginBottom: Spacing.sm,

    fontSize: Typography.small,

    fontWeight: "600",

    color: Colors.text,

  },

  inputContainer: {

    flexDirection: "row",

    alignItems: "center",

    borderWidth: 1,

    borderColor: Colors.border,

    borderRadius: Radius.lg,

    paddingHorizontal: Spacing.md,

    height: 56,

    backgroundColor: Colors.white,

  },

  input: {

    flex: 1,

    fontSize: Typography.body,

    color: Colors.text,

  },

  error: {

    marginTop: Spacing.xs,

    color: Colors.danger,

    fontSize: Typography.caption,

  },

});