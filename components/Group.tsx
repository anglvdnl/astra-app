"use client"

import React, {useState} from 'react';
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import axiosInstance from "@/instances/axiosInstance";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger
} from "@/components/ui/drawer";
import {Check, Plus, Settings} from "lucide-react";
import {Button} from "@/components/ui/button";
import Bunch from "@/components/Bunches/Bunch";
import {useRouter} from "next/navigation";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {Input} from "@/components/ui/input";
import Link from 'next/link';

interface Bunch {
    id: string;
    name: string;
    description: string;
}

interface GroupProps {
    name: string;
    id: string;
}

function Group({name, id}: GroupProps) {
    const queryClient = useQueryClient()

    const {data: bunches} = useQuery<Bunch[]>({
        queryKey: ["bunches", id],
        queryFn: async () => {
            const {data} = await axiosInstance.get(`/groups/${id}/bunches`)
            return data
        }
    })

    function formatGroupName(name: string): string {
        let words = name.split(' ');

        if (words.length > 1) {
            return words.splice(0, 2).map(word => word.slice(0, 1)).join('').toUpperCase();
        } else {
            return name.charAt(0).toUpperCase()
        }
    }

    return (
        <Link href={{
            pathname: `groups/${name}`,
            query: {groupId: id},
        }}>
            <div className="w-[300px] h-[110px] bg-secondary rounded-xl p-6 flex justify-between items-center">
                <div className="flex flex-col justify-between h-full">
                    <h2 className="text-xl">{name}</h2>
                    <p className="text-neutral text-sm">{bunches && bunches.length} bunches</p>
                </div>
                <div className="w-[62px] h-[62px] bg-destructive rounded-xl p-3 flex items-center justify-center">
                    <p className="text-4xl text-black">{formatGroupName(name)}</p>
                </div>
            </div>
        </Link>
    );
}

export default Group;