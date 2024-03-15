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
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import axiosInstance from "@/instances/axiosInstance";
import {Plus} from "lucide-react";
import {usePathname} from "next/navigation";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import {DefaultInput} from "@/components/ui/defaultInput";

interface Group {
    id: string;
    name: string;
    description: string;
}

function Sidebar() {
    const [groupName, setGroupName] = useState("")
    const pathname = usePathname()
    const queryClient = useQueryClient()

    const {data} = useQuery<Group[]>({
        queryKey: ["groups"],
        queryFn: async () => {
            const response = await axiosInstance.get("/groups")
            return response.data as Group[]
        }
    })

    // const data = [
    //     {
    //         name: "japanese",
    //         id: "1234"
    //     }
    // ]

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

    function formatGroupName(name: string): string {
        let words = name.split(' ');

        if (words.length > 1) {
            return words.splice(0, 2).map(word => word.slice(0, 1)).join('').toUpperCase();
        } else {
            return name.charAt(0).toUpperCase()
        }
    }

    return (
        <aside
            className={`absolute bg-[linear-gradient(180deg,_#404040_00%,_#030712_80%)] h-[calc(100vh-60px)] w-[80px] flex justify-start items-center gap-2 flex-col rounded-tr-lg`}>
            {data && data.map((group, index: number) => (
                <TooltipProvider key={index} delayDuration={300}>
                    <Tooltip>
                        <TooltipTrigger className="mt-5">
                            <Link href={{
                                pathname: `/${encodeURIComponent(group.name)}`,
                                query: {groupId: group.id},
                            }}
                                  replace={true}
                                  className="transition-all ease-in-out relative group/item w-[40px] h-[40px] bg-[#D9D9D9] flex justify-center items-center border border-white text-black rounded-lg font-semibold">
                                <hr className={`${pathname.split("/")[1] == encodeURIComponent(group.name) ? "opacity-100" : "opacity-0"} group/line opacity-0 group-hover/item:opacity-100 absolute w-[100%] h-[3px] bottom-[-10px] bg-[#D9D9D9] transition-all ease-in-out`}></hr>
                                {formatGroupName(group.name)}
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>{group.name}</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            ))}
            <Dialog>
                <DialogTrigger asChild>
                    <Button className="bg-transparent hover:bg-transparent" size="icon">
                        <Plus/>
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Add group</DialogTitle>
                    </DialogHeader>
                    <div className="my-4">
                        <DefaultInput type="text" onChange={event => setGroupName(event.target.value)}/>
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