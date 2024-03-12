"use client"

import React, {useState} from 'react';
import {useQuery} from "@tanstack/react-query";
import {useSearchParams} from "next/navigation";
import axiosInstance from "@/instances/axiosInstance";

export default function Page() {
    const params = useSearchParams()
    const bunchId = params.get("bunch")

    const {data} = useQuery({
        queryKey: ['cards', bunchId],
        queryFn: async () => {
            if (bunchId) {
                const response = await axiosInstance.get(`bunches/${params.get("bunch")}/cards`)
                return response.data
            } else {
                //axios get all cards
            }
        }
    })
    console.log(data);
    const [currentCardIndex, setCurrentCardIndex] = useState(0);

    const handleNextCard = () => {
        setCurrentCardIndex((prevIndex) => (prevIndex + 1) % data.length);
    };

    return (
        <div className="w-[100%] h-[100%] p-10">
            <div
                className="w-[100%] h-[100%] bg-secondary rounded-2xl flex items-center justify-center flex-col gap-10">
                <h3>{data && data[currentCardIndex].word}</h3>
                <h3>{data && data[currentCardIndex].definition}</h3>
                <button onClick={handleNextCard}>Next Card</button>
            </div>
        </div>
    );
}