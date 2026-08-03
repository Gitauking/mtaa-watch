/*
|--------------------------------------------------------------------------
| Report Incident Screen
|--------------------------------------------------------------------------
|
| PURPOSE
|
| This screen brings together every report-related component
| into one complete reporting workflow.
|
| The screen itself does not contain much UI.
|
| Instead, it coordinates reusable components and stores
| the information entered by the user.
|
| Later this screen will:
|
| ✓ Request GPS location
| ✓ Open the camera/gallery
| ✓ Upload the image
| ✓ Send the report to the Node.js backend
|
*/

/*
|--------------------------------------------------------------------------
| React Hooks
|--------------------------------------------------------------------------
|
| useState
|     Stores values that can change while the app is running.
|
| useEffect
|     Runs code automatically when the screen loads.
|
| i will use useEffect to automatically retrieve the user's
| location as soon as the Report Incident screen opens.
|
*/

import { getCategories, createReport, uploadReportMedia } from "../../src/services/reportService";
import {
    getCurrentLocation,
} from "../../src/services/locationService";

import React, { useState, useEffect } from "react";

import { validateReport } from "../../src/utils/validateReport";


import {
    Alert,
    ActionSheetIOS,
    Platform,
    StyleSheet,
} from "react-native";

import {

    openCamera,

    openGallery,

} from "../../src/services/imageService";

import ScreenLayout from "../../src/components/layout/ScreenLayout";

import AppHeader from "../../src/components/header/AppHeader";

import AppInput from "../../src/components/inputs/AppInput";

import CategorySelector from "../../src/components/report/CategorySelector";

import LocationCard from "../../src/components/report/LocationCard";

import PhotoPicker from "../../src/components/report/PhotoPicker";

import SubmitSection from "../../src/components/report/SubmitSection";

import { Spacing } from "../../src/constants";

/*
|--------------------------------------------------------------------------
| Categories
|--------------------------------------------------------------------------
|
| Eventually these categories will come from PostgreSQL
| or a backend API.
|
*/


