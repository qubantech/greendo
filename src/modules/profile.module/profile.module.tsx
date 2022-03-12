import React, {useEffect, useState} from 'react';
import {
    Avatar,
    Container,
    Group,
    Image,
    Progress,
    Text,
    Card,
    Space,
    ActionIcon,
    Grid,
    Button,
    Title
} from "@mantine/core";
import {useLocation, useNavigate} from "react-router-dom";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "../../app.module/app.configs";
import Navigation from "../../app.module/app.layouts/app.navigation/navigation";
import {stringToColor} from "./generateColor";
import {
    CaretRightIcon,
    CircleIcon,
    ExitIcon,
    GearIcon,
    LoopIcon,
    PlusCircledIcon,
    QuestionMarkIcon
} from "@radix-ui/react-icons";
import { Swiper, SwiperSlide } from 'swiper/react';
import {Pagination} from "swiper";
//@ts-ignore
import Carousel1 from "./img/carousel1.svg"
//@ts-ignore
import Carousel2 from "./img/carousel1.svg"
//@ts-ignore
import Carousel4 from "./img/сarousel4.png"
//@ts-ignore
import green from "./img/greens.svg"
//@ts-ignore
import Carousel3 from "./img/carousel3.png"
import "swiper/css";
import "swiper/css/pagination";
import { signOut } from 'firebase/auth';
import {useUser} from "../../app.module/app.services/app.user.service";
import ActivityModal from "./activityModal";
import {Takeout} from "../../app.module/app.models/models";
import {useSubscriptionList} from "../../app.module/app.services/app.subscription.service";
import {useFundomateList} from "../../app.module/app.services/app.fundomate.service";

const createCarouselItemImage = (index:number, options = {}) => (
    <div key={index}>
        <Image src={`./img/carousel${index}.svg`} />
        <p className="legend">Legend {index}</p>
    </div>
);

const levels = [
"Начинающий", "Практик", "Ответственный потребитель", "Преисполненный", "Всемирный эколог"
]

const baseChildren = <div>{[1, 2].map(createCarouselItemImage)}</div>;

const Profile = () => {
    const [user, loading, error] = useAuthState(auth);
    const [open, setOpen] = useState(false);
    const [take, setTake] = useState<Takeout>();
    const userdata = useUser(user?.uid || "0")
    const orglist = useSubscriptionList()
    let navigate = useNavigate();
    let location = useLocation();

    let x:number
    useEffect(() => {
        console.log(user?.uid)
        console.log(userdata.watchedObject)
        //color = stringToColor(user?.uid || "sd")
        if (!user){
            navigate("/");
        }
    },[]);

    const setTakeout = (obj:Takeout | undefined) => {
        setTake(obj)
        setOpen(true)
    }

    const logout = () => {
        signOut(auth);
        navigate("/")
    }

    return (
    <>
        {user && <Navigation/>}
        <ActivityModal open={open} setOpen={setOpen} obj={take}/>
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
                        <Text align={"right"} size={"xs"}> {userdata.watchedObject && userdata.watchedObject?.level && levels[Math.floor(userdata.watchedObject?.level / 100)]}</Text>
                        <Progress size={10} color={"blue"} value={userdata.watchedObject?.level && userdata.watchedObject?.level % 100 }/>
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
                <SwiperSlide><Image src={Carousel3}/></SwiperSlide>
                <SwiperSlide><Image src={Carousel2}/></SwiperSlide>
                <SwiperSlide><Image src={Carousel4}/></SwiperSlide>
            </Swiper>
            <Space h={"md"}/>
            <Group spacing={"md"} direction={"row"} grow align={"apart"}>
                <Card sx={{backgroundColor:"#EEF6FF"}} shadow="sm" p="lg">Токены за месяц</Card>
                <Card sx={{backgroundColor:"#EEF6FF"}} shadow="sm" p="lg">
                    Ты в рейтинге по городу {userdata.watchedObject?.city} на:
                    <Text size={"xl"} weight={"bold"}>249 место</Text>
                </Card>
            </Group>
            <Space h={"xl"}/>
            <Grid grow>
                <Grid.Col span={7}>
                    <Button onClick={() => navigate("/exchange")} radius={"md"} color="cyan" variant="subtle" size={"lg"} sx={{backgroundColor:"#EEF6FF"}} fullWidth leftIcon={<LoopIcon/>}>Обмен греенов</Button>
                </Grid.Col>
                <Grid.Col span={4}>
                    <Button radius={"md"} color="cyan" variant="subtle" size={"lg"} sx={{backgroundColor:"#EEF6FF"}} fullWidth>Статистика</Button>
                </Grid.Col>
            </Grid>
            <Space h={50}/>
            <Grid>
                <Grid.Col span={11}>
                    <Title order={2} >Благотворительные подписки</Title>
                </Grid.Col>
            </Grid>
            <Space h={"md"}/>
            {userdata.watchedObject?.ownedSubscriptionList && userdata.watchedObject?.ownedSubscriptionList.map((obj) => {
                console.log(orglist)
                return (
                    <Card sx={{backgroundColor:"#EEF6FF"}} key={obj.subscriptionId} shadow="sm" p="md" pr="xl">
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
                    </Card>
                )
            })}
            <Space h={50}/>
            <Grid>
                <Grid.Col span={10}>
                    <Title order={2} >История активностей</Title>
                </Grid.Col>
                {/*<Grid.Col span={1}>
                    <CaretRightIcon style={{height:35, width: 35}}/>
                </Grid.Col>*/}
            </Grid>
            <Space h={"md"}/>
            {userdata.watchedObject?.takeoutList && userdata.watchedObject?.takeoutList.map((obj) => {
                console.log(obj)
                return (
                    <Card onClick={() => setTakeout(obj)} sx={{backgroundColor:"#EEF6FF"}} key={obj.takeoutId} shadow="sm" p="md" pr={"lg"}>
                        <Grid gutter={"xs"}>
                            <Grid.Col gutter={20} span={2}>
                                <ActionIcon size={45} style={{backgroundColor:"green"}}  radius={"xl"}>
                                    <div></div>
                                </ActionIcon>
                            </Grid.Col>
                            <Grid.Col span={8}>
                                <Group>
                                <Image width={20} src={green}/>
                                <Text size={"lg"} weight={"bold"}> {
                                    Object.entries(obj.trashTypeCountMap).map(i =>
                                        x += (Number(i[0]) * obj.trashTypePriceMap[Number(i[0])]), x = 0).reverse()[0]
                                } G</Text>
                                </Group>
                                <Text size={"sm"}> Было сдано {
                                    Object.entries(obj.trashTypeCountMap).map(i => x += i[1], x = 0).reverse()[0]} кг
                                </Text>
                            </Grid.Col>
                            <Grid.Col span={2} sx={{paddingLeft:"5vw"}}>
                                <CaretRightIcon width={50} height={50}/>
                            </Grid.Col>
                        </Grid>
                    </Card>
                )
            })}
            {userdata.watchedObject?.ownedSubscriptionList && userdata.watchedObject?.ownedSubscriptionList.map((obj) => {
                console.log(obj)
                }
            )}

            <Space h={100}/>
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