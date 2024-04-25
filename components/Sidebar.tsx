"use client"

import React, {useState} from 'react';
import {Button} from "@/components/ui/button";
import logoIcon from "@/public/logoIcon.svg";
import leftArrow from "@/public/leftArrow.svg";
import logo from "@/public/logo.svg";
import settings from "@/public/settings.svg";
import logoutIcon from "@/public/logout.svg";
import home from "@/public/home.svg";
import groups from "@/public/groups.svg";
import Image from "next/image";
import {AnimatePresence, LayoutGroup, motion} from "framer-motion";
import {
    activeLinkVariants,
    arrowVariants,
    asideVariants,
    iconVariants,
    logoVariants,
    toggleVariants
} from "@/framerVariants/sidebarVariants";
import Link from "next/link";
import useAuth from "@/hooks/useAuth";
import {usePathname} from "next/navigation";

interface Group {
    id: string;
    name: string;
    description: string;
}

function Sidebar() {
    const [sidebarOpened, setSidebarOpened] = useState(true)
    const [showItems, setShowItems] = useState(true)
    const [isAnimationCompleted, setIsAnimationCompleted] = useState(true)
    const pathname = usePathname()
    const {logout} = useAuth()

    function handleSidebar() {
        setIsAnimationCompleted(false)
        if (isAnimationCompleted) {
            setSidebarOpened(prev => !prev)
            setTimeout(() => {
                setShowItems(prev => !prev)
            }, 200)
        }
    }

    return (
        <motion.aside
            variants={asideVariants}
            custom={sidebarOpened}
            initial={"initial"}
            animate={"animate"}
            onAnimationComplete={() => setIsAnimationCompleted(true)}
            className={`bg-secondary h-screen flex justify-between items-center flex-col py-9`}>
            <div className="w-full flex flex-col gap-[26px]">
                <div className="relative w-full h-[60px] flex justify-center">
                    <AnimatePresence initial={false}>
                        {sidebarOpened && (
                            <motion.div
                                key={"text"}
                                variants={logoVariants}
                                initial={"initial"}
                                animate={"animate"}
                                exit={"exit"}
                            >
                                <Image src={logo} alt={"Logo text"}/>
                            </motion.div>
                        )}
                    </AnimatePresence>
                    <AnimatePresence>
                        {!sidebarOpened && (
                            <motion.div
                                key={"icon"}
                                variants={iconVariants}
                                initial={"initial"}
                                animate={"animate"}
                                exit={"exit"}
                                className="absolute w-[40px] left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]"
                            >
                                <Image src={logoIcon} alt={"Logo text"}/>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
                <div className="w-full flex flex-col gap-4">
                    <Link
                        href="/"
                        className={`overflow-hidden relative rounded-xl w-[calc(100%-36px)] py-[18px] pl-[18px] flex items-center justify-start gap-3 text-base font-semibold mx-[18px] duration-300 ${pathname === "/" && "bg-background"}`}
                    >
                        <span
                            className={`absolute h-full w-[6px] bg-primary left-0 overflow-hidden ${pathname === "/" ? "opacity-100" : "opacity-0"}`}/>
                        <Image className="min-w-[24px]" src={home} alt={"Close arrow"}/>
                        <LayoutGroup>
                            <AnimatePresence initial={false}>
                                {showItems && sidebarOpened && (
                                    <motion.span
                                        key={"icon"}
                                        layout
                                        variants={toggleVariants}
                                        initial={"initial"}
                                        animate={"animate"}
                                        exit={"exit"}
                                        className="max-w-full"
                                    >
                                        Home
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </LayoutGroup>
                    </Link>
                    <Link
                        href="/groups"
                        className={`overflow-hidden relative rounded-xl w-[calc(100%-36px)] py-[18px] pl-[18px] flex items-center justify-start gap-3 text-base font-semibold mx-[18px] transition-all duration-200 ${pathname.startsWith("/groups") && "bg-background"}`}
                    >
                        <span
                            className={`absolute h-full w-[6px] bg-primary left-0 overflow-hidden transition-all duration-200 ${pathname.startsWith("/groups") ? "opacity-100" : "opacity-0"}`}/>
                        <Image className="min-w-[24px]" src={groups} alt={"Close arrow"}/>
                        <LayoutGroup>
                            <AnimatePresence initial={false}>
                                {showItems && sidebarOpened && (
                                    <motion.span
                                        key={"icon"}
                                        layout
                                        variants={toggleVariants}
                                        initial={"initial"}
                                        animate={"animate"}
                                        exit={"exit"}
                                        className="max-w-full"
                                    >
                                        Groups
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </LayoutGroup>
                    </Link>
                </div>
            </div>
            <div className="w-full flex flex-col gap-10">
                <Button variant="ghost"
                        className="w-full flex items-center justify-start gap-3 text-base font-semibold px-9"
                        onClick={handleSidebar}>
                    <motion.div variants={arrowVariants} custom={sidebarOpened} animate={"animate"}>
                        <Image className="min-w-[24px]" src={leftArrow} alt={"Close arrow"}/>
                    </motion.div>
                    <LayoutGroup>
                        <AnimatePresence initial={false}>
                            {showItems && sidebarOpened && (
                                <motion.span
                                    key={"icon"}
                                    layout
                                    variants={toggleVariants}
                                    initial={"initial"}
                                    animate={"animate"}
                                    exit={"exit"}
                                    className="max-w-full"
                                >
                                    Hide Panel
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </LayoutGroup>
                </Button>
                <Link
                    className="w-full flex items-center justify-start gap-3 text-base font-semibold px-9"
                    href="/settings">
                    <Image className="min-w-[24px]" src={settings} alt={"Close arrow"}/>
                    <LayoutGroup>
                        <AnimatePresence initial={false}>
                            {showItems && sidebarOpened && (
                                <motion.span
                                    key={"icon"}
                                    layout
                                    variants={toggleVariants}
                                    initial={"initial"}
                                    animate={"animate"}
                                    exit={"exit"}
                                    className="max-w-full"
                                >
                                    Settings
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </LayoutGroup>
                </Link>
                <Button
                    variant="ghost"
                    className="w-full flex items-center justify-start gap-3 text-base font-semibold px-9"
                    onClick={() => logout()}
                >
                    <Image className="min-w-[24px]" src={logoutIcon} alt={"Close arrow"}/>
                    <LayoutGroup>
                        <AnimatePresence initial={false}>
                            {showItems && sidebarOpened && (
                                <motion.span
                                    key={"icon"}
                                    layout
                                    variants={toggleVariants}
                                    initial={"initial"}
                                    animate={"animate"}
                                    exit={"exit"}
                                    className="max-w-full"
                                >
                                    Logout
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </LayoutGroup>
                </Button>
            </div>
        </motion.aside>
    )
        ;
}

export default Sidebar;