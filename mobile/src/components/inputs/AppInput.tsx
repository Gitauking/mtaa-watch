/*
|--------------------------------------------------------------------------
| AppInput Component
|--------------------------------------------------------------------------
|
| This is a reusable text input component.
|
| Instead of creating TextInput on every screen,
| we create it once and reuse it everywhere.
|
| Features:
| • Label
| • Placeholder
| • Password visibility toggle
| • Error messages
| • Disabled state
| • Different keyboard types
| • Auto-capitalization control
| • Auto-correct control
| • AutoComplete support
| • TextContentType support
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

import { Ionicons } from "@expo/vector-icons";

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

  autoCapitalize?: "none" | "sentences" | "words" | "characters";

  autoCorrect?: boolean;

  autoComplete?: React.ComponentProps<typeof TextInput>["autoComplete"];

  textContentType?: React.ComponentProps<typeof TextInput>["textContentType"];

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

  autoCapitalize = "sentences",

  autoCorrect = true,

  autoComplete,

  textContentType,

}: AppInputProps) {

  /*
  --------------------------------------------------------------------------
  Local State
  --------------------------------------------------------------------------
  */

  const [hidePassword, setHidePassword] = useState(secureTextEntry);

  return (

    <View style={styles.container}>

      {/* Label */}

      <Text style={styles.label}>

        {label}

      </Text>

      {/* Input */}

      <View style={styles.inputContainer}>

        <TextInput

          style={styles.input}

          placeholder={placeholder}

          value={value}

          onChangeText={onChangeText}

          keyboardType={keyboardType}

          editable={editable}

          secureTextEntry={hidePassword}

          autoCapitalize={autoCapitalize}

          autoCorrect={autoCorrect}

          autoComplete={autoComplete}

          textContentType={textContentType}

          placeholderTextColor={Colors.textSecondary}

        />

        {/* Password Visibility Toggle */}

        {secureTextEntry && (

          <TouchableOpacity

            onPress={() => setHidePassword(!hidePassword)}

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

      {/* Error Message */}

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