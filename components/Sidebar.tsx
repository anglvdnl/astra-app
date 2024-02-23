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
import { getDoc } from 'firebase/firestore';
import {doc} from "@firebase/firestore";
import {db} from "@/services/firebase";

function Sidebar() {
    const matches = useHideByRoute(["/auth"])
    const [groups, setGroups] = useState<object[]>([])
    const [groupName, setGroupName] = useState("")

    useEffect(() => {
        const docRef = doc(db, "users", "uzQ3tLVHjQR9vGkZQdqEioBCSHV2");
        const data = getDoc(docRef);
        data.then(r => setGroups(r.data().groups))
    }, []);
    
    return (
        <aside
            className={`absolute bg-black h-[calc(100vh-52px)] w-[80px] flex justify-start items-center gap-2 flex-col ${matches && "hidden"}`}>
            {groups.map((groupName, index) => (
                <Link key={index} href={groupName.name}>
                    {groupName.name}
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
                            <Button type="submit">Save changes</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </aside>
    );
}

export default Sidebar;