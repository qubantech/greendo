import React, {useEffect} from 'react';
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "../../app.module/app.configs";
import {useNavigate} from "react-router-dom";
import Navigation from "../../app.module/app.layouts/app.navigation/navigation";

const Exchange = () => {
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate()
    useEffect(() => {
        if (!user){
            navigate("/");
        }
    },[]);
    return (
        <>
            {user && <Navigation/>}
            <div>Exchange</div>
        </>
    );
}

export default {
    routeProps: {
        path: 'exchange',
        exact: true,
        index: true,
        element: <Exchange/>,
    },
    name: 'Exchange',
};