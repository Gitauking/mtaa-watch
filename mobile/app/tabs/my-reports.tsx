/*
|--------------------------------------------------------------------------
| My Reports Screen
|--------------------------------------------------------------------------
|
| Displays all reports submitted by the logged-in user.
| Currently uses dummy data.
|
*/
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import React, { useEffect, useState } from "react";

import AppHeader from "../../src/components/header/AppHeader";
import ReportCard from "../../src/components/dashboard/ReportCard";
import ScreenLayout from "../../src/components/layout/ScreenLayout";
import ScreenTitle from "../../src/components/layout/ScreenTitle";
import { getMyReports } from "../../src/services/reportService";
/*
|--------------------------------------------------------------------------
| Dummy Data
|--------------------------------------------------------------------------
|
| Later this will come from the backend.
|
*/


export default function MyReportsScreen() {
const [reports, setReports] = useState([]);

const [loading, setLoading] = useState(true);

useFocusEffect(
    useCallback(() => {
        loadReports();
    }, [])
);

const loadReports = async () => {

    try {

        console.log("Loading My Reports...");

        const data = await getMyReports();

        console.log("Reports:", data);

        setReports(data);

    } catch (error) {

        console.error(error);

    } finally {

        setLoading(false);

    }

};

  return (

    <ScreenLayout>

      {/* Screen header */}

      <AppHeader
        title="Mtaa Watch"
      />

      {/* Page title */}

      <ScreenTitle

        title="My Reports"

        subtitle="Track the status of incidents you have reported."

      />

      {/* Report list */}

      {
    !loading && reports.length === 0 ? (

        <ScreenTitle

            title=""

            subtitle="You haven't submitted any reports yet."

        />

    ) : (

        reports.map((report: any) => (

          <ReportCard

            key={report.id}

            title={report.title}

location={report.location_name}

date={new Date(report.created_at).toLocaleDateString()}

status={report.status}
          />

        ))

    )
}

    </ScreenLayout>

  );

}