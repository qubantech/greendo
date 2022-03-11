import React, {useEffect} from 'react';
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "../../app.module/app.configs";
import {useLocation, useNavigate} from "react-router-dom";
import Navigation from "../../app.module/app.layouts/app.navigation/navigation";

const Handbook = () => {
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
            <div>Handbook Module</div>
        </>
    )
};

export default {
    routeProps: {
        path: 'handbook',
        exact: true,
        index: false,
        element: <Handbook/>,
    },
    name: 'Handbook',
};