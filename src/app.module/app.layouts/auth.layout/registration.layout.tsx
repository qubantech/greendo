import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "../../app.configs";
import React, { useState } from "react";

export const RegistrationLayout = () => {

    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error
    ] = useCreateUserWithEmailAndPassword(auth);

    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')

    const register = () => {
        createUserWithEmailAndPassword(email, password)
    }

    return (
        <div>
            <h3> Register User </h3>
            <input
                placeholder="Email..."
                onChange={(event) => {
                    setEmail(event.target.value);
                    console.log(email, password);
                }}
            />
            <input
                placeholder="Password..."
                onChange={(event) => {
                    setPassword(event.target.value);
                    console.log(email, password);
                }}
            />
            <button onClick={register}> Create User</button>
            {error?.message}
        </div>
    );
}