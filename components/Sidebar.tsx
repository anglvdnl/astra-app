"use client"

import React, { useEffect, useState } from 'react';
import Link from "next/link";
import useHideByRoute from "@/hooks/useHideByRoute";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import pb from "@/lib/pocketbase";

function Sidebar() {
    const matches = useHideByRoute(["/auth"])
    const [groups, setGroups] = useState<string[]>([])
    const [groupName, setGroupName] = useState("")

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await pb.collection("groups").getList();
                const newArr:string[] = []
                for (let dataKey of data.items) {
                    newArr.push(dataKey.field)
                }
                setGroups(newArr)
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const createGroup = async () => {
        const groupExists = groups.some(group => group === groupName)
        if (!groupExists) {
            await pb.collection("groups").create({"field": groupName})
            setGroups([...groups, groupName])
            setGroupName("")
        } else {

        }
    };

    return (
        <aside
            className={`absolute bg-black h-[calc(100vh-52px)] w-[80px] flex justify-start items-center gap-2 flex-col ${matches && "hidden"}`}>
            {groups.map((groupName, index) => (
                <Link key={index} href={groupName.replace(/\s+/g, '').toLowerCase()}>
                    {groupName}
                </Link>
            ))}
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline" size="sm">Add</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Add group</DialogTitle>
                    </DialogHeader>
                    <div className="my-4">
                        <Input type="text" onChange={event => setGroupName(event.target.value)}/>
                    </div>
                    <DialogFooter>
                        <DialogClose>
                            <Button onClick={createGroup} type="submit">Save changes</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </aside>
    );
}

export default Sidebar;