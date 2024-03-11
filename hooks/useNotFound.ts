import {useQuery} from "@tanstack/react-query";
import axiosInstance from "@/instances/axiosInstance";
import {notFound} from "next/navigation";

function UseNotFound(id: string) {
    const {data, isLoading, isError} = useQuery({
        queryKey: ["groups"],
        queryFn: async () => {
            const response = await axiosInstance.get("/groups")
            return response.data
        }
    })

    if (!isLoading && !isError && data) {
        const groupExists = data.some((group: { name: string, id: string }) => group.id === id);
        if (!groupExists) {
            notFound();
        }
    }
}

export default UseNotFound;