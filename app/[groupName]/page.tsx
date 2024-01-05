import React from 'react';
import pb from "@/lib/pocketbase";
import { notFound } from "next/navigation";

interface PageProps {
    params: {
        groupName: string;
    }
}

async function Page({params}: PageProps) {
    const groupName = params.groupName
    const groups = await pb.collection("groups").getList()
    const doesGroupExists = groups.items.some(group => group.field === groupName)

    if (!doesGroupExists){
        notFound()
    }

    return (
        <div className="ml-[80px] p-5">{groupName}</div>
    );
}

export default Page;