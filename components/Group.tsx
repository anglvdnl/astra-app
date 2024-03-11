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
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import Bunch from "@/components/Bunch";
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

interface Bunch {
    id: string;
    name: string;
    description: string;
}

function Group({groupId}: { groupId: string }) {
    const router = useRouter()
    const [newGroupName, setNewGroupName] = useState("")
    const [isNameChanged, setIsNameChanged] = useState(false)
    const [bunchName, setBunchName] = useState("")
    const [isBunchCreated, setIsBunchCreated] = useState(false)
    const [bunchId, setBunchId] = useState("")
    const [card, setCard] = useState({
        word: "",
        definition: "",
        example: ""
    })
    console.log("groups");
    const queryClient = useQueryClient()

    const {data: bunchData} = useQuery<Bunch[]>({
        queryKey: ["bunches", groupId],
        queryFn: async () => {
            const {data} = await axiosInstance.get(`/groups/${groupId}/bunches`)
            return data as Bunch[]
        }
    })

    const groupNameMutation = useMutation({
        mutationFn: async ({groupName}: { groupName: string }) => {
            const response = await axiosInstance.patch(`/groups/${groupId}`, {
                name: groupName
            })

            return response.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['groups']})
            setIsNameChanged(true)
        }
    })

    const groupDeleteMutation = useMutation({
        mutationFn: async () => {
            return await axiosInstance.delete(`/groups/${groupId}`)
        },
        onSuccess: (response) => {
            queryClient.invalidateQueries({queryKey: ['groups']})
            router.push("/")
        }
    })

    const createBunchMutation = useMutation({
        mutationFn: async (bunchName: string) => {
            return await axiosInstance.post(`/groups/${groupId}/bunches`, {
                name: bunchName,
                description: ""
            })
        },
        onSuccess: (response) => {
            console.log(response);
            queryClient.invalidateQueries({queryKey: ['bunches']})
            setBunchId(response.data.response.id)
        }
    })

    const createCardMutation = useMutation({
        mutationFn: async (card) => {
            return await axiosInstance.post(`/bunches/${bunchId}/cards`, card)
        }
    })

    function changeGroupName() {
        groupNameMutation.mutate({groupName: newGroupName})
    }

    function deleteGroup() {
        groupDeleteMutation.mutate()
    }

    function createBunch() {
        setBunchName("")
        setIsBunchCreated(true)
        createBunchMutation.mutate(bunchName)
    }

    function createCard() {
        // @ts-ignore
        createCardMutation.mutate({word: card.word, definition: card.definition, example: card.example})
        setCard({
            word: "",
            definition: "",
            example: ""
        })
    }

    const handleInputChange = (field: string, value: string) => {
        setCard(prevState => ({
            ...prevState,
            [field]: value
        }));
    };

    return (
        <div className="ml-[100px] p-5">
            <Drawer>
                <DrawerTrigger className="float-right"><Settings className="cursor-pointer"/></DrawerTrigger>
                <DrawerContent>
                    <DrawerHeader className="flex items-center flex-col p-10 gap-5">
                        <DrawerTitle>Rename group:</DrawerTitle>
                        <Input className="w-[200px]" onChange={(e) => setNewGroupName(e.target.value)}/>
                        <div className="relative">
                            <Button disabled={groupNameMutation.isPending} onClick={changeGroupName}>Save</Button>
                            {isNameChanged &&
                                <Check className="text-green-500 absolute top-[50%] translate-y-[-50%] right-[-35px]"/>}
                        </div>
                    </DrawerHeader>
                    <DrawerFooter>
                        <DrawerClose>
                            <Button variant="destructive" onClick={deleteGroup}>Delete group</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
            <Dialog onOpenChange={isOpened => {
                if (!isOpened) {
                    setIsBunchCreated(false)
                    setBunchId("")
                }
            }}>
                <DialogTrigger asChild>
                    <Button className="flex gap-1 mb-5">Create bunch <Plus/></Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    {isBunchCreated ? (
                        <>
                            <DialogHeader>
                                <DialogTitle>Add Card</DialogTitle>
                            </DialogHeader>
                            <div className="my-4">
                                <p>Word</p>
                                <Input value={card.word} onChange={e => handleInputChange("word", e.target.value)}
                                       type="text"/>
                            </div>
                            <div className="my-4">
                                <p>Definition</p>
                                <Input value={card.definition}
                                       onChange={e => handleInputChange("definition", e.target.value)} type="text"/>
                            </div>
                            <div className="my-4">
                                <p>Example</p>
                                <Input value={card.example} onChange={e => handleInputChange("example", e.target.value)}
                                       type="text"/>
                            </div>
                        </>
                    ) : (
                        <>
                            <DialogHeader>
                                <DialogTitle>Add bunch</DialogTitle>
                            </DialogHeader>
                            <div className="my-4">
                                <p>Bunch name</p>
                                <Input value={bunchName} onChange={e => setBunchName(e.target.value)} type="text"/>
                            </div>
                        </>
                    )}
                    <DialogFooter className="flex sm:flex-row-reverse sm:justify-between">
                        <Button type="submit" onClick={isBunchCreated ? createCard : createBunch}>Save changes</Button>
                        <DialogClose className="w-[fit-content]">
                            <Button variant="secondary">Close</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            <div className="flex gap-10 w-[100%] flex-wrap">
                {bunchData && bunchData.map((bunch, index) => (
                    <Bunch key={index} name={bunch.name} id={bunch.id} description={bunch.description}
                           groupId={groupId}/>
                ))}
            </div>
        </div>
    );
}

export default Group;