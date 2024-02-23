"use client"

import React, {useEffect, useState} from 'react';
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import useAuth from "@/hooks/useAuth";

function Login() {
    const {signIn, error} = useAuth()
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [signInError, setSignInError] = useState("")

    useEffect(() => {
        setSignInError(error)
    }, [error]);

    const handleInputChange = (event: any) => {
        const {name, value} = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        signIn(formData)
    }

    return (
        <>
            <h2 className="text-5xl mb-5">Login</h2>
            <form onSubmit={handleSubmit} className="flex flex-col items-center gap-2">
                <Input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder={"Email"}
                />
                <Input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder={"Password"}
                />
                <p>{signInError}</p>
                <Button type="submit">Submit</Button>
            </form>
        </>
    );
}

export default Login;