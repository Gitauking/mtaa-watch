/*
|--------------------------------------------------------------------------
| My Reports Screen
|--------------------------------------------------------------------------
|
| PURPOSE
|
| Displays all reports submitted by the logged-in user.
|
| For now we use dummy data.
|
| Later this data will come from PostgreSQL through
| our Express backend.
|
*/

import React from "react";

import {

    Text,

    StyleSheet,

} from "react-native";

import ScreenLayout from "../../src/components/layout/ScreenLayout";

import AppHeader from "../../src/components/header/AppHeader";

import ReportCard from "../../src/components/dashboard/ReportCard";

import {

    Colors,

    Typography,

    Spacing,

} from "../../src/constants";

/*
|--------------------------------------------------------------------------
| Dummy Reports
|--------------------------------------------------------------------------
|
| Normally these would be fetched from the backend API.
|
*/

const reports = [

    {

        id: 1,

        title: "Pothole on Waiyaki Way",

        location: "Westlands",

        date: "Today",

        status: "pending",

    },

    {

        id: 2,

        title: "Broken Streetlight",

        location: "Kilimani",

        date: "Yesterday",

        status: "resolved",

    },

    {

        id: 3,

        title: "Illegal Dumping",

        location: "South B",

        date: "2 Days Ago",

        status: "in-progress",

    },

];

export default function ReportsScreen() {

    return (

        <ScreenLayout>

            {/*----------------------------------------------------------
                Screen Header
            ----------------------------------------------------------*/}

            <AppHeader

                title="My Reports"

            />

            {/*----------------------------------------------------------
                Screen Title
            ----------------------------------------------------------*/}

            <Text style={styles.heading}>

                My Submitted Reports

            </Text>

            {/*----------------------------------------------------------
                Report List
            ----------------------------------------------------------*/}

            {

                reports.map((report) => (

                    <ReportCard

                        key={report.id}

                        title={report.title}

                        location={report.location}

                        date={report.date}

                        status={report.status as
                            "pending" |
                            "resolved" |
                            "in-progress" |
                            "rejected"
                        }

                    />

                ))

            }

        </ScreenLayout>

    );

}

const styles = StyleSheet.create({

    heading: {

        fontSize: Typography.h2,

        fontWeight: "700",

        color: Colors.text,

        marginBottom: Spacing.lg,

    },

});