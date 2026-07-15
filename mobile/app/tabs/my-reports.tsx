/*
|--------------------------------------------------------------------------
| My Reports Screen
|--------------------------------------------------------------------------
|
| Displays all reports submitted by the logged-in user.
| Currently uses dummy data.
|
*/

import React from "react";

import AppHeader from "../../src/components/header/AppHeader";
import ReportCard from "../../src/components/dashboard/ReportCard";
import ScreenLayout from "../../src/components/layout/ScreenLayout";
import ScreenTitle from "../../src/components/layout/ScreenTitle";

/*
|--------------------------------------------------------------------------
| Dummy Data
|--------------------------------------------------------------------------
|
| Later this will come from the backend.
|
*/

const reports = [

  {
    id: 1,
    title: "Pothole on Waiyaki Way",
    location: "Westlands",
    date: "Today",
    status: "pending" as const,
  },

  {
    id: 2,
    title: "Broken Streetlight",
    location: "Kilimani",
    date: "Yesterday",
    status: "resolved" as const,
  },

  {
    id: 3,
    title: "Illegal Dumping",
    location: "South B",
    date: "2 Days Ago",
    status: "in-progress" as const,
  },

  {
    id: 4,
    title: "Blocked Drainage",
    location: "Kasarani",
    date: "Last Week",
    status: "pending" as const,
  },

];

export default function MyReportsScreen() {

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

        reports.map((report) => (

          <ReportCard

            key={report.id}

            title={report.title}

            location={report.location}

            date={report.date}

            status={report.status}

          />

        ))

      }

    </ScreenLayout>

  );

}