import React, {useEffect} from 'react';
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "../../app.module/app.configs";
import {useNavigate} from "react-router-dom";
import Navigation from "../../app.module/app.layouts/app.navigation/navigation";
import {ActionIcon, Card, Container, Grid, Space, Text, Title} from "@mantine/core";
import {useGiveawayList} from "../../app.module/app.services/app.giveaway.service";
import {useSaleList} from "../../app.module/app.services/app.sale.service";

const Exchange = () => {
    const [user, loading, error] = useAuthState(auth);
    const giveaway = useGiveawayList()
    const sale = useSaleList()
    const navigate = useNavigate()
    useEffect(() => {
        if (!user){
            navigate("/");
        }
    },[]);
    return (
        <>
            {user && <Navigation/>}
            <Container>
                <Space h={"md"}/>
                <Title order={2}>Обмен греенов</Title>
                <Space h={"lg"}/>
                <Title order={3}>Скидки</Title>
                {/*{giveaway.watchedObject}*/}
                {sale.watchedObject && Object.entries(sale.watchedObject).map((obj) => {
                    console.log(obj)
                    return (<></>
                        /*<Card sx={{backgroundColor:"#EEF6FF"}} key={obj.} shadow="sm" p="md">
                            <Grid gutter={"md"}>
                                <Grid.Col gutter={20} span={2}>
                                    <ActionIcon size={45} style={{backgroundColor:"blue"}}  radius={"xl"}>
                                        <div></div>
                                    </ActionIcon>
                                </Grid.Col>
                                <Grid.Col span={8} >
                                    <Text size={"lg"} weight={"bold"}>
                                        {//@ts-ignore
                                            orglist.watchedObject && orglist.watchedObject[Number(obj.subscriptionId)].brand || "Brand"}
                                    </Text>
                                    <Text color={"blue"} size={"sm"}> Greengo добавил {
                                        userdata.watchedObject && Math.floor(Number(Math.floor(userdata.watchedObject?.level / 100)+1)*1.1*obj.sum-obj.sum) } руб
                                    </Text>
                                </Grid.Col>
                                <Grid.Col span={2} sx={{paddingLeft:"5vw"}}>
                                    <Text>{obj.sum}</Text>
                                    <Text size={"xs"}>руб/месяц</Text>
                                </Grid.Col>
                            </Grid>
                        </Card>*/
                    )

                })}
            </Container>
        </>
    );
}

export default {
    routeProps: {
        path: 'exchange',
        exact: true,
        index: true,
        element: <Exchange/>,
    },
    name: 'Exchange',
};