import { useEffect, useState } from "react";

import {
    getAccessToken,
    getUser
} from "../utils/storage";

const useAuth = () => {

    const [user, setUser] = useState(null);

    const [token, setToken] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        checkAuthentication();

    }, []);

    const checkAuthentication = async () => {

        try {

            console.log("================================");
            console.log("Checking authentication...");
            console.log("================================");

            const storedToken = await getAccessToken();

            const storedUser = await getUser();

            setToken(storedToken);

            setUser(storedUser);

            console.log(
                storedToken
                    ? "User is authenticated."
                    : "No active session."
            );

        } catch (error) {

            console.error("Authentication check failed.");
            console.error(error);

        } finally {

            setLoading(false);

        }

    };

    return {

        loading,
        token,
        user,
        isAuthenticated: !!token,
        refreshAuth: checkAuthentication

    };

};

export default useAuth;