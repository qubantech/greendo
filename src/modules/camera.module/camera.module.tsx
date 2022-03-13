import React, { useEffect, useState } from 'react';
import Scanner from "./html5qrcomponents/scanner";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../app.module/app.configs";
import { useNavigate, Navigate, useLocation } from "react-router-dom";
import Navigation from "../../app.module/app.layouts/app.navigation/navigation";

import {Center, SegmentedControl, Box, Space} from '@mantine/core';
import { ColumnsIcon, CameraIcon } from "@radix-ui/react-icons";

import PhotoCamera from "./camera.photo";

const TAB_TYPE = {
    CAMERA: 'camera',
    SCANNER: 'scanner'
}


const Camera = () => {
    const [ user, loading, error ] = useAuthState(auth);
    let navigate = useNavigate();
    let location = useLocation();

    useEffect(() => {
        if (!user) {
            navigate("/");
        }
    }, []);

    const [ tab, setTab ] = useState<string>(TAB_TYPE.SCANNER);

    const cameraOpened = () => tab == TAB_TYPE.CAMERA
    const scannerOpened = () => tab == TAB_TYPE.SCANNER

    return (
        <>
            {user && <Navigation/>}
            {/*{cameraOpened() && <PhotoCamera/>}*/}
            {/*scannerOpened() &&*/} <Scanner/>
            {/*<SegmentedControl sx={{position:"absolute", bottom:"50px", right:"0", width: "100%"}} size={"xl"}
                              data={[
                                  {
                                      value: TAB_TYPE.CAMERA,
                                      label: (
                                          <Center>
                                              <CameraIcon/>
                                              <Box ml={10}>Camera</Box>
                                          </Center>
                                      ),
                                  },
                                  {
                                      value: TAB_TYPE.SCANNER,
                                      label: (
                                          <Center>
                                              <ColumnsIcon/>
                                              <Box ml={10}>Scanner</Box>
                                          </Center>
                                      ),
                                  },
                              ]}
                              onChange={(value) => {
                                  setTab(value)
                              }}
                              defaultValue={TAB_TYPE.SCANNER}
            />*/}
        </>
    )
};

export default {
    routeProps: {
        path: 'scanner',
        exact: true,
        index: false,
        element: <Camera/>,
    },
    name: 'Camera',
};