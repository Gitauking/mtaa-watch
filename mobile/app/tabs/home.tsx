/*
|--------------------------------------------------------------------------
| Home Screen
|--------------------------------------------------------------------------
|
| Personalized dashboard for the logged-in citizen.
|--------------------------------------------------------------------------
*/

import React, {

    useState,

    useCallback,

} from "react";

import {

    View,

    Text,

    StyleSheet,

    RefreshControl,

} from "react-native";

import { useFocusEffect } from "@react-navigation/native";

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

import {

    getDashboardSummary,

} from "../../src/services/reportService";

import {

    getCurrentUser,

} from "../../src/services/authService";

export default function HomeScreen() {
    const router = useRouter();

    /*
    |--------------------------------------------------------------------------
    | State
    |--------------------------------------------------------------------------
    */

    const [dashboard, setDashboard] = useState<any>(null);

    const [user, setUser] = useState<{ first_name: string } | null>(null);

    const [refreshing, setRefreshing] = useState(false);

    /*
    |--------------------------------------------------------------------------
    | Greeting
    |--------------------------------------------------------------------------
    */

    const getGreeting = () => {

        const hour = new Date().getHours();

        if (hour < 12) {

            return "Good Morning";

        }

        if (hour < 17) {

            return "Good Afternoon";

        }

        return "Good Evening";

    };

    /*
    |--------------------------------------------------------------------------
    | Load Dashboard
    |--------------------------------------------------------------------------
    */

    const loadDashboard = async () => {

        try {

            setRefreshing(true);

            const currentUser = await getCurrentUser();

            setUser(currentUser);

            const data = await getDashboardSummary();

            setDashboard(data);

        } catch (error) {

            console.error(error);

        } finally {

            setRefreshing(false);

        }

    };

    /*
    |--------------------------------------------------------------------------
    | Refresh whenever screen gains focus
    |--------------------------------------------------------------------------
    */

    useFocusEffect(

        useCallback(() => {

            loadDashboard();

        }, [])

    );


        return (

    <ScreenLayout>

        {/*--------------------------------------------------------------
            Header
        --------------------------------------------------------------*/}

        <AppHeader

            title="Mtaa Watch"

            rightIcon="notifications-outline"

        />

        {/*--------------------------------------------------------------
            Greeting
        --------------------------------------------------------------*/}

        <ScreenTitle

            title={`${getGreeting()} 👋`}

            subtitle={

                user

                    ? `Welcome back, ${user.first_name}.`

                    : "Welcome back."

            }

        />

        {/*--------------------------------------------------------------
            Report Button
        --------------------------------------------------------------*/}

        <View style={{ marginTop: Spacing.lg }}>

            <PrimaryButton

                title="Report an Incident"

                onPress={() =>

                    router.push("/report-incident")

                }

            />

        </View>

        {/*--------------------------------------------------------------
            Statistics
        --------------------------------------------------------------*/}

        <Text style={styles.sectionTitle}>

            Your Activity

        </Text>

        <View style={styles.statsRow}>

            <StatCard

                value={

                    dashboard

                        ? dashboard.summary.reports_submitted

                        : "0"

                }

                title="Submitted"

            />

            <StatCard

                value={

                    dashboard

                        ? dashboard.summary.pending

                        : "0"

                }

                title="Pending"

            />

        </View>

        <View style={styles.statsRow}>

            <StatCard

                value={

                    dashboard

                        ? dashboard.summary.in_progress

                        : "0"

                }

                title="In Progress"

            />

            <StatCard

                value={

                    dashboard

                        ? dashboard.summary.resolved

                        : "0"

                }

                title="Resolved"

            />

        </View>

        {/*--------------------------------------------------------------
            Recent Reports
        --------------------------------------------------------------*/}

        <Text style={styles.sectionTitle}>

            Recent Reports

        </Text>

        {

            dashboard?.recentReports?.length > 0 ? (

                dashboard.recentReports.map((report: any) => (

                    <ReportCard

                        key={report.id}

                        title={report.title}

                        location={

                            report.location_name ||

                            "Unknown Location"

                        }

                        date={

                            new Date(

                                report.created_at

                            ).toLocaleDateString()

                        }

                        status={

                            report.status

                                .toLowerCase()

                                .replace(" ", "-")

                        }

                    />

                ))

            ) : (

                <View style={styles.emptyCard}>

                    <Text style={styles.emptyTitle}>

                        No reports yet

                    </Text>

                    <Text style={styles.emptySubtitle}>

                        Submit your first incident report to
                        start helping your community.

                    </Text>

                </View>

            )

        }

        {/*--------------------------------------------------------------
            Floating Action Button
        --------------------------------------------------------------*/}

        <FloatingActionButton

            onPress={() =>

                router.push("/report-incident")

            }

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
  emptyCard: {

    backgroundColor: Colors.white,

    padding: Spacing.xl,

    borderRadius: 16,

    alignItems: "center",

},

emptyTitle: {

    fontSize: Typography.h3,

    fontWeight: "700",

    color: Colors.text,

},

emptySubtitle: {

    marginTop: Spacing.sm,

    textAlign: "center",

    color: Colors.textSecondary,

},
});