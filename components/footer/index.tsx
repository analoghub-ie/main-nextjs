'use client';

import {Divider, Link, Spacer} from "@nextui-org/react";
import {AiFillLinkedin, AiOutlineInfoCircle, AiOutlineMail} from "react-icons/ai";

export const Footer = () => {
    return (
        <footer className="py-8 mt-auto bg-background text-text">
            <Divider />

            <Spacer y={8} />

            <div className="container mx-auto text-center">
                <div className="flex flex-col sm:flex-row justify-center gap-6">
                    <Link href="mailto:contact@analoghub.ie"
                          target="_blank"
                          className="flex items-center gap-2"
                    >
                        <AiOutlineMail size={24} className="text-text" />
                        <span className="hidden sm:inline">contact@analoghub.ie</span>
                    </Link>

                    <Link href="https://www.linkedin.com/in/sidun-av/"
                          target="_blank"
                          className="flex items-center gap-2"
                    >
                        <AiFillLinkedin size={24} className="text-text" />
                        <span className="hidden sm:inline">Aleksandr Sidun</span>
                    </Link>

                    {/* Added link to /about */}
                    <Link href="/about"
                          className="flex items-center gap-2"
                    >
                        <AiOutlineInfoCircle size={24} className="text-text" />
                        <span>About Us</span>
                    </Link>
                </div>

                <Spacer y={4} />

                <p className="text-small">
                    &copy; 2024-{new Date().getFullYear()} All Rights Reserved
                </p>
            </div>
        </footer>
    );
};
