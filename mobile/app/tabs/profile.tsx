/*
|--------------------------------------------------------------------------
| Profile Screen
|--------------------------------------------------------------------------
*/
import { router } from "expo-router";

import ProfileMenuItem from "../../src/components/profile/ProfileMenuItem";

import { Alert } from "react-native";

import React from "react";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import AppHeader from "../../src/components/header/AppHeader";
import ScreenLayout from "../../src/components/layout/ScreenLayout";
import ScreenTitle from "../../src/components/layout/ScreenTitle";

import {
  Colors,
  Typography,
  Spacing,
  Radius,
} from "../../src/constants";

const goToSettings = () => {

    router.push("/tabs/settings");

};

const goToReports = () => {

    router.push("/tabs/my-reports");

};

const logout = () => {

    Alert.alert(

        "Logout",

        "Are you sure you want to logout?",

        [

            {
                text:"Cancel",
                style:"cancel",
            },

            {
                text:"Logout",

                style:"destructive",

                onPress:()=>router.replace("/auth/welcome"),

            },

        ]

    );

};

export default function ProfileScreen() {

  return (

    <ScreenLayout>

      <AppHeader
        title="Mtaa Watch"
      />

      <ScreenTitle

        title="Profile"

        subtitle="Manage your account."

      />

      <View style={styles.profileCard}>

        <View style={styles.avatar}>

          <Ionicons
            name="person"
            size={50}
            color={Colors.primary}
          />

        </View>

        <Text style={styles.name}>
          Gitau Waiganjo
        </Text>

        <Text style={styles.email}>
          gitau@email.com
        </Text>

      </View>

      <ProfileMenuItem

    icon="person-circle-outline"

    title="Edit Profile"

    onPress={() => {}}

/>

<ProfileMenuItem

    icon="settings-outline"

    title="Settings"

    onPress={goToSettings}

/>

<ProfileMenuItem

    icon="document-text-outline"

    title="My Reports"

    onPress={goToReports}

/>

<ProfileMenuItem

    icon="help-circle-outline"

    title="Help & Support"

    onPress={() => {}}

/>

<ProfileMenuItem

    icon="log-out-outline"

    title="Logout"

    danger

    onPress={logout}

/>

<Text
    style={styles.version}
>

    Mtaa Watch v1.0.0

</Text>
    </ScreenLayout>

  );

}

const styles = StyleSheet.create({

  profileCard:{

    alignItems:"center",

    backgroundColor:Colors.white,

    borderRadius:Radius.lg,

    padding:Spacing.xl,

    marginBottom:Spacing.xl,

  },

  avatar:{

    width:90,

    height:90,

    borderRadius:45,

    backgroundColor:"#EEF4FF",

    justifyContent:"center",

    alignItems:"center",

    marginBottom:Spacing.md,

  },

  name:{

    fontSize:Typography.h3,

    fontWeight:"700",

    color:Colors.text,

  },

  email:{

    marginTop:Spacing.sm,

    color:Colors.textSecondary,

  },

  item:{

    flexDirection:"row",

    alignItems:"center",

    backgroundColor:Colors.white,

    borderRadius:Radius.lg,

    padding:Spacing.lg,

    marginBottom:Spacing.md,

  },

  itemText:{

    marginLeft:Spacing.md,

    fontSize:Typography.body,

    color:Colors.text,

  },

 version:{

    textAlign:"center",

    marginTop:Spacing.lg,

    color:Colors.textSecondary,

},

});