"use client"

import React, {useEffect, useState} from 'react';
import useDB from "@/hooks/useDB";
import {usePathname} from "next/navigation";
import {uuidv4} from "@firebase/util";
import {arrayUnion} from "@firebase/firestore";

interface PageProps {
    params: {
        groupName: string;
    }
}

function Page({params}: PageProps) {
    const pathname = usePathname().slice(1)
    const {updateDB, getDB} = useDB()
    const [cards, setCards] = useState([])
    const [groups, setGroups] = useState([])

    useEffect(() => {
        getDB().then(response => {
            const data = response.data()
            if (data) {
                setCards(data.cards)
                setGroups(data.groups)
            }
        })
    }, [getDB]);

    // function getNewCardsIds(id: string): string[] {
    //     const currentGroup = groups.find((group: {
    //         groupName: string,
    //         cards: string[]
    //     }) => group.groupName === pathname);
    //     if (currentGroup) {
    //         const updatedCurrentGroup = currentGroup.cards;
    //         updatedCurrentGroup.push(id);
    //         return updatedCurrentGroup;
    //     }
    // }

    function createFlashCard(cardName: string, id: string) {
        // const updatedCardsData = {
        //     cards: [
        //         ...cards,
        //         {
        //             cardName,
        //             id
        //         }
        //     ]
        // }
        // const updatedGroupsData = {
        //     groups: arrayUnion({
        //         groupName: pathname,
        //         cards: getNewCardsIds(id)
        //     })
        // }
        // updateDB(updatedCardsData)
        // updateDB(updatedGroupsData)
    }

    return (
        <div className="ml-[80px] p-5">
            <button onClick={() => createFlashCard("SUPERCARD", uuidv4())}>Create card</button>
        </div>
    );
}

export default Page;