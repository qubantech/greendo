import React, {useEffect, useState} from 'react';
import MapContainer from "./map-container.module";
import {Button, Container, Divider, Grid, Text} from "@mantine/core";
import point_bonus from '../../app.module/app.resources/app.resources.map/icons/point_bonus.svg';
import MapFilter from "./map-filter";
import {useAuthState} from "react-firebase-hooks/auth";
import Navigation from "../../app.module/app.layouts/app.navigation/navigation";
import {auth} from "../../app.module/app.configs";
import {useContainerList} from "../../app.module/app.services/app.container.service";

const map_model_style = {
    // height: "100vh",
    overflow: "hidden",
}

const map_header_style = {
    boxShadow:"-10px 4px 20px rgba(48, 48, 48, 0.1)",
    borderRadius:"16px 16px 0px 0px",
    padding:"28px 19px 14px 19px",
}

const button_style = {
    backgroundColor:"#F9F9F9",
    color:"#000000",
    fontSize: "13px",
}

const Map = () => {
    const [objectManagerFilter, setObjectManagerFilter] = useState(() => (object) => false);
    const [user, loading, error] = useAuthState(auth);
    const containerList = useContainerList();
    const [features, setFeatures] = useState({})

    const [mapState, setMapState] = useState({center: [45.0360, 38.9746], zoom: 12});

    const onNearestClick = () => {
        setMapState({center: [45.037416, 38.995660], zoom: 15});

    }

    useEffect(() => {
        if (containerList.watchedObject != null) {
            let tempFeatures = {
                "type": "FeatureCollection",
                "features": []
            };

            containerList.watchedObject.forEach( (element, index) => {
                let tempElement = {
                    "type": "Feature",
                    "id": index,
                    "geometry": {
                        "type": "Point",
                        "coordinates": [
                            element.location.latitude,
                            element.location.longitude
                        ]
                    },
                    "properties": {
                        "title": element.title,
                        "description": element.description,
                        "trashTypeIdList": element.trashTypeIdList,
                        "address": element.address,
                    },
                    "options": {
                        "preset": "islands#blueFamilyCircleIcon"
                    }
                }
                tempFeatures.features.push(tempElement);
            })
            setFeatures(tempFeatures);
            setObjectManagerFilter(() => (object) => object.properties.trashTypeIdList.includes(0))
        }
    }, [containerList.watchedObject])

    return (
        <div style={ map_model_style }>
            {
                containerList.watchedObject &&
                <Container style={ map_header_style }>
                    {
                        user && <Navigation/>
                    }
                    <Text size="xl" weight="bold" style={{marginBottom:"14px"}}>г. Краснодар</Text>
                    <Grid justify="space-between">
                        <Grid.Col span={6}>
                            <Button size="md" fullWidth={true} radius="lg" style={button_style}>
                                Ближайшие пункты
                            </Button>
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <Button size="md" fullWidth={true} radius="lg" style={button_style}>
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
                    <MapFilter setObjectManagerFilter={ setObjectManagerFilter }/>
                </Container>
            }
            <MapContainer objectManagerFilter={ objectManagerFilter } features={ features }/>
        </div>
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