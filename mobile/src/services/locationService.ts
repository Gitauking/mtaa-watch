/*
|--------------------------------------------------------------------------
| Location Service
|--------------------------------------------------------------------------
|
| PURPOSE
|
| This service communicates with the phone's GPS.
|
| Instead of placing GPS logic directly inside our screens,
| every screen will simply call:
|
|     getCurrentLocation()
|
| This keeps our UI clean and makes the GPS functionality
| reusable throughout the application.
|
| Future Uses
|
| ✓ Report Incident
| ✓ Nearby Incidents
| ✓ Maps
| ✓ Admin Dashboard
|
*/

import * as Location from "expo-location";

/*
|--------------------------------------------------------------------------
| LocationData Interface
|--------------------------------------------------------------------------
|
| This describes the object returned by the service.
|
| TypeScript uses this interface to ensure every location
| contains the same information.
|
*/

export interface LocationData {

    latitude: number;

    longitude: number;

    address: string;

}

/*
|--------------------------------------------------------------------------
| getCurrentLocation()
|--------------------------------------------------------------------------
|
| This function:
|
| 1. Requests permission from the user.
| 2. Reads the GPS coordinates.
| 3. Converts coordinates into a readable address.
| 4. Returns everything in one object.
|
*/

export async function getCurrentLocation(): Promise<LocationData> {

    /*
    ------------------------------------------------------------------------
    Step 1
    Ask the user for permission to access their location.
    ------------------------------------------------------------------------
    */

    const { status } =
        await Location.requestForegroundPermissionsAsync();

    /*
    ------------------------------------------------------------------------
    If permission is denied,
    stop immediately.
    ------------------------------------------------------------------------
    */

    if (status !== "granted") {

        throw new Error(
            "Location permission was denied."
        );

    }

    /*
    ------------------------------------------------------------------------
    Step 2

    Ask the phone for its current GPS coordinates.
    ------------------------------------------------------------------------
    */

    const currentLocation =
        await Location.getCurrentPositionAsync({

            accuracy:
                Location.Accuracy.High,

        });

    /*
    ------------------------------------------------------------------------
    Step 3

    Reverse Geocoding

    GPS coordinates are useful for computers.

    Humans prefer addresses.

    Example

    Latitude:
    -1.2676

    Longitude:
    36.8108

    becomes

    Westlands, Nairobi
    ------------------------------------------------------------------------
    */

    const addressResponse =
        await Location.reverseGeocodeAsync({

            latitude:
                currentLocation.coords.latitude,

            longitude:
                currentLocation.coords.longitude,

        });

    /*
    ------------------------------------------------------------------------
    Sometimes reverse geocoding may not return anything.

    Therefore we provide a default value.
    ------------------------------------------------------------------------
    */

    const firstAddress =
        addressResponse[0];

    /*
|--------------------------------------------------------------------------
| Human Readable Address
|--------------------------------------------------------------------------
|
| Different Android and iOS devices may return different address fields.
|
| We therefore try several possibilities and automatically ignore
| empty values.
|
| Example output:
|
| Westlands, Nairobi
|
| or
|
| Kilimani, Nairobi
|
*/
console.log("Address Response:");
console.log(firstAddress);
const address = [

    firstAddress?.district ||

    firstAddress?.subregion ||

    firstAddress?.street,

    firstAddress?.city ||

    firstAddress?.region,

]

.filter(Boolean)

.join(", ");
    /*
    ------------------------------------------------------------------------
    Step 4

    Return a clean object.

    Every screen in the app will receive exactly
    the same structure.

    {
        latitude,
        longitude,
        address
    }
    ------------------------------------------------------------------------
    */

    return {

        latitude:
            currentLocation.coords.latitude,

        longitude:
            currentLocation.coords.longitude,

        address:
            address || "Unknown Location",

    };

}