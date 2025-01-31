import Link from "next/link";
import Carousel from "@/components/carousel";

export default function Home() {
    return (
        <div>
            <div className="p-4">
                <p className="text-center">
                    I'm currently working on building out my landing page,
                    optimizing performance, and organizing my images into
                    distinct collections.
                </p>
                <Link href="/kyoto" className="block w-full text-center">
                    For now, please enjoy the pictures I've included down below
                    or on my Kyoto project page!
                </Link>
            </div>
            <Carousel />
        </div>
    );
}

// idedas:

// keep a 3 image stack preloaded so that I could do animations. performance decrease but still
