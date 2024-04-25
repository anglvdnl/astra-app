"use client"

import React from 'react';
import {Input} from "@/components/ui/input";
import searchIcon from "@/public/search.svg"
import Image from "next/image";

function Header() {

    return (
        <header className={`flex justify-between items-center`}>
            <div className="relative">
                <Input placeholder="Search" className="w-[414px] !pl-[60px]"/>
                <Image className="absolute top-[50%] translate-y-[-50%] left-[19px]" src={searchIcon} alt={"Icon"}/>
            </div>
        </header>
    );
}

export default Header;