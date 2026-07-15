/*
|--------------------------------------------------------------------------
| SecondaryButton Component
|--------------------------------------------------------------------------
|
| This button is used for secondary actions.
|
| Example:
| • Sign In
| • Cancel
| • View Details
|
| It shares the same size as the PrimaryButton
| but has a lighter appearance.
|
*/

import React from "react";

import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

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

type SecondaryButtonProps = {
  title: string;

  onPress: () => void;

  loading?: boolean;

  disabled?: boolean;
};

export default function SecondaryButton({

  title,

  onPress,

  loading = false,

  disabled = false,

}: SecondaryButtonProps) {

  return (

    <TouchableOpacity

      style={[
        styles.button,

        disabled && styles.disabled,
      ]}

      activeOpacity={0.85}

      onPress={onPress}

      disabled={disabled || loading}

    >

      {loading ? (

        <ActivityIndicator color={Colors.primary} />

      ) : (

        <Text style={styles.text}>

          {title}

        </Text>

      )}

    </TouchableOpacity>

  );

}

const styles = StyleSheet.create({

  button: {

    height: 56,

    justifyContent: "center",

    alignItems: "center",

    borderRadius: Radius.lg,

    borderWidth: 1.5,

    borderColor: Colors.primary,

    backgroundColor: Colors.white,

    paddingHorizontal: Spacing.lg,

  },

  disabled: {

    borderColor: Colors.disabled,

  },

  text: {

    color: Colors.primary,

    fontSize: Typography.body,

    fontWeight: "600",

  },

});