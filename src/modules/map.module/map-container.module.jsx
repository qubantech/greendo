import React, { useState } from 'react';
import { YMaps, Map } from "react-yandex-maps";
import {Container, Text} from "@mantine/core";
import ObjectManagerContainer from "./object-manager-container";
import point_address from "../../app.module/app.resources/app.resources.map/icons/point_address.svg";
import point_bonus from "../../app.module/app.resources/app.resources.map/icons/point_bonus.svg";
import {Cross1Icon} from "@radix-ui/react-icons";
import purse from "../../app.module/app.resources/app.resources.map/icons/purse.svg";


const placeMarkDescriptionStyle = {
    position:"absolute",
    zIndex:2,
    bottom:0,
    width: "100%",
    maxWidth: "87vw",
    backgroundColor:"white",
    borderRadius:"16px 16px 0px 0px",
    boxShadow:"-10px -5px 20px rgba(48, 48, 48, 0.2)",
    padding: "27px",
    overflow: "hidden",
    // marginBottom:"50px"
}

const mapContainerStyle = {
    position:"absolute",
    bottom:0,
    padding:0,
    marginBottom:"97px",
    width:"100vw",
    // height: "100%",
    boxShadow:"0px 40px 20px -10px  rgba(48, 48, 48, 0.1) inset",
}

const MapContainer = (props) => {
    const [selectedPoint, setSelectedPoint] = useState(null)

    const onPlacemarkClick = (point) => {
        setSelectedPoint(point);
    };
    return (
        <>
            <Container style={{
                ...mapContainerStyle,
            }}>
                <YMaps>
                    <Map state={props.state} width={ "100%" } height={  props.mapMode === "containers" ? "45vh" : "60vh" }>
                        <ObjectManagerContainer
                            features={ props.features }
                            onPlacemarkClick={ onPlacemarkClick }
                            objectManagerFilter={ props.objectManagerFilter }
                        />
                    </Map>
                </YMaps>
                {selectedPoint && props.mapMode === "containers" && (
                    // <ContainerInfo
                    //     placeMarkDescriptionStyle={placeMarkDescriptionStyle}
                    //     selectedPoint={selectedPoint}
                    //     setSelectedPoint={setSelectedPoint}
                    // />
                    <div style={{ ...placeMarkDescriptionStyle }}>
                        <div style={{display: "flex", justifyContent: "space-between"}}>
                            <Text size="lg" style={{marginBottom: "14px", }}>{selectedPoint.title && selectedPoint.title || "Контейнер"}</Text>
                            <Cross1Icon style={{fontSize: "20px"}}
                                        onClick={() => {
                                            setSelectedPoint(null);
                                        }}
                            />
                        </div>
                        <Text size="sm" style={{marginBottom: "14px", color:"#5C5C5C" }}>
                            <img
                                height={"26px"}
                                width={"26px"}
                                src={point_address}
                                alt={"address"}
                                style={{verticalAlign: "middle", paddingRight: "10px"}}
                            />
                            {selectedPoint.properties.address && selectedPoint.properties.address || "г. Краснодар" }
                        </Text>
                        <Text size="sm">
                            <img
                                height={"20px"}
                                width={"20px"}
                                src={point_bonus}
                                alt={"bonus"}
                                style={{verticalAlign: "middle", paddingRight: "13px", paddingLeft: "3px"}}
                            />
                            Контейнер доступен
                        </Text>
                    </div>
                )}

                {selectedPoint && props.mapMode === "fundomates" && (
                    // <FundomatInfo placeMarkDescriptionStyle={placeMarkDescriptionStyle}/>
                    <div style={{...placeMarkDescriptionStyle}}>
                        <div style={{display: "flex", justifyContent: "space-between"}}>
                            <Text size="lg" style={{marginBottom: "14px", }}>{selectedPoint.title && selectedPoint.title || "Фандомат"}</Text>
                            <Cross1Icon style={{fontSize: "20px"}}
                                        onClick={() => {
                                            setSelectedPoint(null);
                                        }}
                            />                        </div>
                        <Text size="sm" style={{marginBottom: "14px", color:"#5C5C5C" }}>
                            <img
                                height={"26px"}
                                width={"26px"}
                                src={purse}
                                alt={"address"}
                                style={{verticalAlign: "middle", paddingRight: "10px"}}
                            />
                            Здесь вы получите 10 гринов
                        </Text>
                        <Text size="sm">
                            <img
                                height={"20px"}
                                width={"20px"}
                                src={point_bonus}
                                alt={"purse"}
                                style={{verticalAlign: "middle", paddingRight: "13px", paddingLeft: "3px"}}
                            />
                            Контейнер заполнен на 20% процентов
                        </Text>
                    </div>
                )}

            </Container>
        </>
    )
};

export default MapContainer;