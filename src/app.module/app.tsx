import React, { useEffect } from 'react';

import { auth } from './app.configs';
import { useAuthState } from 'react-firebase-hooks/auth';

import { Loader, ServerError } from './app.components';
import { AuthLayout } from './app.layouts';

import {Link, useNavigate} from 'react-router-dom';
import { CommonModules } from '../modules';
import { useWatchedObject } from "./app.services/app.realtimedb.service";
import { RTDB } from "./app.resources/app.resouces.realtimedb";
import Navigation from "./app.layouts/app.navigation/navigation";
import {Button, Center, Container, Space, Text} from "@mantine/core";
//@ts-ignore
import greendo from "./../modules/handbook.module/img/greengo.svg"


const App = () => {

    const [ user, loading, error ] = useAuthState(auth);
    let navigate = useNavigate();

    const { watchedObject, setWatchedObject } = useWatchedObject<String>(RTDB.SAMPLE_PATH);

    useEffect(() => {
        setWatchedObject('Этот текст отпавляется в базу и возвращается обратно');
        console.log(user, loading, error)
        if (user) {
            navigate("/profile");
        }
    }, [user])

    return (
        <>
            <Space h={100}/>
            <Center>
                <img width={"70%"} src={greendo}/>
            </Center>
            <Space h={"md"}/>
            {/*<div>
                Realtime db demo
                <p>
                    {watchedObject && <strong>Объект в базе: {watchedObject}</strong>}
                </p>
            </div>*/}
            {/*<header>
                <ul>
                    {
                        CommonModules.map(module =>
                            <li key={module.name}>
                                <Link to={module.routeProps.path}>
                                    {module.name}
                                </Link>
                            </li>
                        )
                    }
                </ul>
            </header>*/}
            {user && <Navigation/>}
            {
                error
                && <ServerError/>
                || loading
                && <Loader/>
                || <AuthLayout user={user}/>
            }
            <Container sx={{position:"absolute", bottom:"15px", left:"0px", right:"0px"}}>
                <Button color={"green"} size={"lg"} fullWidth onClick={()=> navigate("/emulator")}>Перейти к эмулятору</Button>
            </Container>
        </>
    );

}

export default {
    routeProps: {
        path: '/',
        exact: true,
        index: false,
        element: <App/>
    },
    name: 'Greendo'
}