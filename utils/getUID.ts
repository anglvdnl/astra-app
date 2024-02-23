"use server"

import {headers} from "next/headers";

export async function getUID() {
    const headerlist = headers()
    return headerlist.get("x-user-uid")
}