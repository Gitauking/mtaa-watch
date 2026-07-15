/*
|--------------------------------------------------------------------------
| ScreenTitle
|--------------------------------------------------------------------------
|
| PURPOSE
|
| Displays a consistent title and optional subtitle
| at the top of every screen.
|
| Instead of repeating title styles throughout the app,
| we define them once here.
|
| EXAMPLE
|
| <ScreenTitle
|     title="Report Incident"
|     subtitle="Submit an issue in your neighbourhood."
| />
|
*/

import React from "react";

import {
  View,
  Text,
  StyleSheet,
} from "react-native";

import {
  Colors,
  Typography,
  Spacing,
} from "../../constants";

/*
|--------------------------------------------------------------------------
| Component Props
|--------------------------------------------------------------------------
|
| title
| -----
| The main heading shown on the screen.
|
| subtitle
| --------
| Optional supporting text displayed below the title.
|
*/

type ScreenTitleProps = {

  title: string;

  subtitle?: string;

};

export default function ScreenTitle({

  title,

  subtitle,

}: ScreenTitleProps) {

  return (

    <View style={styles.container}>

      {/*--------------------------------------------------------------
          Main Title
      ---------------------------------------------------------------

      This is the largest text on the page and tells the
      user which screen they are currently viewing.
      */}

      <Text style={styles.title}>

        {title}

      </Text>

      {/*--------------------------------------------------------------
          Subtitle
      ---------------------------------------------------------------

      Only render the subtitle if one has been provided.

      The expression:

          {subtitle && (...)}

      means:

      "If subtitle exists, display it."

      Otherwise, React renders nothing.

      This avoids leaving empty space on screens that
      don't require a subtitle.
      */}

      {subtitle && (

        <Text style={styles.subtitle}>

          {subtitle}

        </Text>

      )}

    </View>

  );

}

const styles = StyleSheet.create({

  /*
  --------------------------------------------------------------------------
  Container

  Adds spacing below the title block so the next component
  doesn't sit directly underneath it.
  --------------------------------------------------------------------------
  */

  container: {

    marginBottom: Spacing.xl,

  },

  /*
  --------------------------------------------------------------------------
  Main Screen Title

  This is the primary heading of the screen.
  --------------------------------------------------------------------------
  */

  title: {

    fontSize: Typography.h1,

    fontWeight: "700",

    color: Colors.text,

    marginBottom: Spacing.sm,

  },

  /*
  --------------------------------------------------------------------------
  Subtitle

  Provides additional context about the purpose of the screen.

  lineHeight improves readability by increasing the spacing
  between lines of text.
  --------------------------------------------------------------------------
  */

  subtitle: {

    fontSize: Typography.body,

    color: Colors.textSecondary,

    lineHeight: 24,

  },

});