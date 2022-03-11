import React from 'react';

const Camera = () => (
    <div>Camera Module</div>
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