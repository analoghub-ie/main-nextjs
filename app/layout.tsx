// app/layout.tsx

import "@/styles/globals.css";
import {Metadata, Viewport} from "next";
import clsx from "clsx";

import {Providers} from "./providers";

import {siteConfig} from "@/config/site";
import {fontSans} from "@/config/fonts";
import {Navbar} from "@/components/navbar";
import {Footer} from "@/components/footer";

import {GoogleAnalytics} from '@next/third-parties/google'
import {CookieConsentBanner} from "@/components/cookie/cookieConsentBanner";
import {NotAnalogDevicesBanner} from "@/components/notAnalogDevicesBanner";

export const metadata: Metadata = {
    title: {
        default: siteConfig.name,
        template: `%s - ${siteConfig.name}`,
    },
    description: siteConfig.description,
    icons: {
        icon: "/favicon.svg",
    },
    robots: siteConfig.env.dev ? "noindex, nofollow" : undefined,
    verification:{
        google: '1kxPJq-eEbbmU3H-LrbnIuE3Vnd0GWqky63RH_31ikU',
    }
};

export const viewport: Viewport = {
    themeColor: [
        { media: "(prefers-color-scheme: light)", color: "white" },
        { media: "(prefers-color-scheme: dark)", color: "black" },
    ],
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {

    return (
        <html suppressHydrationWarning className={'scroll-smooth'} lang="en">
        {!siteConfig.env.dev && <GoogleAnalytics gaId="G-ZLSWQ36PZ5"  />}
        <body
            className={clsx(
                "min-h-screen bg-background font-sans antialiased",
                fontSans.variable,
            )}
            style={{minHeight: "100dvh"}}
        >
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
            <div className="relative flex flex-col h-full min-h-vh min-h-dvh">
                <Navbar />

                <main className="container mx-auto max-w-7xl pt-16 px-6 grow flex flex-col">
                    {children}
                </main>

                <Footer/>
            </div>

            <NotAnalogDevicesBanner/>
            {!siteConfig.env.dev && <CookieConsentBanner/>}
        </Providers>
        </body>
        </html>
    );
}
