"use client"

import React, {useState} from 'react';
import {Button} from "@/components/ui/button";
import logoIcon from "@/public/logoIcon.svg";
import leftArrow from "@/public/leftArrow.svg";
import Image from "next/image";
import {motion} from "framer-motion";
import {asideVariants} from "@/framerVariants/sidebarVariants";

interface Group {
    id: string;
    name: string;
    description: string;
}

function Sidebar() {
    const [sidebarOpened, setSidebarOpened] = useState(true)
    //
    // function formatGroupName(name: string): string {
    //     let words = name.split(' ');
    //
    //     if (words.length > 1) {
    //         return words.splice(0, 2).map(word => word.slice(0, 1)).join('').toUpperCase();
    //     } else {
    //         return name.charAt(0).toUpperCase()
    //     }
    // }

    return (
        <motion.aside
            variants={asideVariants}
            custom={sidebarOpened}
            initial={"initial"}
            animate={"animate"}
            className={`bg-secondary h-screen flex justify-between items-center flex-col pt-9`}>
            <div className={"flex justify-center items-center"}>
                {/*<AnimatePresence>*/}
                {/*    {sidebarOpened &&*/}
                {/*        <motion.div initial={{opacity: 0, width: "145px"}} animate={{opacity: 1, width : "145px"}} exit={{opacity: 0, width: 0}}>*/}
                {/*            <Image src={logoText} alt={"Logo text"}/>*/}
                {/*        </motion.div>*/}
                {/*    }*/}
                {/*</AnimatePresence>*/}
                <Image src={logoIcon} alt={"Logo icon"} width={40}/>
            </div>
            <Button variant="ghost" className="w-full flex items-center justify-start gap-3 text-base font-semibold"
                    onClick={() => setSidebarOpened(prev => !prev)}>
                <Image src={leftArrow} alt={"Close arrow"}/>
                <span>Hide Panel</span>
            </Button>
        </motion.aside>
    );
}

export default Sidebar;