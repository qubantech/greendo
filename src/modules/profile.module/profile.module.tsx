import React, {useEffect} from 'react';
import {Avatar, Container, Group, Image, Progress, Text, Card, Space, ActionIcon, Grid, Button} from "@mantine/core";
import {useLocation, useNavigate} from "react-router-dom";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "../../app.module/app.configs";
import Navigation from "../../app.module/app.layouts/app.navigation/navigation";
import {stringToColor} from "./generateColor";
import {CaretRightIcon, ExitIcon, GearIcon, LoopIcon} from "@radix-ui/react-icons";
import { Swiper, SwiperSlide } from 'swiper/react';
import {Pagination} from "swiper";
//@ts-ignore
import Carousel1 from "./img/carousel1.svg"
//@ts-ignore
import Carousel2 from "./img/carousel1.svg"
//@ts-ignore
import green from "./img/greens.svg"
import "swiper/css";
import "swiper/css/pagination";
import { signOut } from 'firebase/auth';
import {useUser} from "../../app.module/app.services/app.user.service";

const createCarouselItemImage = (index:number, options = {}) => (
    <div key={index}>
        <Image src={`./img/carousel${index}.svg`} />
        <p className="legend">Legend {index}</p>
    </div>
);

const levels = {
    1: "Начинающий",
    2: "Практик",
    3: "Ответственный потребитель",
    4: "Преисполненный",
    5: "Всемирный эколог"
}

const baseChildren = <div>{[1, 2].map(createCarouselItemImage)}</div>;

const Profile = () => {
    const [user, loading, error] = useAuthState(auth);
    const userdata = useUser(user?.uid || "0")
    let navigate = useNavigate();
    let location = useLocation();

    let color
    useEffect(() => {
        console.log(user?.uid)
        console.log(userdata.watchedObject)
        //color = stringToColor(user?.uid || "sd")
        if (!user){
            navigate("/");
        }
    },[]);

    const logout = () => {
        signOut(auth);
        navigate("/")
    }

    return (
    <>
        {user && <Navigation/>}
        <Container >
            <Group direction={"column"} grow>
                <Group direction={"row"} spacing={"xs"} position={"apart"} grow>
                    <Group direction={"row"}>
                        <ActionIcon sx={{width: "12vw", height: "12vw"}} onClick={logout}>
                            <Avatar sx={{width: "12vw", height: "12vw", backgroundColor: stringToColor(user?.uid || "sd")}}  radius={"xl"} >U</Avatar>
                        </ActionIcon>
                        <Text size={"xl"}>{userdata.watchedObject?.nickname|| "Name"}</Text>
                        <CaretRightIcon style={{height:20, width: 20}}/>
                    </Group>
                    <Group direction={"column"} spacing={2} grow>
                        <Group position={"right"} direction={"row"} spacing={"xs"}>
                            <Image width={25} src={green}/>
                            <Text align={"right"} size={"xl"}>{userdata.watchedObject?.tokens} G </Text>
                        </Group>
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
                <Card sx={{backgroundColor:"#EEF6FF"}} shadow="sm" p="lg">Токены за месяц</Card>
                <Card sx={{backgroundColor:"#EEF6FF"}} shadow="sm" p="lg">
                    Ты в рейтинге по городу на:
                    <Text size={"xl"} weight={"bold"}>249 место</Text>
                </Card>
            </Group>
            <Space h={"xl"}/>
            <Grid grow>
                <Grid.Col span={7}>
                    <Button radius={"md"} color="cyan" variant="subtle" size={"lg"} sx={{backgroundColor:"#EEF6FF"}} fullWidth leftIcon={<LoopIcon/>}>Обмен токенов</Button>
                </Grid.Col>
                <Grid.Col span={4}>
                    <Button radius={"md"} color="cyan" variant="subtle" size={"lg"} sx={{backgroundColor:"#EEF6FF"}} fullWidth>Статистика</Button>
                </Grid.Col>
            </Grid>
            <Grid grow>
                <Grid.Col span={10}>
                    <Text size={"xl"} weight={"bold"}>История активностей</Text>
                </Grid.Col>
                <Grid.Col span={1}>
                    <CaretRightIcon style={{height:35, width: 35}}/>
                </Grid.Col>
                {userdata.watchedObject?.takeoutList && userdata.watchedObject?.takeoutList.map((obj) => {
                    <div>{obj}</div>
                })}
            </Grid>
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