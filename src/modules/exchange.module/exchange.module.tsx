import React, {useEffect, useState} from 'react';
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "../../app.module/app.configs";
import {useNavigate} from "react-router-dom";
import Navigation from "../../app.module/app.layouts/app.navigation/navigation";
import {ActionIcon, Card, Container, Grid, Group, Image, Space, Text, Title} from "@mantine/core";
import {useGiveawayList} from "../../app.module/app.services/app.giveaway.service";
import {useOrderSale, useSaleList} from "../../app.module/app.services/app.sale.service";
// @ts-ignore
import green from "../profile.module/img/greens.svg";
import InfoModal from "../handbook.module/infoModal";
import StatusModal from "./statusModal";

const Exchange = () => {
    const [user, loading, error] = useAuthState(auth);
    const giveaway = useGiveawayList()
    const sale = useSaleList()
    const navigate = useNavigate()
    const buysale = useOrderSale(user?.uid || "s")
    const [open, setOpen] = useState(false);
    const [children, setChildren] = useState<JSX.Element>();
    const modalinfo = (obj:JSX.Element) => {
        setOpen(true);
        setChildren(obj);
    }
    useEffect(() => {
        if (!user){
            navigate("/");
        }
    },[]);
    const sales = (id:number) => {
        console.log(id)
        buysale(id)
            .then((res)=> {
                modalinfo(<Title order={2}>Купон успешно куплен</Title>)
        })
            .catch((error) => {
                modalinfo(<Title order={2}>Ошибка при покупке купона. Точно не покупали раньше?</Title>)
            })
    }
    return (
        <>
            {user && <Navigation/>}
            <Container>
                <StatusModal isOpen={open} setOpen={setOpen} children={children || <div></div>}/>
                <Space h={"md"}/>
                <Title order={2}>Обмен греенов</Title>
                <Space h={"lg"}/>
                <Title order={3}>Скидки</Title>
                {/*{giveaway.watchedObject}*/}
                {sale.watchedObject && Object.entries(sale.watchedObject).map((obj) => {
                    console.log(obj)
                    return (
                        <>
                        <Card onClick={() => sales(obj[1]?.saleId || 0)} sx={{backgroundColor:"#EEF6FF"}} shadow="sm" p="md">
                            <Grid gutter={"md"}>
                                <Grid.Col gutter={20} span={2}>
                                    <ActionIcon size={45} style={{backgroundColor:"blue"}}  radius={"xl"}>
                                        <div></div>
                                    </ActionIcon>
                                </Grid.Col>
                                <Grid.Col span={6} >
                                    <Text size={"lg"} weight={"bold"}>
                                        {
                                            obj[1]?.brand
                                        }
                                    </Text>
                                    <Text color={"blue"} size={"sm"}>
                                        { obj[1]?.description}
                                    </Text>
                                </Grid.Col>
                                <Grid.Col span={4} sx={{paddingLeft:"5vw"}}>
                                    <Group align={"right"} grow>
                                        <Text>Скидка {Number(obj[1]?.value) * 100}%</Text>
                                    </Group>
                                    <Group direction={"row"} align={"left"} spacing={5}>
                                        <Image width={18} src={green}/>
                                        <Text size={"sm"}>{obj[1]?.price} G</Text>
                                    </Group>
                                </Grid.Col>
                            </Grid>
                        </Card>
                            <Space h={"md"}/>
                        </>
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