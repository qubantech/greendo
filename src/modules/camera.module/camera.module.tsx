import React from 'react';
import Scanner from "./html5qrcomponents/scanner";

const Camera = () => (
    <>
        <Scanner/>
    </>
);

export default {
    routeProps: {
        path: 'scanner',
        exact: true,
        index: false,
        element: <Camera/>,
    },
    name: 'Camera',
};