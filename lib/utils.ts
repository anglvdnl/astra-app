import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function encodeNextPBCookie(next_cookie: RequestCookie | undefined) {
  if (!next_cookie) {
    return "";
  }

  const cookie = { pb_auth: next_cookie.value };
  let encodedCookie = "";
  for (const [key, value] of Object.entries(cookie)) {
    encodedCookie += `${encodeURIComponent(key)}=${encodeURIComponent(value)}; `;
  }

  return encodedCookie.trimEnd();
}

export async function getNextjsCookie(request_cookie?: RequestCookie) {
  try {
    if (request_cookie) {
      const cookie = encodeNextPBCookie(request_cookie)
      return cookie
    }
  } catch (error:any) {
    console.log("issue getting next-cookie  === ",error)
    return ""
  }
}