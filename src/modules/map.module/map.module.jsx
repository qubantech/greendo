import React, {useEffect, useState} from 'react';
import MapContainer from "./map-container.module";
import {Button, Container, Divider, SegmentedControl, Text} from "@mantine/core";
import MapFilter from "./map-filter";
import {useAuthState} from "react-firebase-hooks/auth";
import Navigation from "../../app.module/app.layouts/app.navigation/navigation";
import {auth} from "../../app.module/app.configs";
import {useContainerList} from "../../app.module/app.services/app.container.service";

import placemark from "../../app.module/app.resources/app.resources.map/icons/point_icon.svg";
import {useFundomateList} from "../../app.module/app.services/app.fundomate.service";

const map_model_style = {
    height: "100vh",
    // overflow: "hidden",
    position: "relative",
}

const map_header_style = {
    // marginTop: "15px",
    // boxShadow:"-10px 4px 20px rgba(48, 48, 48, 0.5)",
    borderRadius:"16px 16px 0px 0px",
    padding:"28px 19px 14px 19px",
}

const button_style = {
    backgroundColor:"#EEF6FF",
    color:"#000000",
    fontSize: "15px",
}

const Map = () => {
    const [objectManagerFilter, setObjectManagerFilter] = useState(() => (object) => false);
    const [user, loading, error] = useAuthState(auth);

    const containerList = useContainerList();
    const fundomateList = useFundomateList();

    const [features, setFeatures] = useState({});
    const [containers, setContainers] = useState({});
    const [fundomates, setFundomates] = useState({});
    const [mapMode, setMapMode] = useState("containers");

    const [mapState, setMapState] = useState({center: [45.0360, 38.9746], zoom: 12});

    const onNearestClick = () => {
        setMapState({center: [45.037416, 38.995660], zoom: 15});
    }

    useEffect(() => {
        if (containerList.watchedObject != null) {
            let tempContainers = {
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
                        iconLayout: "default#image",
                        iconImageHref: placemark,
                        iconImageSize: [30, 49],
                    }
                }
                tempContainers.features.push(tempElement);
            })
            setContainers(tempContainers);
            setFeatures(tempContainers);
            setObjectManagerFilter(() => (object) => object.properties.trashTypeIdList.includes(0))
        }
    }, [containerList.watchedObject])

    useEffect( () => {
        if (fundomateList.watchedObject != null) {
            let tempFundomates = {
                "type": "FeatureCollection",
                "features": []
            };

            fundomateList.watchedObject.forEach( (element, index) => {
                let tempElement = {
                    "type": "Feature",
                    "id": element.fundomateId,
                    "geometry": {
                        "type": "Point",
                        "coordinates": [
                            element.location.latitude,
                            element.location.longitude
                        ]
                    },
                    "properties": {
                        "title": "hi mark",
                        // "description": element.description,
                        "trashTypeIdList": element.trashTypeIdList,
                        // "address": element.address,
                    },
                    "options": {
                        iconLayout: "default#image",
                        iconImageHref: placemark,
                        iconImageSize: [30, 49],
                    }
                }
                tempFundomates.features.push(tempElement);
            })
            setFundomates(tempFundomates);
        }
    }, [fundomateList.watchedObject])

    useEffect( () => {
        if (mapMode === "fundomates") {
            setFeatures(fundomates);
            setObjectManagerFilter(() => (object) => true)
        } else {
            setFeatures(containers);
            setObjectManagerFilter(() => (object) => object.properties.trashTypeIdList.includes(0))
        }
    }, [mapMode])


    return (
        <div style={ map_model_style }>
            {
                containerList.watchedObject &&
                <Container style={ map_header_style }>
                    {
                        user && <Navigation/>
                    }
                    <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom:"15px"}}>
                        <Text size="xl" weight="bold" style={{marginBottom:"14px"}}>г. Краснодар</Text>
                        <Text size="sm" color="blue" style={{marginBottom:"14px"}}>Выбрать город</Text>
                    </div>
                    <Button size="lg" fullWidth={true} radius="lg" style={button_style} onClick={onNearestClick}>
                        Ближайшие пункты
                    </Button>
                    <Divider my="sm" />
                    {
                        mapMode === "containers" &&
                            <>
                                <MapFilter setObjectManagerFilter={ setObjectManagerFilter }/>
                                <Divider my="sm" />
                            </>
                    }
                </Container>
            }
            <MapContainer objectManagerFilter={ objectManagerFilter }
                          features={ features }
                          state={mapState}
                          mapMode={mapMode}
            />
            <div style={{
                display: "flex",
                justifyContent: "center",
                width:"100%",
                position: "absolute",
                bottom: 0,
                marginBottom: "50px",
            }}>
                <SegmentedControl
                    value={mapMode}
                    onChange={setMapMode}
                    style={{color: "#000", backgroundColor:"#EEF6FF"}}
                    size="lg"
                    data={[
                        { label: 'Контейнеры', value: 'containers'},
                        { label: 'Фандоматы', value: 'fundomates'}
                    ]}
                />
            </div>
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