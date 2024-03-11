import Group from "@/components/Group";
import {notFound, redirect} from "next/navigation";
import axiosInstanceServer from "@/instances/axiosInstanceServer";

interface PageProps {
    searchParams: {
        groupId: string;
        ready: boolean
    }
}

export const dynamic = 'force-dynamic';

async function Page({searchParams}: PageProps) {
    console.log(searchParams);
    if (!searchParams.groupId) {
        console.log("redirect");
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