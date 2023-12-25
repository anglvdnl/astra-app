"use client"

import React, { useState } from 'react';
import pb from "@/lib/pocketbase";
import { useRouter, useSearchParams } from "next/navigation";

function Auth() {
    const router = useRouter();
    const search_params = useSearchParams().get("next");

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleInputChange = (event: any) => {
        const {name, value} = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (event: any) => {
        event.preventDefault();

        try {
            const user = await pb.collection("users").authWithPassword(formData.email, formData.password)
            document.cookie = pb.authStore.exportToCookie({httpOnly: false});
            if (search_params) {
                //  redirect to the page tey were going to before
                router.push(search_params);
            } else {
                router.push("/");
            }
            return user;
        } catch (error: any) {
            console.log("error logging in user === ", error.originalError);
            throw error;
        }
    }
    return (
        <div className="ml-[80px] p-5 flex justify-center">
            <form onSubmit={handleSubmit} className="flex flex-col items-center gap-2">
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                />
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default Auth;