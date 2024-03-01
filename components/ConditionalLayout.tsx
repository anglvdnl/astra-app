"use client"

import React from 'react';
import {usePathname} from "next/navigation";

function ConditionalLayout({children}: {
    children: React.ReactNode
}) {
    const pathname = usePathname();
    const isAuthRoute = pathname === "/auth";

    return !isAuthRoute ? (
        children
    ) : null
}

export default ConditionalLayout;