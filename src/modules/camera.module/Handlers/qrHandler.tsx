import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {useHandleTakeoutCode} from "../../../app.module/app.services/app.takeout.service";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "../../../app.module/app.configs";
import {ExclamationTriangleIcon} from "@radix-ui/react-icons";
import {Alert, Button, Text} from "@mantine/core";
import {useUser} from "../../../app.module/app.services/app.user.service";
import ActivityModal from "../../profile.module/activityModal";

const QRHandler = () => {
    const [user, loading, error] = useAuthState(auth);
    const userinfo = useUser(user?.uid || "0")
    const [getError, setGetError] = useState(false)
    const [complete, setComplete] = useState(false)
    let params = useParams();
    let navigate = useNavigate();
    const func = useHandleTakeoutCode(user?.uid || "0");
    console.log(atob(params?.number as string) || "0")
    const getToken = (str:string) => {
        func(str)
            .then((res) => {
                setComplete(true)
                console.log(res)
            })
            .catch((err)=> {
                setGetError(true)
                console.log(err)
            })
    }
    useEffect(() => {
        getToken(atob(params?.number as string) || "0")
    },[])
    /*const data;
    console.log(data)
    data.then((resp) => {console.log(resp)})
        .catch((err)=> console.log(err))*/
    return (
        <div>
            { userinfo && complete && (
                <ActivityModal open={complete} setOpen={() => navigate("/profile")} obj={userinfo.watchedObject?.takeoutList.at(-1)}/>
            )
            }
            {    getError && (
                    <Alert icon={<ExclamationTriangleIcon height={16} />} title="Ошибка!" color="red" radius="md" variant="filled">
                        <Text>Некорректный Qr code. Скорее всего этот код просканировали раньше или не пытайтесь нас взломать</Text>
                        <Button color={"gray"} fullWidth onClick={() => {navigate("/scanner")}}>Назад</Button>
                    </Alert>
                )


            }
        </div>
    );
};

export default {
    routeProps: {
        path: '/qrcode/:number',
        exact: false,
        index: false,
        element: <QRHandler/>,
    },
    name: 'Camera',
};
//export default BarcodeHandler;