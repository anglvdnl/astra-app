"use client"

import React from 'react';
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import Image from "next/image";
import hideIcon from "../components/ui/icons/hideIcon.svg"
import showIcon from "../components/ui/icons/showIcon.svg"
import googleLogo from "@/public/google-logo.png";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {withAuthForm} from "@/components/hocs/withAuthForm";
import CustomTooltip from "@/components/CustomTooltip";

interface LoginProps {
    toggleLayout: () => void;
    form: any;
    onSubmit: () => void;
    isPasswordShown: boolean;
    setIsPasswordShown: (prev: (prevState: boolean) => boolean) => boolean;
    authMethod: {
        registerMutation: { isPending: boolean; },
        loginGoogle: () => void,
    }
}

function Register({toggleLayout, form, onSubmit, isPasswordShown, setIsPasswordShown, authMethod}: LoginProps) {

    return (
        <div className="max-w-[414px] w-[100%] flex flex-col items-center">
            <h2 className="text-4xl mb-4">Sign Up</h2>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col items-center w-[100%]">
                    <FormField
                        control={form.control}
                        name="username"
                        render={({field}) => (
                            <FormItem className="mb-[8px]">
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input className="mt-[6px]" {...field} autoComplete="off"/>
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
                                    <Input className="mt-[6px]" {...field} autoComplete="off"/>
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
                                <div className={"flex gap-2 items-center"}>
                                    <FormLabel>Password</FormLabel>
                                    <CustomTooltip side={"right"} className="max-w-[344px]">
                                        <p>Must be at least 8 characters with letters or/and numbers.</p>
                                    </CustomTooltip>
                                </div>

                                <div className="relative">
                                    <FormControl>
                                        <Input
                                            className="mt-[6px]"
                                            type={isPasswordShown ? "text" : "password"} {...field}
                                            autoComplete="off"
                                        />
                                    </FormControl>
                                    {form.control._formValues?.password &&
                                        <Image
                                            className="absolute right-[20px] top-[50%] translate-y-[-50%]"
                                            src={isPasswordShown ? hideIcon : showIcon}
                                            alt={"Password icon"}
                                            onClick={() => setIsPasswordShown(prev => !prev)}
                                        />
                                    }
                                </div>
                                <FormMessage className="mt-[8px] text-base"/>
                            </FormItem>
                        )}
                    />
                    <Button
                        className="w-[100%] h-[62px] bg-primary flex justify-center items-center text-black text-xl font-semibold mt-[22px]"
                        disabled={authMethod.registerMutation.isPending} type="submit">Create an account</Button>
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
                onClick={() => authMethod.loginGoogle()}
            >
                <Image className="mr-[12px]" src={googleLogo} alt={"Google"}/>
                Sign Up with Google
            </Button>
        </div>
    );
}

export default withAuthForm({Form: Register, type: "register"});