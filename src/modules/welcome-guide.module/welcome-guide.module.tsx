import React from 'react';
import {Button} from "@mantine/core";
import {useNavigate} from "react-router-dom";

const WelcomeGuide = () => {
    const navigate = useNavigate();

    return(
    <>
        <div>Welcome guide</div>
        <Button onClick={() => navigate("/profile")}>
            К профилю
        </Button>
    </>
    )
};

export default {
    routeProps: {
        path: 'welcome',
        exact: true,
        index: false,
        element: <WelcomeGuide/>,
    },
    name: 'Welcome guide',
};