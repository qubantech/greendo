import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "../../app.configs";
import React, { useState } from "react";
import {useNavigate} from "react-router-dom";
import {Button, Container, Input, Space, Title} from "@mantine/core";

export const LoginLayout = () => {

    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error
    ] = useSignInWithEmailAndPassword(auth);

    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    let navigate = useNavigate();

    const login = () => {
        signInWithEmailAndPassword(email, password)
        //navigate("/welcome")
    };

    return (
        <Container>
            <Input
                style={{backgroundColor :"#EEF6FF", borderRadius:10, padding:5}}
                variant={"unstyled"}
                placeholder="Email..."
                onChange={(event:any) => {
                    setEmail(event.target.value);
                }}
            />
            <Space h={"sm"}/>
            <Input
                style={{backgroundColor :"#EEF6FF", borderRadius:10, padding:5}}
                variant={"unstyled"}
                placeholder="Password..."
                onChange={(event:any) => {
                    setPassword(event.target.value);
                }}
            />
            <Space h={"xl"}/>
            <Button size={"lg"} fullWidth onClick={login}> Login</Button>
            <Space h={"xs"}/>
            <Button size={"lg"} fullWidth onClick={() => signInWithEmailAndPassword("mail@mail.ru", "123456")}> Войти без регистрации</Button>
            {error?.message}
        </Container>
    );
}
