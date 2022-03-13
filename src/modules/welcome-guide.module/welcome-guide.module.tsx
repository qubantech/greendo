import React, {useState} from 'react';
import {Button, Center, Group, Image, Space, Title, Text, Container} from "@mantine/core";
import {useNavigate} from "react-router-dom";
import {Pagination, Navigation} from "swiper";
import {Swiper, SwiperSlide} from "swiper/react";
//@ts-ignore
import welcome1 from "./img/welcome1.svg";
//@ts-ignore
import welcome2 from "./img/Welcome2.svg";
//@ts-ignore
import welcome3 from "./img/welcome3.svg";
//@ts-ignore
import welcome4 from "./img/welcome4.svg";
//@ts-ignore
import welcome5 from "./img/welcome5.svg";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const WelcomeGuide = () => {
    const navigate = useNavigate();
    const [swiperRef, setSwiperRef] = useState(null);

    const prepend = () => {
        // @ts-ignore
        swiperRef.slideTo(swiperRef.activeIndex + 1)
    };
    // @ts-ignore
    return(
    <>
        <Swiper
            // @ts-ignore
            onSwiper={setSwiperRef}
            direction={"horizontal"}
            pagination={true}
            autoplay={true}
            slidesPerView={1}
            spaceBetween={1}
            modules={[Pagination, Navigation]}
            className="mySwiper"
        >
            <SwiperSlide>
                <Container sx={{position:"relative", height:"100vh"}}>
                    <Space h={70}/>
                    <Group align={"center"} grow>
                        <Center>
                            <img width={"75%"} src={welcome1}/>
                        </Center>
                    </Group>
                    <Space h={30}/>
                    <Title align={"center"} order={3}>Привет!</Title>
                    <Text style={{height:"90px"}} py={5} align={"center"} size={"sm"} px={30}>Мы покажем тебе, как можно за сортировку мусора получать подарки и интересные предложения от эко-ориентированных партнёров </Text>
                    <Space h={"sm"}/>
                    <Container sx={{position:"absolute", bottom:"40px", left:"0px", right:"0px"}}>
                        <Button radius={"md"} fullWidth onClick={() => prepend()}>Далее</Button>
                        <Space h={"md"}/>
                        <Button radius={"md"} fullWidth onClick={() => navigate("/profile")}>
                            Пропустить
                        </Button>
                    </Container>
                </Container>
            </SwiperSlide>
            <SwiperSlide>
                <Container sx={{position:"relative", height:"100vh"}}>
                    <Space h={70}/>
                    <Group align={"center"} grow>
                        <Center>
                            <img width={"95%"} src={welcome2}/>
                        </Center>
                    </Group>
                    <Space h={30}/>
                    <Title align={"center"} order={3}>Наша мотивация</Title>
                    <Text style={{height:"90px"}} py={5} align={"center"} size={"sm"} px={30}>В год житель России производит 400 килограмм отходов, из которых 93% неминуемо отправляются на свалку.
                        Мы стремимся это изменить! </Text>
                    <Space h={"sm"}/>
                    <Container sx={{position:"absolute", bottom:"40px", left:"0px", right:"0px"}}>
                        <Button radius={"md"} fullWidth onClick={() => prepend()}>Далее</Button>
                        <Space h={"md"}/>
                        <Button radius={"md"} fullWidth onClick={() => navigate("/profile")}>
                            Пропустить
                        </Button>
                    </Container>
                </Container>
            </SwiperSlide>
            <SwiperSlide>
                <Container sx={{position:"relative", height:"100vh"}}>
                <Space h={70}/>
                <Group align={"center"} grow>
                    <Center>
                        <img width={"75%"} src={welcome3}/>
                    </Center>
                </Group>
                <Space h={30}/>
                <Title align={"center"} order={3}>Где начинается будущее?</Title>
                <Text style={{height:"90px"}} py={5} align={"center"} size={"sm"} px={30}>В фандоматах мусор ждёт переработки: пластик, стекло, лампочки, одежда и прочее. Прежде чем отправиться делать доброе дело - проверь какой мусор можно отнести в ближайший фандомат </Text>
                <Space h={"sm"}/>
                <Container sx={{position:"absolute", bottom:"40px", left:"0px", right:"0px"}}>
                    <Button radius={"md"} fullWidth onClick={() => prepend()}>Далее</Button>
                    <Space h={"md"}/>
                    <Button radius={"md"} fullWidth onClick={() => navigate("/profile")}>
                       Пропустить
                    </Button>
                </Container>
            </Container></SwiperSlide>
            <SwiperSlide>
                <Container sx={{position:"relative", height:"100vh"}}>
                <Space h={70}/>
                <Group align={"center"} grow>
                    <Center>
                        <img width={"73%"} src={welcome4}/>
                    </Center>
                </Group>
                <Space h={30}/>
                <Title align={"center"} order={3}>Благодарность</Title>
                <Text style={{height:"90px"}} py={5} align={"center"} size={"sm"} px={30}>За каждую сдачу мусора начисляются бонусы. Заработанные деньги можно обменять на предложения партнёров: скидки на все товары экобрендов, закрытые мероприятия или путешествие за границу </Text>
                <Space h={"sm"}/>
                <Container sx={{position:"absolute", bottom:"40px", left:"0px", right:"0px"}}>
                    <Button radius={"md"} fullWidth onClick={() => prepend()}>Далее</Button>
                    <Space h={"md"}/>
                    <Button radius={"md"} fullWidth onClick={() => navigate("/profile")}>
                        Пропустить
                    </Button>
                </Container>
            </Container>
            </SwiperSlide>
            <SwiperSlide>
                <Container sx={{position:"relative", height:"100vh"}}>
                    <Space h={70}/>
                    <Group align={"center"} grow>
                        <Center>
                            <img width={"70%"} src={welcome5}/>
                        </Center>
                    </Group>
                    <Space h={30}/>
                    <Title align={"center"} order={3}>С чего начать?</Title>
                    <Text style={{height:"90px"}} py={5} align={"center"} size={"sm"} px={30}>Наш справочник расскажет о правилах сортировки мусора и как превратить это занятие в интересную ежедневную игру  А ещё своими успехами можно делиться
                        с друзьями... </Text>
                    <Space h={"sm"}/>
                    <Container sx={{position:"absolute", bottom:"40px", left:"0px", right:"0px"}}>
                        <Button radius={"md"} fullWidth onClick={() => navigate("/profile")}>Начать!</Button>
                    </Container>
                </Container>
            </SwiperSlide>
        </Swiper>
    </>
    )
};

export default {
    routeProps: {
        path: 'welcome',
        exact: true,
        index: false,
        element: <WelcomeGuide/>,
    },
    name: 'Welcome guide',
};