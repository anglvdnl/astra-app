import Group from "@/components/Group";

interface PageProps {
    searchParams: {
        groupId: string;
        ready: boolean
    }
}

export const dynamic = 'force-dynamic';

async function Page(props: any) {
    console.log(props);
    // if (!searchParams.groupId) {
    //     console.log("redirect");
    //     redirect("/")
    // }

    // const response = await axiosInstanceServer.get("/groups")
    //
    // if (response.data) {
    //     const groupExists = response.data.some((group: {
    //         name: string,
    //         id: string
    //     }) => group.id === searchParams.groupId);
    //     if (!groupExists) {
    //         return notFound();
    //     }
    // }

    return <Group groupId={props.searchParams.groupId}/>
}

export default Page;