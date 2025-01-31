import Link from "next/link";
import Carousel from "@/components/carousel";
import Image from "next/image";

export default function Home() {
    return (
        <div>
            <div className="flex flex-col overflow-auto text-4xl p-8 text-center w-full items-center justify-center font-semibold">
                <img
                    src="/images/Viscaya.jpeg"
                    className="aspect-square object-cover rounded-full h-52 mb-3"
                    alt=""
                />
                <div className="text-second-grey text-center">
                    Hello, I'm Douglas!
                </div>
            </div>
            <Carousel />
        </div>
    );
}

// idedas:

// keep a 3 image stack preloaded so that I could do animations. performance decrease but still
