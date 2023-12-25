"use client"

import React from 'react';
import pb from "@/lib/pocketbase";

function Header() {
    function logoutUser() {
        try {
            pb.authStore.clear();
            document.cookie=pb.authStore.exportToCookie({ httpOnly: false });

        } catch (error) {
            throw error;
        }
    }
    return (
        <header className="flex justify-between items-center px-5 py-2.5">
            <p className="text-2xl">ASTRA</p>
            <div className="h-[32px] w-[32px] bg-black rounded-xl" onClick={logoutUser}></div>
        </header>
    );
}

export default Header;