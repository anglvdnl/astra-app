"use client"

import React from 'react';
import useHideByRoute from "@/hooks/useHideByRoute";
import {Button} from "@/components/ui/button";
import useAuth from "@/hooks/useAuth";

function Header() {
    const {logout} = useAuth();
    const matches = useHideByRoute(["/auth"])

    function logoutUser() {
        logout()
    }

    return (
        <header className={`flex justify-between items-center px-5 py-2.5 ${matches && "hidden"}`}>
            <p className="text-2xl">ASTRA</p>
            <Button onClick={logoutUser}>Logout</Button>
        </header>
    );
}

export default Header;