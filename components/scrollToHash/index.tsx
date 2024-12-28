"use client";

import {FC, useEffect} from "react";

export const ScrollToHash: FC = () => { // offset задает высоту navbar
    useEffect(() => {
        setTimeout(() => {
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
        }, 100);
    }, []);

    return null;
};
