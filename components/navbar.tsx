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
        <div className="bg-second-grey mb-4">
            <nav className="flex relative justify-between align-center w-full pl-16 pr-16 p-4 font-satoshi pt-4">
                {/*******************************************************************************/}
                {/********************************** Left side **********************************/}
                {/*******************************************************************************/}
                <div className="flex gap-4 font-bold text-lg mt-auto mb-auto">
                    <Link href="/" className="text-third-beige anim">
                        home
                    </Link>
                    <Link href="/kyoto" className="text-third-beige anim">
                        {" "}
                        kyoto{" "}
                    </Link>
                </div>
                {/*******************************************************************************/}
                {/************************************ Logo *************************************/}
                {/*******************************************************************************/}
                <a
                    href=""
                    className="flex justify-center my-auto absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                >
                    <p className="font-generalSans font-bold text-3xl anim text-third-beige">
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
                        className="p-4 text-third-beige text-sm anim"
                    >
                        <FontAwesomeIcon icon={faInstagram} size="xl" />
                    </a>
                    <a
                        href="https://www.linkedin.com/in/douglas-pineda-gutierrez-754831268/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-4 text-third-beige text-sm anim"
                    >
                        <FontAwesomeIcon icon={faLinkedin} size="xl" />
                    </a>
                    <a
                        href="https://github.com/douglaspjg"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-4 text-third-beige text-sm anim"
                    >
                        <FontAwesomeIcon icon={faGithub} size="xl" />
                    </a>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
