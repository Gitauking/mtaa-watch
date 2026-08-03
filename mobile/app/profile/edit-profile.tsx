/*
|--------------------------------------------------------------------------
| Edit Profile Screen
|--------------------------------------------------------------------------
|
| Allows the logged-in user to:
| • Update profile information
| • Change password
|
*/

import React, {
    useEffect,
    useState,
} from "react";

import {
    Alert,
    ScrollView,
    StyleSheet,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { router } from "expo-router";

import AppHeader from "../../src/components/header/AppHeader";
import AppInput from "../../src/components/inputs/AppInput";
import PrimaryButton from "../../src/components/buttons/PrimaryButton";

import {
    Colors,
    Typography,
    Spacing,
} from "../../src/constants";

import {

    getProfile,

    updateProfile,

    changePassword

} from "../../src/services/profileService";

export default function EditProfileScreen() {

    /*
    |--------------------------------------------------------------------------
    | State
    |--------------------------------------------------------------------------
    */

    const [firstName, setFirstName] = useState("");

    const [lastName, setLastName] = useState("");

    const [email, setEmail] = useState("");

    const [currentPassword, setCurrentPassword] = useState("");

    const [newPassword, setNewPassword] = useState("");

    const [confirmPassword, setConfirmPassword] = useState("");

    const [loading, setLoading] = useState(false);

    /*
    |--------------------------------------------------------------------------
    | Load Profile
    |--------------------------------------------------------------------------
    */

    useEffect(() => {

        loadProfile();

    }, []);

    const loadProfile = async () => {

        try {

            const user = await getProfile();

            setFirstName(user.first_name);

            setLastName(user.last_name);

            setEmail(user.email);

        } catch (error) {

            console.error(error);

        }

    };

    /*
    |--------------------------------------------------------------------------
    | Update Profile
    |--------------------------------------------------------------------------
    */

    const handleSaveProfile = async () => {

        try {

            setLoading(true);

            await updateProfile({

                firstName,

                lastName,

                email,

            });

            Alert.alert(

                "Success",

                "Profile updated successfully."

            );

        } catch (error) {

            Alert.alert(

                "Error",

                (error as any).response?.data?.message ||

                (error as any).message ||

                "An error occurred"

            );

        } finally {

            setLoading(false);

        }

    };

    /*
    |--------------------------------------------------------------------------
    | Change Password
    |--------------------------------------------------------------------------
    */

    const handleChangePassword = async () => {

        if (newPassword !== confirmPassword) {

            return Alert.alert(

                "Error",

                "Passwords do not match."

            );

        }

        try {

            setLoading(true);

            await changePassword(

                currentPassword,

                newPassword

            );

            setCurrentPassword("");

            setNewPassword("");

            setConfirmPassword("");

            Alert.alert(

                "Success",

                "Password changed successfully."

            );

        } catch (error) {

            const errorMessage = error instanceof Error ? error.message : typeof error === 'object' && error !== null && 'response' in error ? (error as any).response?.data?.message : 'An error occurred';

            Alert.alert(

                "Error",

                errorMessage

            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <SafeAreaView style={styles.container}>

            <ScrollView
                contentContainerStyle={styles.content}
            >

                <AppHeader
                    title="Edit Profile"
                    showBackButton
                    onBackPress={() => router.back()}
                />

                <AppInput
                    label="First Name"
                    value={firstName}
                    placeholder="First Name"
                    onChangeText={setFirstName}
                />

                <AppInput
                    label="Last Name"
                    value={lastName}
                    placeholder="Last Name"
                    onChangeText={setLastName}
                />

                <AppInput
                    label="Email Address"
                    value={email}
                    placeholder="Email Address"
                    onChangeText={setEmail}
                    autoCapitalize="none"
                    keyboardType="email-address"
                />

                <PrimaryButton
                    title="Save Changes"
                    loading={loading}
                    onPress={handleSaveProfile}
                />

                <AppInput
                    label="Current Password"
                    placeholder="Current Password"
                    secureTextEntry
                    value={currentPassword}
                    onChangeText={setCurrentPassword}
                />

                <AppInput
                    label="New Password"
                    placeholder="New Password"
                    secureTextEntry
                    value={newPassword}
                    onChangeText={setNewPassword}
                />

                <AppInput
                    label="Confirm Password"
                    placeholder="Confirm Password"
                    secureTextEntry
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                />

                <PrimaryButton
                    title="Change Password"
                    loading={loading}
                    onPress={handleChangePassword}
                />

            </ScrollView>

        </SafeAreaView>

    );

}

const styles = StyleSheet.create({

    container: {

        flex: 1,

        backgroundColor: Colors.background,

    },

    content: {

        padding: Spacing.lg,

    },

});