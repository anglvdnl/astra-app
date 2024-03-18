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
        <header className={`flex justify-between items-center`}>
            <Button onClick={logoutUser}>Logout</Button>
        </header>
    );
}

export default Header;