import React, { useState } from "react";

export const ManualTestPage = () => {

    const [result, setResult] = useState<any>(null);

    const onButtonOneClick = (event: React.MouseEvent) => {
        console.log('Button one click')

    }

    const onButtonTwoClick = (event: React.MouseEvent) => {
        console.log('Button two click')

    }

    return (
        <div>
            <button onClick={onButtonOneClick}>
                One
            </button>
            <button onClick={onButtonTwoClick}>
                Two
            </button>
        </div>
    );

}