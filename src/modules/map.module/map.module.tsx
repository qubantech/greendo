import React, {useEffect} from 'react';
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "../../app.module/app.configs";
import {useLocation, useNavigate} from "react-router-dom";
import Navigation from "../../app.module/app.layouts/app.navigation/navigation";

const Map = () => {
    const [user, loading, error] = useAuthState(auth);
    let navigate = useNavigate();
    let location = useLocation();

    useEffect(() => {
        console.log(user)

        if (!user){
            navigate("/");
        }
    },[]);

    return (
        <>
            {user && <Navigation/>}
            <div>Map Module</div>
        </>
    )
};

export default {
    routeProps: {
        path: 'map',
        exact: true,
        index: false,
        element: <Map/>,
    },
    name: 'map',
};