/*
|--------------------------------------------------------------------------
| SubmitSection Component
|--------------------------------------------------------------------------
|
| PURPOSE
|
| Displays:
|
| • A reminder encouraging users to submit accurate information.
| • The final Submit Report button.
|
| WHY?
|
| The reminder helps build trust and encourages responsible reporting.
|
| The component is separated from the main screen so that it
| can easily be reused or modified in the future.
|
*/

import React from "react";

import {
    View,
    Text,
    StyleSheet,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import PrimaryButton from "../buttons/PrimaryButton";

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
| loading
|     Indicates whether the report is currently being submitted.
|
| onSubmit
|     Function executed when the Submit Report button is pressed.
|
*/

type SubmitSectionProps = {

    loading?: boolean;

    onSubmit: () => void;

};

export default function SubmitSection({

    loading = false,

    onSubmit,

}: SubmitSectionProps) {

    return (

        <View style={styles.container}>

            {/*----------------------------------------------------------
                Reminder Card
            ----------------------------------------------------------*/}

            <View style={styles.reminderCard}>

                {/* Information Icon */}

                <Ionicons

                    name="information-circle"

                    size={26}

                    color={Colors.primary}

                />

                <View style={styles.textContainer}>

                    <Text style={styles.title}>

                        Before You Submit

                    </Text>

                    <Text style={styles.message}>

                        Please ensure the information you provide is
                        accurate and truthful.

                        {"\n\n"}

                        Clear descriptions and supporting photos help
                        local authorities respond more efficiently.

                    </Text>

                </View>

            </View>

            {/*----------------------------------------------------------
                Submit Button
            ----------------------------------------------------------*/}

            <PrimaryButton

                title="Submit Report"

                loading={loading}

                onPress={onSubmit}

            />

        </View>

    );

}

const styles = StyleSheet.create({

    container: {

        marginTop: Spacing.xxl,

        marginBottom: Spacing.xxl,

    },

    reminderCard: {

        flexDirection: "row",

        backgroundColor: "#EFF6FF",

        borderRadius: Radius.lg,

        padding: Spacing.lg,

        marginBottom: Spacing.xl,

    },

    textContainer: {

        flex: 1,

        marginLeft: Spacing.md,

    },

    title: {

        fontSize: Typography.body,

        fontWeight: "700",

        color: Colors.text,

        marginBottom: Spacing.sm,

    },

    message: {

        fontSize: Typography.small,

        color: Colors.textSecondary,

        lineHeight: 22,

    },

});