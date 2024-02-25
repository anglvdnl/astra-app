"use client"

import React, {useEffect, useState} from 'react';
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
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import useDB from "@/hooks/useDB";

function Sidebar() {
    const {getDB, updateDB} = useDB()
    const matches = useHideByRoute(["/auth"])
    const [groups, setGroups] = useState<{ groupName: string, cards: string[] }[]>([])
    const [groupName, setGroupName] = useState("")

    useEffect(() => {
        getDB().then(response => {
            const data = response.data()
            if (data) {
                setGroups(data.groups)
            }
        })
    }, [getDB]);

    function createNewGroup(){
        if (groupName){
            const updatedData = {
                groups: [
                    ...groups,
                    {
                        groupName,
                        cards: []
                    }
                ]
            }
            updateDB(updatedData)
        }
    }

    return (
        <aside
            className={`absolute bg-black h-[calc(100vh-52px)] w-[80px] flex justify-start items-center gap-2 flex-col ${matches && "hidden"}`}>
            {groups.map((group, index: number) => (
                <Link key={index} href={group.groupName}>
                    {group.groupName}
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
                            <Button type="submit" onClick={createNewGroup}>Save changes</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </aside>
    );
}

export default Sidebar;