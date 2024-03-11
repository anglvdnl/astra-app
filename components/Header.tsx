"use client"

import React from 'react';
import {Button} from "@/components/ui/button";
import useAuth from "@/hooks/useAuth";

function Header() {
    const {logout} = useAuth()

    function logoutUser() {
        logout()
    }

    return (
        <header className={`flex justify-between items-center px-5 py-2.5`}>
            <p className="text-2xl font-mont">COGNIFY</p>
            <Button onClick={logoutUser}>Logout</Button>
        </header>
    );
}

export default Header;