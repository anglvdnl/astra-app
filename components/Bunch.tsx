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
import {Input} from "@/components/ui/input";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import axiosInstance from "@/instances/axiosInstance";

interface BunchProps {
    name: string;
    id: string;
    description: string;
    groupId: string;
}

function Bunch({name, id, description, groupId}: BunchProps) {
    const pathname = usePathname()
    const queryClient = useQueryClient()
    const [open, setOpen] = useState(false);
    const [secondOpen, setSecondOpen] = useState(false)
    const [bunchName, setBunchName] = useState(name)

    const {mutate: deleteMutation} = useMutation({
        mutationFn: async () => {
            const response = await axiosInstance.delete(`/groups/${groupId}/bunches/${id}`)
            return response.data
        }, onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['bunches']})
        }
    })

    function deleteBunch() {
        deleteMutation()
    }

    return (
        <div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <div
                        className="cursor-pointer bg-opacity-10 hover:bg-opacity-20 transition ease-in-out bg-white backdrop-blur-[5px] border border-opacity-20 border-solid border-white rounded-2xl shadow-[0_4px_30px_rgba(0,0,0,0.1)] h-[160px] w-[160px]">
                        <h4 className="text-center mt-10">{name}</h4>
                    </div>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] p-10" onOpenAutoFocus={e => e.preventDefault()}>
                    <Button variant="ghost">
                        <Link href={{
                            pathname: `${pathname}/learn`,
                            query: {bunch: id},
                        }}>
                            Start learning
                        </Link>
                    </Button>
                    <Button variant="ghost" onClick={() => {
                        setSecondOpen(true)
                        setOpen(false)
                    }}>
                        Edit Bunch
                    </Button>
                    <DialogClose>
                        <Button variant="destructive" onClick={deleteBunch}>
                            Delete Bunch
                        </Button>
                    </DialogClose>
                </DialogContent>
            </Dialog>
            <Dialog open={secondOpen} onOpenChange={setSecondOpen}>
                <DialogContent className="sm:max-w-[425px] p-10">
                    <DialogHeader>
                        <DialogTitle>Edit bunch</DialogTitle>
                    </DialogHeader>
                    <div className="my-4">
                        <p>Bunch name</p>
                        <Input value={bunchName} onChange={e => setBunchName(e.target.value)} type="text"/>
                    </div>
                    <DialogFooter className="flex sm:flex-row-reverse sm:justify-between">
                        <Button type="submit">Save changes</Button>
                        <DialogClose className="w-[fit-content]">
                            <Button variant="secondary">Close</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default Bunch;