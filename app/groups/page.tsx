"use client"

import React, {useEffect, useState} from 'react';
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import axiosInstance from "@/instances/axiosInstance";
import Group from '@/components/Group';
import Image from "next/image";
import plus from "@/public/plusIcon.svg"
import {Dialog, DialogContent, DialogTrigger} from "@/components/ui/dialog";
import border from "@/public/dashedBorder.png";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useToast} from "@/components/ui/use-toast";
import CreationForm from "@/components/forms/creationForm";
import {z} from "zod";
import {creationSchema} from "@/schemas/creationSchemas";

interface Group {
    id: string;
    name: string;
}

function Page() {
    const queryClient = useQueryClient()
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const {toast} = useToast()
    const {data: groups} = useQuery<Group[]>({
        queryKey: ["groups"],
        queryFn: async () => {
            const {data} = await axiosInstance.get("groups")
            return data
        }
    })

    const {mutate: createGroup, isPending} = useMutation({
        mutationFn: async (formData) => {
            const {data} = await axiosInstance.post("groups", formData)
            return data
        }, onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['groups']})
            setIsDialogOpen(false)
            toast({
                title: "Group created successfully"
            })
        }, onError: () => {
            toast({
                variant: "destructive",
                title: "Something went wrong"
            })
        }
    })

    function handleSubmit(data: any) {
        createGroup(data)
    }

    return (
        <>
            <div className="flex items-center justify-between gap-3 mb-4">
                <h2 className="text-2xl font-bold">Groups</h2>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button>Create a new group <Image className="ml-[10px]" src={plus} alt="Add"/></Button>
                    </DialogTrigger>
                    <DialogContent>
                        <h2 className="text-2xl font-bold">Create a new group</h2>
                        <CreationForm formName={"Group"} type={"group"} hasIconSelect={true} onSubmit={handleSubmit}
                                      isPending={isPending}/>
                    </DialogContent>
                </Dialog>
            </div>
            <div className="flex flex-wrap gap-6 transition-all duration-300">
                {groups && groups.map(group => (
                    <Group id={group.id} name={group.name} key={group.id}/>
                ))}
            </div>
        </>
    );
}

export default Page;