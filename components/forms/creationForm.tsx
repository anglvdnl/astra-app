import React from 'react';
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {defaultCreateValues} from "@/consts/formValues";
import {creationSchema} from "@/schemas/creationSchemas";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {FormInput} from "@/components/ui/formInput";
import Image from "next/image";
import {Button} from "@/components/ui/button";
import border from "@/public/dashedBorder.png";

interface CreationFormProps {
    formName: string;
    type: "group" | "bunch";
    hasIconSelect: boolean;
    onSubmit: (data: any) => void;
    isPending: boolean;
    isEditing?: boolean;
    values?: {
        name: string;
        description: string;
        image: string;
    }
}

function CreationForm({formName, type, hasIconSelect, onSubmit, isPending, isEditing, values}: CreationFormProps) {
    const formSchema = creationSchema[type]
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: !isEditing ? defaultCreateValues[type] : values
    });

    return (
        <Form {...form}>
            <form onSubmit={form?.handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <FormField
                    control={form?.control}
                    name="name"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel className="font-semibold">
                                {formName} name <span className="text-primary">*</span>
                            </FormLabel>
                            <FormControl>
                                <FormInput className="mt-[12px] placeholder-[#393939]"
                                           placeholder={`Name your ${type} here`} {...field} />
                            </FormControl>
                            <FormMessage className="mt-2 text-base font-semibold"/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form?.control}
                    name="description"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel className="font-semibold">
                                Description
                            </FormLabel>
                            <FormControl>
                                <FormInput className="mt-[12px] placeholder-[#393939]"
                                           placeholder={`Describe your ${type} here`} {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                />
                {hasIconSelect && (
                    <FormField
                        control={form?.control}
                        name="image"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel className="font-semibold" htmlFor="groupIcon">{formName} icon</FormLabel>
                                <div
                                    className="relative overflow-hidden w-full h-[84px] bg-secondary mt-[12px] rounded-xl border-primary cursor-pointer">
                                    <FormControl>
                                        <FormInput
                                            className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] z-10 opacity-0 h-full w-full cursor-pointer"
                                            type="file"
                                            multiple
                                            accept="image/*"
                                            placeholder={`Describe your ${type} here`} {...field}
                                        />
                                    </FormControl>
                                    <span
                                        className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] text-primary text-center">
                                        {
                                            form?.control._formValues?.image
                                                ? form?.control._formValues?.image
                                                : "Select a file on your computer or drag it to this area"
                                        }
                                    </span>
                                    <Image className="w-full h-full" src={border} alt="Select"/>
                                </div>
                            </FormItem>
                        )}
                    />
                )}
                <Button disabled={isPending} className="w-full h-[62px] text-xl font-semibold mt-[26px]"
                        type="submit">{isEditing ? "Edit" : "Create"}</Button>
            </form>
        </Form>
    );
}

export default CreationForm;