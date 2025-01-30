import type { Metadata } from "next";
import "./globals.css";
import {
    Cabinet,
    GeneralSans,
    Ranade,
    Satoshi,
    SourceCodePro,
} from "@/utils/customFonts";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import Navbar from "@/components/navbar";

config.autoAddCss = false;

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${Cabinet.variable} ${GeneralSans.variable} ${Ranade.variable} ${Satoshi.variable} ${SourceCodePro.variable}`}
            >
                <Navbar />
                {children}
            </body>
        </html>
    );
}
