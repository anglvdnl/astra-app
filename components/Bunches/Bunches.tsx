"use client"

import React, {useState} from 'react';
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import axiosInstance from "@/instances/axiosInstance";
import Bunch from "@/components/Bunches/Bunch";
import Link from "next/link";
import Image from "next/image";
import deleteIcon from "@/public/deleteIcon.svg"
import editIcon from "@/public/editIcon.svg"
import addIcon from "@/public/plusIcon.svg"
import LeftArrow from "@/components/ui/icons/leftArrow";
import {Button} from "@/components/ui/button";
import {useToast} from "@/components/ui/use-toast";
import {useRouter} from "next/navigation";
import {Dialog, DialogContent, DialogTrigger} from "@/components/ui/dialog";
import CreationForm from "@/components/forms/creationForm";

interface BunchesProps {
    group: {
        name: string;
        id: string;
        description: string;
        image: string;
    }
}

interface Bunch {
    name: string;
    description: string;
    id: string;
}

enum DialogType {
    deleteDialog = "delete",
    editDialog = "edit",
    createDialog = "create"
}

function Bunches({group}: BunchesProps) {
    const {id: groupId, name: groupName, description: groupDescription, image: groupImage} = group
    const [dialog, setDialog] = useState("")
    const {toast} = useToast()
    const router = useRouter()
    const queryClient = useQueryClient()
    const {data: bunches} = useQuery<Bunch[]>({
        queryKey: ["bunches", groupId],
        queryFn: async () => {
            const {data} = await axiosInstance.get(`groups/${groupId}/bunches`)
            return data
        }
    })

    const {mutate: deleteGroup} = useMutation({
        mutationFn: async () => {
            const {data} = await axiosInstance.delete(`groups/${groupId}`)
            return data
        }, onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['groups']})
            setDialog("")
            toast({
                title: "Group was successfully deleted"
            })
            router.push("/groups")
        }
    })

    const {mutate: createBunch, isPending: createPending} = useMutation({
        mutationFn: async (formData) => {
            const {data} = await axiosInstance.post(`groups/${groupId}/bunches`, formData)
            return data
        }, onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['bunches']})
            setDialog("")
            toast({
                title: "Bunch created successfully"
            })
        }, onError: () => {
            toast({
                variant: "destructive",
                title: "Something went wrong"
            })
        }
    })

    const {mutate: editGroup, isPending: editPending} = useMutation({
        mutationFn: async (formData) => {
            const {data} = await axiosInstance.put(`groups/${groupId}`, formData)
            return data
        }, onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['groups']})
            router.refresh()
            setDialog("")
            toast({
                title: "Group edited successfully"
            })
        }, onError: () => {
            toast({
                variant: "destructive",
                title: "Something went wrong"
            })
        }
    })

    function groupDeleteHandler() {
        deleteGroup()
    }

    function handleSubmit(data: any) {
        createBunch(data)
    }

    function handleEdit(data: any) {
        editGroup(data)
    }

    return (
        <div>
            <Link className="flex gap-3 text-primary mb-4" href="/groups"><LeftArrow/> Back to Groups</Link>
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">{decodeURIComponent(groupName)}</h2>
                <div className="flex gap-3 items-center">
                    <Dialog open={dialog === DialogType.deleteDialog}
                            onOpenChange={(isOpen) => setDialog(isOpen ? DialogType.deleteDialog : "")}>
                        <DialogTrigger asChild>
                            <Button variant="destructive">Delete group <Image className="ml-[10px]" src={deleteIcon}
                                                                              alt="Delete"/></Button>
                        </DialogTrigger>
                        <DialogContent>
                            <h2 className="text-2xl font-bold">Delete bunch</h2>
                            <p>U sure u want to delete this?</p>
                            <Button onClick={groupDeleteHandler} variant="destructive">Delete</Button>
                        </DialogContent>
                    </Dialog>
                    <Dialog open={dialog === DialogType.editDialog}
                            onOpenChange={(isOpen) => setDialog(isOpen ? DialogType.editDialog : "")}>
                        <DialogTrigger asChild>
                            <Button>Edit group <Image className="ml-[10px]" src={editIcon} alt="Edit"/></Button>
                        </DialogTrigger>
                        <DialogContent>
                            <h2 className="text-2xl font-bold">Edit group</h2>
                            <CreationForm
                                formName={"Group"}
                                type={"group"}
                                hasIconSelect={true}
                                onSubmit={handleEdit}
                                isPending={editPending}
                                isEditing={true}
                                values={{
                                    name: groupName,
                                    description: groupDescription,
                                    image: ""
                                }}
                            />
                        </DialogContent>
                    </Dialog>
                    <Dialog open={dialog === DialogType.createDialog}
                            onOpenChange={(isOpen) => setDialog(isOpen ? DialogType.createDialog : "")}>
                        <DialogTrigger asChild>
                            <Button variant="cyan">Create a new bunch <Image className="ml-[10px]" src={addIcon}
                                                                             alt="Add"/></Button>
                        </DialogTrigger>
                        <DialogContent>
                            <h2 className="text-2xl font-bold">Create a new bunch</h2>
                            <CreationForm formName={"Bunch"} type={"bunch"} hasIconSelect={false}
                                          onSubmit={handleSubmit} isPending={createPending}/>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-6 w-full">
                {bunches && bunches.map(bunch => (
                    <Bunch key={bunch.id} name={bunch.name} id={bunch.id} description={bunch.description}/>
                ))}
            </div>
        </div>
    );
}

export default Bunches;