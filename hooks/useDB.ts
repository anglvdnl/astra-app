import {doc, DocumentSnapshot, updateDoc} from "@firebase/firestore";
import {db} from "@/services/firebase";
import {useCallback, useEffect, useState} from "react";
import {getUID} from "@/utils/getUID";
import {getDoc} from "firebase/firestore";
import firebase from "firebase/compat/app";

interface Data {
    groups: [],
    cards: []
}

interface updatedData {
    cards?: {
        cardName: string
        id: string
    }[];
    groups?: {
        groupName: string,
        cards: string[]
    }[];
}

export default function useDB() {
    const [userUID, setUserUID] = useState<string | null>("");
    const [docRef, setDocRef] = useState<any>(null);

    useEffect(() => {
        getUID().then(response => {
            if (response) {
                setUserUID(response);
            }
        });
    }, []);

    useEffect(() => {
        if (userUID) {
            const newDocRef = doc(db, "users", userUID);
            setDocRef(newDocRef);
        }
    }, [userUID]);

    const getDB = useCallback(async (): Promise<DocumentSnapshot<Data>> => {
        if (!docRef) {
            return Promise.reject("error");
        }
        return getDoc(docRef);
    }, [docRef]);

    const updateDB = useCallback(async (data: updatedData) => {
        if (docRef) {
            return updateDoc(docRef, data);
        }
    }, [docRef])

    return {
        getDB,
        updateDB
    };
}