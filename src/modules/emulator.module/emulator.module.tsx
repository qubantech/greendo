import React, {useEffect, useState} from 'react';
import {Button, Center, Container, Grid, Group, Progress, Space, Text} from "@mantine/core";
import QRCode from "react-qr-code";
import {encryptPayload} from "../../app.module/app.services/app.jwt.service";
import {useUuid} from "@mantine/hooks";
import {useNavigate} from "react-router-dom";
import PhotoCamera from "../camera.module/camera.photo";
import {cameraStore} from "../camera.module/store";

const Emulator = () => {
    //let fundomateId = 0
    let navigate = useNavigate()
    const [fundomateId, setFundomateId] = useState(Math.round(Math.random() * 5))
    const [isHideCamera, setIsHideCamera] = useState(true);
    const [loading, setLoading] = useState(false)

    //const {filled} = cameraStore();
    const [filled, setFilled] = useState({0: 0.0, 1: 0.0, 3: 0.0, 8: 0.0})
    const volume = {0: 0.025, 1: 0.025, 3: 0.05, 8: 0.01}

    const [started, setStarted] = useState(false)
    const [finished, setFinished] = useState(false)
    const [thrownMap, setThrownMap] = useState({})
    const [localAdd, setLocalAdd] = useState({0: 0.0, 1: 0.0, 3: 0.0, 8: 0.0})

    const start = () => {
        setStarted(true)
        setFinished(false)
        setThrownMap({})
    }

    const stop = () => {
        setFinished(true)
        setStarted(false)
    }

    const takeout = (typeId: number) => {
        if (!thrownMap.hasOwnProperty(typeId)) {
            // @ts-ignore
            thrownMap[typeId] = 1
        } else {
            // @ts-ignoreconst
            thrownMap[typeId] += 1
        }
        // @ts-ignore
        filled[typeId] += volume[typeId];
        // @ts-ignore
        localAdd[typeId] += volume[typeId];
        console.log(filled)
        setFilled({...filled})
        setThrownMap({...thrownMap})
    }

    // @ts-ignore
    const isVisible = (typeId: number) => (1.0 - filled[typeId] < volume[typeId])
    const uuid = useUuid()
    console.log(thrownMap)
    console.log(cameraStore().filled)
    console.log(filled)
    return (
        <Container>
            <>
                <Text size={"lg"} align={"center"} weight={"bold"}>FundomateID: {fundomateId}</Text>
                <Space h={"lg"}/>
                <Text align={"center"}>?????????????????????? ?????????????? {"+" + Math.floor(1 / volume[0] * localAdd[0]) || " "}</Text>
                <Progress value={filled[0] * 100}/>
                <Space h={"xs"}/>
                <Text align={"center"}>???????????????????? ?????????? {"+" + Math.floor(1 / volume[1] * localAdd[1]) || " "}</Text>
                <Progress value={filled[1] * 100}/>
                <Space h={"xs"}/>
                <Text align={"center"}>???????????????????? ?????????????? {"+" + Math.floor(1 / volume[3] * localAdd[3]) || " "}</Text>
                <Progress value={filled[3] * 100}/>
                <Space h={"xs"}/>
                <Text align={"center"}>????????????????
                    (??????????????????????????) {"+" + Math.floor(1 / volume[8] * localAdd[8]) || " "}</Text>
                <Progress value={filled[8] * 100}/>
                <Space h={"xs"}/>
            </>
            {!started &&
                <Button fullWidth onClick={() => start()}>????????????</Button>
            }
            {/*<Text size={"sm"}>{JSON.stringify(thrownMap)}</Text>*/}
            {
                started && (
                    <>
                        {!isHideCamera &&
                            <PhotoCamera takeout={takeout} setLoading={setLoading} filled={filled} setFilled={setFilled}
                                         thrownMap={localAdd} setThrownMap={setLocalAdd} volume={volume}/>}
                        <Button fullWidth onClick={() => setIsHideCamera(!isHideCamera)}>????????????????/???????????? ????????????</Button>
                        <Space h={"md"}/>
                        {
                            isHideCamera && (
                                <Group spacing={5} align={"center"} grow direction={'column'}>
                                    <Button fullWidth disabled={isVisible(0)} onClick={() => takeout(0)}>??????????????????????
                                        ??????????????</Button>
                                    <Button fullWidth disabled={isVisible(1)} onClick={() => takeout(1)}>??????????????????????
                                        ??????????</Button>
                                    <Button fullWidth disabled={isVisible(3)} onClick={() => takeout(3)}>????????????????????
                                        ??????????????</Button>
                                    <Button fullWidth disabled={isVisible(8)} onClick={() => takeout(8)}>????????????????</Button>
                                    <Space h={"md"}/>
                                </Group>
                            )
                        }
                    </>
                )
            }
            {started &&
                <Button fullWidth onClick={() => stop()}>??????????????????</Button>
            }

            {finished &&
                <>
                    <Space h={"md"}/>
                    <Center>
                        <QRCode value={encryptPayload(JSON.stringify({
                            thrown: thrownMap,
                            fundomateId: fundomateId,
                            timestamp: new Date().getTime(),
                            filled: filled
                        }))}/>
                    </Center>
                </>
            }
            <Space h={"md"}/>
            <Button fullWidth onClick={() => navigate("/")}>??????????</Button>
        </Container>
    );
}
export default {
    routeProps: {
        path: 'emulator',
        exact: true,
        index: true,
        element: <Emulator/>,
    },
    name: 'Emulator',
};