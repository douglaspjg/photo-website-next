"use client";
import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faGithub,
    faInstagram,
    faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";
import { faBold } from "@fortawesome/free-solid-svg-icons";

const Navbar: React.FC = () => {
    return (
        <div>
            <nav className="flex justify-between align-center w-full pl-16 pr-16 p-4 font-satoshi mt-2">
                {/*******************************************************************************/}
                {/********************************** Left side **********************************/}
                {/*******************************************************************************/}
                <div className="flex gap-4 font-bold text-lg mt-auto mb-auto">
                    <Link href="/" className="text-main-grey anim">
                        {" "}
                        home{" "}
                    </Link>
                    <Link href="/kyoto" className="text-main-grey anim">
                        {" "}
                        kyoto{" "}
                    </Link>
                </div>
                {/*******************************************************************************/}
                {/************************************ Logo *************************************/}
                {/*******************************************************************************/}
                <a href="" className="flex justify-center my-auto">
                    <p className="font-generalSans font-bold text-3xl anim">
                        dpg.
                    </p>
                </a>
                {/*******************************************************************************/}
                {/********************************* Right side **********************************/}
                {/*******************************************************************************/}
                <div className="flex justify-end">
                    <a
                        href="https://www.instagram.com/douglaspjg"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-4 text-main-grey anim"
                    >
                        <FontAwesomeIcon icon={faInstagram} size="xl" />
                    </a>
                    <a
                        href="https://www.linkedin.com/in/douglas-pineda-gutierrez-754831268/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-4 text-main-grey anim"
                    >
                        <FontAwesomeIcon icon={faLinkedin} size="xl" />
                    </a>
                    <a
                        href="https://github.com/douglaspjg"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-4 text-main-grey anim"
                    >
                        <FontAwesomeIcon icon={faGithub} size="xl" />
                    </a>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
