import React, {useEffect} from 'react';
import Scanner from "./html5qrcomponents/scanner";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "../../app.module/app.configs";
import {useNavigate, Navigate, useLocation} from "react-router-dom";

const Camera = () => {
    const [user, loading, error] = useAuthState(auth);
    /*let navigate = useNavigate();
    let location = useLocation();

   useEffect(() => {
        console.log(user)

        if (!user){
            navigate("/");
        }
    },[]);*/

    /*if (!user) {
        return <Navigate to="/" state={{ from: location }} replace />;
    } else*/
    return (
        <>
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