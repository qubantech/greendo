import React, { useState } from 'react';
import MapContainer from "./map-container.module";
import {Button, Container, Divider, Grid, Text} from "@mantine/core";
import point_bonus from '../../app.module/app.resources/app.resources.map/icons/point_bonus.svg';
import MapFilter from "./map-filter";
import {useAuthState} from "react-firebase-hooks/auth";
import Navigation from "../../app.module/app.layouts/app.navigation/navigation";
import {auth} from "../../app.module/app.configs";


const map_module_style = {
    boxShadow:"-10px 4px 20px rgba(48, 48, 48, 0.1)",
    borderRadius:"16px 16px 0px 0px",
    padding:"28px 19px 14px 19px",
}

const button_style = {
    backgroundColor:"#F9F9F9",
    color:"#000000"
}



const Map = () => {
    const [objectManagerFilter, setObjectManagerFilter] = useState(() => () => true);
    const [user, loading, error] = useAuthState(auth);

    return (
        <>
            <Container style={ map_module_style }>
                {
                    user && <Navigation/>
                }
                <Text size="xl" weight="bold" style={{marginBottom:"14px"}}>г. Краснодар</Text>
                <Grid justify="space-between">
                    <Grid.Col span={6}>
                        <Button fullWidth={true} style={button_style}>
                            Ближайшие пункты
                        </Button>
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <Button fullWidth={true} style={button_style}>
                            <img
                                src={point_bonus}
                                alt={"bonus"}
                                style={{marginRight:"3px"}}
                            />
                            Самые выгодные
                        </Button>
                    </Grid.Col>
                </Grid>
                <Divider my="sm" />
                <MapFilter setObjectManagerFilter={setObjectManagerFilter}/>
            </Container>
           <MapContainer objectManagerFilter={ objectManagerFilter }/>
        </>
    )
};

export default {
    routeProps: {
        path: 'map',
        exact: true,
        index: false,
        element: <Map/>,
    },
    name: 'map',
};