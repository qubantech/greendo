import React, {useState} from 'react';
import {Button} from "@mantine/core";
import QRCode from "react-qr-code";
import {encryptPayload} from "../../app.module/app.services/app.jwt.service";
import {useUuid} from "@mantine/hooks";

export const Emulator = () => {
    const fundomateId = Math.round(Math.random() * 5)

    const [filled, setFilled] = useState({0: 0.0, 1: 0.0, 3: 0.0, 8: 0.0})
    const volume = {0: 0.025, 1: 0.025, 3: 0.05, 8: 0.01}

    const [started, setStarted] = useState(false)
    const [finished, setFinished] = useState(false)
    const [thrownMap, setThrownMap] = useState({})

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
            // @ts-ignore
            thrownMap[typeId] += 1
        }
        // @ts-ignore
        filled[typeId] += volume[typeId];
        setFilled({...filled})
        setThrownMap({...thrownMap})
    }

    // @ts-ignore
    const isVisible = (typeId: number) => (1.0 - filled[typeId] < volume[typeId])
    const uuid = useUuid()
    return (
        <>
            {!started &&
                <Button onClick={() => start()}>Начать</Button>
            }
            <p>{JSON.stringify(thrownMap)}</p>
            {
                started && (<>
                        <Button disabled={isVisible(0)} onClick={() => takeout(0)}>Пластиковая
                            бутылка</Button>
                        <Button disabled={isVisible(1)} onClick={() => takeout(1)}>Алюминиевая
                            банка</Button>
                        <Button disabled={isVisible(3)} onClick={() => takeout(3)}>Стеклянная
                            бутылка</Button>
                        <Button disabled={isVisible(8)} onClick={() => takeout(8)}>Крышечка</Button>
                    </>
                )
            }
            {started &&
                <Button onClick={() => stop()}>Закончить</Button>
            }

            {finished &&
                <QRCode value={encryptPayload(JSON.stringify({
                    thrown: thrownMap,
                    fundomateId: fundomateId,
                    timestamp: new Date().getTime(),
                    filled: filled
                }))}/>}

        </>
    );
}