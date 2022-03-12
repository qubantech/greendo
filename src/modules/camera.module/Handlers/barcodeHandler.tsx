import React, {useEffect} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {Alert, Button, Card, Text, Title, Image, Group, Space, Container} from "@mantine/core";
import {useCode} from "../../../app.module/app.services/app.code.service";
import {ExclamationTriangleIcon} from "@radix-ui/react-icons";
import {useTrashTypeList} from "../../../app.module/app.services/app.type.service";
import firebase from "firebase/compat";
import {useUser} from "../../../app.module/app.services/app.user.service";
import {auth} from "../../../app.module/app.configs";
import {useAuthState} from "react-firebase-hooks/auth";
import Navigation from "../../../app.module/app.layouts/app.navigation/navigation";

const BarcodeHandler = () => {
    let params = useParams();
    let navigate = useNavigate();
    const [user, loading, error] = useAuthState(auth);
    const trashlist = useTrashTypeList();
    console.log(params.number)
    const barcode = useCode(params.number?.toString() || "0");
    return (
        <Container>
            {user && <Navigation/>}
            {barcode.watchedObject && (
                <>
                <Card shadow={"md"}>
                    <Card.Section>
                        <Image
                            width={"90vw"}
                            height={"90vw"}
                            src={undefined}
                            alt="With default placeholder"
                            withPlaceholder
                        />
                        </Card.Section>
                    <Title order={2}> {barcode.watchedObject.title}</Title>
                    <Group>
                        <Image width={50} height={50} src={trashlist.watchedObject && trashlist.watchedObject[Number(barcode.watchedObject.trashTypeId)]?.imageUrl || undefined}/>
                        <Text size={"xl"}>{trashlist.watchedObject && trashlist.watchedObject[Number(barcode.watchedObject.trashTypeId)]?.name}</Text>
                    </Group>
                    <Space h={"md"}/>
                    <Text color="gray" size={"xs"}>Описание:</Text>
                    <Text>{barcode.watchedObject.description}</Text>
                    <Space h={"md"}/>
                    <Text color="gray" size={"xs"}>Код: {barcode.watchedObject.barCode}</Text>
                </Card>
                    <Group grow>
                        <Button color={"gray"} fullWidth onClick={() => {navigate("/scanner")}}>Назад</Button>
                        <Button color={"blue"} fullWidth onClick={() => navigate(`/handbook/${barcode.watchedObject?.trashTypeId}`)}>Подробнее</Button>
                    </Group>
                </>
            ) || (
                <Alert icon={<ExclamationTriangleIcon height={16} />} title="Ошибка!" color="red" radius="md" variant="filled">
                    <Text>Некорректный barcode. Этого товара еще нет в нашей базе данных, но мы учтем его когда-нибудь.</Text>
                    <Button color={"gray"} fullWidth onClick={() => {navigate("/scanner")}}>Назад</Button>
                </Alert>
            )}
        </Container>
    );
};

export default {
    routeProps: {
        path: '/barcode/:number',
        exact: true,
        index: false,
        element: <BarcodeHandler/>,
    },
    name: 'Camera',
};
//export default BarcodeHandler;