"use client"

import React, {useState} from 'react';
import Login from "@/components/Login";
import Register from "@/components/Register";
import Image from "next/image";
import logo from "@/public/logo.svg";

enum LayoutType {
    login = 'login',
    register = 'register'
}

function Auth() {
    const [activeLayout, setActiveLayout] = useState(LayoutType.login);

    const isActiveLogin = activeLayout === LayoutType.login
    const isActiveRegister = activeLayout === LayoutType.register

    const toggleLayout = (layoutType: LayoutType) => {
        setActiveLayout(layoutType);
    };

    return (
        <div className="flex flex-col justify-center items-center h-[calc(100vh-36px)] relative mt-[-24px]">
            <Image className="absolute left-9 top-0" src={logo} alt={"Logo"} width={180}/>
            {isActiveLogin && <Login toggleLayout={() => toggleLayout(LayoutType.register)}/>}
            {isActiveRegister && <Register toggleLayout={() => toggleLayout(LayoutType.login)}/>}
        </div>
    );
}

export default Auth;