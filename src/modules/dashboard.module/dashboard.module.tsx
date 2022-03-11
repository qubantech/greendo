import React from 'react';

const Dashboard = () => (
    <div>Dashboard Module</div>
);

export default {
    routeProps: {
        path: 'dashboard',
        exact: true,
        index: false,
        element: <Dashboard/>,
    },
    name: 'Dashboard',
};