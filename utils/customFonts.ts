import localFont from "next/font/local";

const Cabinet = localFont ({
    src: [
        {
            path: "../assets/fonts/Cabinet/OTF/CabinetGrotesk-Thin.otf",
            weight: "100",
        },
        {
            path: "../assets/fonts/Cabinet/OTF/CabinetGrotesk-Extralight.otf",
            weight: "200",
        },
        {
            path: "../assets/fonts/Cabinet/OTF/CabinetGrotesk-Light.otf",
            weight: "300",
        },
        {
            path: "../assets/fonts/Cabinet/OTF/CabinetGrotesk-Regular.otf",
            weight: "400",
        },
        {
            path: "../assets/fonts/Cabinet/OTF/CabinetGrotesk-Medium.otf",
            weight: "500",
        },
        {
            path: "../assets/fonts/Cabinet/OTF/CabinetGrotesk-Bold.otf",
            weight: "700",
        },
        {
            path: "../assets/fonts/Cabinet/OTF/CabinetGrotesk-Extrabold.otf",
            weight: "800",
        },
        {
            path: "../assets/fonts/Cabinet/OTF/CabinetGrotesk-Black.otf",
            weight: "900",
        }
    ],
    variable: "--font-cabinet",
})

const GeneralSans = localFont ({
    src: [
        { 
            path: "../assets/fonts/General-Sans/OTF/GeneralSans-Extralight.otf",
            weight: "200",
        },
        {
            path: "../assets/fonts/General-Sans/OTF/GeneralSans-Light.otf",
            weight: "300",
        },
        {
            path: "../assets/fonts/General-Sans/OTF/GeneralSans-Regular.otf",
            weight: "400",
        },
        {
            path: "../assets/fonts/General-Sans/OTF/GeneralSans-Medium.otf",
            weight: "500",
        },
        {
            path: "../assets/fonts/General-Sans/OTF/GeneralSans-Semibold.otf",
            weight: "500",
        },
        {
            path: "../assets/fonts/General-Sans/OTF/GeneralSans-Bold.otf",
            weight: "700",
        }
    ],
    variable: "--font-general-sans",
})

const Ranade = localFont ({
    src: [
        {
            path: "../assets/fonts/Ranade/OTF/Ranade-Thin.otf",
            weight: "100",
        },
        {
            path: "../assets/fonts/Ranade/OTF/Ranade-Light.otf",
            weight: "300",
        },
        {
            path: "../assets/fonts/Ranade/OTF/Ranade-Regular.otf",
            weight: "400",
        },
        {
            path: "../assets/fonts/Ranade/OTF/Ranade-Medium.otf",
            weight: "500",
        },
        {
            path: "../assets/fonts/Ranade/OTF/Ranade-Bold.otf",
            weight: "700",
        }
    ],
    variable: "--font-ranade",
})

const Satoshi = localFont ({
    src: [
        {
            path: "../assets/fonts/Satoshi/OTF/Satoshi-Light.otf",
            weight: "300",
        },
        {
            path: "../assets/fonts/Satoshi/OTF/Satoshi-Regular.otf",
            weight: "400",
        },
        {
            path: "../assets/fonts/Satoshi/OTF/Satoshi-Medium.otf",
            weight: "500",
        },
        {
            path: "../assets/fonts/Satoshi/OTF/Satoshi-Bold.otf",
            weight: "700",
        },
        {
            path: "../assets/fonts/Satoshi/OTF/Satoshi-Black.otf",
            weight: "900",
        }
    ],
    variable: "--font-satoshi",
})

const SourceCodePro = localFont ({
    src: [
        {
            path: "../assets/fonts/Source-Code-Pro/OTF/SourceCodePro-ExtraLight.otf",
            weight: "200",
        },
        {
            path: "../assets/fonts/Source-Code-Pro/OTF/SourceCodePro-Light.otf",
            weight: "300",
        },
        {
            path: "../assets/fonts/Source-Code-Pro/OTF/SourceCodePro-Regular.otf",
            weight: "400",
        },
        {
            path: "../assets/fonts/Source-Code-Pro/OTF/SourceCodePro-Medium.otf",
            weight: "500",
        },
        {
            path: "../assets/fonts/Source-Code-Pro/OTF/SourceCodePro-Semibold.otf",
            weight: "500",
        },
        {
            path: "../assets/fonts/Source-Code-Pro/OTF/SourceCodePro-Bold.otf",
            weight: "700",
        },
        {
            path: "../assets/fonts/Source-Code-Pro/OTF/SourceCodePro-Black.otf",
            weight: "900",
        }
    ],
    variable: "--font-source-code-pro",
})

export { Cabinet , GeneralSans , Ranade , Satoshi , SourceCodePro};