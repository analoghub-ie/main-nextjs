'use client'

import React, {FC} from "react";
import CookieConsent from "react-cookie-consent";

import {useTheme} from "next-themes";

export const NotAnalogDevicesBanner: FC = () => {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    return (
        <CookieConsent
            acceptOnOverlayClick
            location="bottom"
            buttonText="Got it"
            cookieName="notanalogdevices"
            overlay
            contentStyle={{
                flex: 'none',
                textAlign: 'center',
                maxWidth: '100%',
            }}
            style={{
                background: isDark ? "#141414" : "#FFFFFF",
                color: isDark ? "#FFFFFF" : "#000000",
                fontSize: "14px",
                justifyContent: "center",
                // borderTop: `1px solid ${isDark ? "#FFA31A" : "#141414"}`
                maxWidth: "100%",
            }}
            buttonStyle={{
                backgroundColor: "#FFA31A",
                color: "#000000",
                fontSize: "14px",
                borderRadius: "4px",
                padding: "4px 16px",
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
        >
            AnalogHub.ie is run independently, with no affiliation, partnership, or association with
            Analog Devices, Inc. (AD). ADI does not endorse or collaborate with the author for material posted
            on this website.
        </CookieConsent>
    );
};