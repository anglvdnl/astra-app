import React, {useState} from 'react';
import {useToast} from "@/components/ui/use-toast";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {authSchemas} from "@/schemas/authSchemas";
import {defaultValues} from "@/consts/formValues";
import useAuth from "@/hooks/useAuth";

interface withAuthFormProps {
    Form: React.ComponentType<any>;
    type: 'login' | 'register';
}

export function withAuthForm({Form, type}: withAuthFormProps) {
    return function WithAuthForm(props: any) {
        const authMethod = useAuth()
        const {toast} = useToast();

        const formSchema = authSchemas[type]
        const currentAuthMethod: Record<string, any> = {
            login: authMethod.loginMutation,
            register: authMethod.registerMutation
        }

        const form = useForm<z.infer<typeof formSchema>>({
            resolver: zodResolver(formSchema),
            defaultValues: defaultValues[type]
        });
        const [isPasswordShown, setIsPasswordShown] = useState(false);

        async function onSubmit(data: z.infer<typeof formSchema>) {
            console.log(data);
            await currentAuthMethod[type].mutateAsync({data: data}).catch((error: any) => {
                console.log(error);
                toast({
                    variant: "destructive",
                    title: error.response.data.error,
                });
            });
        }

        return (
            <Form
                form={form}
                onSubmit={onSubmit}
                isPasswordShown={isPasswordShown}
                setIsPasswordShown={setIsPasswordShown}
                authMethod={authMethod}
                toggleLayout={props.toggleLayout}
            />
        );
    };
}