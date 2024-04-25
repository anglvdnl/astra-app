"use client"

import React, {useState} from 'react';
import Link from "next/link";
import {usePathname} from "next/navigation";
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
import {Input} from "@/components/ui/input";

interface BunchProps {
    name: string;
    id: string;
    description: string;
}

function Bunch({name, id, description}: BunchProps) {

    const {data: cards} = useQuery({
        queryKey: ["cards"],
        queryFn: async () => {
            const {data} = await axiosInstance.get(`bunches/${id}/cards`)
            return data
        }
    })

    // const {mutate: deleteMutation} = useMutation({
    //     mutationFn: async () => {
    //         const response = await axiosInstance.delete(`/groups/${group.id}/bunches/${id}`)
    //         return response.data
    //     }, onSuccess: () => {
    //         queryClient.invalidateQueries({queryKey: ['bunches']})
    //     }
    // })

    return (
        <div
            className="h-[95px] w-full flex flex-col justify-between cursor-pointer bg-secondary rounded-xl py-4 px-[18px]">
            <div className="flex justify-between">
                <p className="text-neutral text-sm font-normal">{cards && cards.length} cards</p>
                <p className="h-[25px] px-2.5 py-0.5 rounded-2xl bg-darkCyan text-cyan text-sm font-medium">15 cards to
                    review</p>
            </div>
            <h4 className="text-white text-xl font-semibold">{name}</h4>
        </div>
    );
}

export default Bunch;