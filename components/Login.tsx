"use client"

import React from 'react';
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label";
import Link from "next/link";
import {Checkbox} from "@/components/ui/checkbox";
import Image from "next/image";
import hideIcon from "../components/ui/icons/hideIcon.svg"
import showIcon from "../components/ui/icons/showIcon.svg"
import googleLogo from "@/public/google-logo.png"

import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form"
import {withAuthForm} from "@/components/hocs/withAuthForm";

interface LoginProps {
    toggleLayout: () => void;
    form: any;
    onSubmit: () => void;
    isPasswordShown: boolean;
    setIsPasswordShown: (prev: (prevState: boolean) => boolean) => boolean;
    authMethod: {
        loginMutation: { isPending: boolean; },
        loginGoogle: () => void,
    }
}

function Login({toggleLayout, form, onSubmit, isPasswordShown, setIsPasswordShown, authMethod}: LoginProps) {

    return (
        <div className="max-w-[414px] w-[100%] flex flex-col items-center">
            <h2 className="text-4xl mb-4">Sign In</h2>
            <Form {...form}>
                <form onSubmit={form?.handleSubmit(onSubmit)} className="flex flex-col items-center w-[100%]">
                    <FormField
                        control={form?.control}
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
                        control={form?.control}
                        name="password"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <div className="relative">
                                    <FormControl>
                                        <Input className="mt-[6px]"
                                               type={isPasswordShown ? "text" : "password"} {...field} />
                                    </FormControl>
                                    {form?.control._formValues?.password &&
                                        <Image
                                            className="absolute right-[20px] top-[50%] translate-y-[-50%]"
                                            src={isPasswordShown ? hideIcon : showIcon}
                                            alt={"Password icon"}
                                            onClick={() => setIsPasswordShown(prevState => !prevState)}
                                        />
                                    }
                                </div>
                                <FormMessage className="mt-[8px] text-base"/>
                            </FormItem>
                        )}
                    />
                    <div className="flex justify-between items-center my-[22px] w-[100%]">
                        <div className="flex items-center gap-2">
                            <Checkbox id="remember"/>
                            <Label htmlFor={"remember"}>Remember me</Label>
                        </div>
                        <Link className="text-primary text-base font-semibold hover:underline"
                              href="/components/auth/password-reset">Forgot
                            password?</Link>
                    </div>
                    <Button
                        className="w-[100%] h-[62px] bg-primary flex justify-center items-center text-black text-xl font-semibold"
                        disabled={authMethod.loginMutation.isPending} type="submit">Log In</Button>
                </form>
            </Form>
            <p
                className="text-base mt-[22px]"
            >
                Don&apos;t have an account?{'\u00A0'}
                <span className="cursor-pointer text-primary hover:underline" onClick={toggleLayout}>Sign up</span>
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
                Sign In with Google
            </Button>
        </div>
    );
}

export default withAuthForm({Form: Login, type: "login"});