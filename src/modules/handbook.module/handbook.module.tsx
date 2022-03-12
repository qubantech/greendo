import React, {useEffect, useState} from 'react';
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "../../app.module/app.configs";
import {useLocation, useNavigate} from "react-router-dom";
import Navigation from "../../app.module/app.layouts/app.navigation/navigation";
import {Card, Container, Grid, Image, Space, Text, Title} from "@mantine/core";
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
import InfoModal from "./infoModal";

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
    let navigate = useNavigate();
    let location = useLocation();

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
    return (
        <Container>
            <InfoModal isOpen={open} setOpen={setOpen} children={children || <div></div>}/>
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
            <Title order={2}> Экогид </Title>
            <Space h={"md"}/>
            {user && <Navigation/>}
            {Object.entries(informations).map((obj)=> {
                console.log(obj)
                return (
                    <>
                        <Card onClick={() => modalinfo(obj[1].desc)} sx={{backgroundColor:"#EEF6FF"}}  shadow="sm" p="lg">
                            <Grid>
                                <Grid.Col span={11}>
                                    <Text size={"md"}>{obj[1].title}</Text>
                                </Grid.Col>
                                <Grid.Col span={1}>
                                    <CaretRightIcon style={{height:20, width: 20}}/>
                                </Grid.Col>
                            </Grid>
                        </Card>
                        <Space h={"xs"}/>
                    </>
                    )
            })}
            <div>Handbook Module</div>
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