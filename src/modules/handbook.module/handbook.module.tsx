import React, {useEffect, useState} from 'react';
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "../../app.module/app.configs";
import {useLocation, useNavigate} from "react-router-dom";
import Navigation from "../../app.module/app.layouts/app.navigation/navigation";
import {Card, Container, Grid, Group, Image, LoadingOverlay, Space, Text, Title} from "@mantine/core";
import {CaretRightIcon} from "@radix-ui/react-icons";
import {Pagination} from "swiper";
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css";
import "swiper/css/pagination";
//@ts-ignore
import Carousel1 from "../profile.module/img/carousel1.svg";
//@ts-ignore
import Carousel2 from "../profile.module/img/carousel1.svg";
//@ts-ignore
import Carousel3 from "../profile.module/img/carousel3.png";
//@ts-ignore
import Carousel4 from "../profile.module/img/сarousel4.png";
//@ts-ignore
import greendo from "./img/greengo.svg";
import {useTrashType, useTrashTypeList} from "../../app.module/app.services/app.type.service";

const informations = {
    1: {
        title: "Пластиковые бутылки/упаковка",
        desc: (
            <div>sas</div>
        )
    },
    2: {
        title: "Стеклянные бутылки",
        desc: (
            <div>cock</div>
        )
    }
}


const Handbook = () => {
    const [user, loading, error] = useAuthState(auth);
    const trashtype = useTrashTypeList()
    let navigate = useNavigate();
    let i:number = 0;
    useEffect(() => {
        if (!user){
            navigate("/");
        }
    },[]);
    return (
        <Container>
            <Space h={"md"}/>
            <Swiper
                direction={"horizontal"}
                pagination={{
                    clickable: true,
                }}
                autoHeight={true}
                autoplay={true}
                slidesPerView={1}
                spaceBetween={1}
                modules={[Pagination]}
                className="mySwiper"
            >
                <SwiperSlide><Image src={Carousel1}/></SwiperSlide>
                <SwiperSlide><Image src={Carousel3}/></SwiperSlide>
                <SwiperSlide><Image src={Carousel2}/></SwiperSlide>
                <SwiperSlide><Image src={Carousel4}/></SwiperSlide>
            </Swiper>
            <Space h={"md"}/>
            <Group direction={"row"} grow position={"apart"}>
                <Image width={"150px"} src={greendo}/>
                <Title pt={8} align={"right"} order={3}> ЭКОГИД</Title>
            </Group>
            <Space h={"md"}/>
            {user && <Navigation/>}
            {trashtype.watchedObject && (trashtype.watchedObject.map((obj, index)=> {
                return (
                    <>
                        <Card key={index} onClick={() => navigate(`/handbook/${index}`)} sx={{backgroundColor:"#EEF6FF"}}  shadow="sm" p="xs">
                            <Grid align={"center"}>
                                <Grid.Col span={2}>
                                    <Image width={40} src={obj?.imageUrl}/>
                                </Grid.Col>
                                <Grid.Col span={8}>
                                    {
                                        //@ts-ignore
                                    }
                                    <Text size={"md"}>{obj?.name|| "sas"}</Text>
                                </Grid.Col>
                                <Grid.Col span={2}>
                                    <CaretRightIcon style={{height:40, width: 40}}/>
                                </Grid.Col>
                            </Grid>
                        </Card>
                        <Space h={"xs"}/>
                    </>
                    )
            })) || <LoadingOverlay visible={true}/>}
            <Space h={70}/>
        </Container>
    )
};

export default {
    routeProps: {
        path: 'handbook',
        exact: true,
        index: false,
        element: <Handbook/>,
    },
    name: 'Handbook',
};