import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from "@firebase/auth";
import {auth, db} from "@/services/firebase";
import {generateToken} from "@/utils/createJwt";
import {Cookies, useCookies} from "next-client-cookies";
import {useRouter} from "next/navigation";
import {useState} from "react";
import {doc, setDoc} from "@firebase/firestore";
import {defaultData} from "@/consts/defaultData";

interface AuthFunctions {
    logout: () => void;
    signIn: (formData: { email: string; password: string }) => void;
    signUp: (formData: { email: string; password: string }) => void;
    error: string;
}

function useAuth(): AuthFunctions {
    const router = useRouter();
    const cookies = useCookies();
    const [error, setError] = useState("")

    const signIn = async (formData: { email: string; password: string }) => {
        try {
            const response = await signInWithEmailAndPassword(auth, formData.email, formData.password);
            const jwt = await generateToken(response.user.uid);
            cookies.set("jwt-auth", jwt, {
                expires: 60 * 60 * 60
            });
            router.push("/");
        } catch (error: any) {
            if (error.code === "auth/invalid-credential") {
                setError("Invalid Credential")
            } else if (error.code === "auth/too-many-requests") {
                setError("Too many requests, try again later")
                return
            }
            setError(error.code)
        }
    };

    const logout = () => {
        cookies.remove("jwt-auth");
        router.push("/auth");
    };

    const signUp = async (formData: { email: string; password: string }) => {
        try {
            const response = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
            await setDoc(doc(db, "users", response.user.uid), defaultData);
            const jwt = await generateToken(response.user.uid);
            cookies.set("jwt-auth", jwt, {
                expires: 60 * 60 * 60
            });
            router.push("/");
        } catch (error: any) {
            if (error.code === "auth/email-already-in-use") {
                setError("This email is already in use")
            } else if (error.code === "auth/too-many-requests") {
                setError("Too many requests, try again later")
                return
            }
            setError(error.code)
        }
    };

    return {
        signIn,
        logout,
        signUp,
        error
    };
}

export default useAuth;