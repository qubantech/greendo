import React from 'react';

const WelcomeGuide = () => (
    <div>Welcome guide</div>
);

export default {
    routeProps: {
        path: 'welcome',
        exact: true,
        index: false,
        element: <WelcomeGuide/>,
    },
    name: 'Welcome guide',
};