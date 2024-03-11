"use server"

import Group from "@/components/Group";
import {notFound, redirect} from "next/navigation";
import axiosInstanceServer from "@/instances/axiosInstanceServer";

interface PageProps {
    searchParams: {
        groupId: string;
    }
}

async function Page({searchParams}: PageProps) {
    if (!searchParams.groupId) {
        redirect("/")
    }

    const response = await axiosInstanceServer.get("/groups")

    if (response.data) {
        const groupExists = response.data.some((group: {
            name: string,
            id: string
        }) => group.id === searchParams.groupId);
        if (!groupExists) {
            return notFound();
        }
    }

    return <Group groupId={searchParams.groupId}/>
}

export default Page;