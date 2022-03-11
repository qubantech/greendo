import React from 'react';

const Handbook = () => (
    <div>Handbook Module</div>
);

export default {
    routeProps: {
        path: 'handbook',
        exact: true,
        index: false,
        element: <Handbook/>,
    },
    name: 'Handbook',
};