"use client"

import React, {useEffect, useState} from 'react';
import {doc, updateDoc} from "@firebase/firestore";
import {db} from "@/services/firebase";
import {getDoc} from "firebase/firestore";
import {getUID} from "@/utils/getUID";
import useDB from "@/hooks/useDB";

interface PageProps {
    params: {
        groupName: string;
    }
}

function Page({params}: PageProps) {
    const [cards, setCards] = useState([])
    // const [newCards, setNewCards] = useState([])
    useEffect(() => {
        const docRef = doc(db, "users", "uzQ3tLVHjQR9vGkZQdqEioBCSHV2");
        const data = getDoc(docRef);
        data.then(r => {
            setCards(r.data().cards)
            console.log(r.data());
        })
    }, []);

    function createFlashCard() {
        const newCards = [
            ...cards,
            {
                "id": 22,
                "cardName": "NAME",
                "wordList": [
                    {
                        "definition": "gazeta",
                        "name": "しんぶん"
                    },
                ]
            }
        ]
        updateDoc(doc(db, "users", "uzQ3tLVHjQR9vGkZQdqEioBCSHV2"), {cards: newCards})
    }

    return (
        <div className="ml-[80px] p-5">
            {/*<button onClick={createFlashCard}>Create card</button>*/}
        </div>
    );
}

export default Page;