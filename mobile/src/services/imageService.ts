/*
|--------------------------------------------------------------------------
| Image Service
|--------------------------------------------------------------------------
|
| PURPOSE
|
| This service is responsible for communicating with the
| device camera and photo library.
|
| Instead of placing camera logic directly inside our screens,
| every screen will simply call:
|
|     openCamera()
|
| or
|
|     openGallery()
|
| This keeps our UI clean and reusable.
|
*/

import * as ImagePicker from "expo-image-picker";

/*
|--------------------------------------------------------------------------
| PickedImage Interface
|--------------------------------------------------------------------------
|
| This interface describes the image returned by the service.
|
| We intentionally return more than just the URI because
| later we will upload the image to Cloudinary and may
| need additional information such as width and height.
|
*/

export interface PickedImage {

    uri: string;

    width: number;

    height: number;

}

/*
|--------------------------------------------------------------------------
| openCamera()
|--------------------------------------------------------------------------
|
| Opens the device camera.
|
| Returns:
|
| PickedImage
|
| or
|
| null if the user cancels.
|
*/

export async function openCamera():

Promise<PickedImage | null> {

    /*
    --------------------------------------------------------------
    Ask for camera permission.
    --------------------------------------------------------------
    */

    const permission =
        await ImagePicker.requestCameraPermissionsAsync();

    if (!permission.granted) {

        throw new Error(
            "Camera permission denied."
        );

    }

    /*
    --------------------------------------------------------------
    Open Camera
    --------------------------------------------------------------
    */

    const result =
        await ImagePicker.launchCameraAsync({

            mediaTypes: ["images"],

            allowsEditing: true,

            quality: 0.8,

        });

    /*
    --------------------------------------------------------------
    User cancelled.
    --------------------------------------------------------------
    */

    if (result.canceled) {

        return null;

    }

    /*
    --------------------------------------------------------------
    Return first image.

    Expo returns an array because it supports
    multiple selections.

    We currently only allow one image.
    --------------------------------------------------------------
    */

    const image = result.assets[0];

    return {

        uri: image.uri,

        width: image.width,

        height: image.height,

    };

}

/*
|--------------------------------------------------------------------------
| openGallery()
|--------------------------------------------------------------------------
|
|
| Opens the user's photo library.
|
*/

export async function openGallery():

Promise<PickedImage | null> {

    /*
    --------------------------------------------------------------
    Ask for gallery permission.
    --------------------------------------------------------------
    */

    const permission =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {

        throw new Error(

            "Gallery permission denied."

        );

    }

    /*
    --------------------------------------------------------------
    Open Gallery
    --------------------------------------------------------------
    */

    const result =
        await ImagePicker.launchImageLibraryAsync({

            mediaTypes: ["images"],

            allowsEditing: true,

            quality: 0.8,

        });

    if (result.canceled) {

        return null;

    }

    const image =
        result.assets[0];

    return {

        uri: image.uri,

        width: image.width,

        height: image.height,

    };

}