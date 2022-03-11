import React, {useEffect} from 'react';
import Scanner from "./html5qrcomponents/scanner";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "../../app.module/app.configs";
import {useNavigate, Navigate, useLocation} from "react-router-dom";
import Navigation from "../../app.module/app.layouts/app.navigation/navigation";

const Camera = () => {
    const [user, loading, error] = useAuthState(auth);
    let navigate = useNavigate();
    let location = useLocation();

   useEffect(() => {
        if (!user){
            navigate("/");
        }
    },[]);

    return (
        <>
            {user && <Navigation/>}
            <Scanner/>
        </>
    )
};

export default {
    routeProps: {
        path: 'scanner',
        exact: true,
        index: false,
        element: <Camera/>,
    },
    name: 'Camera',
};