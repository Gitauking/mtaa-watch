/*
|--------------------------------------------------------------------------
| Bottom Tab Navigation
|--------------------------------------------------------------------------
|
| This file controls the navigation shown at the bottom of the app.
|
| Every screen inside the "tabs" folder automatically becomes
| a tab in the navigation bar.
|
| Current Tabs:
|
| • Home
| • Reports
| • Notifications
| • Profile
|
*/

import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { Colors } from "../../src/constants";

export default function TabsLayout() {

  return (

    <Tabs

      /*
      ------------------------------------------------------------------------
      Screen Options

      These settings apply to ALL tabs unless overridden.
      ------------------------------------------------------------------------
      */

   screenOptions={{
    headerShown: false,

    // Smooth transition between tabs
    animation: "shift",

    // Hide tab bar when keyboard opens
    tabBarHideOnKeyboard: true,

    // Active icon/text color
    tabBarActiveTintColor: Colors.primary,

    // Inactive icon/text color
    tabBarInactiveTintColor: "#999",

    // Modern floating tab bar

  tabBarLabelStyle: {

  fontSize: 12,

  fontWeight: "600",

},


tabBarItemStyle: {

  paddingVertical: 4,

},
  
  tabBarStyle: {

  position: "absolute",

  left: 12,

  right: 12,

  bottom: 10,

  height: 75,

  borderRadius: 22,

  paddingTop: 8,

  paddingBottom: 8,

  elevation: 8,

  backgroundColor: "#FFFFFF",

  borderTopWidth: 0,

},
  }}
    >

      {/*--------------------------------------------------------------
          Home Tab
      --------------------------------------------------------------*/}

      <Tabs.Screen

        name="home"

        options={{

          title: "Home",

          tabBarIcon: ({ color, size, focused }) => (

            <Ionicons

              
    name={focused ? "home" : "home-outline"}

    color={color}

    size={size}
            />

          ),

        }}

      />

      {/*--------------------------------------------------------------
          Reports Tab
      --------------------------------------------------------------*/}

      <Tabs.Screen

        name="my-reports"

        options={{

          title: "My Reports",

          tabBarIcon: ({ color, size, focused }) => (

            <Ionicons

              name={focused ? "document-text" : "document-text-outline"}

              color={color}

              size={size}

            />

          ),

        }}

      />

      {/*--------------------------------------------------------------
          Notifications Tab
      --------------------------------------------------------------*/}

      <Tabs.Screen

        name="notifications"

        options={{

          title: "Alerts",

          tabBarIcon: ({ color, size, focused }) => (

            <Ionicons

               name={focused ? "notifications" : "notifications-outline"}

              color={color}

              size={size}

            />

          ),

        }}

      />

      {/*--------------------------------------------------------------
          Profile Tab
      --------------------------------------------------------------*/}

      <Tabs.Screen

        name="profile"

        options={{

          title: "Profile",

          tabBarIcon: ({ color, size, focused }) => (

            <Ionicons

             name={focused ? "person" : "person-outline"}


              color={color}

              size={size}

            />

          ),

        }}

      />

    </Tabs>

  );

}