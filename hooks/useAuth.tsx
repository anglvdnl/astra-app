import {useMutation} from "@tanstack/react-query";
import {useCookies} from "next-client-cookies";
import {useRouter} from "next/navigation";
import axiosInstance from "@/instances/axiosInstance";

interface Data {
    data: {
        email: string;
        password: string;
    }
}

interface Error {
    response: {
        data: {
            error: string;
        }
    }
}


function UseAuth() {
    const cookies = useCookies()
    const router = useRouter()

    const loginMutation = useMutation({
        mutationFn: ({data}: Data) => {
            return axiosInstance.post("/login", data);
        },
        onSuccess: (response) => {
            cookies.set("auth", response.data.token)
            router.push("/")
        },
        onError: (error: Error) => {
            console.log(error.response.data.error);
        }
    })

    const registerMutation = useMutation({
        mutationFn: ({data}: Data) => {
            console.log(data);
            return axiosInstance.post("/register", data);
        },
        onSuccess: (response) => {
            cookies.set("auth", response.data.token)
            router.push("/")
        },
        onError: (error: Error) => {
            console.log(error.response.data.error);
        }
    })

    const logout = () => {
        cookies.remove("auth")
        router.push("/auth")
    }

    return {
        loginMutation,
        registerMutation,
        logout
    }
}

export default UseAuth;