/*
|--------------------------------------------------------------------------
| PhotoPicker Component
|--------------------------------------------------------------------------
|
| PURPOSE
|
| Allows the user to attach a photo as evidence.
|
| WHY?
|
| Images help administrators verify reports and
| understand the severity of an incident.
|
| CURRENT VERSION
|
| • Shows an upload area
| • Shows an image preview if one exists
|
| FUTURE VERSION
|
| • Open Camera
| • Open Gallery
| • Upload image to backend
|
*/

import React from "react";

import {

    View,

    Text,

    TouchableOpacity,

    Image,

    StyleSheet,

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
| imageUri
|     Stores the selected image.
|
| onPickImage
|     Called whenever the user wants to
|     select or change an image.
|
*/

type PhotoPickerProps = {

    imageUri?: string;

    onPickImage: () => void;

};

export default function PhotoPicker({

    imageUri,

    onPickImage,

}: PhotoPickerProps) {

    return (

        <View>

            <Text style={styles.label}>

                Evidence Photo

            </Text>

            <TouchableOpacity

                style={styles.container}

                onPress={onPickImage}

            >

                {/*
                ------------------------------------------------------
                If imageUri exists

                show image

                otherwise

                show upload placeholder.
                ------------------------------------------------------
                */}

                {

                    imageUri ? (

                        <Image

                            source={{ uri: imageUri }}

                            style={styles.image}

                        />

                    ) : (

                        <View style={styles.placeholder}>

                            <Ionicons

                                name="camera"

                                size={48}

                                color={Colors.primary}

                            />

                            <Text style={styles.placeholderText}>

                                Tap to Add Photo

                            </Text>

                        </View>

                    )

                }

            </TouchableOpacity>

            {/*------------------------------------------------------
                Change Photo

                Only appears after an image
                has been selected.
            ------------------------------------------------------*/}

            {

                imageUri && (

                    <TouchableOpacity

                        onPress={onPickImage}

                    >

                        <Text style={styles.changePhoto}>

                            Change Photo

                        </Text>

                    </TouchableOpacity>

                )

            }

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

    container: {

        height: 220,

        backgroundColor: Colors.white,

        borderRadius: Radius.lg,

        borderWidth: 2,

        borderColor: Colors.primary,

        borderStyle: "dashed",

        overflow: "hidden",

        justifyContent: "center",

        alignItems: "center",

    },

    placeholder: {

        alignItems: "center",

    },

    placeholderText: {

        marginTop: Spacing.md,

        fontSize: Typography.body,

        color: Colors.textSecondary,

    },

    image: {

        width: "100%",

        height: "100%",

    },

    changePhoto: {

        marginTop: Spacing.md,

        textAlign: "center",

        color: Colors.primary,

        fontWeight: "700",

    },

});