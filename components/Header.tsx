"use client"

import React from 'react';
import {Button} from "@/components/ui/button";
import useAuth from "@/hooks/useAuth";
import useHideByRoute from "@/hooks/useHideByRoute";
import Image from "next/image";
import logo from '@/public/logo.svg'

function Header() {
    const hide = useHideByRoute(["/auth"])
    const {logout} = useAuth()

    function logoutUser() {
        logout()
    }

    return (
        <header className={`flex justify-between items-center px-[60px] pt-9 ${hide ? "absolute" : ""}`}>
            <Image src={logo} alt={"Logo"} width={180}/>
            {!hide && <Button onClick={logoutUser}>Logout</Button>}
        </header>
    );
}

export default Header;