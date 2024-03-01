"use client"

import React, {useState} from 'react';
import Link from "next/link";
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
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import axiosInstance from "@/instances/axiosInstance";

interface Group {
    id: number;
    name: string;
    description: string;
}

function Sidebar() {
    const [groupName, setGroupName] = useState("")
    const queryClient = useQueryClient()

    const {data} = useQuery<Group[]>({
        queryKey: ["groups"],
        queryFn: async () => {
            const response = await axiosInstance.get("/groups")
            return response.data as Group[]
        }
    })

    const {mutate} = useMutation({
        mutationFn: async ({data}: { data: { name: string, description: string } }) => {
            const response = await axiosInstance.post("/groups", data)
            return response.data
        },
        onSuccess: (response) => {
            console.log(response);
            queryClient.invalidateQueries({queryKey: ['groups']})
        },
        onError: (error) => {
            console.log(error);
        }
    })

    function createNewGroup() {
        mutate({data: {name: groupName, description: ""}})
    }

    return (
        <aside
            className={`absolute bg-black h-[calc(100vh-52px)] w-[80px] flex justify-start items-center gap-2 flex-col`}>
            {data && data.map((group, index: number) => (
                <Link key={index} href={`${group.id}`}>
                    {group.name}
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