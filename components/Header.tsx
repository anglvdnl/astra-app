"use client"

import React from 'react';
import pb from "@/lib/pocketbase";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import useHideByRoute from "@/hooks/useHideByRoute";
import { Button } from "@/components/ui/button";

function Header() {
    const router = useRouter()
    const matches = useHideByRoute(["/auth"])

    function logoutUser() {
        try {
            pb.authStore.clear();
            document.cookie=pb.authStore.exportToCookie({ httpOnly: false });
            router.push("/auth")
        } catch (error) {
            throw error;
        }
    }
    return (
        <header className={`flex justify-between items-center px-5 py-2.5 ${matches && "hidden"}`}>
            <p className="text-2xl">ASTRA</p>
            <Button onClick={logoutUser}>Logout</Button>
        </header>
    );
}

export default Header;