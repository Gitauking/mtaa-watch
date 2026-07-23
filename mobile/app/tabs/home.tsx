/*
|--------------------------------------------------------------------------
| Home Screen
|--------------------------------------------------------------------------
|
| Dashboard shown after a successful login.
|
| NOTE:
| This screen currently uses dummy data.
| It will later fetch real reports from the Node.js backend.
|
*/

import {
  View,
  Text,
  StyleSheet,
} from "react-native";

import { useRouter } from "expo-router";

import ScreenLayout from "../../src/components/layout/ScreenLayout";
import ScreenTitle from "../../src/components/layout/ScreenTitle";

import AppHeader from "../../src/components/header/AppHeader";
import PrimaryButton from "../../src/components/buttons/PrimaryButton";

import StatCard from "../../src/components/dashboard/StatCard";
import ReportCard from "../../src/components/dashboard/ReportCard";
import FloatingActionButton from "../../src/components/dashboard/FloatingActionButton";


import {
  Colors,
  Typography,
  Spacing,
} from "../../src/constants";

export default function HomeScreen() {
  const router = useRouter();

  return (

    /*
|--------------------------------------------------------------------------
| Screen Layout
|--------------------------------------------------------------------------
|
| ScreenLayout automatically provides:
|
| ✓ Safe Area handling
| ✓ Consistent padding
| ✓ ScrollView
| ✓ Background colour
|
| This means we no longer need SafeAreaView
| or ScrollView inside this screen.
|
*/

<ScreenLayout>

    {/*--------------------------------------------------------------
        Header
    --------------------------------------------------------------*/}

    <AppHeader

        title="Mtaa Watch"

        rightIcon="notifications-outline"

    />

    {/*--------------------------------------------------------------
        Welcome Message

        Instead of manually styling Text components,
        i now use our reusable ScreenTitle component.

        This keeps every screen in the application
        visually consistent.
    --------------------------------------------------------------*/}

    <ScreenTitle

        title="Good Morning 👋"

        subtitle="Welcome back, Gitau."

    />

        {/* Greeting */}

        

        {/* Report Button */}

        <View style={{ marginTop: Spacing.lg }}>

          {/*
|--------------------------------------------------------------------------
| Report Incident Button
|--------------------------------------------------------------------------
|
| When the user presses this button, Expo Router navigates
| to the Report Incident screen.
|
| We use router.push() because we want the user to be able
| to return to the Home screen afterwards.
|--------------------------------------------------------------------------
*/}

<PrimaryButton
    title="Report an Incident"
    onPress={() => router.push("/report-incident")}
/>

        </View>

        {/* Statistics */}

        <Text style={styles.sectionTitle}>
          Statistics
        </Text>

        <View style={styles.statsRow}>

          <StatCard

            value="24"

            title="Total Reports"

          />

          <StatCard

            value="8"

            title="Resolved"

          />

        </View>

        <View style={styles.statsRow}>

          <StatCard

            value="5"

            title="Pending"

          />

          <StatCard

            value="11"

            title="In Progress"

          />

        </View>

        {/* Recent Reports */}

        <Text style={styles.sectionTitle}>
          Recent Reports
        </Text>

        <ReportCard

          title="Pothole on Waiyaki Way"

          location="Westlands"

          date="Today"

          status="pending"

        />

        <ReportCard

          title="Broken Streetlight"

          location="Kilimani"

          date="Yesterday"

          status="resolved"

        />

        <ReportCard

          title="Illegal Dumping"

          location="South B"

          date="2 Days Ago"

          status="in-progress"

        />

      {/*--------------------------------------------------------------
    Floating Action Button

    The FAB gives the user a quick way to report
    an incident from anywhere on the dashboard.

    We navigate using router.push() so that the
    user can return to the Home screen afterwards.
--------------------------------------------------------------*/}

<FloatingActionButton

    onPress={() => router.push("/report-incident")}

 />

</ScreenLayout>

  );

}

const styles = StyleSheet.create({

  /*
  --------------------------------------------------------------------------
  Section Heading

  Used for dashboard sections such as:

  • Statistics
  • Recent Reports
  --------------------------------------------------------------------------
  */

  sectionTitle: {

    marginTop: Spacing.xl,

    marginBottom: Spacing.md,

    fontSize: Typography.h3,

    fontWeight: "700",

    color: Colors.text,

  },

  /*
  --------------------------------------------------------------------------
  Statistics Row

  Displays two StatCards side-by-side.

  justifyContent: "space-between"

  ensures both cards are evenly spaced across
  the width of the screen.
  --------------------------------------------------------------------------
  */

  statsRow: {

    flexDirection: "row",

    justifyContent: "space-between",

    marginBottom: Spacing.md,

  },

});