// Categories state and loader are declared inside the component below.
export default function ReportIncidentScreen() {

    /*
    |--------------------------------------------------------------------------
    | Report State
    |--------------------------------------------------------------------------
    |
    | Each useState variable stores one piece of information
    | entered by the user.
    |
    | React automatically updates these values whenever
    | the corresponding input changes.
    |
    */

    const [categories, setCategories] = useState<any[]>([]);

    const [selectedCategory, setSelectedCategory] = useState<any | null>(null);

    useEffect(() => {
        const load = async () => {
            try {
                const cats = await getCategories();
                setCategories(cats || []);
                if (cats && cats.length) setSelectedCategory(cats[0]);
            } catch (e) {
                // ignore for now
            }
        };

        load();
    }, []);

    const [title, setTitle] = useState("");

    const [description, setDescription] = useState("");

    /*
    |--------------------------------------------------------------------------
    | Image State
    |--------------------------------------------------------------------------
    |
    | This will later store the URI returned by expo-image-picker.
    |
    */

   const [imageUri, setImageUri] =
    useState<string | undefined | null>();

    /*
    |--------------------------------------------------------------------------
    | Location State
    |--------------------------------------------------------------------------
    |
    | Temporary dummy values.
    |
    | Later these will come from expo-location.
    |
    */
/*
|--------------------------------------------------------------------------
| Current Location
|--------------------------------------------------------------------------
|
| Unlike before, these values are no longer hardcoded.
|
| They start empty and are updated once the GPS
| returns the user's real location.
|
*/

const [location, setLocation] =
    useState("Retrieving location...");

const [latitude, setLatitude] =
    useState(0);

const [longitude, setLongitude] =
    useState(0);

/*
|--------------------------------------------------------------------------
| Location Loading State
|--------------------------------------------------------------------------
|
| This lets us know whether we are currently requesting
| the user's location.
|
| Later we can display a spinner while GPS is loading.
|
*/

const [loadingLocation, setLoadingLocation] =
    useState(false);

   /*
|--------------------------------------------------------------------------
| Handle Report Submission
|--------------------------------------------------------------------------
|
| This function runs whenever the user presses
| the "Submit Report" button.
|
| Our workflow is:
|
| 1. Validate the form.
| 2. If validation fails, stop immediately.
| 3. Otherwise continue with submission.
|
| Later this function will also:
|
| ✓ Upload the image
| ✓ Send data to the backend
| ✓ Navigate back to the Home screen
|
*/

/*
|--------------------------------------------------------------------------
| Load Current Location
|--------------------------------------------------------------------------
|
| This function asks our Location Service to:
|
| 1. Request permission.
| 2. Read GPS coordinates.
| 3. Convert coordinates into an address.
|
| If successful, it updates the screen automatically.
|
*/

const loadCurrentLocation = async () => {

    try {

        setLoadingLocation(true);

        const currentLocation =
            await getCurrentLocation();

        setLocation(currentLocation.address);

        setLatitude(currentLocation.latitude);

        setLongitude(currentLocation.longitude);

    }

    catch (error) {

        console.error(error);

        Alert.alert(

            "Location Error",

            "Unable to retrieve your current location."

        );

    }

    finally {

        setLoadingLocation(false);

    }

};

/*
|--------------------------------------------------------------------------
| Screen Initialization
|--------------------------------------------------------------------------
|
| useEffect runs once when this screen opens.
|
| We immediately request the user's current location.
|
| The empty dependency array [] tells React to execute
| this effect only once.
|
*/

useEffect(() => {

    loadCurrentLocation();

}, []);


/*
|--------------------------------------------------------------------------
| Choose Image
|--------------------------------------------------------------------------
|
| Displays the appropriate image selection UI.
|
| iPhone
|     Native Action Sheet
|
| Android
|     Alert dialog
|
*/

const handlePickImage = async () => {

    /*
    ------------------------------------------------------------------------
    Open Camera
    ------------------------------------------------------------------------
    */

    const takePhoto = async () => {

        try {

            const image =
                await openCamera();

            if (image) {

                setImageUri(image.uri);

            }

        }

        catch (error) {

            Alert.alert(

                "Camera Error",

                error instanceof Error
                    ? error.message
                    : "Unable to open camera."

            );

        }

    };

    /*
    ------------------------------------------------------------------------
    Open Gallery
    ------------------------------------------------------------------------
    */

    const chooseFromGallery = async () => {

        try {

            const image =
                await openGallery();

            if (image) {

                setImageUri(image.uri);

            }

        }

        catch (error) {

            Alert.alert(

                "Gallery Error",

                error instanceof Error
                    ? error.message
                    : "Unable to open gallery."

            );

        }

    };

    /*
    ------------------------------------------------------------------------
    iPhone
    ------------------------------------------------------------------------
    */

    if (Platform.OS === "ios") {

        ActionSheetIOS.showActionSheetWithOptions(

            {

                options: [

                    "Cancel",

                    "Take Photo",

                    "Choose from Library",

                ],

                cancelButtonIndex: 0,

            },

            (buttonIndex) => {

                if (buttonIndex === 1) {

                    takePhoto();

                }

                if (buttonIndex === 2) {

                    chooseFromGallery();

                }

            }

        );

    }

    /*
    ------------------------------------------------------------------------
    Android
    ------------------------------------------------------------------------
    */

    else {

        Alert.alert(

            "Select Image",

            "Choose an option",

            [

                {

                    text: "Take Photo",

                    onPress: takePhoto,

                },

                {

                    text: "Choose from Library",

                    onPress: chooseFromGallery,

                },

                {

                    text: "Cancel",

                    style: "cancel",

                },

            ]

        );

    }

};

const handleSubmit = async () => {

    /*
    ------------------------------------------------------------------------
    Step 1

    Pass the user's input to our validation utility.

    The utility returns:

    {
        valid: true/false,
        errors: [...]
    }
    ------------------------------------------------------------------------
    */

    const validation = validateReport({

        category: selectedCategory !== null ? String(selectedCategory) : "",

        title,

        description,

    });

    /*
    ------------------------------------------------------------------------
    Step 2

    If validation fails, display ALL validation errors.

    i join them together into one message.

    Example

    • Incident title is required.

    • Description must contain at least 20 characters.
    ------------------------------------------------------------------------
    */

    if (!validation.valid) {

        Alert.alert(

            "Please Correct the Following",

            validation.errors.join("\n\n")

        );

        /*
        Stop executing this function.

        We never reach the submission logic.
        */

        return;

    }

    /*
    ------------------------------------------------------------------------
    Step 3

    If validation succeeds,

    continue.

    Right now we simply print the report.

    Later this becomes an API request.
    ------------------------------------------------------------------------
    */

  try {
    console.log("Selected Category:", selectedCategory);
console.log("Category ID:", selectedCategory?.id);
    const reportData = {
        
        categoryId: selectedCategory,

        title: title.trim(),

        description: description.trim(),

        latitude,

        longitude,

        locationName: location,

    };

    console.log("Submitting report:", reportData);

    const response = await createReport(reportData);
    console.log("Created report:", response);
    if (imageUri) {

        console.log("Uploading image...");

        await uploadReportMedia(response.id, imageUri);

        console.log("Image uploaded.");

    }

    console.log("Report created:", response);

    Alert.alert(
        "Success",
        "Your incident report has been submitted successfully."
    );

    // Clear the form
    setSelectedCategory(categories[0] || null);
    setTitle("");
    setDescription("");
    setImageUri(null);

}
catch (error: any) {

    console.log("Create report error:", error);

    Alert.alert(
        "Submission Failed",
        error?.response?.data?.message ||
        error?.message ||
        "Unable to submit your report."
    );

}

};

    return (

        <ScreenLayout>

            {/*----------------------------------------------------------
                Screen Header
            ----------------------------------------------------------*/}

            <AppHeader

                title="Report Incident"

                showBackButton

            />

            {/*----------------------------------------------------------
                Category
            ----------------------------------------------------------*/}

            <CategorySelector

                categories={categories}

                selectedCategory={selectedCategory}

                onSelectCategory={setSelectedCategory}

            />

            {/*----------------------------------------------------------
                Title
            ----------------------------------------------------------*/}

            <AppInput

                label="Incident Title"

                placeholder="Short summary"

                value={title}

                onChangeText={setTitle}

            />

            {/*----------------------------------------------------------
                Description

                Multiline input allows the user to
                explain the issue in more detail.
            ----------------------------------------------------------*/}

            <AppInput

                label="Description"

                placeholder="Describe what happened..."

                value={description}

                onChangeText={setDescription}

            />

            {/*----------------------------------------------------------
                Current Location
            ----------------------------------------------------------*/}
<LocationCard

    location={location}

    latitude={latitude}

    longitude={longitude}

    onRefresh={loadCurrentLocation}

/>

            {/*----------------------------------------------------------
                Evidence Photo
            ----------------------------------------------------------*/}

            <PhotoPicker

    imageUri={imageUri ?? undefined}

    onPickImage={handlePickImage}

/>

            {/*----------------------------------------------------------
                Submit Section
            ----------------------------------------------------------*/}

            <SubmitSection

                onSubmit={handleSubmit}

            />

        </ScreenLayout>

    );

}

const styles = StyleSheet.create({

    /*
    Empty for now.

    As the screen grows, any screen-specific
    styles can be added here.

    Keeping this object now avoids having to
    restructure the file later.
    */

});