"use client"

import React, {useState} from 'react';
import Login from "@/components/Login";
import Register from "@/components/Register";

function Auth() {
    const [isLogin, setLogin] = useState(true);

    const toggleLayout = () => {
        setLogin(!isLogin);
    };

    return (
        <div className="p-5 flex flex-col justify-center items-center h-[100%] gap-5">
            {isLogin ? (
                <>
                    <Login />
                    <button onClick={toggleLayout}>Don&apos;t have an account?</button>
                </>
            ) : (
                <>
                    <Register />
                    <button onClick={toggleLayout}>Already have an account?</button>
                </>
            )}
        </div>
    );
}

export default Auth;