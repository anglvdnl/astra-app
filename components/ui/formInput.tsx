import * as React from "react"

import {cn} from "@/utils/twMerge"
import {useFormField} from "@/components/ui/form";

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
}

const FormInput = React.forwardRef<HTMLInputElement, InputProps>(
    ({className, type, ...props}, ref) => {
        const {error, formItemId, formDescriptionId, formMessageId} = useFormField()
        return (
            <input
                type={type}
                className={cn(error && "!ring-destructive !border-destructive",
                    "flex w-[100%] h-[56px] rounded-lg border border-input bg-input p-[18px] text-base font-semibold transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed",
                    className
                )}
                ref={ref}
                {...props}
            />
        )
    }
)
FormInput.displayName = "FormInput"

export {FormInput}
