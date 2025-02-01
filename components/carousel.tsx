"use client";

import images from "@/portfolio-images.json";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const Carousel: React.FC = () => {
    const [imageindex, setImageindex] = useState(0);
    const [tuple, setTuple] = useState([null, imageindex]); // [prev, current]
    const imagesLen = images.images.length;

    if (tuple[1] !== imageindex) {
        setTuple([tuple[1], imageindex]);
    }

    let prev = tuple[0];
    let direction: number = imageindex > (prev !== null ? prev : -1) ? 1 : -1;

    const handleClick = (offset: number) => {
        console.log(direction);
        let newIndex = imageindex + offset;
        newIndex = newIndex < 0 ? imagesLen - 1 : newIndex;
        newIndex = newIndex >= imagesLen ? 0 : newIndex;
        setImageindex(newIndex);
    };

    return (
        <div className="flex justify-center items-center w-full max-w-[1440px] my-16">
            {/* Previous Button */}
            <button
                onClick={() => handleClick(-1)}
                className="mr-2 text-2xl w-auto px-24 anim-darker h-[550px]"
            >
                &#10094;
            </button>

            {/* Image & Description Container */}
            <div className="relative flex flex-col justify-center items-center w-full max-w-[1440px] h-[550px] mb-8">
                {/* Image Display */}
                <div className="relative w-full h-full flex justify-center items-center">
                    <AnimatePresence mode="wait" custom={direction}>
                        <motion.img
                            key={imageindex}
                            variants={variants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            custom={direction}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            src={images.images[imageindex].path}
                            alt={`Image ${imageindex + 1}`}
                            className="w-full h-auto max-h-[550px] object-contain"
                        />
                    </AnimatePresence>
                </div>

                {/* Image Counter */}
                <div className="absolute bottom-[-3rem] rounded-md px-4 py-1 text-sm mt-6 z-100">
                    {`${imageindex + 1} / ${imagesLen}`}
                </div>
            </div>

            {/* Next Button */}
            <button
                onClick={() => handleClick(1)}
                className="ml-2 text-2xl w-auto px-24 anim-darker h-[550px]"
            >
                &#10095;
            </button>
        </div>
    );
};

let variants = {
    enter: (direction: number) => ({
        opacity: 0,
        scale: 0.95,
        x: direction * 25, // Slide from right if next, left if previous
    }),
    center: { opacity: 1, x: 0, scale: 1 },
    exit: (direction: number) => ({
        opacity: 0,
        scale: 0.95,
        x: direction * -25, // Slide from right if next, left if previous
    }),
};

export default Carousel;
