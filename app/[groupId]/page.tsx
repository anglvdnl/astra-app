"use client"

import React, {useState} from 'react';
import {useMutation, useQueryClient} from "@tanstack/react-query";
import axiosInstance from "@/instances/axiosInstance";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import Bunch from "@/components/Bunch";

interface PageProps {
    params: {
        groupId: string;
    }
}

function Page({params}: PageProps) {
    const [newGroupName, setNewGroupName] = useState("")
    const queryClient = useQueryClient()

    const {mutate} = useMutation({
        mutationFn: async ({groupName}: { groupName: string }) => {
            const response = await axiosInstance.patch(`/groups/${params.groupId}`, {
                name: groupName
            })

            return response.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['groups']})
        }
    })

    function changeGroupName() {
        mutate({groupName: newGroupName})
    }

    return (
        <div className="ml-[80px] p-5">
            <Input type="text" onChange={event => setNewGroupName(event.target.value)}/>
            <Button type="submit" onClick={changeGroupName}>Save changes</Button>
            <div className="flex gap-10 mt-10">
                <Bunch/>
                <Bunch/>
                <Bunch/>
                <Bunch/>
            </div>
        </div>
    );
}

export default Page;