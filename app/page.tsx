import Link from "next/link";
import Carousel from "@/components/carousel";
import Image from "next/image";

export default function Home() {
    return (
        <div>
            <div className="flex overflow-auto text-4xl p-8 text-center w-full items-center justify-center font-semibold">
                <div className="mr-16">Hello! I'm Douglas :)</div>
                <img
                    src="/images/Viscaya.jpeg"
                    className="aspect-square object-cover rounded-full h-52"
                    alt=""
                />
            </div>
            <Carousel />
        </div>
    );
}

// idedas:

// keep a 3 image stack preloaded so that I could do animations. performance decrease but still
