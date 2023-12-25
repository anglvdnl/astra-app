"use client"

import React, { useEffect, useState } from 'react';
import Link from "next/link";

function Sidebar() {
    const [groups, setGroups] = useState<string[]>([])

    useEffect(() => {
        const data = localStorage.getItem("groups")
        if (data) {
            setGroups(JSON.parse(data))
        }
    }, []);

    const createGroup = () => {
        const newIndex = groups.length + 1;
        const newGroupName = `Group ${newIndex}`;

        setGroups([...groups, newGroupName]);
        localStorage.setItem("groups", JSON.stringify([...groups, newGroupName]))
    };

    return (
        <aside className="absolute bg-black h-[calc(100vh-52px)] w-[80px] flex justify-start items-center flex-col">
            {groups.map((groupName, index) => (
                <Link key={index} href={groupName.replace(/\s+/g, '').toLowerCase()}>
                    {groupName}
                </Link>
            ))}
            <div onClick={createGroup}>+</div>
        </aside>
    );
}

export default Sidebar;