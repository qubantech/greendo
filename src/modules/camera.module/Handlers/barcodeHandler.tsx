import React from 'react';
import {useParams} from "react-router-dom";
import {Text} from "@mantine/core";

const BarcodeHandler = () => {
    let params = useParams();
    console.log(params.number)
    return (
        <div>

            <Text color={"black"}>{params.number}</Text>
        </div>
    );
};

export default {
    routeProps: {
        path: '/barcode/:number',
        exact: true,
        index: false,
        element: <BarcodeHandler/>,
    },
    name: 'Camera',
};
//export default BarcodeHandler;