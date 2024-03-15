"use client"

import React, {useState} from 'react';
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import useAuth from "@/hooks/useAuth";
import Image from "next/image";
import hideIcon from "../components/ui/icons/hideIcon.svg"
import showIcon from "../components/ui/icons/showIcon.svg"
import googleLogo from "@/public/google-logo.png";
import {useToast} from "@/components/ui/use-toast";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";

interface LoginProps {
    toggleLayout: () => void
}

const FormSchema = z.object({
    username: z.string().min(1, {
        message: "Please enter a username"
    }),
    email: z.string().email("Please enter a valid email address."),
    password: z.string().min(6, {
        message: "Password must contain at least 6 characters."
    })
})

function Register({toggleLayout}: LoginProps) {
    const {registerMutation} = useAuth()
    const {toast} = useToast()
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            username: "",
            email: "",
            password: ""
        },
    })
    const [isPasswordShown, setIsPasswordShown] = useState(false)

    async function onSubmit(data: z.infer<typeof FormSchema>, event: any) {
        await registerMutation.mutateAsync({data: data}).catch((error) => {
            console.log(error);
            toast({
                variant: "destructive",
                title: error.response.data.error,
            })
        })
    }

    return (
        <div className="max-w-[414px] flex flex-col items-center">
            <h2 className="text-4xl mb-4">Sign Up</h2>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col items-center">
                    <FormField
                        control={form.control}
                        name="username"
                        render={({field}) => (
                            <FormItem className="mb-[8px]">
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input className="mt-[6px]" {...field} />
                                </FormControl>
                                <FormMessage className="mt-[8px] text-base"/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({field}) => (
                            <FormItem className="mb-[8px]">
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input className="mt-[6px]" {...field} />
                                </FormControl>
                                <FormMessage className="mt-[8px] text-base"/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <Input className="mt-[6px]"
                                               type={isPasswordShown ? "text" : "password"} {...field} />
                                        {form.control._formValues?.password && <Image
                                            className="absolute right-[20px] top-[50%] translate-y-[-50%]"
                                            src={isPasswordShown ? hideIcon : showIcon}
                                            alt={"Password icon"}
                                            onClick={() => setIsPasswordShown(prev => !prev)}
                                        />
                                        }
                                    </div>
                                </FormControl>
                                <FormMessage className="mt-[8px] text-base"/>
                            </FormItem>
                        )}
                    />
                    <Button
                        className="w-[414px] h-[62px] bg-primary flex justify-center items-center text-black text-xl font-semibold mt-[22px]"
                        disabled={registerMutation.isPending} type="submit">Create an account</Button>
                </form>
            </Form>
            <p
                className="text-base mt-[22px]"
            >
                Already have an account?{'\u00A0'}
                <span className="cursor-pointer text-primary hover:underline" onClick={toggleLayout}>Sign in</span>
            </p>
            <div className="flex justify-between items-center w-[100%] my-[22px]">
                <hr className="w-[140px] h-[2px] bg-grey"/>
                <p className="text-grey">Or</p>
                <hr className="w-[140px] h-[2px] bg-grey"/>
            </div>
            <Button
                className="w-[100%] py-4 h-auto text-base font-semibold"
                variant="secondary"
            >
                <Image className="mr-[12px]" src={googleLogo} alt={"Google"}/>
                Sign Up with Google
            </Button>
        </div>
    );
}

export default Register;