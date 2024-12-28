"use client";

import {FC, useEffect} from "react";

export const ScrollToHash: FC<{offset?: number}> = ({ offset = 80 }) => { // offset задает высоту navbar
    useEffect(() => {
        const hash = window.location.hash;
        if (hash) {
            const targetElement = document.querySelector(hash);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                });
            }
        }
    }, []);

    return null;
};
