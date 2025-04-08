'use client'

import React, {FC} from "react";
import CookieConsent from "react-cookie-consent";

import {useTheme} from "next-themes";

export const CookieConsentBanner: FC = () => {
    const { theme } = useTheme();
    const isDark = theme === "dark";


    const handleConsent = (granted: boolean) => {
        if (typeof window !== 'undefined' && window.gtag) {
            window.gtag('consent', 'update', {
                ad_storage: granted ? 'granted' : 'denied',
                analytics_storage: granted ? 'granted' : 'denied',
            });
        }
    };

    return (
        <CookieConsent
            location="bottom"
            buttonText="I understand"
            // declineButtonText="Decline"
            // enableDeclineButton
            cookieName="cookie_consent"
            overlay
            contentStyle={{
                flex: 'none',
            }}
            style={{
                background: isDark ? "#141414" : "#FFFFFF",
                color: isDark ? "#FFFFFF" : "#000000",
                fontSize: "14px",
                justifyContent: "center",
                // borderTop: `1px solid ${isDark ? "#FFA31A" : "#141414"}`
            }}
            buttonStyle={{
                backgroundColor: "#FFA31A",
                color: "#000000",
                fontSize: "14px",
                borderRadius: "4px",
                padding: "8px 16px",
                margin: "0 8px"
            }}
            declineButtonStyle={{
                backgroundColor: isDark ? "#FFFFFF" : "#141414",
                color: isDark ? "#141414" : "#FFFFFF",
                fontSize: "14px",
                borderRadius: "4px",
                padding: "8px 16px",
                margin: "0 8px"
            }}
            expires={365}  // Number of days before the cookie expires
            onAccept={() => {
                // Add functionality when user accepts cookies
                console.log("Cookies accepted");
                handleConsent(true);
            }}
            onDecline={() => {
                // Add functionality when user declines cookies
                console.log("Cookies declined");
                handleConsent(false);
            }}
        >
            This website uses cookies to enhance the user experience.
            {/*We use cookies. You’re free to accept or decline.*/}
            {/*You can read more in our <Link href="/privacy-policy"><a>privacy policy</a></Link>.*/}
        </CookieConsent>
    );
};