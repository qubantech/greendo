import React from 'react';
import {Text} from "@mantine/core";
import {Cross1Icon} from "@radix-ui/react-icons";
import point_address from "../../app.module/app.resources/app.resources.map/icons/point_address.svg";
import point_bonus from "../../app.module/app.resources/app.resources.map/icons/point_bonus.svg";

const ContainerInfo = ( placeMarkDescriptionStyle, selectedPoint, setSelectedPoint  ) => {
     console.log(selectedPoint)
    return (
        <div style={{ ...placeMarkDescriptionStyle }}>
            <div style={{display: "flex", justifyContent: "space-between"}}>
                <Text size="lg" style={{marginBottom: "14px", }}>{selectedPoint.title && selectedPoint.title || "Контейнер"}</Text>
                <Cross1Icon style={{fontSize: "20px"}} onClick={() => setSelectedPoint(null)}/>
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
    );
};

export default ContainerInfo;