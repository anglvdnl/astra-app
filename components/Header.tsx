"use client"

import React, {useState} from 'react';
import {Input} from "@/components/ui/input";
import searchIcon from "@/public/search.svg"
import avatar from "@/public/avatar.png"
import arrow from "@/public/dropdownArrow.svg"
import logoutIcon from "@/public/logoutPrimary.svg"
import profile from "@/public/profile.svg"
import Image from "next/image";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import useAuth from "@/hooks/useAuth";

function Header() {
    const {logout} = useAuth()
    const [isDropDownOpened, setIsDropDownOpened] = useState(false)

    return (
        <header className={`flex justify-between items-center`}>
            <div className="relative">
                <Input placeholder="Search" className="w-[414px] !pl-[60px]"/>
                <Image className="absolute top-[50%] translate-y-[-50%] left-[19px]" src={searchIcon} alt={"Icon"}/>
            </div>
            <DropdownMenu open={isDropDownOpened} onOpenChange={setIsDropDownOpened}>
                <DropdownMenuTrigger asChild>
                    <div className="flex items-center gap-3 cursor-pointer">
                        <Image src={avatar} alt="Avatar" width={40} height={40}/>
                        <p>esmapau</p>
                        <Image className={isDropDownOpened ? "rotate-180" : ""} src={arrow} alt="Arrow"/>
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[158px] mt-3 border-ring" onCloseAutoFocus={e => e.preventDefault()}>
                    <DropdownMenuItem><Image className="mr-2" src={profile} alt="Logout"/> My profile</DropdownMenuItem>
                    <DropdownMenuSeparator/>
                    <DropdownMenuItem onClick={() => logout()}><Image className="mr-2" src={logoutIcon}
                                                                      alt="Logout"/> Sign out</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

        </header>
    );
}

export default Header;