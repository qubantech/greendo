import React from 'react';

const Map = () => (
    <div>Map Module</div>
);

export default {
    routeProps: {
        path: 'map',
        exact: true,
        index: false,
        element: <Map/>,
    },
    name: 'map',
};