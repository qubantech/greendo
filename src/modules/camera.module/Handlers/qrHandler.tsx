import React from 'react';
import {useParams} from "react-router-dom";

const QRHandler = () => {
    let params = useParams();
    return (
        <div>
            {params.number}
        </div>
    );
};

export default {
    routeProps: {
        path: '/qrcode/:number',
        exact: true,
        index: false,
        element: <QRHandler/>,
    },
    name: 'Camera',
};
//export default BarcodeHandler;