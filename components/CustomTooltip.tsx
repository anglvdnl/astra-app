import React from 'react';
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import Image from "next/image";
import infoIcon from "@/public/infoIcon.svg"
import {cn} from "@/utils/twMerge";

interface CustomTooltipProps {
    children: React.ReactNode;
    side: "bottom" | "top" | "right" | "left";
    className: string | undefined;
}

function CustomTooltip({children, side, className}: CustomTooltipProps) {
    return (
        <TooltipProvider delayDuration={100}>
            <Tooltip>
                <TooltipTrigger>
                    <Image src={infoIcon} alt={"More Info"}/>
                </TooltipTrigger>
                <TooltipContent side={side} className={cn(className)}>
                    {children}
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}

export default CustomTooltip;