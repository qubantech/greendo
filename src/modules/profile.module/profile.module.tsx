import React, {useEffect} from 'react';
import {Avatar, Container, Group, Image, Progress, Text, Card, Space} from "@mantine/core";
import {useLocation, useNavigate} from "react-router-dom";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "../../app.module/app.configs";
import Navigation from "../../app.module/app.layouts/app.navigation/navigation";
import {stringToColor} from "./generateColor";
import {CaretRightIcon, GearIcon} from "@radix-ui/react-icons";
import { Swiper, SwiperSlide } from 'swiper/react';
import {Pagination} from "swiper";
//@ts-ignore
import Carousel1 from "./img/carousel1.svg"
//@ts-ignore
import Carousel2 from "./img/carousel1.svg"
import "swiper/css";
import "swiper/css/pagination";

const createCarouselItemImage = (index:number, options = {}) => (
    <div key={index}>
        <Image src={`./img/carousel${index}.svg`} />
        <p className="legend">Legend {index}</p>
    </div>
);

const baseChildren = <div>{[1, 2].map(createCarouselItemImage)}</div>;

const Profile = () => {
    const [user, loading, error] = useAuthState(auth);
    let navigate = useNavigate();
    let location = useLocation();

    let color
    useEffect(() => {
        console.log(user)
        //color = stringToColor(user?.uid || "sd")
        if (!user){
            navigate("/");
        }
        else {

        }
    },[]);
    // @ts-ignore
    return (
    <>
        {user && <Navigation/>}
        <Container >
            <Group direction={"column"} grow>
                <Group direction={"row"} spacing={"md"} position={"apart"} grow>
                    <Group direction={"row"}>
                        <Avatar sx={{width: "15vw", height: "15vw" ,backgroundColor: stringToColor(user?.uid || "sd")}}  radius={"xl"} >U</Avatar>
                        <Text size={"xl"}>{user?.displayName || "Name"}</Text>
                        <CaretRightIcon style={{height:20, width: 20}}/>
                    </Group>
                    <Group direction={"column"} spacing={2} grow>
                        <Text align={"right"} size={"xs"}>Отвественный потребитель</Text>
                        <Progress size={10} color={"blue"} value={50}/>
                    </Group>
                </Group>
            </Group>
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
                <SwiperSlide><Image src={Carousel2}/></SwiperSlide>
            </Swiper>
            <Space h={"md"}/>
            <Group spacing={"md"} direction={"row"} grow align={"apart"}>
                <Card sx={{backgroundColor:"#EEF6FF"}} shadow="sm" p="lg">sas</Card>
                <Card sx={{backgroundColor:"#EEF6FF"}} shadow="sm" p="lg">sas</Card>
            </Group>
            <div>sas</div>
        </Container>
    </>
    )
};

export default {
    routeProps: {
        path: 'profile',
        exact: true,
        index: false,
        element: <Profile/>,
    },
    name: 'Profile',
};