/*
|--------------------------------------------------------------------------
| LocationCard Component
|--------------------------------------------------------------------------
|
| PURPOSE
|
| Displays the user's current location.
|
| At the moment this component displays dummy data.
|
| In the next phase of development it will:
|
| ✓ Request GPS permission
| ✓ Read the user's coordinates
| ✓ Convert coordinates into an address
| ✓ Allow refreshing the location
|
*/

import React from "react";

import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import {
    Colors,
    Typography,
    Spacing,
    Radius,
} from "../../constants";

/*
|--------------------------------------------------------------------------
| Props
|--------------------------------------------------------------------------
|
| location
|     Human-readable location.
|
| latitude
|     GPS latitude.
|
| longitude
|     GPS longitude.
|
| onRefresh
|     Called when the user taps the refresh button.
|
*/

type LocationCardProps = {

    location: string;

    latitude: number;

    longitude: number;

    onRefresh: () => void;

};

export default function LocationCard({

    location,

    latitude,

    longitude,

    onRefresh,

}: LocationCardProps) {

    return (

        <View>

            {/*----------------------------------------------------------
                Section Title
            ----------------------------------------------------------*/}

            <Text style={styles.label}>

                Current Location

            </Text>

            {/*----------------------------------------------------------
                Card Container
            ----------------------------------------------------------*/}

            <View style={styles.card}>

                {/* Location Icon and Address */}

                <View style={styles.row}>

                    <Ionicons
                        name="location"
                        size={22}
                        color={Colors.primary}
                    />

                    <Text style={styles.locationText}>

                        {location}

                    </Text>

                </View>

                {/*------------------------------------------------------
                    Coordinates

                    These are useful for the backend because they
                    uniquely identify where the incident occurred.
                ------------------------------------------------------*/}

                <Text style={styles.coordinates}>

                    Latitude: {latitude}

                </Text>

                <Text style={styles.coordinates}>

                    Longitude: {longitude}

                </Text>

                {/*------------------------------------------------------
                    Refresh Button

                    Later this will request the GPS again.
                ------------------------------------------------------*/}

                <TouchableOpacity

                    style={styles.button}

                    onPress={onRefresh}

                >

                    <Ionicons

                        name="refresh"

                        size={18}

                        color={Colors.white}

                    />

                    <Text style={styles.buttonText}>

                        Refresh Location

                    </Text>

                </TouchableOpacity>

            </View>

        </View>

    );

}

const styles = StyleSheet.create({

    label: {

        fontSize: Typography.body,

        fontWeight: "700",

        color: Colors.text,

        marginBottom: Spacing.md,

    },

    card: {

        backgroundColor: Colors.white,

        borderRadius: Radius.lg,

        padding: Spacing.lg,

        elevation: 2,

    },

    row: {

        flexDirection: "row",

        alignItems: "center",

        marginBottom: Spacing.md,

    },

    locationText: {

        marginLeft: Spacing.sm,

        fontSize: Typography.body,

        color: Colors.text,

        fontWeight: "600",

    },

    coordinates: {

        fontSize: Typography.small,

        color: Colors.textSecondary,

        marginBottom: Spacing.xs,

    },

    button: {

        marginTop: Spacing.lg,

        backgroundColor: Colors.primary,

        borderRadius: Radius.md,

        paddingVertical: Spacing.sm,

        flexDirection: "row",

        justifyContent: "center",

        alignItems: "center",

    },

    buttonText: {

        color: Colors.white,

        marginLeft: Spacing.sm,

        fontWeight: "600",

    },

});