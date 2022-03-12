import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "../../app.configs";
import React, { useState } from "react";
import {useNavigate} from "react-router-dom";

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
        <div>
            <h3> Login </h3>
            <input
                placeholder="Email..."
                onChange={(event) => {
                    setEmail(event.target.value);
                }}
            />
            <input
                placeholder="Password..."
                onChange={(event) => {
                    setPassword(event.target.value);
                }}
            />

            <button onClick={login}> Login</button>
            {error?.message}
        </div>
    );
}
