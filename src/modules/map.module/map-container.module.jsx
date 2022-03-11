import React, { useState } from 'react';
import { YMaps, Map } from "react-yandex-maps";
import {Container, Text} from "@mantine/core";
import ObjectManagerContainer from "./object-manager-container";
import point_address from "../../app.module/app.resources/app.resources.map/icons/point_address.svg";
import point_bonus from "../../app.module/app.resources/app.resources.map/icons/point_bonus.svg";

const initial_objects = {
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "id": 0,
            "geometry": {
                "type": "Point",
                "coordinates": [
                    45.056772,
                    39.018836
                ]
            },
            "properties": {
                "clusterCaption": "Контейнер",
                "content": "Glass",
                "address": {
                    "title": "г.Краснодар ул.Селезнева 88/1"
                }
            },
            "options": {
                "preset": "islands#blueFamilyCircleIcon"
            }
        },
        {
            "type": "Feature",
            "id": 1,
            "geometry": {
                "type": "Point",
                "coordinates": [
                    45.020793,
                    39.007068
                ]
            },
            "properties": {
                "clusterCaption": "Контейнер",
                "content": "Plastic",
                "address": {
                    "title": "г.Краснодар ул.Селезнева 88/1"
                }
            },
            "options": {
                "preset": "islands#blueFamilyCircleIcon"
            }
        }
    ]
}

const placeMarkDescriptionStyle = {
    position:"absolute",
    zIndex:90,
    bottom:0,
    // width: "100%",
    maxWidth: "100vw",
    backgroundColor:"white",
    borderRadius:"16px 16px 0px 0px",
    boxShadow:"-10px 4px 20px rgba(48, 48, 48, 0.1)",
    padding: "27px",
    overflow: "hidden",
    // marginBottom:"50px"
}

const MapContainer = (props) => {
    const [features, setFeatures] = useState(initial_objects);
    const [selectedPoint, setSelectedPoint] = useState(null)

    const onPlacemarkClick = (point) => {
        console.log(point)
        setSelectedPoint(point);
    };
    return (
        <>
            <Container style={{ position:"absolute", bottom:0, padding:0, marginBottom:"50px", width:"100vw"  }}>
                <YMaps>
                    <Map defaultState={{ center: [45.0360, 38.9746], zoom: 13 }} width={ "100%" } height={ "70vh" }>
                        <ObjectManagerContainer
                            features={ features }
                            onPlacemarkClick={ onPlacemarkClick }
                            objectManagerFilter={ props.objectManagerFilter }
                        />
                    </Map>
                </YMaps>
                {selectedPoint && (
                    <div style={placeMarkDescriptionStyle}>
                        <Text size="lg" style={{marginBottom: "14px", }}>{selectedPoint.properties.clusterCaption}</Text>
                        <Text size="sm" style={{marginBottom: "14px", color:"#5C5C5C" }}>
                            <img
                                height={"26px"}
                                width={"26px"}
                                src={point_address}
                                alt={"address"}
                                style={{verticalAlign: "middle", paddingRight: "10px"}}
                            />
                            {selectedPoint.properties.address.title}
                        </Text>
                        <Text size="sm">
                            <img
                                height={"17px"}
                                width={"17px"}
                                src={point_bonus}
                                alt={"bonus"}
                                style={{verticalAlign: "middle", paddingRight: "10px"}}
                            />
                            За стекло здесь вы получите больше валюты
                        </Text>
                    </div>
                )}
            </Container>
        </>
    )
};

export default MapContainer;