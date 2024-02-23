import {doc} from "@firebase/firestore";
import {db} from "@/services/firebase";
import {useEffect, useState} from "react";
import {getUID} from "@/utils/getUID";
import {getDoc} from "firebase/firestore";

export default function useDB() {
    const [userUID, setUserUID] = useState("")

    useEffect(() => {
        getUID().then(response => {
            if (response) {
                setUserUID(response)
            }
        })
    }, []);

    const docRef = doc(db, "users", userUID);

    function getDB() {
        const data = getDoc(docRef);
    }

    function updateDB(data) {

    }
}