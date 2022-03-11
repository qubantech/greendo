import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../app.configs";
import { signOut } from "firebase/auth";
import React from "react";

export const LoginStatusLayout = () => {

    const [ user, loading, error ] = useAuthState(auth);

    const logout = () => {
        signOut(auth)
            .then(r => {

            })
            .catch(e => {

            });
    };

    return (
        <div>
            <h4> User Logged In: </h4>
            {user?.email}
            {user?.uid}
            {user?.emailVerified}
            {user?.refreshToken}
            {user?.photoURL}
            <button onClick={logout}> Sign Out</button>
        </div>
    );
}