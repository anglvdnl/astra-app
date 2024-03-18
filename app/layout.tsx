import type {Metadata} from 'next'
import localFont from "next/font/local"
import './globals.css'
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import {CookiesProvider} from "next-client-cookies/server";
import Providers from "@/app/providers";
import ConditionalLayout from "@/components/ConditionalLayout";
import {cn} from "@/utils/twMerge";
import {Toaster} from "@/components/ui/toaster";
import {GoogleOAuthProvider} from "@react-oauth/google";

const gilroy = localFont({
    src: [
        {
            path: './fonts/gilroy/Gilroy-Bold.ttf',
            weight: '700',
            style: 'normal',
        },
        {
            path: './fonts/gilroy/Gilroy-SemiBold.ttf',
            weight: '600',
        },
    ],
    variable: "--gilroy"
})

export const metadata: Metadata = {
    title: 'Cognify',
    description: 'Flashcard app',
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <>
            <GoogleOAuthProvider clientId={process.env.GOOGLE_AUTH_KEY}>
                <CookiesProvider>
                    <html lang="en">
                    <body className={cn("min-h-screen bg-background font-sans antialiased", gilroy.variable)}>
                    <Providers>
                        <div className="flex">
                            <ConditionalLayout>
                                <Sidebar/>
                            </ConditionalLayout>
                            <div className="flex-1 pl-6 pt-9 pr-11">
                                <ConditionalLayout>
                                    <Header/>
                                </ConditionalLayout>
                                {children}
                            </div>
                        </div>
                        <Toaster/>
                    </Providers>
                    </body>
                    </html>
                </CookiesProvider>
            </GoogleOAuthProvider>
        </>
    )
}
