import React from 'react';

const Feed = () => (
    <div>Feed Module</div>
);

export default {
    routeProps: {
        path: 'feed',
        exact: true,
        index: true,
        element: <Feed/>,
    },
    name: 'Feed',
};