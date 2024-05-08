import {notFound, redirect} from "next/navigation";
import axiosInstanceServer from "@/instances/axiosInstanceServer";
import Bunches from "@/components/Bunches/Bunches";

interface PageProps {
    searchParams: {
        groupId: string;
    }
}

export const dynamic = 'force-dynamic';
export const revalidate = 0

async function Page({searchParams}: PageProps) {
    if (!searchParams.groupId) {
        redirect("/groups")
    }

    const response = await axiosInstanceServer.get("/groups")

    const currentGroup = response.data.find((group: {
        name: string,
        id: string,
        description: string
    }) => group.id === searchParams.groupId)

    console.log(currentGroup);

    if (response.data) {
        if (!currentGroup) {
            return notFound();
        }
    }

    return <Bunches group={currentGroup}/>
}

export default Page;